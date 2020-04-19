/**
 * Created by Mumuxiz.
 * Date: 2019/08/21 10:33
 */

// 引入mockjs
import Mock from 'mockjs'

// 使用mockjs模拟数据
Mock.mock('/fileSign', 'post', (req, res) => {
  console.log(req)
  return {
    'access_key_id': 'STS.NUo1cV3j7hjQQ32hceCPPS4qX',
    'access_key_secret': 'HbwGTcCXNprosfpHa1ZHViJvzPTsCSC6u4EjiPTHcYnJ',
    'security_token': 'CAIS8QF1q6Ft5B2yfSjIr5baetni3rUW36i6UxWDjGMwT998vPHaujz2IH9OeHZuBekWsv8ynmFW6vYdlqcqFsAZFBefN5YptMUHrVtony0lOInng4YfgbiJREKxaXeiruKwDsz9SNTCAITPD3nPii50x5bjaDymRCbLGJaViJlhHL91N0vCGlggPtpNIRZ4o8I3LGbYMe3XUiTnmW3NFkFlyGEe4CFdkf3jnJPBsUWG1wyllr9F/tTLT8L6P5U2DvBWSMyo2eF6TK3F3RNL5gJCnKUM1/MepWiZ4ojNXwIMuUTYb7qL6LFzIRRldhLvxFzAfV2WGoABOkrLFwbkWW2lMbOeyWOn+L+0vhs9TPcizT9JrDuuM4ILGZA0ZyX909yJuBWhiCmDSp/SvuPrIp7hXu6rHN4NnCUTLV1SGBucZo45kcbfrDrm7psJKa1eCIub/697HCAhBx5SAK7aZ1HXRXHZf0KAQ2aGaslEQgz5ju5z9m9kR74=',
    'expire_time': '2019-11-28T10: 34: 43Z',
    'bucket_name': 'xmqvip',
    'endpoint': 'oss-cn-hangzhou.aliyuncs.com',
    'cdn_host': 'https: //testcdn.xmqvip.com',
    'filedir': {
      'chat': {
        'images': 'chat/images/2019/11/0/',
        'video': 'chat/video/2019/11/0/',
        'file': 'chat/file/2019/11/0/',
        'audio': 'chat/audio/2019/11/0/'
      },
      'ugc': {
        'images': 'ugc/images/2019/11/0/',
        'video': 'ugc/video/2019/11/0/',
        'file': 'ugc/file/2019/11/0/',
        'audio': 'ugc/audio/2019/11/0/'
      },
      'other': {
        'images': 'other/images/2019/11/0/',
        'video': 'other/video/2019/11/0/',
        'file': 'other/file/2019/11/0/',
        'audio': 'other/audio/2019/11/0/'
      }
    }
  }
})
