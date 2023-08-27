<template>
  <div class="w-full text-white">
    <div
      v-if="dataReportDaily.length"
      class="flex flex-row screen-hide-sidebar:flex-wrap justify-between gap-[14px]"
    >
      <div
        v-for="item in dataReportDaily"
        :key="item.key"
        class="h-[121px] w-full min-w-[165px] px-5 py-4 flex flex-col justify-between rounded-xl bg-color-background-neuture-800"
      >
        <div class="flex select-none flex-row flex-wrap justify-between items-center">
          <p>{{ LIST_CART_FORM[item.key]?.title }}</p>
          <img :src="LIST_CART_FORM[item.key]?.icon" />
        </div>
        <div>
          <p
            :class="[
              'font-semibold text-2xl',
              LIST_CART_FORM[item.key]?.color
                ? `${
                    item.value < 0 ? 'text-color-background-red-1' : 'text-color-background-green-1'
                  }`
                : '',
            ]"
            >{{ Intl.NumberFormat('en-US').format(toFixedNumber(item.value)) }}
            <span>{{ LIST_CART_FORM[item.key]?.unit }}</span></p
          >
        </div>
      </div>
    </div>
    <div v-else class="flex flex-row screen-hide-sidebar:flex-wrap justify-between gap-[14px]">
      <Skeleton :active="true" v-for="item in 4" :key="item" />
    </div>
  </div>
</template>
<script>
  import { toFixedNumber } from '/@/utils/helper/application.ts';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDashboardState } from '../useDashboard';
  import { Skeleton } from 'ant-design-vue';

  export default {
    name: 'TodayStatistics',
    components: { Skeleton },
    props: {
      dataReportDaily: {
        type: Array,
        default: () => [],
      },
    },
    setup() {
      const { t } = useI18n();
      const { LIST_CART_FORM } = useDashboardState();

      return {
        t,
        LIST_CART_FORM,
        toFixedNumber,
      };
    },
  };
</script>
