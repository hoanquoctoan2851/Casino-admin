<template>
  <div class="w-full flex">
    <Table
      class="w-full"
      :columns="columns"
      :data-source="dataTableHistory"
      :pagination="false"
      :loading="loading"
      :scroll="{ x: 1000 }"
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'player'">
          <span>
            {{ column.title }}
          </span>
        </template>
        <template v-else-if="column.key === 'deviceType'">
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
          <span>{{ dataTableHistory.indexOf(record) + 1 }}</span>
        </template>
        <template v-else-if="column.key === 'ip'">
          <span class="font-normal text-white">{{ record.ip }}</span>
        </template>
        <template v-else-if="column.key === 'api'">
          <span>{{ record.api }}</span>
        </template>
        <template v-else-if="column.key === 'tBrowserType'">
          <span>{{ record.tBrowserType }}</span>
        </template>
        <template v-else-if="column.key === 'browser'">
          <span>{{ record.browser }}</span>
        </template>
        <template v-else-if="column.key === 'deviceType'">
          <span>{{ record.deviceType }}</span>
        </template>
        <template v-else-if="column.key === 'deviceBrand'">
          <span>{{ record.deviceBrand }}</span>
        </template>
        <template v-else-if="column.key === 'input'">
          <span class="">{{ record.input }}</span>
        </template>
        <template v-else-if="column.key === 'date'">
          <span>{{ record.date }}</span>
        </template>
      </template>
      <template #footer>
        <div class="mt-8">
          <AppPagination @changeCurrentPage="changePagination" :total="total" />
        </div>
      </template>
    </Table>
  </div>
</template>
<script>
  import { onMounted, watch, toRefs, reactive } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ArrowDownOutlined } from '@ant-design/icons-vue';
  import { Table } from 'ant-design-vue';
  import { toFixedNumber } from '/@/utils/helper/application.ts';
  import AppPagination from '/@/components/Application/src/AppPagination.vue';
  import { getHistoryEditPermission } from '/@/api/pages/admin-permission';
  import dayjs from 'dayjs';
  export default {
    name: 'PlayerData',
    components: { Table, AppPagination, ArrowDownOutlined },
    props: {
      dataAdmin: {
        type: Object,
        default: () => {},
      },
      dataTable: {
        type: Array,
        default: () => [],
      },
    },
    setup(prop) {
      const { t } = useI18n();
      const states = reactive({
        dataTableHistory: [],
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
          title: 'IP',
          dataIndex: 'ip',
          key: 'ip',
        },
        {
          title: 'API',
          dataIndex: 'api',
          key: 'api',
        },
        {
          title: 'TBrowser type',
          dataIndex: 'tBrowserType',
          key: 'tBrowserType',
        },
        {
          title: 'Browser',
          key: 'browser',
          dataIndex: 'browser',
        },
        {
          title: 'Device type',
          key: 'deviceType',
          dataIndex: 'deviceType',
        },
        {
          title: 'Device brand',
          key: 'deviceBrand',
          dataIndex: 'deviceBrand',
        },
        {
          title: 'Input',
          key: 'input',
          dataIndex: 'input',
        },
        {
          title: 'Date',
          key: 'date',
          dataIndex: 'date',
        },
      ];

      const fetchHistoryPermission = async () => {
        try {
          states.loading = true;
          const params = {
            id: prop.dataAdmin.userId,
            currentPage: states.page,
            pageSize: states.limit,
          };
          const res = await getHistoryEditPermission(params);
          states.dataTableHistory = res.data.data?.map((item) => {
            return {
              key: item.id,
              api: item.type,
              ip: item.ipAddress,
              tBrowserType: JSON.parse(item.browser)?.type,
              browser: JSON.parse(item.browser)?.name,
              deviceType: JSON.parse(item.deviceType)?.type,
              deviceBrand: JSON.parse(item.deviceType)?.brand || '-',
              input: JSON.parse(item.input),
              date: dayjs(item.createdAt).format('MMMM D, YYYY'),
            };
          });
          states.total = res.data.paginateOption.total;
        } catch (error) {
          console.log(error);
        } finally {
          states.loading = false;
        }
      };
      const changePagination = (data) => {
        states.limit = data.size;
        states.page = data.page;
        fetchHistoryPermission();
      };

      watch(
        () => prop.dataAdmin,
        () => {
          fetchHistoryPermission();
        },
      );
      onMounted(() => {
        fetchHistoryPermission();
      });
      return {
        t,
        ...toRefs(states),
        columns,
        toFixedNumber,
        changePagination,
      };
    },
  };
</script>
