<template>
  <div class="flex flex-col gap-10">
    <div class="bg-color-background-neuture-800 p-5 rounded-2xl">
      <Table
        class="w-full"
        :loading="loading"
        :columns="columnsRankUpgrade"
        :data-source="dataTable"
        :pagination="false"
        :scroll="{ x: 1000 }"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'turnOver'">
            <div
              @click="handleSortData('bet')"
              class="flex flex-row gap-2 cursor-pointer select-none items-center"
              :class="sortKey === 'bet' ? 'text-primary' : ''"
            >
              <span>
                {{ column.title }}
              </span>
              <div v-if="sortKey === 'bet'">
                <arrow-down-outlined v-if="sortValue === 'desc'" />
                <arrow-up-outlined v-else />
              </div>
            </div>
          </template>
          <template v-if="column.key === 'ggr'">
            <div
              @click="handleSortData('earn')"
              class="flex flex-row gap-2 cursor-pointer select-none items-center"
              :class="sortKey === 'earn' ? 'text-primary' : ''"
            >
              <span>
                {{ column.title }}
              </span>
              <div v-if="sortKey === 'earn'">
                <arrow-down-outlined v-if="sortValue === 'desc'" />
                <arrow-up-outlined v-else />
              </div>
            </div>
          </template>
          <template v-if="column.key === 'withDraw'">
            <div
              @click="handleSortData('withdraw')"
              class="flex flex-row gap-2 cursor-pointer select-none items-center"
              :class="sortKey === 'withdraw' ? 'text-primary' : ''"
            >
              <span>
                {{ column.title }}
              </span>
              <div v-if="sortKey === 'withdraw'">
                <arrow-down-outlined v-if="sortValue === 'desc'" />
                <arrow-up-outlined v-else />
              </div>
            </div>
          </template>
          <template v-if="column.key === 'deposit'">
            <div
              @click="handleSortData('deposit')"
              class="flex flex-row gap-2 cursor-pointer select-none items-center"
              :class="sortKey === 'deposit' ? 'text-primary' : ''"
            >
              <span>
                {{ column.title }}
              </span>
              <div v-if="sortKey === 'deposit'">
                <arrow-down-outlined v-if="sortValue === 'desc'" />
                <arrow-up-outlined v-else />
              </div>
            </div>
          </template>
          <template v-if="column.key === 'betTime'">
            <div
              @click="handleSortData('betTime')"
              class="flex flex-row gap-2 cursor-pointer select-none items-center"
              :class="sortKey === 'betTime' ? 'text-primary' : ''"
            >
              <span>
                {{ column.title }}
              </span>
              <div v-if="sortKey === 'betTime'">
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
            <span>{{ record.name }}</span>
          </template>
          <template v-else-if="column.key === 'rank'">
            <span>{{ record.rank }}</span>
          </template>
          <template v-else-if="column.key === 'turnOver'">
            <div class="text-white">
              {{ record.turnOver }}
            </div>
          </template>
          <template v-else-if="column.key === 'ggr'">
            <p
              :class="[
                record.ggr[0] == '-'
                  ? 'text-color-background-green-1'
                  : 'text-color-background-red-1',
              ]"
            >
              {{ record.ggr }}
            </p>
          </template>
          <template v-else-if="column.key === 'withDraw'"
            ><span class="text-white">{{ record.withDraw }} </span>
          </template>
          <template v-else-if="column.key === 'deposit'">
            <span>{{ record.deposit }}</span></template
          >
          <template v-else-if="column.key === 'betTime'">
            <span class="text-white">{{ record.betTime }} </span>
          </template>
          <template v-else-if="column.key === 'action'">
            <div class="flex flex-row gap-3" @click="handleGetDetailsUser(record.id)">
              <RankUpgrade
                :loading="loadingModal"
                :typeButton="'icon'"
                :userId="record.id"
                :dataProps="userDetails"
              />
            </div>
          </template>
        </template>
        <template #title> </template>
        <template #footer>
          <div class="mt-8">
            <PaginationCustom :total="total" @changeCurrentPage="handleChangePage" />
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
  import { reactive, toRefs, watch, onMounted } from 'vue';
  import { Table } from 'ant-design-vue';
  import { toFixedNumber } from '/@/utils/helper/application.ts';
  import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons-vue';
  import PaginationCustom from '/@/components/Application/src/AppPagination.vue';
  import { useVipManagerState, mapDataRankUpgrade } from '../../useVipManager';
  import { getListRankUpgrade } from '/@/api/pages/vip-manager';
  import { apiGetDetailsUser } from '/@/api/pages/user-manager';
  import { useAppStore } from '/@/store/modules/app';
  import RankUpgrade from '/@/components/Application/src/RankUpgrade.vue';

  export default {
    components: {
      Table,
      PaginationCustom,
      RankUpgrade,
      ArrowDownOutlined,
      ArrowUpOutlined,
    },
    setup() {
      const { columnsRankUpgrade } = useVipManagerState();
      const appStore = useAppStore();
      const states = reactive({
        total: 0,
        loading: false,
        loadingModal: false,
        currentPage: 1,
        pageSize: 10,
        typeTransaction: '',
        status: '',
        dataTable: [],
        userDetails: {},
        sortValue: 'desc',
        sortKey: 'bet',
      });

      const fetchListRankUpgrade = async () => {
        try {
          states.loading = true;
          const params = {
            currentPage: states.currentPage,
            pageSize: states.pageSize,
            sortKey: states.sortKey,
            sortDirection: states.sortValue,
          };
          const res = await getListRankUpgrade(params);
          states.total = res.data.paginateOption.count;
          states.dataTable = await mapDataRankUpgrade(
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
        fetchListRankUpgrade();
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

      const handleSortData = (key) => {
        states.sortValue = states.sortValue === 'desc' ? 'asc' : 'desc';
        states.sortKey = key;
        fetchListRankUpgrade();
      };

      watch(
        () => appStore.reCallApi,
        () => {
          fetchListRankUpgrade();
        },
      );

      onMounted(() => {
        fetchListRankUpgrade();
      });
      return {
        ...toRefs(states),
        handleChangePage,
        handleSortData,
        fetchListRankUpgrade,
        handleGetDetailsUser,
        columnsRankUpgrade,
        toFixedNumber,
      };
    },
  };
</script>
