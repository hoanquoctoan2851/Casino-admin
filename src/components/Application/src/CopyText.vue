<template>
  <div>
    <BlockOutlined
      v-if="icon"
      @click="copyMeOnClipboard"
      style="rotate: 90deg"
      class="!text-secondary !text-xl !hover:text-default"
    />
    <img v-else :src="copyIcon" class="cursor-pointer" @click="copyMeOnClipboard" />
  </div>
</template>
<script lang="ts">
  import copyIcon from '/@/assets/svg/copy-icon.svg';
  import { copyText } from '/@/utils/helper/application';
  import { BlockOutlined } from '@ant-design/icons-vue';
  export default {
    components: {
      BlockOutlined,
    },
    props: {
      idCopy: {
        type: String,
        default: () => '',
      },
      icon: {
        type: Boolean,
        default: false,
      },
    },
    setup(prop) {
      const copyMeOnClipboard = async () => {
        await copyText(prop.idCopy);
      };
      return { copyIcon, copyMeOnClipboard, BlockOutlined };
    },
  };
</script>
