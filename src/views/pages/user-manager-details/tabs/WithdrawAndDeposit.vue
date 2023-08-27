<template>
  <div class="flex flex-col gap-5">
    <div
      class="w-full flex flex-row screen-hide-sidebar:flex-wrap justify-between min-h-[361px] bg-color-background-neuture-800 rounded-2xl p-5 mobile:p-3"
    >
      <Table
        class="w-full"
        :columns="columnsTransactionHistory"
        :data-source="dataTableTransactionHistory"
        :pagination="false"
        :scroll="{ x: 1000 }"
        :loading="loading"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'amount'">
            <div
              @click="handleSortData('amount')"
              class="flex flex-row gap-2 cursor-pointer select-none items-center"
              :class="sortKey === 'amount' ? 'text-primary' : ''"
            >
              <span>
                {{ column.title }}
              </span>
              <div v-if="sortKey === 'amount'">
                <arrow-down-outlined v-if="sortValue === 'desc'" />
                <arrow-up-outlined v-else />
              </div>
            </div>
          </template>
          <template v-if="column.key === 'rate'">
            <div
              @click="handleSortData('rate')"
              class="flex flex-row gap-2 cursor-pointer select-none items-center"
              :class="sortKey === 'rate' ? 'text-primary' : ''"
            >
              <span>
                {{ column.title }}
              </span>
              <div v-if="sortKey === 'rate'">
                <arrow-down-outlined v-if="sortValue === 'desc'" />
                <arrow-up-outlined v-else />
              </div>
            </div>
          </template>
          <template v-if="column.key === 'date'">
            <div
              @click="handleSortData('createdAt')"
              class="flex flex-row gap-2 cursor-pointer select-none items-center"
              :class="sortKey === 'createdAt' ? 'text-primary' : ''"
            >
              <span>
                {{ column.title }}
              </span>
              <div v-if="sortKey === 'createdAt'">
                <arrow-down-outlined v-if="sortValue === 'desc'" />
                <arrow-up-outlined v-else />
              </div>
            </div>
          </template>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'stt'">
            <span>{{ record.index }}</span>
          </template>
          <template v-else-if="column.key === 'type'">
            <span class="text-[16px] font-normal text-white">{{
              LIST_TYPE_TRANSACTION_OBJECT[record.type.toLowerCase()]?.label
            }}</span>
          </template>
          <template v-else-if="column.key === 'token'">
            <div class="flex flex-row gap-1 items-center">
              <img class="h-6 w-6" :src="masterData.getListTokenObject[record.symbol]?.icon" />
              <span class="uppercase">{{ record.symbol }}</span>
            </div>
          </template>
          <template v-else-if="column.key === 'rate'">
            <span>{{ record.rate }} </span>
          </template>
          <template v-else-if="column.key === 'amount'">
            <span class="text-white">{{ record.amount }} </span>
          </template>
          <template v-else-if="column.key === 'network'">
            <span class="text-white">{{ LIST_CHAIN[record.chain]?.name || '-' }} </span>
          </template>
          <template v-else-if="column.key === 'hash'">
            <div v-if="record.hash" class="w-[100px] gap-1 flex flex-row">
              <p class="w-[80px] truncate text-ellipsis" :id="record.hash">{{ record.hash }} </p>
              <CopyText :idCopy="record.hash" />
            </div>
            <span v-else>-</span>
          </template>
          <template v-else-if="column.key === 'status'">
            <span :style="`color: ${LIST_TYPE_STATUS_OBJECT[record.status]?.color}`"
              >{{ LIST_TYPE_STATUS_OBJECT[record.status]?.label }}
            </span>
          </template>
          <template v-else-if="column.key === 'note'">
            <span class="text-sm">{{ record.note || '-' }} </span>
          </template>
          <template v-else-if="column.key === 'date'">
            <span class="text-sm">{{ record.date }} </span>
          </template>
        </template>
        <template #title>
          <div class="flex flex-col gap-5">
            <div>
              <p class="font-semibold text-2xl">Transaction history</p>
            </div>
            <div class="grid grid-cols-3 mobile:grid-cols-1 mb-5 items-end flex-wrap gap-5">
              <div class="w-full">
                <AppRangeDate @emit:rangeDate="changeRangeDate" />
              </div>
              <div class="flex flex-col gap-1 w-full">
                <p>Type</p>
                <Select
                  class="w-full"
                  :options="LIST_TYPE_TRANSACTION_ARRAY"
                  v-model:value="typeTransaction"
                />
              </div>
              <div class="w-full flex flex-col gap-1">
                <p>Token</p>
                <Select class="w-full" v-model:value="tokenTransaction">
                  <SelectOption :value="''">All</SelectOption>
                  <SelectOption
                    v-for="item in masterData.getListTokenArray"
                    :key="item.id"
                    :value="item.symbol"
                    ><div class="flex flex-row items-center gap-2">
                      <img class="w-6 h-6" :src="item.icon" />
                      <p>{{ item.label }}</p>
                    </div></SelectOption
                  >
                </Select>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="mt-8">
            <PaginationCustom @changeCurrentPage="handleChangeSize" :total="total" />
          </div>
        </template>
      </Table>
    </div>
    <div
      class="w-full flex flex-row screen-hide-sidebar:flex-wrap justify-between min-h-[361px] bg-color-background-neuture-800 rounded-2xl p-5"
    >
      <Table
        class="w-full"
        :columns="columnsTransactionStatistics"
        :data-source="dataTableTransactionStatistics"
        :pagination="false"
        :scroll="{ x: 1000 }"
        :loading="loading"
      >
        <!-- <template #headerCell="{ column }">
          <template v-if="column.key === 'deposit'">
            <div class="flex flex-row gap-2 text-primary items-center">
              <span>
                {{ column.title }}
              </span>
              <arrow-down-outlined />
            </div>
          </template>
        </template> -->
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'token'">
            <div class="flex flex-row gap-1 items-center">
              <img class="h-6 w-6" :src="masterData.getListTokenObject[record.symbol].icon" />
              <span class="uppercase">{{ record.symbol }}</span>
            </div>
          </template>
          <template v-else-if="column.key === 'deposit'">
            <span>
              {{ Intl.NumberFormat('en-US').format(toFixedNumber(record.deposit)) }}
            </span>
          </template>
          <template v-else-if="column.key === 'withdraw'">
            {{ Intl.NumberFormat('en-US').format(toFixedNumber(record.withdraw)) }}
          </template>
          <template v-else-if="column.key === 'depositTime'">
            {{ Intl.NumberFormat('en-US').format(toFixedNumber(record.depositTime)) }}
          </template>
          <template v-else-if="column.key === 'withdrawTime'">
            <span class="text-white"
              >{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.withdrawTime)) }}
            </span>
          </template>
        </template>
        <template #title>
          <div class="flex flex-col gap-5">
            <div>
              <p class="font-semibold text-2xl">Transaction statistics</p>
            </div>
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
  import { reactive, toRefs, ref, watch } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons-vue';
  import { Table } from 'ant-design-vue';
  import { toFixedNumber } from '/@/utils/helper/application.ts';
  import TickGreen from '/@/assets/svg/user-manager/tick-green.svg';
  import BandedRed from '/@/assets/svg/user-manager/banded-red.svg';
  import PaginationCustom from '/@/components/Application/src/AppPagination.vue';
  import AppRangeDate from '/@/components/Application/src/AppRangeDate.vue';
  import CopyText from '/@/components/Application/src/CopyText.vue';
  import SymbolSbg from '/@/assets/image-mock/sbg-symbol.png';
  import { useUserManagerDetailsState } from '../useUserDetails';
  import { apiGetHistoryTransaction } from '/@/api/pages/user-manager';
  import dayjs from 'dayjs';
  import { Select, SelectOption } from 'ant-design-vue';
  import { masterDataStore } from '/@/store/modules/masterData';
  import { router } from '/@/router';
  import { useAppStore } from '/@/store/modules/app';
  import { formatMoney } from '/@/utils';

  import {
    LIST_CHAIN,
    LIST_TYPE_TRANSACTION_ARRAY,
    LIST_TYPE_STATUS_ARRAY,
    LIST_TYPE_STATUS_OBJECT,
    LIST_TYPE_TRANSACTION_OBJECT,
    LIST_TOKEN_FAKE_ARRAY,
  } from '/@/utils/constant';

  export default {
    name: 'WithdrawAndDeposit',
    components: {
      Table,
      ArrowDownOutlined,
      ArrowUpOutlined,
      CopyText,
      SelectOption,
      Select,
      PaginationCustom,
      AppRangeDate,
    },
    props: {
      data: {
        type: Object,
        default: () => {},
      },
    },
    // comment
    setup() {
      const { t } = useI18n();
      const masterData = masterDataStore();
      const loading = ref(false);
      const { columnsTransactionHistory, columnsTransactionStatistics } =
        useUserManagerDetailsState();
      const states = reactive({
        currentPage: 1,
        pageSize: 10,
        typeTransaction: '',
        tokenTransaction: '',
        rangeDate: [],
        sortKey: 'createdAt',
        sortValue: 'desc',
      });
      const total = ref(0);
      const dataTableTransactionStatistics = ref([]);
      const dataTableTransactionHistory = ref([]);

      const fetchHistoryTransaction = async () => {
        loading.value = true;
        const params = {
          userId: router.currentRoute.value.params.id,
          currentPage: states.currentPage,
          pageSize: states.pageSize,
          filterKey: 'type,symbol',
          filterValue: [states.typeTransaction?.toUpperCase(), states.tokenTransaction].join(','),
          endDate: states.rangeDate[1] ? states.rangeDate[1] : null,
          startDate: states.rangeDate[0] ? states.rangeDate[0] : null,
          sortKey: states.sortKey,
          sortDirection: states.sortValue,
        };
        try {
          const resTransaction = await apiGetHistoryTransaction(params);
          total.value = resTransaction.data.paginateOption?.count;
          dataTableTransactionHistory.value = await resTransaction.data?.data?.data?.map(
            (item, index) => {
              return {
                index: (states.currentPage - 1) * states.pageSize + index + 1,
                key: item.id,
                symbol: item.symbol,
                icon: SymbolSbg,
                type: item.type,
                rate: formatMoney(item.rate, 5),
                amount: formatMoney(item.amount, 5),
                chain: item.chainId,
                hash: item.hash,
                note: item.note,
                status: item.status?.toLowerCase(),
                date: dayjs(item.createdAt).format('MMMM D, YYYY, hh:ss'),
              };
            },
          );

          dataTableTransactionStatistics.value = await resTransaction.data?.data?.statistic?.map(
            (item) => {
              return {
                key: item.id,
                symbol: item.symbol,
                icon: item.icon,
                deposit: item.deposit,
                depositTime: item.countDeposit,
                withdraw: item.withdraw,
                withdrawTime: item.countWithdraw,
              };
            },
          );
        } catch (error) {
          console.log(error);
        } finally {
          loading.value = false;
        }
      };

      const changeRangeDate = (value) => {
        states.rangeDate = value;
      };
      const handleChangeSize = (value) => {
        states.currentPage = value.page;
        states.pageSize = value.size;
        fetchHistoryTransaction();
      };
      const handleSortData = (key) => {
        states.sortValue = states.sortValue === 'desc' ? 'asc' : 'desc';
        states.sortKey = key;
        fetchHistoryTransaction();
      };
      watch(
        () => [states.tokenTransaction, states.typeTransaction, states.rangeDate],
        () => {
          useAppStore().setResetPage();
          fetchHistoryTransaction();
        },
      );
      // onMounted(() => {
      //   fetchHistoryTransaction();
      // });
      return {
        t,
        loading,
        ...toRefs(states),
        columnsTransactionHistory,
        columnsTransactionStatistics,
        dataTableTransactionHistory,
        dataTableTransactionStatistics,
        masterData,
        toFixedNumber,
        handleChangeSize,
        total,
        TickGreen,
        LIST_CHAIN,
        BandedRed,
        LIST_TYPE_TRANSACTION_ARRAY,
        LIST_TYPE_TRANSACTION_OBJECT,
        LIST_TYPE_STATUS_ARRAY,
        LIST_TOKEN_FAKE_ARRAY,
        LIST_TYPE_STATUS_OBJECT,
        SymbolSbg,
        changeRangeDate,
        handleSortData,
      };
    },
  };
</script>
