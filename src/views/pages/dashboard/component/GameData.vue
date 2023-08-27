<template>
  <div
    class="w-full flex flex-row screen-hide-sidebar:flex-wrap justify-between min-h-[361px] rounded-2xl p-5 bg-color-background-neuture-800"
  >
    <Table
      class="w-full"
      :columns="columns"
      :data-source="dataTable"
      :pagination="false"
      :loading="loading"
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'player'">
          <span>
            {{ column.title }}
          </span>
        </template>
        <template v-if="column.key === 'value'">
          <div class="dashboard-game-data-select">
            <Select :options="optionsSelect" class="w-full" v-model:value="typeFilter" />
          </div>
        </template>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'game'">
          <span>{{ record.name }}</span>
        </template>
        <template v-else-if="column.key === 'value'">
          <span>{{ record.value[typeFilter] }} </span>
          <span></span>
        </template>
      </template>
      <template #title
        ><span class="font-normal text-xl text-white">
          {{ t('routes.dashboard.today.title_table_game_date') }}</span
        ></template
      >
    </Table>
  </div>
</template>
<script>
  import { ref, watch } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Table } from 'ant-design-vue';
  import { toFixedNumber } from '/@/utils/helper/application.ts';
  import { Select } from 'ant-design-vue';

  export default {
    name: 'GameDataDashboard',
    components: { Table, Select },
    props: {
      dataTable: {
        type: Array,
        default: () => [],
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['fetch:gameData'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const typeFilter = ref('ggr');
      const columns = [
        {
          title: 'Game',
          dataIndex: 'game',
          key: 'game',
        },
        {
          title: 'GGR($)',
          key: 'value',
          dataIndex: 'value',
        },
      ];
      const optionsSelect = [
        {
          label: 'Win rate',
          value: 'winRate',
          key: 'winRate',
        },
        {
          label: 'Turn over',
          value: 'turnOver',
          key: 'turnOver',
        },
        {
          label: 'GGR($)',
          value: 'ggr',
          key: 'ggr',
        },
      ];

      watch(
        () => typeFilter.value,
        () => {
          emit('fetch:gameData', typeFilter.value);
        },
      );

      return {
        t,
        columns,
        typeFilter,
        toFixedNumber,
        optionsSelect,
      };
    },
  };
</script>
