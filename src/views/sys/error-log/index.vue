<template>
  <div class="p-4">
    <template v-for="src in imgList" :key="src">
      <img :src="src" v-show="false" alt="" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  const imgList = ref<string[]>([]);

  const { t } = useI18n();

  const { createMessage } = useMessage();
  if (import.meta.env.DEV) {
    createMessage.info(t('sys.errorLog.enableMessage'));
  }
</script>
