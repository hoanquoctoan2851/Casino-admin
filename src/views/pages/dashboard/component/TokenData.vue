<template>
  <div
    class="w-full flex flex-row screen-hide-sidebar:flex-wrap justify-between min-h-[361px] rounded-2xl p-5 bg-color-background-neuture-800"
  >
    <Table class="w-full" :columns="columns" :data-source="dataTable" :pagination="false">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'deposit'">
          <div
            @click="handleSortData('deposit')"
            class="flex flex-row gap-2 cursor-pointer select-none items-center"
            :class="sortKey === 'deposit' ? 'text-primary' : ''"
          >
            <span>
              {{ column.title }}
            </span>
            <div v-if="sortKey === 'deposit'">
              <arrow-down-outlined v-if="sortValue === 'desc'" />
              <arrow-up-outlined v-else />
            </div>
          </div>
        </template>
        <template v-if="column.key === 'withdraw'">
          <div
            @click="handleSortData('withdraw')"
            class="flex flex-row gap-2 cursor-pointer select-none items-center"
            :class="sortKey === 'withdraw' ? 'text-primary' : ''"
          >
            <span>
              {{ column.title }}
            </span>
            <div v-if="sortKey === 'withdraw'">
              <arrow-down-outlined v-if="sortValue === 'desc'" />
              <arrow-up-outlined v-else />
            </div>
          </div>
        </template>
        <template v-if="column.key === 'balance'">
          <div
            @click="handleSortData('balance')"
            class="flex flex-row gap-2 cursor-pointer select-none items-center"
            :class="sortKey === 'balance' ? 'text-primary' : ''"
          >
            <span>
              {{ column.title }}
            </span>
            <div v-if="sortKey === 'balance'">
              <arrow-down-outlined v-if="sortValue === 'desc'" />
              <arrow-up-outlined v-else />
            </div>
          </div>
        </template>
        <template v-if="column.key === 'profit'">
          <div
            @click="handleSortData('turnover')"
            class="flex flex-row gap-2 cursor-pointer select-none items-center"
            :class="sortKey === 'turnover' ? 'text-primary' : ''"
          >
            <span>
              {{ column.title }}
            </span>
            <div v-if="sortKey === 'turnover'">
              <arrow-down-outlined v-if="sortValue === 'desc'" />
              <arrow-up-outlined v-else />
            </div>
          </div>
        </template>
        <template v-if="column.key === 'ggr'">
          <div
            @click="handleSortData('ggr')"
            class="flex flex-row gap-2 cursor-pointer select-none items-center"
            :class="sortKey === 'ggr' ? 'text-primary' : ''"
          >
            <span>
              {{ column.title }}
            </span>
            <div v-if="sortKey === 'ggr'">
              <arrow-down-outlined v-if="sortValue === 'desc'" />
              <arrow-up-outlined v-else />
            </div>
          </div>
        </template>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'token'">
          <div class="flex flex-row items-center gap-2">
            <img class="w-6 h-6" :src="masterData.getListTokenObject[record.symbol].icon" />
            <span>{{ record.symbol }}</span>
          </div>
        </template>
        <template v-else-if="column.key === 'deposit'">
          <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.deposit)) }}</span>
        </template>
        <template v-else-if="column.key === 'withdraw'">
          <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.withdraw)) }} </span>
        </template>
        <template v-else-if="column.key === 'balance'">
          <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.balance)) }} </span>
        </template>
        <template v-else-if="column.key === 'profit'">
          <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.profit)) }} </span>
        </template>
        <template v-else-if="column.key === 'ggr'">
          <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.ggr)) }} </span>
        </template>
      </template>
      <template #title
        ><span class="font-normal text-xl text-white">
          {{ t('routes.dashboard.today.title_table_token_data') }}</span
        ></template
      >
    </Table>
  </div>
</template>
<script>
  import { reactive, toRefs } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons-vue';
  import { Table } from 'ant-design-vue';
  import { toFixedNumber } from '/@/utils/helper/application.ts';
  import { masterDataStore } from '/@/store/modules/masterData';

  export default {
    name: 'TokenDataDashboard',
    components: { Table, ArrowDownOutlined, ArrowUpOutlined },
    props: {
      dataTable: {
        type: Array,
        default: () => [],
      },
    },
    emits: ['sortData'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const masterData = masterDataStore();
      const states = reactive({
        sortKey: 'deposit',
        sortValue: 'desc',
      });
      const columns = [
        {
          title: 'Token',
          dataIndex: 'token',
          key: 'token',
        },
        {
          title: 'Deposit',
          dataIndex: 'deposit',
          key: 'deposit',
        },
        {
          title: 'Withdraw',
          dataIndex: 'withdraw',
          key: 'withdraw',
        },
        {
          title: 'Balance',
          key: 'balance',
          dataIndex: 'balance',
        },
        {
          title: 'Turnover',
          key: 'profit',
          dataIndex: 'profit',
        },
        {
          title: 'GGR',
          key: 'ggr',
          dataIndex: 'ggr',
        },
      ];

      const handleSortData = (key) => {
        states.sortValue = states.sortValue === 'desc' ? 'asc' : 'desc';
        states.sortKey = key;
        emit('sortData', states);
      };
      return {
        ...toRefs(states),
        t,
        columns,
        toFixedNumber,
        handleSortData,
        masterData,
      };
    },
  };
</script>
