<template>
  <div class="w-full text-white overflow-hidden">
    <div class="grid grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 gap-[14px]">
      <div
        v-for="item in listDataRender"
        :key="item?.key"
        class="h-[121px] border border-color-background-neuture-700 w-full min-w-[165px] px-5 py-4 flex flex-col justify-between rounded-xl bg-color-background-neuture-800"
      >
        <div class="flex select-none flex-row flex-wrap justify-between items-center">
          <p class="text-color-text-neuture-300">{{ LIST_CART_FORM[item?.key]?.title }}</p>
        </div>
        <Tooltip :title="Number(item?.value)">
          <div class="flex flex-row gap-2">
            <p
              v-if="item.key !== 'accumulated'"
              :class="[
                'font-semibold max-w-[90%] truncate text-2xl mobile:text-xl',
                item.value
                  ? LIST_CART_FORM[item?.key]?.color
                    ? `${
                        item?.value < 0
                          ? 'text-color-background-red-1'
                          : 'text-color-background-green-1'
                      }`
                    : ''
                  : '',
              ]"
              >{{
                item?.value
                  ? Intl.NumberFormat('en-US').format(toFixedNumber(Number(item?.value)))
                  : '-'
              }}
              <span class="text-2xl font-semibold mobile:text-xl">{{
                item.value ? LIST_CART_FORM[item?.key]?.unit : ''
              }}</span>
            </p>
            <p v-else class="font-semibold max-w-[90%] truncate text-2xl mobile:text-xl">
              <span>{{ dayjs(item.value.startDate).format('MMMM D, YYYY') }}</span> -
              <span>{{ dayjs(item.value.endDate).format('MMMM D, YYYY') }}</span>
            </p>
          </div>
        </Tooltip>
      </div>
    </div>
  </div>
</template>
<script>
  import { ref, computed } from 'vue';
  import IconCartTotalDeposit from '/@/assets/svg/dashboard/cart-total-deposit.svg';
  import IconCartTotalWithdraw from '/@/assets/svg/dashboard/cart-total-withdraw.svg';
  import IconCartTotalCashback from '/@/assets/svg/dashboard/cart-total-cashback.svg';
  import IconCartTotalAffPayment from '/@/assets/svg/dashboard/cart-total-aff-payment.svg';
  import { toFixedNumber } from '/@/utils/helper/application.ts';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Tooltip } from 'ant-design-vue';
  import dayjs from 'dayjs';
  export default {
    name: 'TodayStatistics',
    components: {
      Tooltip,
    },
    props: {
      dataCartProp: {
        type: Array,
        default: () => [],
      },
    },
    setup(prop) {
      const { t } = useI18n();
      const dataListCart = ref([]);
      const LIST_CART_FORM = {
        total_deposit: {
          title: 'Total deposit',
          icon: IconCartTotalDeposit,
          color: false,
          unit: '$',
        },
        total_withdraw: {
          title: 'Total withdraw',
          icon: IconCartTotalWithdraw,
          color: false,
          unit: '$',
        },
        total_cashback: {
          title: 'Total cashback',
          icon: IconCartTotalCashback,
          color: true,
          unit: '$',
        },
        balance: {
          title: 'Balance($)',
          icon: IconCartTotalAffPayment,
          color: false,
          unit: '$',
        },
        profit: {
          title: 'Total reward',
          icon: IconCartTotalAffPayment,
          color: false,
          unit: '$',
        },
        accumulated: {
          title: 'Accumulated cashback($)',
          icon: IconCartTotalAffPayment,
          color: false,
          unit: '$',
        },
      };
      const listDataRender = computed(() => {
        return [
          {
            key: 'total_withdraw',
            value: prop.dataCartProp?.totalWithdraw,
          },
          {
            key: 'total_cashback',
            value: prop.dataCartProp?.totalCashback,
          },
          {
            key: 'total_deposit',
            value: prop.dataCartProp?.totalDeposit,
          },
          {
            key: 'profit',
            value: prop.dataCartProp?.totalReward,
          },
          {
            key: 'balance',
            value: prop.dataCartProp?.totalBalance,
          },
          {
            key: 'accumulated',
            value: {
              startDate: prop.dataCartProp?.startDate,
              endDate: prop.dataCartProp?.endDate,
            },
          },
        ];
      });
      return {
        t,
        dayjs,
        LIST_CART_FORM,
        toFixedNumber,
        listDataRender,
        dataListCart,
      };
    },
  };
</script>
