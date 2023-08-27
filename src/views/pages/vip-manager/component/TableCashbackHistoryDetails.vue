<template>
  <div
    class="w-full flex flex-row screen-hide-sidebar:flex-wrap justify-between min-h-[361px] rounded-2xl p-5 mobile:p-3 bg-color-background-neuture-800"
  >
    <Table
      class="w-full"
      :columns="columnsTableCashbackHistoryDetails"
      :data-source="listCashback"
      :pagination="false"
      :scroll="{ x: 1000 }"
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'username'">
          <div class="flex flex-row gap-2 text-primary items-center">
            <span>
              {{ column.title }}
            </span>
            <arrow-down-outlined />
          </div>
        </template>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'stt'">
          <span>{{ listCashback.indexOf(record) + 1 }}</span>
        </template>
        <template v-else-if="column.key === 'name'">
          <span class="min-w-8">{{ record.name }}</span>
        </template>
        <template v-else-if="column.key === 'rate'">
          <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.rate)) }} </span>
        </template>
        <template v-else-if="column.key === 'deposit'">
          <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.deposit)) }} </span>
        </template>
        <template v-else-if="column.key === 'withdraw'">
          <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.withdraw)) }} </span>
        </template>
        <template v-else-if="column.key === 'reward'">
          <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.reward)) }} </span>
        </template>
        <template v-else-if="column.key === 'admin'">
          <span>{{ record.admin }} </span>
        </template>
        <template v-else-if="column.key === 'cashback'">
          <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.cashback)) }} </span>
        </template>
        <template v-else-if="column.key === 'balance'">
          <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.balance)) }} </span>
        </template>
        <template v-else-if="column.key === 'time'">
          <span>{{ dayjs(record.time).format('MMMM D, YYYY', 'hh:ss') }} </span>
        </template>
      </template>
      <template #title>
        <div class="flex w-full flex-row not-desktop:flex-wrap gap-4"> </div>
      </template>
      <template #footer>
        <div class="mt-8">
          <PaginationCustom />
        </div>
      </template>
    </Table>
  </div>
</template>
<script>
  import { Table } from 'ant-design-vue';
  import PaginationCustom from '/@/components/Application/src/AppPagination.vue';
  import { useVipManagerState } from '../useVipManager';
  import { masterDataStore } from '/@/store/modules/masterData';
  import { toFixedNumber } from '/@/utils/helper/application.ts';
  import { LIST_TYPE_STATUS_OBJECT } from '/@/utils/constant';
  import dayjs from 'dayjs';

  export default {
    name: 'TableUserManager',
    components: {
      Table,
      PaginationCustom,
    },
    setup() {
      const masterData = masterDataStore();
      const { columnsTableCashbackHistoryDetails } = useVipManagerState();
      const listCashback = [
        {
          key: '1',
          name: 'Osiha',
          rate: 100,
          balance: 1212.1211,
          deposit: 2332423.3432,
          withdraw: 12312.123,
          reward: 2312.123,
          cashback: 1132.213,
          admin: 'Vinh2611',
          time: 165324234323432,
        },
        {
          key: '2',
          name: 'Osiha',
          rate: 100,
          balance: 1212.1211,
          deposit: 2332423.3432,
          withdraw: 12312.123,
          reward: 2312.123,
          cashback: 1132.213,
          admin: 'Vinh2611',
          time: 165324234323432,
        },
      ];
      return {
        columnsTableCashbackHistoryDetails,
        LIST_TYPE_STATUS_OBJECT,
        toFixedNumber,
        masterData,
        dayjs,
        listCashback,
      };
    },
  };
</script>
