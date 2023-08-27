<template>
  <div
    class="w-full flex flex-row screen-hide-sidebar:flex-wrap justify-between min-h-[361px] rounded-2xl p-5 bg-color-background-neuture-800"
  >
    <Table class="w-full" :columns="columns" :data-source="dataTable" :pagination="false">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'player'">
          <span>
            {{ column.title }}
          </span>
        </template>
        <template v-else-if="column.key === 'winrate'">
          <div
            @click="handleSortData('winRate')"
            class="flex flex-row gap-2 cursor-pointer select-none items-center"
            :class="sortKey === 'winRate' ? 'text-primary' : ''"
          >
            <span>
              {{ column.title }}
            </span>
            <div v-if="sortKey === 'winRate'">
              <arrow-down-outlined v-if="sortValue === 'desc'" />
              <arrow-up-outlined v-else />
            </div>
          </div>
        </template>
        <template v-else-if="column.key === 'turnover'">
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
        <template v-else-if="column.key === 'ggr'">
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
        <template v-if="column.key === 'player'">
          <span>{{ record.name }}</span>
        </template>
        <template v-else-if="column.key === 'winrate'">
          <span>{{ record.winrate }}</span>
        </template>
        <template v-else-if="column.key === 'turnover'">
          <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.turnover)) }} </span>
        </template>
        <template v-else-if="column.key === 'ggr'">
          <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.ggr)) }} </span>
        </template>
      </template>
      <template #title
        ><span class="font-normal text-xl text-white">
          {{ t('routes.dashboard.today.title_table_player_data') }}</span
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
  export default {
    name: 'PlayerData',
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
      const states = reactive({
        sortKey: 'winRate',
        sortValue: 'desc',
      });
      const columns = [
        {
          title: 'Player',
          dataIndex: 'player',
          key: 'player',
        },
        {
          title: 'Win rate(%)',
          dataIndex: 'winrate',
          key: 'winrate',
        },
        {
          title: 'Turn over($)',
          dataIndex: 'turnover',
          key: 'turnover',
        },
        {
          title: 'GGR($)',
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
      };
    },
  };
</script>
