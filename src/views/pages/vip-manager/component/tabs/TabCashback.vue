<template>
  <div class="flex flex-col gap-10">
    <div class="bg-color-background-neuture-800 p-5 rounded-2xl">
      <Table
        class="w-full"
        :columns="columnsCashback"
        :data-source="dataTable"
        :pagination="false"
        :loading="loading"
        :scroll="{ x: 1000 }"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'deposit'">
            <div
              @click="handleSortData('totalDeposit')"
              class="flex flex-row gap-2 cursor-pointer select-none items-center"
              :class="sortKey === 'totalDeposit' ? 'text-primary' : ''"
            >
              <span>
                {{ column.title }}
              </span>
              <div v-if="sortKey === 'totalDeposit'">
                <arrow-down-outlined v-if="sortValue === 'desc'" />
                <arrow-up-outlined v-else />
              </div>
            </div>
          </template>
          <template v-if="column.key === 'withDraw'">
            <div
              @click="handleSortData('totalWithdraw')"
              class="flex flex-row gap-2 cursor-pointer select-none items-center"
              :class="sortKey === 'totalWithdraw' ? 'text-primary' : ''"
            >
              <span>
                {{ column.title }}
              </span>
              <div v-if="sortKey === 'totalWithdraw'">
                <arrow-down-outlined v-if="sortValue === 'desc'" />
                <arrow-up-outlined v-else />
              </div>
            </div>
          </template>
          <template v-if="column.key === 'balance'">
            <div
              @click="handleSortData('totalBalance')"
              class="flex flex-row gap-2 cursor-pointer select-none items-center"
              :class="sortKey === 'totalBalance' ? 'text-primary' : ''"
            >
              <span>
                {{ column.title }}
              </span>
              <div v-if="sortKey === 'totalBalance'">
                <arrow-down-outlined v-if="sortValue === 'desc'" />
                <arrow-up-outlined v-else />
              </div>
            </div>
          </template>
          <template v-if="column.key === 'profit'">
            <div
              @click="handleSortData('totalReward')"
              class="flex flex-row gap-2 cursor-pointer select-none items-center"
              :class="sortKey === 'totalReward' ? 'text-primary' : ''"
            >
              <span>
                {{ column.title }}
              </span>
              <div v-if="sortKey === 'totalReward'">
                <arrow-down-outlined v-if="sortValue === 'desc'" />
                <arrow-up-outlined v-else />
              </div>
            </div>
          </template>
          <template v-if="column.key === 'rate'">
            <div
              @click="handleSortData('cashbackRate')"
              class="flex flex-row gap-2 cursor-pointer select-none items-center"
              :class="sortKey === 'cashbackRate' ? 'text-primary' : ''"
            >
              <span>
                {{ column.title }}
              </span>
              <div v-if="sortKey === 'cashbackRate'">
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
          <template v-else-if="column.key === 'username'">
            <div class="cursor-pointer" @click="handleDirectDetail(record.idUer)">
              <span>{{ record.name }}</span>
            </div>
          </template>
          <template v-else-if="column.key === 'vip'">
            <span>{{ record.vip }}</span>
          </template>
          <template v-else-if="column.key === 'balance'">
            <div class="text-white">
              {{ record.balance }}
            </div>
          </template>
          <template v-else-if="column.key === 'profit'">
            <p>{{ record.reward }} </p>
          </template>
          <template v-else-if="column.key === 'withDraw'"
            ><span class="text-white">{{ record.withDraw }} </span>
          </template>
          <template v-else-if="column.key === 'deposit'">
            <span>{{ record.deposit }}</span></template
          >
          <template v-else-if="column.key === 'rate'">
            <span class="text-white">{{ record.rate }} </span>
          </template>
          <template v-else-if="column.key === 'cashback'">
            <span class="text-white">{{ record.cashback }} </span>
          </template>
          <template v-else-if="column.key === 'action'">
            <div class="flex flex-row gap-3" @click="handleGetDetailsUser(record.idUer)">
              <Popconfirm
                placement="leftTop"
                @confirm="handleApprove(record.idUer)"
                :title="t('common.popconfirm_title_base')"
              >
                <CheckCircleOutlined class="text-lg" style="color: #00c566" />
              </Popconfirm>

              <Popconfirm
                placement="leftTop"
                @confirm="handleReject(record.idUer)"
                :title="t('common.popconfirm_title_base')"
              >
                <CloseCircleOutlined class="text-lg" style="color: #ff4747" />
              </Popconfirm>
            </div>
          </template>
        </template>
        <template #footer>
          <div class="mt-8">
            <PaginationCustom :total="total" @changeCurrentPage="handleChangePage" />
          </div>
        </template>
        <!-- <template #title>
          <div class="mt-8">
            <Button class="w-[304px]" type="green-color">Paid all</Button>
          </div>
        </template> -->
      </Table>
    </div>
  </div>
</template>
<script>
  import { reactive, onMounted, watch, toRefs } from 'vue';
  import { Table, Popconfirm, message } from 'ant-design-vue';
  import { toFixedNumber } from '/@/utils/helper/application.ts';
  import {
    ArrowDownOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    ArrowUpOutlined,
  } from '@ant-design/icons-vue';
  import PaginationCustom from '/@/components/Application/src/AppPagination.vue';
  import { useVipManagerState, mapDataCashback } from '../../useVipManager';
  import { getListCashbackReport, rejectCashback, approveCashback } from '/@/api/pages/vip-manager';
  import { useAppStore } from '/@/store/modules/app';
  import { apiGetDetailsUser } from '/@/api/pages/user-manager';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default {
    components: {
      Table,
      PaginationCustom,
      Popconfirm,
      ArrowUpOutlined,
      CloseCircleOutlined,
      ArrowDownOutlined,
      CheckCircleOutlined,
    },
    setup() {
      const { t } = useI18n();
      const { columnsCashback } = useVipManagerState();
      const appStore = useAppStore();
      const states = reactive({
        typeTransaction: '',
        status: '',
        total: 0,
        loadingModal: false,
        loading: false,
        dataTable: [],
        currentPage: 1,
        pageSize: 10,
        userDetails: {},
        sortValue: 'desc',
        sortKey: 'totalDeposit',
      });

      const fetchListCashbackReport = async () => {
        try {
          states.loading = true;
          const params = {
            currentPage: states.currentPage,
            pageSize: states.pageSize,
            sortKey: states.sortKey,
            sortDirection: states.sortValue,
          };
          const res = await getListCashbackReport(params);
          states.total = res.data.paginateOption.count;
          states.dataTable = await mapDataCashback(
            res.data.data,
            states.currentPage,
            states.pageSize,
          );
        } catch (error) {
          console.log(error);
        } finally {
          states.loading = false;
        }
      };
      const handleChangePage = (data) => {
        states.pageSize = data.size;
        states.currentPage = data.page;
        fetchListCashbackReport();
      };

      const handleGetDetailsUser = async (id) => {
        try {
          states.loadingModal = true;
          const res = await apiGetDetailsUser(id);
          states.userDetails = res.data?.info;
        } catch (error) {
          console.log(error);
        } finally {
          states.loadingModal = false;
        }
      };

      const handleDirectDetail = (id) => {
        window.open(`#/vip-manager/cashback-details/${id}`, '_blank');
      };

      const handleApprove = async (id) => {
        try {
          const res = await approveCashback(id);
          if (res.data) {
            message.success('Approve success');
            fetchListCashbackReport();
          }
        } catch (error) {
          console.log(error);
        }
      };
      const handleReject = async (id) => {
        try {
          const res = await rejectCashback(id);
          if (res.data) {
            message.success('Reject success');
            fetchListCashbackReport();
          }
        } catch (error) {
          console.log(error);
        }
      };

      const handleSortData = (key) => {
        states.sortValue = states.sortValue === 'desc' ? 'asc' : 'desc';
        states.sortKey = key;
        fetchListCashbackReport();
      };

      // hook
      onMounted(() => {
        fetchListCashbackReport();
      });

      watch(
        () => appStore.reCallApi,
        () => {
          fetchListCashbackReport();
        },
      );

      return {
        t,
        ...toRefs(states),
        columnsCashback,
        handleSortData,
        handleApprove,
        handleReject,
        toFixedNumber,
        handleChangePage,
        handleDirectDetail,
        handleGetDetailsUser,
      };
    },
  };
</script>
