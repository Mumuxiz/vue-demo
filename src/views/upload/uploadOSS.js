/**
 * Created by Mireia.
 * Date: 2019/11/26 11:43
 * Describe: 阿里云OSS上传
 */
// 引入axios
import axios from '../../config/request'
// 引入ali-oss开发包
import OSS from 'ali-oss'

// 文件后缀名
const IMAGE_SUFFIX = ['jpg', 'jpeg', 'png', 'svg', 'bmp', 'gif', 'webp', 'svga']
const VIDEO_SUFFIX = ['mp4', 'mwv']
const AUDIO_SUFFIX = ['mp3', 'wav']
const FILE_SUFFIX = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'pdf', 'spdf']


/**
 * 获取文件后缀名
 * @param file
 * @return {*|string}
 */
function getSuffix (file) {
  let type = 'jpg'
  // fileType: image/jpeg
  if (file.type) {
    // pop()返回数组中的最后一个值
    type = file.type.split('/').pop()
  } else if (file.name) {
    type = file.name.split('.').pop()
  }
  return type
}


/**
 * 根据文件后缀名判断属于哪种类型的文件（image, video, audio, file）
 * @param str
 * @return string
 */
function getFileType (str) {
  // let str = fileName.split('.').pop()
  let lowerStr = str.toLocaleLowerCase()

  let type = ''
  if (IMAGE_SUFFIX.includes(lowerStr)) {
    type = 'images'
  } else if (VIDEO_SUFFIX.includes(lowerStr)) {
    type = 'video'
  } else if (AUDIO_SUFFIX.includes(lowerStr)) {
    type = 'audio'
  } else if (FILE_SUFFIX.includes(lowerStr)) {
    type = 'file'
  } else {
    type = 'other'
  }
  return type
}


/**
 * 获取文件上传签名凭证及过期处理
 * @param isForce 强制从服务器获取
 */
function getSign (isForce = false) {
  let fileSign = JSON.parse(sessionStorage.getItem('fileSign'))

  let pro = new Promise((resolve, reject) => {
    // 如果存储的fileSign不为空或者用户非强行获取签名凭证
    if (fileSign && fileSign.access_key_id && !isForce) {
      // 将上传签名凭证的过期时间与现在时间的毫秒数相比较
      let expire = +new Date(fileSign.expire_time)
      let nowMsec = +new Date()
      // 未过期
      if (expire > nowMsec) {
        resolve(fileSign)
        return
      }
      // 过期
      handleGetSign(resolve, reject)
    } else {
      handleGetSign(resolve, reject)
    }
  })
  return pro
}

/**
 * 从服务器获取上传签名凭证
 * @param resolve
 * @param reject
 * @private
 */
function handleGetSign (resolve, reject) {
  // 后台返回上传凭证
  axios.post('/fileSign', { id: 123 }).then(sign => {
    console.log(sign)
    debugger
    // 处理特殊情况
    // {"code":0,"message":"Speicified endpoint or uri is not valid."}
    if (sign.access_key_id) {
      sessionStorage.setItem('fileSign', JSON.stringify(sign))
      resolve(sign)
    } else {
      console.log('错误')
      reject(sign)
    }
  }).catch(err => {
    reject(err)
  })
}


/**
 * 上传文件至OSS
 * @param file 文件或Blob数据
 * @param fileSuffix 文件后缀
 * @param successCallback 成功回调函数
 * @param errorCallback 失败回调函数
 */
function uploadOSS (file, fileSuffix, successCallback, errorCallback) {
  // 此处这样写是为了让Promise串行，即先获取上传凭证,然后通过凭证配置OSS,最后上传Blob文件
  // 获取上传凭证
  console.log('进入uploadOSS>>')
  let signPromise = getSign()
  signPromise.then(sign => {
    // 特殊情况，特殊处理,如果后台返回的是oss-cn-hangzhou.aliyuncs.com则处理成取第1个小数点前的数据
    let region = 'oss-cn-hangzhou'
    try {
      region = sign.endpoint.split('.')[0]
    } catch (e) {}

    // 文件存储位置:根据实际设置的文件存储位置获取，例：other/video/2019/11/0/
    let fileType = getFileType(fileSuffix)
    let dirPrefix = sign.filedir.other[fileType]

    // 存储对象名, 取13位时间戳, 例 ：other/images/2019/11/0/1574908301799.jpg
    let objectName = dirPrefix + (+new Date() + '.' + fileSuffix)

    // oss的配置
    let client = new OSS({
      // bucket 所在的区域，默认 oss-cn-hangzhou
      region: region,
      // 通过阿里云控制台创建的access_key
      accessKeyId: sign.access_key_id,
      // 通过阿里云控制台创建的access_secret
      accessKeySecret: sign.access_key_secret,
      // 通过控制台创建的bucket
      bucket: sign.bucket_name,
      // 使用临时授权方式
      stsToken: sign.security_token
    })

    // 上传到OSS
    client.put(objectName, file).then((resp) => {
      successCallback(resp)
    }).catch(err => {
      errorCallback(err)
    })
  }).catch(error => {
    errorCallback(error)
  })
}


/**
 * 上传文件
 * @param file 文件数据
 * @return {Promise}
 */
export function upload (file) {
  console.log('上传upload方法')
  let fileSuffix = getSuffix(file)

  return new Promise((resolve, reject) => {
    // 经Canvas处理(压缩或裁剪)过的Blob数据
    if (file instanceof Blob) {
      const reader = new FileReader()
      // 这一步不能少
      reader.readAsArrayBuffer(file)
      reader.onload = function () {
        uploadOSS(file, fileSuffix, resolve, reject)
      }
    } else {
      uploadOSS(file, fileSuffix, resolve, reject)
    }
  })
}
