<template>
  <div class="bg-color-background-neuture-800 rounded-2xl p-5">
    <div class="grid grid-cols-2 gap-x-5">
      <div class="flex flex-col gap-[60px]">
        <p class="text-xl text-white font-normal">Summary data</p>
        <div
          class="grid grid-cols-3 rounded-xl border border-color-background-neuture-700 overflow-hidden"
        >
          <div
            v-for="item in data"
            :key="item"
            class="w-full flex flex-col justify-between p-6 min-h-[118px] border border-color-background-neuture-700"
          >
            <p class="text-base text-color-text-neuture-300">{{
              LIST_CART_SUMMARY[item.key]?.label
            }}</p>
            <p
              :class="[
                'text-xl text-white font-normal',
                LIST_CART_SUMMARY[item.key]?.font === 'large' ? '!text-4xl !font-semibold' : '',
              ]"
              >{{ item.value }} {{ LIST_CART_SUMMARY[item.key]?.unit }}</p
            >
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex flex-row p-1 rounded-lg border border-color-background-neuture-600">
          <div
            @click="handleChangeTime(item.value)"
            :class="[
              'rounded-md cursor-pointer h-10 flex items-center justify-center w-full',
              item.value === typeTime ? 'bg-primary !text-white' : '',
            ]"
            v-for="item in LIST_TIME"
            :key="item.value"
          >
            <p
              :class="[
                'text-color-background-neuture-600 text-center text-base',
                item.value === typeTime ? '!text-white' : '',
              ]"
              >{{ item.label }}</p
            >
          </div>
        </div>
        <div>
          <LineChart />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import LineChart from '/@/components/Chart/LineChart.vue';
  import { ref } from 'vue';
  const LIST_TIME = [
    {
      label: 'Today',
      value: 'today',
    },
    {
      label: 'Week',
      value: 'week',
    },
    {
      label: 'Month',
      value: 'month',
    },
    {
      label: 'Year',
      value: 'year',
    },
  ];
  const LIST_CART_SUMMARY = {
    total_f1: {
      label: 'Total F1',
      unit: '',
      font: 'large',
    },
    user_join: {
      label: 'Total user join',
      unit: '',
      font: 'large',
    },
    total_deposit: {
      label: 'Total deposit',
      unit: '$',
    },
    total_withdraw: {
      label: 'Total withdraw',
      unit: '$',
    },
    total_pending: {
      label: 'Total pending',
      unit: '$',
    },
    total_commission: {
      label: 'Total commission',
      unit: '$',
    },
  };
  export default {
    name: 'HeaderStatisticsAffiliate',
    components: {
      LineChart,
    },
    props: {
      data: {
        type: Array,
        default: () => [
          {
            key: 'total_f1',
            value: 32,
          },
          {
            key: 'user_join',
            value: 32,
          },
          {
            key: 'total_deposit',
            value: 1231231.2213,
          },
          {
            key: 'total_withdraw',
            value: 12312.123,
          },
          {
            key: 'total_pending',
            value: 123123.123,
          },
          {
            key: 'total_commission',
            value: 34534.213,
          },
        ],
      },
    },
    setup() {
      const typeTime = ref('today');
      const handleChangeTime = (value) => {
        typeTime.value = value;
      };
      return {
        LIST_TIME,
        typeTime,
        LIST_CART_SUMMARY,
        handleChangeTime,
      };
    },
  };
</script>
