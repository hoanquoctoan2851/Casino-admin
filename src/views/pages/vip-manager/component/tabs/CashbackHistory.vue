<template>
  <div class="flex flex-col gap-10">
    <div class="bg-color-background-neuture-800 p-5 rounded-2xl">
      <Table
        class="w-full"
        :columns="columnsCashbackHistory"
        :data-source="dataTable"
        :pagination="false"
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
            <div class="cursor-pointer" @click="handleDirectDetail(record.idUser)">
              <span>{{ record.name }}</span>
            </div>
          </template>
          <template v-else-if="column.key === 'status'">
            <span :class="record.status == 'Paid' ? 'text-green-500' : 'text-red-500'">{{
              record.status
            }}</span>
          </template>
          <template v-else-if="column.key === 'vip'">
            <span>{{ record.vip }}</span>
          </template>
          <template v-else-if="column.key === 'balance'">
            <div class="text-white">
              {{ record.balance }}
            </div>
          </template>
          <template v-else-if="column.key === 'withDraw'"
            ><span class="text-white">{{ record.withdraw }} </span>
          </template>
          <template v-else-if="column.key === 'deposit'">
            <span>{{ record.deposit }}</span></template
          >
          <template v-else-if="column.key === 'rate'">
            <span class="text-white">{{ record.rate }} </span>
          </template>
          <template v-else-if="column.key === 'reward'">
            <span class="text-white">{{ record.reward }} </span>
          </template>
          <template v-else-if="column.key === 'cashback'">
            <span class="text-white">{{ record.cashback }} </span>
          </template>
          <template v-else-if="column.key === 'admin'">
            <span class="text-white">{{ record.admin }} </span>
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
              <AppRangeDate @emit:rangeDate="changeRangeDate" />
            </div>
            <div class="flex flex-row w-full gap-4 mobile:flex-wrap mb-4">
              <div
                v-for="item in listDataRender"
                :key="item?.key"
                class="h-[97px] border border-color-background-neuture-700 w-full min-w-[165px] px-5 py-4 flex flex-col justify-between rounded-xl bg-color-background-neuture-800"
              >
                <div class="flex select-none flex-row flex-wrap justify-between items-center">
                  <p class="text-color-text-neuture-300">
                    {{ LIST_CART_FORM[item?.key]?.title }}
                  </p>
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
                    >
                      {{
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
  import { reactive, computed, onMounted, toRefs } from 'vue';
  import { Table } from 'ant-design-vue';
  import { toFixedNumber } from '/@/utils/helper/application.ts';
  import AppRangeDate from '/@/components/Application/src/AppRangeDate.vue';
  import dayjs from 'dayjs';
  import { useVipManagerState, mapDataCashbackHistory } from '../../useVipManager';
  import PaginationCustom from '/@/components/Application/src/AppPagination.vue';
  import { getListCashbackHistory } from '/@/api/pages/vip-manager';
  import { useAppStore } from '/@/store/modules/app';

  export default {
    components: {
      Table,
      AppRangeDate,
      PaginationCustom,
    },
    setup() {
      const { columnsCashbackHistory } = useVipManagerState();
      const formState = reactive({
        hash: '',
      });
      const states = reactive({
        typeTransaction: '',
        status: '',
        total: 0,
        currentPage: 1,
        rangeDate: [],
        pageSize: 10,
        dataTable: [],
        listCart: {
          cashback: 0,
          reject: 0,
        },
      });
      const LIST_CART_FORM = {
        total_cashback: {
          title: 'Total cashback',
          color: false,
          unit: '$',
        },
        total_reject: {
          title: 'Total reject',
          color: false,
          unit: '$',
        },
      };
      const listDataRender = computed(() => {
        return [
          {
            key: 'total_cashback',
            value: states.listCart?.cashback,
          },
          {
            key: 'total_reject',
            value: states.listCart?.reject,
          },
        ];
      });
      const fetchListCashbackHistory = async () => {
        try {
          const params = {
            currentPage: states.currentPage,
            pageSize: states.pageSize,
            endDate: states.rangeDate[1] ? states.rangeDate[1] : null,
            startDate: states.rangeDate[0] ? states.rangeDate[0] : null,
          };
          const res = await getListCashbackHistory(params);
          states.total = res.data.paginateOption.count;
          states.listCart.cashback = res.data.statistic?.totalCashbackPaid;
          states.listCart.reject = res.data.statistic?.totalCashbackReject;
          states.dataTable = await mapDataCashbackHistory(
            res.data.data,
            states.currentPage,
            states.pageSize,
          );
        } catch (error) {
          console.log(error);
        }
      };
      const handleDirectDetail = (id) => {
        window.open(`#/vip-manager/cashback-details/${id}`, '_blank');
      };

      const handleChangePage = (data) => {
        states.pageSize = data.size;
        states.currentPage = data.page;
        fetchListCashbackHistory();
      };
      const changeRangeDate = (value) => {
        states.rangeDate = value;
        useAppStore().setResetPage();
        fetchListCashbackHistory();
      };
      onMounted(() => {
        fetchListCashbackHistory();
      });
      return {
        ...toRefs(states),
        formState,
        dayjs,
        LIST_CART_FORM,
        listDataRender,
        columnsCashbackHistory,
        changeRangeDate,
        handleChangePage,
        toFixedNumber,
        handleDirectDetail,
      };
    },
  };
</script>
