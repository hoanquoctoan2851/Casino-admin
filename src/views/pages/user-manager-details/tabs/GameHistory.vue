<template>
  <div
    class="w-full flex flex-row screen-hide-sidebar:flex-wrap justify-between min-h-[361px] rounded-2xl p-5 bg-color-background-neuture-800"
  >
    <Table
      class="w-full"
      :columns="columnsGameHistory"
      :data-source="dataTable"
      :pagination="false"
      :loading="loading"
      :scroll="{ x: 600 }"
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'profit'">
          <div
            @click="handleOrderBy"
            class="flex cursor-pointer flex-row gap-2 text-primary items-center"
          >
            <span>
              {{ column.title }}
            </span>
            <arrow-down-outlined :style="`${order === 'DESC' ? '' : 'rotate: 180deg'}`" />
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
        <template v-else-if="column.key === 'turnover'">
          <span>{{ record.turnover }}</span>
        </template>
        <template v-else-if="column.key === 'ggr'">
          <span
            :class="[
              record.ggr
                ? record.ggr < 0
                  ? 'text-color-background-red-1'
                  : 'text-color-background-green-1'
                : '',
            ]"
            >{{ record.ggr }}
          </span>
        </template>
        <template v-else-if="column.key === 'winRate'">
          <span>{{ record.winRate }}(%) </span>
        </template>
      </template>
      <template #title>
        <div class="flex flex-col gap-5 mb-3">
          <div class="w-full flex items-center">
            <div class="max-w-[500px] mobile:max-w-[100%]">
              <AppRangeDate @emit:rangeDate="changeRangeDate" />
            </div>
          </div>
          <div class="flex flex-row gap-5 mobile:flex-wrap">
            <div
              v-for="item in dataCartListGameHistory"
              :key="item.key"
              class="h-[97px] w-full min-w-[165px] px-5 py-4 flex flex-col justify-between border border-color-background-neuture-700 rounded-xl"
            >
              <div class="flex select-none flex-row flex-wrap justify-between items-center">
                <p>{{ LIST_CART_FORM[item.key]?.title }}</p>
              </div>
              <div>
                <p class="text-[24px] text-white">
                  {{ Intl.NumberFormat('en-US').format(toFixedNumber(item.value)) }}
                  <span>{{ LIST_CART_FORM[item.key]?.unit }}</span>
                </p>
              </div>
            </div>
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
  import { reactive, ref, toRefs } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ArrowDownOutlined } from '@ant-design/icons-vue';
  import { Table } from 'ant-design-vue';
  import { toFixedNumber } from '/@/utils/helper/application.ts';
  import TickGreen from '/@/assets/svg/user-manager/tick-green.svg';
  import BandedRed from '/@/assets/svg/user-manager/banded-red.svg';
  import PaginationCustom from '/@/components/Application/src/AppPagination.vue';
  import AppRangeDate from '/@/components/Application/src/AppRangeDate.vue';
  import { useUserManagerDetailsState } from '../useUserDetails';
  import { apiGetGameHistory } from '/@/api/pages/user-manager';
  import { useAppStore } from '/@/store/modules/app';

  import { router } from '/@/router';
  export default {
    name: 'GameHistory',
    components: { Table, ArrowDownOutlined, PaginationCustom, AppRangeDate },
    setup() {
      const { t } = useI18n();
      const states = reactive({
        order: 'DESC',
        total: 10,
        loading: false,
        page: 1,
        limit: 10,
        rangeDate: [],
        dataTable: [],
      });
      const { columnsGameHistory, mapDataTableGameHistory } = useUserManagerDetailsState();
      const LIST_CART_FORM = {
        bet_time: {
          title: 'Bet time',
          unit: '',
        },
        total_bet: {
          title: 'Total bet',
          unit: '$',
        },
      };
      const dataCartListGameHistory = ref([]);
      const fetchListGameHistory = async () => {
        try {
          states.loading = true;
          const params = {
            userId: router.currentRoute.value.params.id,
            currentPage: states.page,
            pageSize: states.limit,
            startDate: states.rangeDate?.[0] ? states.rangeDate?.[0] : null,
            endDate: states.rangeDate?.[1] ? states.rangeDate?.[1] : null,
          };
          const res = await apiGetGameHistory(params);
          states.total = res.data.paginateOption.count;
          states.dataTable = await mapDataTableGameHistory(
            res.data?.data?.history,
            states.page,
            states.limit,
          );
          dataCartListGameHistory.value = [
            {
              key: 'bet_time',
              value: res?.data?.data?.statistic?.countBet,
            },
            {
              key: 'total_bet',
              value: res?.data?.data?.statistic?.totalBet,
            },
          ];
        } catch (error) {
          console.log(error);
        } finally {
          states.loading = false;
        }
      };

      const handleOrderBy = () => {
        states.order = states.order === 'DESC' ? 'ASC' : 'DESC';
        fetchListGameHistory();
      };
      const handleChangePage = (data) => {
        states.limit = data.size;
        states.page = data.page;
        fetchListGameHistory();
      };

      const changeRangeDate = (value) => {
        states.rangeDate = value;
        useAppStore().setResetPage();
        fetchListGameHistory();
      };
      // onMounted(() => {
      //   fetchListGameHistory();
      // });

      return {
        ...toRefs(states),
        t,
        toFixedNumber,
        handleChangePage,
        changeRangeDate,
        handleOrderBy,
        columnsGameHistory,
        dataCartListGameHistory,
        TickGreen,
        BandedRed,
        LIST_CART_FORM,
      };
    },
  };
</script>
