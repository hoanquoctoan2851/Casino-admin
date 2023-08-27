<template>
  <Upload
    v-model:file-list="fileList"
    name="image"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    :customRequest="handleGetFile"
    :before-upload="beforeUpload"
  >
    <img v-if="imageProp" class="w-full h-full" :src="imageProp" alt="avatar" />
    <div v-else>
      <loading-outlined v-if="loading" />
      <img class="w-full h-full" v-else :src="ImageUploadIcon" alt="" />
    </div>
  </Upload>
</template>
<script>
  import { LoadingOutlined } from '@ant-design/icons-vue';
  import { Upload } from 'ant-design-vue';
  import { message } from 'ant-design-vue';
  import ImageUploadIcon from '/@/assets/svg/image-upload-icon.svg';
  import { defineComponent, ref } from 'vue';
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  export default defineComponent({
    name: 'UploadComp',
    components: {
      LoadingOutlined,
      Upload,
    },
    props: {
      imageProp: {
        type: String,
        default: '',
      },
    },
    emits: ['upload:base64'],
    setup(_, { emit }) {
      const fileList = ref([]);
      const fileBase64 = ref('');
      const loading = ref(false);
      const imageUrl = ref('');
      const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      };

      const handleGetFile = (file) => {
        getBase64(file.file, (result) => {
          fileBase64.value = result;
          const params = {
            imageDisplay: fileBase64.value,
            imageFile: fileList.value[0].originFileObj,
          };
          emit('upload:base64', params);
        });
      };
      return {
        fileList,
        loading,
        imageUrl,
        beforeUpload,
        handleGetFile,
        ImageUploadIcon,
      };
    },
  });
</script>
<style>
  .avatar-uploader > .ant-upload {
    width: 100%;
    max-width: 400px;
    height: 200px;
  }

  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
