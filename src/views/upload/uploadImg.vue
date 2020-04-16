<template>
    <div class='upload-img-div'>
        <input type='file' ref='fileInput' :multiple='false' accept='image/*' style='display: none' @change='fileChange'>
    </div>
</template>
<!--
----Created by Webstorm
----FileName：uploadImg
----ChineseName：上传图片组件
----ComponentName: upload-img
----Description：
----User: xuzhicheng
----DateAndTime：2019-05-10 16:04
-->
<script>
import OSS from 'ali-oss'

export default {
  name: 'upload',
  props: {
    isUploadOSS: {
      type: Boolean,
      default: true
    }
  },
  components: {},
  mixins: [],
  data () {
    return {
      fileList: []
    }
  },
  computed: {},
  methods: {
    clickUpload () {
      this.fileList = []
      this.$refs.fileInput.value = ''
      setTimeout(() => {
        this.$refs.fileInput.click()
      }, 150)
    },
    fileChange () {
      let files = [...this.$refs.fileInput.files]
      let item = files[0] // 单张文件上传
      let fileSize = item.size / (1024 * 1024)
      // 如果需要控制图片的大小，请走此处的逻辑
      if (fileSize > 10) {
        this.$store.commit('messageData', {
          time: '2000',
          content: '图片大小不能超过10M',
          bg: '#ccc'
        })
        this.$emit('callBackF', 'error')
        return false
      }
      // 根据文件后缀判断文件类型
      if (item.name !== '') {
        let fileType = this.judgmentFileType(item.name)
        if (fileType !== 'image') {
          this.$store.commit('messageData', {
              time: '2000',
              content: '请上传图片类型的文件',
              bg: '#ccc'
          })
          this.$emit('callBackF', 'error')
          return false
        }
      }

      this.fileList.push(item)
      if (this.isUploadOSS) {
        // 上传图片
        this.getTokenInfo(this.fileList[0])
      } else {
        this.$emit('callBackF', 'success', this.fileList)
      }
      this.$refs.fileInput.value = ''
    },
    judgmentFileType (str) {
      let strArr = str.split('.')
      let type = ''
      switch (strArr[strArr.length - 1].toLocaleLowerCase()) {
        case 'jpg':
        case 'png':
        case 'jpeg':
        case 'gif':
        case 'bmp':
          type = 'image'
          break
        case 'mp3':
        case 'wav':
          type = 'music'
          break
        case 'mwv':
        case 'rmvb':
        case 'mp4':
          type = 'video'
          break
        case 'doc':
        case 'docx':
        case 'xls':
        case 'xlsx':
        case 'ppt':
        case 'pptx':
        case 'txt':
        case 'pdf':
        case 'spdf':
          type = 'file'
          break
        default:
          type = 'other'
          break
      }
      return type
    },
    //获取oss上传临时凭证
    getTokenInfo (file) {
        let self = this
        this.$http.commonOssCertificate ().then (resp=>{
            if (resp.data.code==0){
                this.$Loading.finish ()
                self.uploadToOss (resp.data.data, file)
            }
        }).catch (error=>{
            console.log (error)
        })
    },
    /**方法功能：
     * 获取一个随机字符串
     * 参数：
     * number：返回字符串长度
     * */
    getRandomString (number) {
      var string = 'qwertyuiopasdfghjklzxcvbnm123456789QWERTYUIOPLKJHGFDSAZXCVBNM'
      var tempString = ''
      for (var i = 0; i < number; i++) {
          var randomNum = parseInt (Math.random () * string.length)
          tempString += string[randomNum]
      }
      var date = new Date ().getTime ()
      return 'random' + tempString + date
    },
    uploadToOss (data, file) {
      let randomString = this.getRandomString ('20')
      let imgType = file.name.split ('.').pop ()
      let imgName = randomString + '.' + imgType

      // oss的配置
      let client = new OSS ({
          region: data.region,
          accessKeyId: data.accesskeyid,
          accessKeySecret: data.accesskeysecret,
          bucket:data.bucket,
          stsToken: data.ststoken
      })
      //base64转blob
      function toBlob (b64, type) {
          let bytes = window.atob (b64)
          let len = bytes.length
          let unit8Arr = new Uint8Array (len)
          while (len--) {
              unit8Arr[len] = bytes.charCodeAt (len)
          }
          return new Blob ([unit8Arr], {type})
      }
      // image 转blob
      let r = new FileReader ()
      r.readAsDataURL (file)
      r.onload = e => {
          let self = this
          let base_64 = e.target.result
          let base64 = base_64.split (',').pop ()
          let blobImage = toBlob (base64, imgType)
          // 上传文件
          try {
              client.put (imgName, blobImage).then (res => {
                  //console.log (`http://${data.bucket}.${data.region}.aliyuncs.com/${imgName}`)
                  let params = {
                      name: imgName,
                      url: `http://${data.bucket}.${data.region}.aliyuncs.com/${imgName}`,
                  }
                  self.$emit ('callBackF', 'success', params)
              })
          }catch (e) {
              self.$store.commit ('messageData', {
                  time: '2000',
                  content: '加载图片失败，请重试',
                  bg: '#ccc',
              })
              self.$emit ('callBackF', 'error')
          }
      }
    }
  },
  created () {
  },
  mounted () {
      // this.fileList = []
      // this.$refs.fileInput.click ()
  }
}
</script>

<style scoped>
    .upload-img-div {
    }
</style>
