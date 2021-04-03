<template>
  <div>
    <el-upload
        class="avatar-uploader"
        action="#"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :file-list="fileList"
        :before-upload="beforeAvatarUpload" :limit="1" :class="{disable: fileComputed}" :on-preview="preview" :on-remove="handleRemove">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" title="图片预览">
      <img width="100%" :src="imghUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ImageUpload',
  data() {
    return {
      imageUrl: '',
      fileList:[{url:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=800205596,459974077&fm=26&gp=0.jpg'}],
      dialogVisible: false,
      imghUrl: null
    };
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    preview(file) {
      this.imageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove () {
      
    }
  }
}
</script>


<style lang='scss' >
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>