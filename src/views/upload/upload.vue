<template>
  <!-- 上传图片到阿里云OSS -->
  <div class="upload">
    <div class="upload-box radius dashed cur">
      <input type="file" ref="fileInput" :multiple="multiple" :accept="accept" @change="fileChange">
    </div>
  </div>
</template>

<script>
import { upload } from './uploadOSS'

export default {
  name: 'upload',
  props: {
    // 单[多]文件上传
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: 'image/jpeg, image/jpg, image/png, image/gif, .svga'
    }
  },
  data () {
    return {
      fileList: []
    }
  },
  methods: {
    fileChange () {
      let files = [...this.$refs.fileInput.files]

      if (this.multiple) {
        // 多文件上传
        console.log(files)
      } else {
        // 单文件上传
        console.log('单文件上传', files[0])
        let item = files[0]
        this.fileList.push(item)

        this.upload(item).then(resp => {
          console.log('upload回调》》》', resp)
        }).catch(e => {
          console.log(e)
        })
      }
    },
    upload,
    submit () {
    }
  }
}
</script>

<style lang="scss" scoped>
  .upload {
    .upload-box {
      width: 120px;
      height: 120px;
    }
  }
</style>
