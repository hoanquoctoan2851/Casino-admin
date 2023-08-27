<template>
  <div class="flex flex-col gap-10">
    <div class="bg-color-background-neuture-800 p-5 rounded-2xl">
      <Table
        class="w-full"
        :columns="columnsReward"
        :data-source="dataTable"
        :pagination="false"
        :loading="loading"
        :scroll="{ x: 1000 }"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'deposit '">
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
          <template v-else-if="column.key === 'username'">
            <div class="cursor-pointer">
              <span>{{ record.name }}</span>
            </div>
          </template>
          <template v-else-if="column.key === 'rank'">
            <span>{{ record.rank }}</span>
          </template>
          <template v-else-if="column.key === 'totalBet'">
            <div class="text-white">
              {{ record.totalBet }}
            </div>
          </template>
          <template v-else-if="column.key === 'reward'">
            <p>{{ record.reward }} </p>
          </template>
          <template v-else-if="column.key === 'time'">
            <span>{{ record.time }} </span>
          </template>
        </template>
        <template #footer>
          <div class="mt-8">
            <PaginationCustom :total="total" @changeCurrentPage="handleChangePage" />
          </div>
        </template>
        <template #title>
          <div class="grid grid-cols-2 mobile:grid-cols-1 gap-4">
            <div class="w-full flex items-end h-full max-w-[400px]">
              <AppRangeDate @emit:rangeDate="getRangeDate" />
            </div>
            <div class="flex flex-row w-full gap-4 mobile:flex-wrap mb-4">
              <div
                v-for="item in listDataRender"
                :key="item?.key"
                class="h-[97px] border border-color-background-neuture-700 w-full min-w-[165px] px-5 py-4 flex flex-col justify-between rounded-xl bg-color-background-neuture-800"
              >
                <div class="flex select-none flex-row flex-wrap justify-between items-center">
                  <p class="text-color-text-neuture-300">{{ LIST_CART_FORM[item?.key]?.title }}</p>
                  <!-- <img :src="LIST_CART_FORM[item?.key]?.icon" /> -->
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
      </Table>
    </div>
  </div>
</template>
<script>
  import { reactive, onMounted, toRefs } from 'vue';
  import { Table } from 'ant-design-vue';
  import { toFixedNumber } from '/@/utils/helper/application.ts';
  import AppRangeDate from '/@/components/Application/src/AppRangeDate.vue';
  import dayjs from 'dayjs';
  import { useVipManagerState, mapDataReward } from '../../useVipManager';
  import PaginationCustom from '/@/components/Application/src/AppPagination.vue';
  import { getListRewardHistory } from '/@/api/pages/vip-manager';
  import { useAppStore } from '/@/store/modules/app';

  export default {
    components: {
      Table,
      AppRangeDate,
      PaginationCustom,
    },
    setup() {
      const { columnsReward } = useVipManagerState();
      const states = reactive({
        rangeDate: [],
        total: 0,
        pageSize: 10,
        currentPage: 1,
        loading: false,
        dataTable: [],
        listDataRender: [
          {
            key: 'not_claim',
            value: null,
          },
          {
            key: 'claim',
            value: null,
          },
        ],
      });
      const LIST_CART_FORM = {
        not_claim: {
          title: 'Not claim',
          color: false,
          unit: '$',
        },
        claim: {
          title: 'Claim',
          color: false,
          unit: '$',
        },
      };

      const fetchRewardHistory = async () => {
        try {
          states.loading = true;
          const params = {
            currentPage: states.currentPage,
            pageSize: states.pageSize,
            startDate: states.rangeDate?.[0] ? states.rangeDate?.[0] : null,
            endDate: states.rangeDate?.[1] ? states.rangeDate?.[1] : null,
          };
          const res = await getListRewardHistory(params);
          states.total = res.data.paginateOption.count;
          states.listDataRender = [
            {
              key: 'not_claim',
              value: res.data?.statistic?.totalPending,
            },
            {
              key: 'claim',
              value: res.data?.statistic?.totalClaimed,
            },
          ];
          states.dataTable = await mapDataReward(
            res.data.data || [],
            states.currentPage,
            states.pageSize,
          );
        } catch (error) {
          console.log(error);
        } finally {
          states.loading = false;
        }
      };

      const getRangeDate = (value) => {
        states.rangeDate = value;
        useAppStore().setResetPage();
        fetchRewardHistory();
      };

      const handleChangePage = (data) => {
        states.pageSize = data.size;
        states.currentPage = data.page;
        fetchRewardHistory();
      };

      onMounted(() => {
        fetchRewardHistory();
      });

      return {
        ...toRefs(states),
        getRangeDate,
        dayjs,
        LIST_CART_FORM,
        handleChangePage,
        columnsReward,
        toFixedNumber,
      };
    },
  };
</script>
