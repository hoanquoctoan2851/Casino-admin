<template>
  <div
    class="w-full flex flex-row screen-hide-sidebar:flex-wrap justify-between min-h-[361px] rounded-2xl p-5 mobile:p-3 bg-color-background-neuture-800"
  >
    <Table
      class="w-full"
      :columns="columnsTableCashbackDetails"
      :data-source="dataTable?.data"
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
          <span>{{ record.index }}</span>
        </template>
        <template v-else-if="column.key === 'token'">
          <div class="flex flex-row gap-2 items-center">
            <img class="w-6" :src="masterData.getListTokenObject[record.token].icon" />
            <span class="min-w-8">{{ record.token }}</span>
          </div>
        </template>
        <template v-else-if="column.key === 'rate'">
          <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.rate)) }} </span>
        </template>
        <template v-else-if="column.key === 'deposit'">
          <span>{{ record.deposit }} </span>
        </template>
        <template v-else-if="column.key === 'withdraw'">
          <span>{{ record.withdraw }} </span>
        </template>
        <template v-else-if="column.key === 'reward'">
          <span>{{ record.reward }} </span>
        </template>
        <template v-else-if="column.key === 'provisional'">
          <span>{{ record.provisional }} </span>
        </template>
        <template v-else-if="column.key === 'actual'">
          <span>{{ record.actual }} </span>
        </template>
        <template v-else-if="column.key === 'status'">
          <span :style="`color: ${LIST_TYPE_STATUS_CASHBACK[record.status]?.color}`"
            >{{ LIST_TYPE_STATUS_CASHBACK[record.status]?.label }}
          </span>
        </template>
        <template v-else-if="column.key === 'paidAt'">
          <span>{{ record.paidAt ? dayjs(record.paidAt).format(formatTime) : '-' }} </span>
        </template>
      </template>
      <template #title>
        <div class="flex w-full flex-row not-desktop:flex-wrap gap-4"> </div>
      </template>
      <template #footer>
        <div class="mt-8">
          <PaginationCustom :total="dataTable?.total" @changeCurrentPage="handleChangePage" />
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
  import { LIST_TYPE_STATUS_CASHBACK, FORMAT_TIME } from '/@/utils/constant';
  import dayjs from 'dayjs';

  export default {
    name: 'TableUserManager',
    components: {
      Table,
      PaginationCustom,
    },
    props: {
      dataTable: {
        type: Object,
        default: () => {},
      },
    },
    emits: ['changePagination'],
    setup(_, { emit }) {
      const masterData = masterDataStore();
      const { columnsTableCashbackDetails } = useVipManagerState();

      const handleChangePage = (data) => {
        emit('changePagination', data);
      };

      return {
        columnsTableCashbackDetails,
        LIST_TYPE_STATUS_CASHBACK,
        toFixedNumber,
        masterData,
        dayjs,
        handleChangePage,
      };
    },
    data: function () {
      return {
        formatTime: FORMAT_TIME.FULL,
      };
    },
  };
</script>
