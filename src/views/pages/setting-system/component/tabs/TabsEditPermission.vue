<template>
  <div class="flex flex-col gap-15 mobile:flex-col-reverse">
    <div class="grid grid-cols-2 gap-[86px] mobile:grid-cols-1">
      <div class="flex flex-col gap-[22px]">
        <div class="flex pl-4 flex-row gap-5 items-center">
          <p class="w-30 text-base">User name:</p>
          <p class="text-xl text-white">{{ dataAdmin.name }}</p>
        </div>
        <div class="flex pl-4 flex-row gap-5 items-center">
          <p class="w-30 text-base">User role:</p>
          <p class="text-xl text-white">{{ LIST_TYPE_ADMIN[dataAdmin.adminType]?.label }}</p>
        </div>
        <Table
          :showHeader="false"
          class="w-full"
          :columns="columns"
          :data-source="dataTable"
          :pagination="false"
          :scroll="{ x: 500 }"
        >
          <template #headerCell="{ column }">
            <template v-if="column.key === 'roles'">
              <div class="flex flex-row gap-2 text-primary items-center">
                <span>
                  {{ column.title }}
                </span>
                <arrow-down-outlined />
              </div>
            </template>
          </template>
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'roles'">
              <span>{{ record.label }}</span>
            </template>
            <template v-else-if="column.key === 'action'">
              <RadioGroup :key="record.value" v-model:value="roleStates[`${record.value}`]">
                <Radio :class="`none`" :value="0">None</Radio>
                <Radio :class="`view`" :value="1">View</Radio>
                <Radio :class="`edit`" :value="2">Edit</Radio>
              </RadioGroup>
            </template>
          </template>
        </Table>
      </div>
      <div>
        <div class="flex flex-col gap-6">
          <div
            v-for="item in LIST_PERMISSION_INSTRUCT"
            :key="item.title"
            class="flex text-color-background-neuture-500 flex-col gap-1"
          >
            <p>{{ item.title }}</p>
            <p>{{ item.content }}</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex w-full justify-center items-center flex-row flex-wrap gap-5 mobile:flex-nowrap"
    >
      <Button
        :loading="loading"
        @click="handleUpdatePermission"
        type="primary"
        class="w-full max-w-[200px]"
        >Save</Button
      >
      <Button class="w-full max-w-[200px]">Cancel</Button>
    </div>
  </div>
</template>
<script>
  import { reactive, watch, ref, onMounted } from 'vue';
  import { Table } from 'ant-design-vue';
  import { Radio, Button, RadioGroup } from 'ant-design-vue';
  import { LIST_TYPE_ADMIN } from '/@/utils/constant.ts';
  import { updatePermission } from '/@/api/pages/admin-permission';
  import { useAppStore } from '/@/store/modules/app';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default {
    components: {
      Table,
      RadioGroup,
      Radio,
      Button,
    },
    props: {
      dataAdmin: {
        type: Object,
        default: () => {},
      },
    },
    emits: ['changeModal'],
    setup(prop, { emit }) {
      const { createMessage } = useMessage();
      const loading = ref(false);
      const appStore = useAppStore();
      const LIST_PERMISSION_INSTRUCT = [
        {
          title: 'User Info',
          content: 'Manage user info in User Manage Dashboard and User Detail Screen',
        },
        {
          title: 'User Vip',
          content: 'Manage user info in User Vip Statistic Screen',
        },
        {
          title: 'User Cashback',
          content: 'Manage user info in User Cashback Report Screen',
        },
        {
          title: 'User Statistic',
          content: 'Manage user info in User Statistic Screen',
        },
        {
          title: 'User Rank',
          content: 'Manage user rank setting in Setting Screen',
        },
        {
          title: 'User Referral',
          content: 'Manage user ref in Referral Screen',
        },
        {
          title: 'Manage Transaction',
          content: 'Manage user transaction in Transaction Manage Dashboard',
        },
        {
          title: 'Manage Promotion',
          content: 'Manage site promotion in Promotion Manage Dashboard',
        },
      ];
      const columns = [
        {
          title: 'Roles',
          dataIndex: 'roles',
          key: 'roles',
        },
        {
          title: 'Action',
          key: 'action',
          dataIndex: 'action',
        },
      ];

      const dataTable = [
        {
          label: 'User Info',
          value: 'userInfo',
          key: 'userInfo',
        },
        {
          label: 'User Vip',
          value: 'userVip',
          key: 'userVip',
        },
        {
          label: 'User Statistic',
          value: 'userStatistic',
          key: 'userStatistic',
        },
        {
          label: 'User Referral',
          value: 'userReferral',
          key: 'userReferral',
        },
        {
          label: 'Manager Transaction',
          value: 'managerTransaction',
          key: 'managerTransaction',
        },
        {
          label: 'Manager Promotion',
          value: 'managerPromotion',
          key: 'managerPromotion',
        },
      ];

      const roleStates = reactive({
        userInfo: 0,
        userVip: 0,
        userStatistic: 0,
        userReferral: 0,
        managerTransaction: 0,
        managerPromotion: 0,
      });

      const initData = () => {
        roleStates.userInfo = prop.dataAdmin?.userInfo;
        roleStates.userVip = prop.dataAdmin?.userVip;
        roleStates.userStatistic = prop.dataAdmin?.userStatistic;
        roleStates.userReferral = prop.dataAdmin?.userReferral;
        roleStates.managerTransaction = prop.dataAdmin?.managerTransaction;
        roleStates.managerPromotion = prop.dataAdmin?.managerPromotion;
      };

      const handleUpdatePermission = async () => {
        try {
          const params = {
            id: prop.dataAdmin?.userId,
            userInfo: roleStates.userInfo,
            userVip: roleStates.userVip,
            userStatistic: roleStates.userStatistic,
            userRef: roleStates.userReferral,
            transaction: roleStates.managerTransaction,
            promotion: roleStates.managerPromotion,
          };
          const res = await updatePermission(params);
          if (res.data) {
            createMessage.success('Update permission success');
            appStore.setReCallApi();
            emit('changeModal', false);
          }
        } catch (error) {
          console.log(error);
        }
      };

      watch(
        () => prop.dataAdmin,
        () => {
          initData();
        },
      );
      onMounted(() => {
        initData();
      });
      return {
        columns,
        loading,
        dataTable,
        roleStates,
        LIST_TYPE_ADMIN,
        LIST_PERMISSION_INSTRUCT,
        handleUpdatePermission,
      };
    },
  };
</script>
