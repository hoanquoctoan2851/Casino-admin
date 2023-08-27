<template>
  <div
    class="w-full flex flex-row gap-6 screen-hide-sidebar:flex-wrap justify-between min-h-[361px] rounded-2xl p-5 bg-color-background-neuture-800"
  >
    <div class="w-full w-[32%] min-w-[300px] screen-hide-sidebar:w-full">
      <ul class="flex w-full flex-col gap-6">
        <li
          class="w-full"
          v-for="item in dataDailyReport"
          :key="item"
          @click="handleChangeMenuItem(item.key)"
        >
          <div
            :class="[
              'h-[55px] text-sm p-4 flex cursor-pointer flex-row justify-between items-center w-full rounded-lg',
              item.key === keyActive ? 'bg-primary !text-white font-normal' : '',
            ]"
          >
            <p>{{ LIST_MENU_ITEMS_CHART[item.key]?.title }}</p>
            <div
              :class="[
                'flex flex-row gap-2 items-center',
                item.key === keyActive ? 'text-2xl font-semibold' : '',
              ]"
            >
              <p>{{ Intl.NumberFormat('en-US').format(toFixedNumber(item.value)) }}</p>
              <img
                v-if="LIST_MENU_ITEMS_CHART[item.key]?.icon"
                :src="item.key === keyActive ? UserFillActive : UserFill"
              />
              <p v-if="LIST_MENU_ITEMS_CHART[item.key]?.unit">{{
                LIST_MENU_ITEMS_CHART[item.key]?.unit
              }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="h-full w-full">
      <LineChart :dataChart="dataChart" />
    </div>
  </div>
</template>
<script>
  import { ref, watch } from 'vue';
  import UserFill from '/@/assets/svg/user-fill.svg';
  import UserFillActive from '/@/assets/svg/user-fill-active.svg';
  import { toFixedNumber } from '/@/utils/helper/application.ts';
  import LineChart from '/@/components/Chart/LineChart.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDashboardState } from '../useDashboard.ts';

  export default {
    name: 'ChartStatistics',
    components: { LineChart },
    props: {
      dataDailyReport: {
        type: Array,
        default: () => [],
      },
      dataGraph: {
        type: Object,
        default: () => {},
      },
    },
    setup(prop) {
      const { t } = useI18n();
      const { LIST_MENU_ITEMS_CHART } = useDashboardState();
      const dataChart = ref({});
      const keyActive = ref('active_player');

      const handleChangeMenuItem = (key) => {
        keyActive.value = key;
        const params = {
          data: prop.dataGraph[keyActive.value],
          time: prop.dataGraph.time,
          unit: renderUnit(keyActive.value),
        };
        dataChart.value = params;
      };
      const renderUnit = (keyActive) => {
        if (keyActive === 'active_player' || keyActive === 'new_player') {
          return 'People';
        }
        return 'USD';
      };
      watch(
        () => prop.dataGraph,
        () => {
          const params = {
            data: prop.dataGraph[keyActive.value],
            time: prop.dataGraph.time,
            unit: renderUnit(keyActive.value),
          };
          dataChart.value = params;
        },
      );
      return {
        t,
        LIST_MENU_ITEMS_CHART,
        toFixedNumber,
        dataChart,
        UserFillActive,
        UserFill,
        keyActive,
        handleChangeMenuItem,
      };
    },
  };
</script>
