<template>
  <div
    class="w-full flex flex-row screen-hide-sidebar:flex-wrap justify-between min-h-[361px] rounded-2xl p-5 bg-color-background-neuture-800"
  >
    <Table
      class="w-full"
      :columns="columnsPlayHistory"
      :data-source="dataTable"
      :pagination="false"
      :scroll="{ x: 600 }"
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'turnOver'">
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
        <template v-else-if="column.key === 'game'">
          <span class="cursor-pointer">{{ record.name }}</span>
        </template>
        <template v-else-if="column.key === 'round'">
          <span>{{ record.round }}</span>
        </template>
        <template v-else-if="column.key === 'betAmount'">
          <span>{{ record.betAmount }} </span>
        </template>
        <template v-else-if="column.key === 'profit'">
          <span
            :class="
              record.profit[0] != '-'
                ? 'text-color-background-green-1'
                : 'text-color-background-red-1'
            "
            >{{ record.profit }}</span
          >
        </template>
        <template v-else-if="column.key === 'token'">
          <span>{{ record.token }}</span>
        </template>
        <template v-else-if="column.key === 'rate'">
          <span>{{ record.rate }}</span>
        </template>
        <template v-else-if="column.key === 'date'">
          <span>{{ record.date }}</span>
        </template>
      </template>
      <template #title>
        <div class="w-full flex gap-5 items-center mb-3">
          <div class="w-full">
            <AppRangeDate @emit:rangeDate="changeRangeDate" />
          </div>
          <div class="w-full flex flex-col gap-1">
            <p>Game</p>
            <Select class="w-full" v-model:value="game" :showSearch="true">
              <SelectOption
                v-for="item in masterData.getListGameSelect"
                :key="item.value"
                :value="item.label"
                ><div class="flex flex-row items-center gap-2">
                  <p>{{ item.label }}</p>
                </div></SelectOption
              >
            </Select>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="mt-8">
          <PaginationCustom :total="total" @changeCurrentPage="handleChangePage" />
        </div>
      </template>
    </Table>
  </div>
</template>
<script>
  import { reactive, toRefs, watch } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ArrowDownOutlined } from '@ant-design/icons-vue';
  import { Table } from 'ant-design-vue';
  import { toFixedNumber } from '/@/utils/helper/application.ts';
  import TickGreen from '/@/assets/svg/user-manager/tick-green.svg';
  import BandedRed from '/@/assets/svg/user-manager/banded-red.svg';
  import PaginationCustom from '/@/components/Application/src/AppPagination.vue';
  import AppRangeDate from '/@/components/Application/src/AppRangeDate.vue';
  import { useUserManagerDetailsState } from '../useUserDetails';
  import { masterDataStore } from '/@/store/modules/masterData';
  import { Select, SelectOption } from 'ant-design-vue';
  import { apiGetPlayHistory } from '/@/api/pages/user-manager';
  import { useAppStore } from '/@/store/modules/app';

  import { router } from '/@/router';
  export default {
    name: 'PlayHistory',
    components: {
      Table,
      ArrowDownOutlined,
      SelectOption,
      Select,
      PaginationCustom,
      AppRangeDate,
    },
    setup() {
      const { t } = useI18n();
      const appStore = useAppStore();
      const masterData = masterDataStore();
      const states = reactive({
        total: 0,
        page: 1,
        limit: 10,
        game: 'All',
        rangeDate: [],
        dataTable: [],
      });
      const { columnsPlayHistory, mapDataTablePlayHistory } = useUserManagerDetailsState();

      const fetchListPlayHistory = async () => {
        try {
          const params = {
            userId: router.currentRoute.value.params.id,
            currentPage: states.page,
            pageSize: states.limit,
            startDate: states.rangeDate?.[0] ? states.rangeDate?.[0] : null,
            endDate: states.rangeDate?.[1] ? states.rangeDate?.[1] : null,
            filterKey: 'g.name',
            filterValue: states.game === 'All' ? '' : states.game,
          };
          const res = await apiGetPlayHistory(params);
          states.total = res.data.paginateOptions.count;
          states.dataTable = await mapDataTablePlayHistory(
            res?.data?.data,
            states.page,
            states.limit,
          );
        } catch (error) {
          console.log(error);
        }
      };

      // const renderValueCodeGame = computed(() => {
      //   return masterData.getListGameSelect.find((item) => {

      //   });
      // });

      const handleChangePage = (data) => {
        states.limit = data.size;
        states.page = data.page;
        fetchListPlayHistory();
      };

      const changeRangeDate = (value) => {
        states.rangeDate = value;
        appStore.setResetPage();
        fetchListPlayHistory();
      };

      watch(
        () => states.game,
        () => {
          appStore.setResetPage();
          fetchListPlayHistory();
        },
      );

      return {
        ...toRefs(states),
        t,
        toFixedNumber,
        handleChangePage,
        changeRangeDate,
        masterData,
        columnsPlayHistory,
        TickGreen,
        BandedRed,
      };
    },
  };
</script>
