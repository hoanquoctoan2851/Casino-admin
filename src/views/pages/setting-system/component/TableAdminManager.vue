<template>
  <div
    class="w-full flex flex-row screen-hide-sidebar:flex-wrap justify-between min-h-[361px] rounded-2xl p-5 bg-color-background-neuture-800"
  >
    <Table
      class="w-full"
      :scroll="{ x: 1200 }"
      :columns="columns"
      :data-source="dataTablePermission"
      :pagination="false"
      :loading="loading"
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'username'">
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
          <span>{{ dataTablePermission.indexOf(record) + 1 }}</span>
        </template>
        <template v-else-if="column.key === 'username'">
          <span>{{ record.name }}</span>
        </template>
        <template v-else-if="column.key === 'adminType'">
          <div class="flex">
            <p class="m-auto">{{ LIST_TYPE_ADMIN[record.adminType].label }}</p>
          </div>
        </template>
        <template v-else-if="column.key === 'adminAt'">
          <span>{{ record.adminAt }}</span></template
        >
        <template v-else-if="column.key === 'userInfo'">
          <div class="flex">
            <img class="m-auto" :src="LIST_ROLE_ICON_ADMIN[record.userInfo]" />
          </div>
        </template>
        <template v-else-if="column.key === 'userVip'">
          <div class="flex">
            <img class="m-auto" :src="LIST_ROLE_ICON_ADMIN[record.userVip]" />
          </div>
        </template>
        <template v-else-if="column.key === 'userStatistic'">
          <div class="flex">
            <img class="m-auto" :src="LIST_ROLE_ICON_ADMIN[record.userStatistic]" /> </div
        ></template>
        <template v-else-if="column.key === 'userReferral'">
          <div class="flex">
            <img class="m-auto" :src="LIST_ROLE_ICON_ADMIN[record.userReferral]" />
          </div>
        </template>
        <template v-else-if="column.key === 'managerTransaction'">
          <div class="flex">
            <img class="m-auto" :src="LIST_ROLE_ICON_ADMIN[record.managerTransaction]" />
          </div>
        </template>
        <template v-else-if="column.key === 'managerPromotion'">
          <div class="flex">
            <img class="m-auto" :src="LIST_ROLE_ICON_ADMIN[record.managerPromotion]" /> </div
        ></template>
        <template v-else-if="column.key === 'action'">
          <div v-if="userInfo.type === 3" @click="handleSetDataPermission(record)" class="flex">
            <ModalAction class="m-auto" :dataModal="dataAdmin"
          /></div>
          <p v-else>-</p></template
        >
      </template>
      <!-- <template #footer>
        <div class="mt-8">
          <PaginationCustom />
        </div>
      </template> -->
    </Table>
  </div>
</template>
<script>
  import { ref, onMounted, watch, reactive, toRefs } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ArrowDownOutlined } from '@ant-design/icons-vue';
  import { Table } from 'ant-design-vue';
  import { toFixedNumber } from '/@/utils/helper/application.ts';
  import TickGreen from '/@/assets/svg/tick-green.svg';
  import IconCloseRed from '/@/assets/svg/close-red.svg';
  import eyesYellow from '/@/assets/svg/eyes-yellow.svg';
  // import { useRouter } from 'vue-router';
  // import PaginationCustom from '/@/components/Application/src/AppPagination.vue';
  import {
    LIST_ROLE_ADMIN_OBJECT,
    LIST_ROLE_ICON_ADMIN,
    LIST_TYPE_ADMIN,
  } from '/@/utils/constant.ts';
  import ModalAction from '/@/views/pages/setting-system/component/modal/ModalAction.vue';
  import { getListPermission } from '/@/api/pages/admin-permission';
  import dayjs from 'dayjs';
  import { useUserStore } from '/@/store/modules/user';
  import { useAppStore } from '/@/store/modules/app';

  export default {
    name: 'TableAdminManager',
    components: { Table, ArrowDownOutlined, ModalAction },
    props: {
      dataTable: {
        type: Array,
        default: () => [],
      },
    },
    // comment
    setup() {
      const { t } = useI18n();
      // const router = useRouter();
      const { userInfo } = useUserStore();
      const currentPage = ref(1);
      const states = reactive({
        dataTablePermission: [],
        dataAdmin: {},
        loading: false,
        total: 0,
        limit: 10,
        page: 1,
      });
      const columns = [
        {
          title: '#',
          dataIndex: 'stt',
          key: 'stt',
        },
        {
          title: 'Username',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: 'Admin type',
          key: 'adminType',
          dataIndex: 'adminType',
        },
        {
          title: 'Be admin at',
          key: 'adminAt',
          dataIndex: 'adminAt',
        },
        {
          title: 'User info',
          key: 'userInfo',
          dataIndex: 'userInfo',
          align: 'center',
        },
        {
          title: 'User vip',
          key: 'userVip',
          dataIndex: 'userVip',
          align: 'center',
        },
        {
          title: 'User statistic',
          key: 'userStatistic',
          dataIndex: 'userStatistic',
          align: 'center',
        },
        {
          title: 'User referral',
          key: 'userReferral',
          dataIndex: 'userReferral',
          align: 'center',
        },
        {
          title: 'Manager transaction',
          key: 'managerTransaction',
          dataIndex: 'managerTransaction',
          align: 'center',
        },
        {
          title: 'Manager promotion',
          key: 'managerPromotion',
          dataIndex: 'managerPromotion',
          align: 'center',
        },
        {
          title: 'Action',
          key: 'action',
          dataIndex: 'action',
          align: 'center',
        },
      ];

      const fetchListPermission = async () => {
        try {
          states.loading = true;
          const params = {};
          const res = await getListPermission(params);
          states.dataTablePermission = await res.data.result?.map((item) => {
            return {
              key: item.id,
              userId: item.id,
              name: item.username || 0,
              adminType: item.type || 0,
              adminAt: item.createdAt ? dayjs(item.createdAt).format('MMMM D, YYYY') : '-',
              userInfo: item.userInfo || 0,
              userVip: item.userVip || 0,
              userStatistic: item.userStatistic || 0,
              userReferral: item.userRef || 0,
              managerTransaction: item.transaction || 0,
              managerPromotion: item.promotion || 0,
            };
          });
        } catch (error) {
          console.log(error);
        } finally {
          states.loading = false;
        }
      };

      const handleSetDataPermission = (data) => {
        states.dataAdmin = data;
      };

      watch(
        () => useAppStore().reCallApi,
        () => {
          fetchListPermission();
        },
      );

      onMounted(() => {
        fetchListPermission();
      });
      return {
        ...toRefs(states),
        t,
        columns,
        userInfo,
        toFixedNumber,
        fetchListPermission,
        TickGreen,
        IconCloseRed,
        eyesYellow,
        currentPage,
        LIST_ROLE_ADMIN_OBJECT,
        LIST_TYPE_ADMIN,
        LIST_ROLE_ICON_ADMIN,
        handleSetDataPermission,
      };
    },
  };
</script>
