<template>
  <div>
    <TableUserManager
      @changePage="handleChangePage"
      @changeFillter="fetchFilter"
      :dataTable="dataTable"
      :loading="states.loading"
      :pageSize="states.limit"
      :currentPage="states.page"
    />
  </div>
</template>
<script setup>
  import { onMounted, ref, reactive } from 'vue';
  import TableUserManager from './component/TableUserManager.vue';
  import { getListUser } from '/@/api/pages/user-manager';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useAppStore } from '/@/store/modules/app';

  const states = reactive({
    page: 1,
    limit: 10,
    loading: false,
    filterValue: ['', ''],
    rank: '',
    search: '',
    sortKey: 'createdAt',
    sortValue: 'desc',
  });

  const dataTable = ref();
  const appStore = useAppStore();

  const fetchListUser = async () => {
    states.loading = true;
    try {
      const params = {
        currentPage: states.page,
        pageSize: states.limit,
        // rank: states.rank,
        sortKey: states.sortKey,
        sortDirection: states.sortValue,
        filterKey: 'country,rankCode',
        keyword: states.search,
        filterValue: states.filterValue.join(','),
        // country: states.countryCode,
      };
      const res = await getListUser(params);
      dataTable.value = res.data;
    } catch (error) {
      useMessage().createMessage.error(error?.response?.message || error?.message);
    } finally {
      states.loading = false;
    }
  };
  const handleChangePage = (value) => {
    states.page = value.page;
    states.limit = value.size;
    fetchListUser();
  };

  const fetchFilter = (value) => {
    states.filterValue = [value?.countryCode, value?.rank];
    states.search = value.valueSearch;
    states.sortKey = value.sortKey;
    states.sortValue = value.sortValue;
    appStore.setResetPage();
    fetchListUser();
  };

  onMounted(() => {
    fetchListUser();
  });
</script>
