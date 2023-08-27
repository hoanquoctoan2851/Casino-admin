<template>
  <div class="w-full flex flex-row gap-5 screen-hide-sidebar:flex-wrap">
    <div
      class="bg-color-background-neuture-800 rounded-2xl w-[400px] p-5 mobile:p-3 screen-hide-sidebar:w-full"
    >
      <Table
        class="w-full"
        :columns="columns"
        :data-source="state.dataTableBalance"
        :pagination="false"
      >
        <!-- <template #headerCell="{ column }">
          <template v-if="column.key === 'balance'">
            <div class="flex flex-row gap-2 !text-primary items-center">
              <span class="text-primary">
                {{ column.title }}
              </span>
              <arrow-down-outlined />
            </div>
          </template>
        </template> -->
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'token'">
            <div class="flex flex-row items-center gap-2">
              <img class="w-6 h-6" :src="masterData.getListTokenObject[record.symbol]?.icon" />
              <span>{{ record.symbol }}</span>
            </div>
          </template>
          <template v-else-if="column.key === 'balance'">
            <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.balance, 5)) }} </span>
          </template>
        </template>
      </Table>
    </div>
    <div class="flex flex-col gap-5 w-full">
      <div>
        <p class="text-xl font-normal text-white mobile:text-base">Wallet address</p>
      </div>
      <div class="grid grid-cols-2 gap-5 w-full mobile:grid-cols-1">
        <div
          v-for="item in state.dataTokenWallet"
          :key="item.key"
          class="flex flex-col gap-3 w-full bg-color-background-neuture-800 p-5 rounded-2xl h-[113px] mobile:p-3"
        >
          <div class="flex flex-row justify-between items-center">
            <div class="flex flex-row items-center gap-3">
              <img class="w-6 h-6" :src="masterData.getListChain[item.chain]?.icon" />
              <p class="underline-offset-2 text-base mobile:text-sm capitalize text-white">{{
                masterData.getListChain[item.chain]?.name
              }}</p>
            </div>
            <div class="flex flex-row items-center gap-3">
              <a
                :href="masterData.getListChain[item.chain]?.link"
                target="_blank"
                class="cursor-pointer !underline"
                >View</a
              >
              <CopyText :idCopy="item.key" />
            </div>
          </div>
          <p class="text-[16px] line-clamp-2 break-all mobile:text-xs" :id="item.key">{{
            item.address
          }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { watch, reactive } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Table } from 'ant-design-vue';
  // import { ArrowDownOutlined } from '@ant-design/icons-vue';
  import { toFixedNumber } from '/@/utils/helper/application.ts';
  import CopyIcon from '/@/assets/svg/copy-icon.svg';
  import CopyText from '/@/components/Application/src/CopyText.vue';
  import { useUserManagerDetailsState } from '../useUserDetails';
  import { masterDataStore } from '/@/store/modules/masterData';

  export default {
    name: 'AccountBalance',
    components: { Table, CopyText },
    props: {
      data: {
        type: String,
        default: () => '',
      },
    },
    setup(prop) {
      const { t } = useI18n();
      const { mapDataTableBalance, mapDataWalletAddress } = useUserManagerDetailsState();
      const masterData = masterDataStore();
      const state = reactive({
        dataTableBalance: [],
        dataTokenWallet: '',
      });
      const columns = [
        {
          title: 'Token',
          dataIndex: 'token',
          key: 'token',
        },
        {
          title: 'Balance',
          key: 'balance',
          dataIndex: 'balance',
        },
      ];
      watch(
        () => prop.data,
        () => {
          state.dataTableBalance = mapDataTableBalance(prop.data?.tokens);
          state.dataTokenWallet = mapDataWalletAddress(prop.data?.wallets);
        },
      );
      return {
        t,
        columns,
        state,
        toFixedNumber,
        masterData,
        CopyIcon,
      };
    },
  };
</script>
