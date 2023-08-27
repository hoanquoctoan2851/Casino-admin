<template>
  <BasicModal :width="800" :title="t('sys.errorLog.tableActionDesc')" v-bind="$attrs" />
</template>
<script lang="ts" setup>
  import type { PropType } from 'vue';
  import type { ErrorLogInfo } from '/#/store';
  import { BasicModal } from '/@/components/Modal/index';
  import { useI18n } from '/@/hooks/web/useI18n';

  defineProps({
    info: {
      type: Object as PropType<ErrorLogInfo>,
      default: null,
    },
  });

  const { t } = useI18n();
</script>
