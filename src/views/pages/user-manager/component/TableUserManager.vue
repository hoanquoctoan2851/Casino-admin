<template>
  <div
    class="w-full flex flex-row screen-hide-sidebar:flex-wrap justify-between min-h-[361px] rounded-2xl p-5 mobile:p-3 bg-color-background-neuture-800"
  >
    <Table
      class="w-full"
      :columns="columnsTableUserManager"
      :data-source="listUser"
      :pagination="false"
      :loading="loading"
      :scroll="{ x: 1000 }"
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'username'">
          <div
            @click="handleSortData('sortByName')"
            class="flex flex-row gap-2 cursor-pointer select-none items-center"
            :class="sortKey === 'sortByName' ? 'text-primary' : ''"
          >
            <span>
              {{ column.title }}
            </span>
            <div v-if="sortKey === 'sortByName'">
              <arrow-down-outlined v-if="sortValue === 'desc'" />
              <arrow-up-outlined v-else />
            </div>
          </div>
        </template>
        <template v-if="column.key === 'balance'">
          <div
            @click="handleSortData('balance')"
            class="flex flex-row gap-2 cursor-pointer select-none items-center"
            :class="sortKey === 'balance' ? 'text-primary' : ''"
          >
            <span>
              {{ column.title }}
            </span>
            <div v-if="sortKey === 'balance'">
              <arrow-down-outlined v-if="sortValue === 'desc'" />
              <arrow-up-outlined v-else />
            </div>
          </div>
        </template>
        <template v-if="column.key === 'joinDate'">
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
        <template v-if="column.key === 'rank'">
          <div
            @click="handleSortData('rank')"
            class="flex flex-row gap-2 cursor-pointer select-none items-center"
            :class="sortKey === 'rank' ? 'text-primary' : ''"
          >
            <span>
              {{ column.title }}
            </span>
            <div v-if="sortKey === 'rank'">
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
          <span @click="handleViewDetails(record.key)" class="cursor-pointer">{{
            record.name
          }}</span>
        </template>
        <template v-else-if="column.key === 'rank'">
          <span>{{ record.rank }}</span>
        </template>
        <template v-else-if="column.key === 'balance'">
          <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.balance)) }} </span>
        </template>
        <template v-else-if="column.key === 'lastPlay'">
          <span>{{ record.lastPlay }} </span>
        </template>
        <template v-else-if="column.key === 'status'">
          <div class="flex items-center justify-center">
            <img :src="record.status ? TickGreen : BandedRed" />
          </div>
        </template>
        <template v-else-if="column.key === 'country'">
          <Tooltip placement="topLeft" :title="filterCountry(record.country)"
            ><span :class="`fi fi-${record.country}`"></span
          ></Tooltip>
        </template>
        <template v-else-if="column.key === 'joinDate'">
          <div>
            <span>{{ record.joinDate }}</span>
          </div>
        </template>
        <template v-else-if="column.key === 'active'">
          <Popconfirm
            placement="leftTop"
            @confirm="handleUnBand(record.key, record.status)"
            :title="
              record.status
                ? t('routes.user-manager.title_confirm_unband')
                : t('routes.user-manager.title_confirm_band')
            "
          >
            <div class="flex flex-row gap-4 justify-center items-center">
              <img class="cursor-pointer" :src="record.status ? BandedRed : IconUnbanded" />
            </div>
          </Popconfirm>
        </template>
      </template>
      <template #title>
        <div class="flex w-full flex-row not-desktop:flex-wrap gap-4">
          <div class="flex flex-col gap-2 w-full">
            <p class="text-cool-gray-300 text-base">Search</p>
            <Input
              v-model:value="modelSearch"
              @change="changeSearch"
              placeholder="Search by username"
              class="!rounded-xl"
              ><template #prefix> <search-outlined class="text-2xl" /> </template
            ></Input>
          </div>
          <div class="flex flex-col gap-2 w-full desktop:max-w-[200px]">
            <p class="text-cool-gray-300 text-base">Rank</p>
            <Select v-model:value="rank" :options="masterData.getListRankSelect" />
          </div>
          <SelectCountry @emit:countryCode="getCountryCode" />
        </div>
      </template>
      <template #footer>
        <div class="mt-8">
          <PaginationCustom
            @changeCurrentPage="handleChangeSize"
            :total="dataTable?.paginateOptions.count"
          />
        </div>
      </template>
    </Table>
  </div>
</template>
<script>
  import { ref, computed, toRefs, watch, reactive } from 'vue';
  import { ArrowDownOutlined, SearchOutlined, ArrowUpOutlined } from '@ant-design/icons-vue';
  import { toFixedNumber } from '/@/utils/helper/application.ts';
  import TickGreen from '/@/assets/svg/user-manager/tick-green.svg';
  import BandedRed from '/@/assets/svg/user-manager/banded-red.svg';
  import IconUnbanded from '/@/assets/svg/user-manager/icon-unbanded.svg';
  import IconFilter from '/@/assets/svg/icon-fillter.svg';
  import { Input, Popconfirm, Tooltip, Table, Select } from 'ant-design-vue';
  import PaginationCustom from '/@/components/Application/src/AppPagination.vue';
  import SelectCountry from '/@/components/Application/src/SelectCountry.vue';
  import { LIST_TYPE_RANK_ARRAY } from '/@/utils/constant';
  import { useUserManagerState } from '../useUserManager';
  import { useDebounceFn } from '@vueuse/shared';
  import { useI18n } from 'vue-i18n';
  import dayjs from 'dayjs';
  import { apiBandUser } from '/@/api/pages/user-manager';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { masterDataStore } from '/@/store/modules/masterData';
  import { countryCodeList } from '/@/utils/constant';

  export default {
    name: 'TableUserManager',
    components: {
      Table,
      SelectCountry,
      Select,
      Tooltip,
      Popconfirm,
      ArrowDownOutlined,
      ArrowUpOutlined,
      SearchOutlined,
      Input,
      PaginationCustom,
    },
    props: {
      dataTable: {
        type: Object,
        default: () => {},
      },
      loading: {
        type: Boolean,
        default: false,
      },
      pageSize: {
        type: Number,
        default: 10,
      },
      currentPage: {
        type: Number,
        default: 1,
      },
    },
    emits: ['changePage', 'changeFillter'],
    setup(prop, { emit }) {
      const { t } = useI18n();
      const masterData = masterDataStore();
      const modelSearch = ref('');
      const { columnsTableUserManager } = useUserManagerState();
      const state = reactive({
        valueSearch: '',
        rank: '',
        sortKey: 'createdAt',
        sortValue: 'desc',
        countryCode: '',
      });

      const listUser = computed(() => {
        return prop.dataTable?.data?.map((user, index) => {
          return {
            index: prop.pageSize * (prop.currentPage - 1) + index + 1,
            key: user.id,
            name: user.username,
            rank: user.rank,
            balance: user.balance | 0,
            lastPlay: user.lastPlay ? dayjs(user.lastPlay).format('MMM D, YYYY, HH:ss') : '-',
            status: user.isActive,
            country: user.country.toLowerCase(),
            joinDate: dayjs(user.createdAt).format('MMM D, YYYY'),
          };
        });
      });

      const getCountryCode = (value) => {
        state.countryCode = value;
      };

      const changeSearch = useDebounceFn(() => {
        state.valueSearch = modelSearch.value;
      }, 500);

      watch(
        () => state,
        () => {
          emit('changeFillter', state);
        },
        { deep: true },
      );

      const handleChangeSize = (value) => {
        emit('changePage', value);
      };
      const handleUnBand = async (id, status) => {
        try {
          const params = {
            userId: id,
            value: status ? 0 : 1,
            reason: '',
          };
          const res = await apiBandUser(params);
          if (res.data)
            useMessage().createMessage.success(status ? 'Account locked' : 'Account unlocked');
          emit('changeFillter', state);
        } catch (error) {
          console.log(error);
        }
      };
      const handleSortData = (key) => {
        state.sortValue = state.sortValue === 'desc' ? 'asc' : 'desc';
        state.sortKey = key;
      };
      const handleViewDetails = (id) => {
        window.open(`#/user-manager/details/${id}`, '_blank');
      };

      const filterCountry = (countryCode) => {
        const country = countryCodeList.find((item) => item.code === countryCode?.toUpperCase());
        return country?.Name || '';
      };
      return {
        ...toRefs(state),
        t,
        toFixedNumber,
        listUser,
        modelSearch,
        TickGreen,
        BandedRed,
        IconUnbanded,
        IconFilter,
        masterData,
        LIST_TYPE_RANK_ARRAY,
        columnsTableUserManager,
        handleUnBand,
        handleSortData,
        handleViewDetails,
        handleChangeSize,
        getCountryCode,
        changeSearch,
        filterCountry,
      };
    },
  };
</script>
