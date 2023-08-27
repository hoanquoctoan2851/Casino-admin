<template>
  <div>
    <div class="w-full rounded-2xl bg-gradient-to-b from-white to-[#1256BB] mb-4 p-[1px]">
      <div
        class="flex relative h-full w-full pb-[16px] flex-col gap-[42px] items-center p-[25px] mobile:p-3 rounded-2xl justify-center bg-color-background-neuture-800 back"
      >
        <div class="flex flex-row justify-between mobile:flex-col w-full items-center">
          <div
            v-if="info"
            class="text-sm text-color-text-neuture-300 mb-6 flex flex-col gap-2 w-full"
          >
            <p class="text-white font-normal text-xl">{{ info.username }}</p>
            <p>{{ info.email }}</p>
            <p>{{ info.phone }}</p>
          </div>
          <Skeleton v-else :active="true" />
          <div class="flex flex-row mobile:w-full mobile:flex-wrap justify-end gap-3 w-full">
            <Popconfirm
              placement="leftBottom"
              @confirm="handleApprove"
              :title="t('common.popconfirm_title_base')"
              ok-text="Yes"
              cancel-text="No"
            >
              <Button type="green-color" class="!p-3 w-[222px] mobile:w-full">Approve</Button>
            </Popconfirm>
            <Popconfirm
              placement="leftBottom"
              @confirm="handleReject"
              :title="t('common.popconfirm_title_base')"
              ok-text="Yes"
              cancel-text="No"
            >
              <Button type="red-color" class="!p-3 w-[222px] mobile:w-full">Reject</Button>
            </Popconfirm>
          </div>
        </div>
        <div class="mb-8 w-full">
          <ListCartDetails :dataCartProp="listStatistic" />
        </div>
      </div>
    </div>
    <TableCashbackDetails :dataTable="dataTable" @changePagination="changePagination" />
  </div>
</template>
<script>
  import { onMounted, reactive, toRefs } from 'vue';
  import { Button, Popconfirm, message, Skeleton } from 'ant-design-vue';
  import ListCartDetails from './component/ListCartDetails.vue';
  import { useI18n } from 'vue-i18n';
  import TableCashbackDetails from './component/TableCashbackDetails.vue';
  import { getListCashbackDetails } from '/@/api/pages/vip-manager';
  import { apiGetDetailsUser } from '/@/api/pages/user-manager';
  import { router } from '/@/router';
  import { LIST_TYPE_STATUS_CASHBACK } from '/@/utils/constant';
  import { formatMoney } from '/@/utils/';
  import { rejectCashback, approveCashback } from '/@/api/pages/vip-manager';

  export default {
    components: {
      Button,
      ListCartDetails,
      Popconfirm,
      Skeleton,
      TableCashbackDetails,
    },
    setup() {
      const { t } = useI18n();
      const states = reactive({
        limit: 10,
        page: 1,
        listStatistic: [],
        info: {},
        dataTable: {
          total: 0,
          data: [],
        },
      });

      const fetchCashbackDetails = async () => {
        try {
          const params = {
            currentPage: states.page,
            pageSize: states.limit,
            id: router.currentRoute.value.params.id,
          };
          const res = await getListCashbackDetails(params);
          states.listStatistic = res.data.data.statistic;
          states.dataTable.data = await res.data.data.data.map((item, index) => {
            return {
              index: (states.page - 1) * states.limit + index + 1,
              key: res.data.data.data.indexOf(item),
              token: item.tokenSymbol,
              rate: item.cashbackRate,
              deposit: formatMoney(item.deposit, 4),
              withdraw: formatMoney(item.withdraw, 4),
              reward: formatMoney(item.reward, 2),
              provisional: formatMoney(item.paidCashback, 2),
              actual: formatMoney(item.paidCashback, 2),
              status: item.status,
              paidAt: Math.abs(item.paidAt),
            };
          });
          states.dataTable.total = res.data.paginateOption.count;
        } catch (error) {
          console.log(error);
        }
      };

      const fetchUserDetails = async () => {
        try {
          const res = await apiGetDetailsUser(router.currentRoute.value.params.id);
          states.info = res.data.info;
        } catch (error) {
          console.log(error);
        }
      };

      const handleUnBand = () => {};

      const changePagination = (data) => {
        states.limit = data.size;
        states.page = data.page;
        return fetchCashbackDetails();
      };

      const handleApprove = async () => {
        try {
          const res = await approveCashback(router.currentRoute.value.params.id);
          if (res.data) {
            message.success('Approve success');
          }
          return fetchCashbackDetails();
        } catch (error) {
          console.log(error);
        }
      };
      const handleReject = async () => {
        try {
          const res = await rejectCashback(router.currentRoute.value.params.id);
          if (res.status == 200 && res.data.length > 0) {
            message.success('Reject success');
          } else {
            message.error('No cashback record found!');
          }
          return fetchCashbackDetails();
        } catch (error) {
          console.log(error);
        }
      };

      onMounted(() => {
        fetchUserDetails();
        fetchCashbackDetails();
      });
      return {
        t,
        ...toRefs(states),
        handleUnBand,
        handleApprove,
        handleReject,
        changePagination,
      };
    },
  };
</script>
