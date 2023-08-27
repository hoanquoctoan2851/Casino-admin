<template>
  <div class="flex flex-col gap-4">
    <div
      class="w-full flex flex-row screen-hide-sidebar:flex-wrap justify-between min-h-[361px] rounded-2xl p-5 mobile:p-3 bg-color-background-neuture-800"
    >
      <Table
        class="w-full"
        :columns="columnsTableRankSetting"
        :data-source="renderListRank"
        :pagination="false"
        :scroll="{ x: 1000 }"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'dailyLimit'">
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
            <span>{{ renderListRank.indexOf(record) + 1 }}</span>
          </template>
          <template v-else-if="column.key === 'rank'">
            <div class="flex flex-row gap-2 items-center">
              <span class="min-w-8">{{ record.rank }}</span>
            </div>
          </template>
          <template v-else-if="column.key === 'dailyLimit'">
            <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.dailyLimit)) }} </span>
          </template>
          <template v-else-if="column.key === 'minAmount'">
            <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.minAmount)) }} </span>
          </template>
          <template v-else-if="column.key === 'maxAmount'">
            <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.maxAmount)) }} </span>
          </template>
          <template v-else-if="column.key === 'cashbackRate'">
            <span
              >{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.cashbackRate)) }}
            </span>
          </template>
          <template v-else-if="column.key === 'rewardRate'">
            <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.rewardRate)) }} </span>
          </template>
          <template v-else-if="column.key === 'action'">
            <div v-if="userStore.userInfo.type === 3">
              <ModalRankSetting
                :key="renderListRank[renderListRank.indexOf(record)]"
                :dataRank="renderListRank[renderListRank.indexOf(record)]"
                :rankObject="renderListRankObject"
              />
            </div>
          </template>
        </template>
        <template #title>
          <div class="flex w-full flex-row not-desktop:flex-wrap gap-4"> </div>
        </template>
      </Table>
    </div>
    <div
      class="w-full flex flex-row screen-hide-sidebar:flex-wrap justify-between min-h-[361px] rounded-2xl p-5 mobile:p-3 bg-color-background-neuture-800"
    >
      <Table
        class="w-full"
        :columns="columnsTableRankSettingSecond"
        :data-source="dataTableUserRank"
        :pagination="false"
        :scroll="{ x: 1000 }"
        :loading="loading"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'stt'">
            <span>{{ record.index }}</span>
          </template>
          <template v-else-if="column.key === 'name'">
            <div
              @click="handleViewDetails(record.key)"
              class="flex flex-row cursor-pointer gap-2 items-center"
            >
              <span class="min-w-8">{{ record.name }}</span>
            </div>
          </template>
          <template v-else-if="column.key === 'currentRank'">
            <span>{{ record.currentRank }} </span>
          </template>
          <template v-else-if="column.key === 'progress'">
            <span
              >{{ record.totalBet }} /
              {{
                Intl.NumberFormat('en-US').format(
                  toFixedNumber(renderListRankObject[record.requireBet]?.requireTotalBet),
                )
              }}</span
            >
          </template>
          <template v-else-if="column.key === 'status'">
            <CloseCircleOutlined
              v-if="record.rawBet < renderListRankObject[record.requireBet]?.requireTotalBet"
              style="color: #ff4747; font-size: 18px"
            />
            <CheckCircleOutlined v-else style="color: #00c566; font-size: 18px" />
          </template>
        </template>
        <template #title>
          <div class="flex w-full flex-row not-desktop:flex-wrap gap-4"> </div>
        </template>
        <template #footer>
          <div class="mt-8">
            <PaginationCustom @changeCurrentPage="handleChangeSize" :total="total" />
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
  import { computed, onMounted, reactive, watch, toRefs } from 'vue';
  import { Table } from 'ant-design-vue';
  import PaginationCustom from '/@/components/Application/src/AppPagination.vue';
  import { useVipManagerState, mapDataRankSetting } from '../../useVipManager';
  import { masterDataStore } from '/@/store/modules/masterData';
  import { toFixedNumber } from '/@/utils/helper/application.ts';
  import { LIST_TYPE_STATUS_OBJECT } from '/@/utils/constant';
  import dayjs from 'dayjs';
  import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons-vue';
  import ModalRankSetting from '../ModalSettingRank.vue';
  import { getListRankUpgrade } from '/@/api/pages/vip-manager';
  import { useUserStore } from '/@/store/modules/user';

  export default {
    name: 'TableUserManager',
    components: {
      Table,
      PaginationCustom,
      ModalRankSetting,
      CheckCircleOutlined,
      CloseCircleOutlined,
    },
    setup() {
      const masterData = masterDataStore();
      const userStore = useUserStore();
      const { columnsTableRankSetting, columnsTableRankSettingSecond } = useVipManagerState();
      const states = reactive({
        loading: false,
        currentPage: 1,
        pageSize: 10,
        dataRank: {},
        listRankObject: {},
        total: 0,
        dataTableUserRank: [],
      });

      const renderListRank = computed(() => {
        return masterData.getListRank.map((item) => {
          return {
            key: masterData.getListRank.indexOf(item),
            rank: item.label,
            dailyLimit: item.dailyWithdraw,
            minAmount: item.minWithdraw,
            maxAmount: item.maxWithdraw,
            cashbackRate: item.cashback,
            rewardRate: item.reward,
          };
        });
      });
      watch(
        () => renderListRank.value,
        () => {
          console.log(renderListRank.value);
        },
      );
      const renderListRankObject = computed(() => {
        let data = {};
        masterData.getListRank.forEach((element) => {
          data[element.label] = element;
        });
        return data;
      });

      const fetchListRankUpgrade = async () => {
        try {
          states.loading = true;
          const params = {
            currentPage: states.currentPage,
            pageSize: states.pageSize,
          };
          const res = await getListRankUpgrade(params);
          states.total = res.data.paginateOption.count;
          states.dataTableUserRank = await mapDataRankSetting(
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
      const handleViewDetails = (id) => {
        window.open(`#/user-manager/details/${id}`, '_blank');
      };

      const handleChangeSize = (value) => {
        states.currentPage = value.page;
        states.pageSize = value.size;
        fetchListRankUpgrade();
      };

      onMounted(() => {
        fetchListRankUpgrade();
      });
      return {
        ...toRefs(states),
        states,
        columnsTableRankSetting,
        columnsTableRankSettingSecond,
        LIST_TYPE_STATUS_OBJECT,
        toFixedNumber,
        renderListRank,
        renderListRankObject,
        handleViewDetails,
        handleChangeSize,
        userStore,
        masterData,
        dayjs,
      };
    },
  };
</script>
