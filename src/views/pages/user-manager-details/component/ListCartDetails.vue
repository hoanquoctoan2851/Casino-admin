<template>
  <div class="w-full text-white overflow-hidden">
    <div class="flex flex-row screen-hide-sidebar:flex-wrap justify-between gap-[14px]">
      <div
        v-for="item in listDataRender"
        :key="item?.key"
        class="h-[121px] border border-color-background-neuture-700 w-full min-w-[165px] px-5 py-4 flex flex-col justify-between rounded-xl bg-color-background-neuture-800"
      >
        <div class="flex select-none flex-row flex-wrap justify-between items-center">
          <p class="text-color-text-neuture-300">{{ LIST_CART_FORM[item?.key]?.title }}</p>
          <img :src="LIST_CART_FORM[item?.key]?.icon" />
        </div>
        <Tooltip :title="Number(item?.value)">
          <div class="flex flex-row gap-2">
            <p
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
  export default {
    name: 'TodayStatistics',
    components: {
      Tooltip,
    },
    props: {
      dataCartProp: {
        type: Object,
        default: () => {},
      },
    },
    setup(prop) {
      const { t } = useI18n();
      const dataListCart = ref([]);
      const LIST_CART_FORM = {
        total_deposit: {
          title: t('routes.dashboard.today.total_deposit'),
          icon: IconCartTotalDeposit,
          color: false,
          unit: '$',
        },
        total_withdraw: {
          title: t('routes.dashboard.today.total_withdraw'),
          icon: IconCartTotalWithdraw,
          color: false,
          unit: '$',
        },
        profit: {
          title: 'Profit',
          icon: IconCartTotalCashback,
          color: true,
          unit: '$',
        },
        balance: {
          title: 'Balance',
          icon: IconCartTotalAffPayment,
          color: false,
          unit: '$',
        },
      };
      const listDataRender = computed(() => {
        return [
          {
            key: 'profit',
            value: prop.dataCartProp?.statistic?.[0]?.profit,
          },
          {
            key: 'balance',
            value: prop.dataCartProp?.info?.balance,
          },
          {
            key: 'total_deposit',
            value: prop.dataCartProp?.statistic?.[0]?.deposit,
          },
          {
            key: 'total_withdraw',
            value: prop.dataCartProp?.statistic?.[0]?.withdraw,
          },
        ];
      });
      return {
        t,
        LIST_CART_FORM,
        toFixedNumber,
        listDataRender,
        dataListCart,
      };
    },
  };
</script>
