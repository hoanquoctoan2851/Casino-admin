<template>
  <div
    class="w-full flex flex-row screen-hide-sidebar:flex-wrap justify-between min-h-[361px] rounded-2xl p-5 bg-color-background-neuture-800"
  >
    <Table
      class="w-full"
      :columns="columns"
      :data-source="dataTable"
      :scroll="{ x: 1000 }"
      :pagination="false"
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'balance'">
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
          <span>{{ dataTable.indexOf(record) + 1 }}</span>
        </template>
        <template v-else-if="column.key === 'username'">
          <span @click="handleViewDetails()" class="cursor-pointer">{{ record.name }}</span>
        </template>
        <template v-else-if="column.key === 'phone'">
          <span>{{ record.phone }}</span>
        </template>
        <template v-else-if="column.key === 'email'">
          <span>{{ record.email }}</span>
        </template>
        <template v-else-if="column.key === 'refId'">
          <span>{{ record.refId }} </span>
        </template>
        <template v-else-if="column.key === 'balance'">
          <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.balance)) }} </span>
        </template>
        <template v-else-if="column.key === 'totalCom'">
          <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.totalCom)) }} </span>
        </template>
        <template v-else-if="column.key === 'totalDeposit'">
          <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.totalDeposit)) }} </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <div class="flex flex-row gap-4 justify-center items-center">
            <ModalPay />
            <ModalCommissionHistory />
            <ModalMultiLevelTree />
          </div>
        </template>
      </template>
      <template #footer>
        <div class="mt-8">
          <PaginationCustom />
        </div>
      </template>
    </Table>
  </div>
</template>
<script>
  import { ref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ArrowDownOutlined } from '@ant-design/icons-vue';
  import { Table } from 'ant-design-vue';
  import { toFixedNumber } from '/@/utils/helper/application.ts';
  import TickGreen from '/@/assets/svg/user-manager/tick-green.svg';
  import BandedRed from '/@/assets/svg/user-manager/banded-red.svg';
  import IconMoneyWallet from '/@/assets/svg/user-manager/icon-money-wallet.svg';
  import IconUnbanded from '/@/assets/svg/user-manager/icon-unbanded.svg';
  import IconFillter from '/@/assets/svg/icon-fillter.svg';
  import { useRouter } from 'vue-router';
  import PaginationCustom from '/@/components/Application/src/AppPagination.vue';
  import ModalMultiLevelTree from './modal/ModalMultiLevelTree.vue';
  import ModalCommissionHistory from './modal/ModalCommissionHistory.vue';
  import ModalPay from './modal/ModalPay.vue';
  export default {
    name: 'TableAffiliate',
    components: {
      Table,
      ArrowDownOutlined,
      ModalMultiLevelTree,
      ModalCommissionHistory,
      PaginationCustom,
      ModalPay,
    },
    props: {
      dataTable: {
        type: Array,
        default: () => [
          {
            key: '1',
            name: 'Allision Thommas',
            phone: '0969985423',
            email: 'toilaaitrongvay@gmail.com',
            refId: '3638675',
            balance: 312312.1312,
            totalCom: 123123.2,
            totalDeposit: 213231.12312,
          },
          {
            key: '2',
            name: 'Allision Thommas',
            phone: '0969985423',
            email: 'toilaaitrongvay@gmail.com',
            refId: '3638675',
            balance: 312312.1312,
            totalCom: 123123.2,
            totalDeposit: 213231.12312,
          },
          {
            key: '3',
            name: 'Allision Thommas',
            phone: '0969985423',
            email: 'toilaaitrongvay@gmail.com',
            refId: '3638675',
            balance: 312312.1312,
            totalCom: 123123.2,
            totalDeposit: 213231.12312,
          },
          {
            key: '4',
            name: 'Allision Thommas',
            phone: '0969985423',
            email: 'toilaaitrongvay@gmail.com',
            refId: '3638675',
            balance: 312312.1312,
            totalCom: 123123.2,
            totalDeposit: 213231.12312,
          },
          {
            key: '5',
            name: 'Allision Thommas',
            phone: '0969985423',
            email: 'toilaaitrongvay@gmail.com',
            refId: '3638675',
            balance: 312312.1312,
            totalCom: 123123.2,
            totalDeposit: 213231.12312,
          },
          {
            key: '6',
            name: 'Allision Thommas',
            phone: '0969985423',
            email: 'toilaaitrongvay@gmail.com',
            refId: '3638675',
            balance: 312312.1312,
            totalCom: 123123.2,
            totalDeposit: 213231.12312,
          },
        ],
      },
    },
    // comment
    setup() {
      const { t } = useI18n();
      const router = useRouter();
      const currentPage = ref(1);
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
          title: 'Phone',
          key: 'phone',
          dataIndex: 'phone',
        },
        {
          title: 'Email',
          key: 'email',
          dataIndex: 'balance',
        },
        {
          title: 'Ref Id',
          key: 'refId',
          dataIndex: 'refId',
        },
        {
          title: 'Com balance',
          key: 'balance',
          dataIndex: 'balance',
        },
        {
          title: 'Total com',
          key: 'totalCom',
          dataIndex: 'totalCom',
        },
        {
          title: 'Total deposit',
          key: 'totalDeposit',
          dataIndex: 'totalDeposit',
        },
        {
          title: 'Action',
          key: 'action',
          dataIndex: 'action',
        },
      ];

      const handleUnBand = () => {
        console.log('Bố mày ban chết mày');
      };
      const handleViewWallet = () => {
        console.log('Để xem có nhiêu tiền');
      };
      const handleViewDetails = () => {
        router.push({
          name: 'UserManagerDetailsPage',
        });
      };
      return {
        t,
        columns,
        toFixedNumber,
        TickGreen,
        BandedRed,
        IconMoneyWallet,
        IconUnbanded,
        IconFillter,
        currentPage,
        handleUnBand,
        handleViewWallet,
        handleViewDetails,
      };
    },
  };
</script>
