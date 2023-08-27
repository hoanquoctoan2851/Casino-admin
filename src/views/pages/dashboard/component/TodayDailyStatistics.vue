<template>
  <div class="w-full text-white">
    <div
      class="relative h-fit p-5 gap-5 w-full flex flex-col bg-color-background-neuture-700 rounded-2xl"
    >
      <p class="w-full text-center select-none font-bold text-2xl">{{
        t('routes.dashboard.today.title')
      }}</p>
      <div
        v-if="dataCart.length"
        class="flex flex-row screen-hide-sidebar:flex-wrap justify-between gap-[14px]"
      >
        <div
          v-for="item in dataCart"
          :key="item.key"
          class="h-[121px] w-full min-w-[165px] px-5 py-4 flex flex-col justify-between border border-color-background-neuture-500 rounded-xl"
        >
          <div class="flex select-none flex-row flex-wrap justify-between items-center">
            <p>{{ LIST_CART_FORM_DAILY[item.key]?.title }}</p>
            <img :src="LIST_CART_FORM_DAILY[item.key]?.icon" />
          </div>
          <div>
            <p
              :class="[
                'font-semibold text-2xl',
                LIST_CART_FORM_DAILY[item.key]?.color
                  ? `${
                      item.value < 0
                        ? 'text-color-background-red-1'
                        : 'text-color-background-green-1'
                    }`
                  : '',
              ]"
              >{{ Intl.NumberFormat('en-US').format(toFixedNumber(item.value)) }}
              <span>{{ LIST_CART_FORM_DAILY[item.key]?.unit }}</span></p
            >
          </div>
        </div>
      </div>
      <div v-else class="flex flex-row screen-hide-sidebar:flex-wrap justify-between gap-[14px]">
        <Skeleton :active="true" v-for="item in 4" :key="item" />
      </div>
    </div>
  </div>
</template>
<script>
  import { onMounted, ref } from 'vue';
  import { toFixedNumber } from '/@/utils/helper/application.ts';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { getListDailyReport } from '/@/api/pages/dashboard';
  import { useDashboardState } from '../useDashboard.ts';
  import { Skeleton } from 'ant-design-vue';
  export default {
    name: 'TodayStatistics',
    components: {
      Skeleton,
    },
    setup() {
      const { t } = useI18n();
      const dataCart = ref([]);
      const { LIST_CART_FORM_DAILY, mapDataDailyReport } = useDashboardState();
      const fetchListDailyReport = async () => {
        try {
          const res = await getListDailyReport();
          dataCart.value = await mapDataDailyReport(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      onMounted(() => {
        fetchListDailyReport();
      });

      return {
        t,
        dataCart,
        LIST_CART_FORM_DAILY,
        toFixedNumber,
      };
    },
  };
</script>
