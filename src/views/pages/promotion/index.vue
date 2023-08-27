<template>
  <div class="flex flex-col gap-10">
    <div class="bg-color-background-neuture-800 p-5 rounded-2xl">
      <Table
        class="w-full"
        :columns="columns"
        :data-source="dataTable"
        :pagination="false"
        :loading="loading"
        :scroll="{ x: 1000 }"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'title'">
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
          <template v-else-if="column.key === 'title'">
            <span class="cursor-pointer">{{ record.title }}</span>
          </template>
          <template v-else-if="column.key === 'type'">
            <span :style="`color: ${LIST_TYPE_PROMOTION_OBJECT[record.type]?.color}`">{{
              LIST_TYPE_PROMOTION_OBJECT[record.type]?.label
            }}</span>
          </template>
          <template v-else-if="column.key === 'image'">
            <div class="flex">
              <img
                class="w-full h-[60px] w-[154px] h-full max-h-[100px] m-auto"
                :src="record.image"
              />
            </div>
          </template>
          <template v-else-if="column.key === 'createAt'">
            <span>{{ record.create_at }} </span>
          </template>
          <template v-else-if="column.key === 'preview'">
            <div class="flex">
              <EditOutlined @click="handleDirectEdit(record.id)" class="!text-xl cursor-pointer" />
            </div>
          </template>
        </template>
        <template #title>
          <div class="w-full flex flex-wrap flex-row justify-between mb-5 items-end gap-4">
            <div class="flex w-[300px] flex-col gap-2">
              <p>Type</p>
              <Select :options="LIST_TYPE_PROMOTION" v-model:value="typePromotion" />
            </div>
            <div>
              <Button @click="handleCreatePromotion" type="primary">Create promotion</Button>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="mt-8">
            <PaginationCustom :total="total" @changeCurrentPage="changePage" />
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
  import { reactive, toRefs, watch, onMounted } from 'vue';
  import { Select, Button, Table } from 'ant-design-vue';
  import { toFixedNumber } from '/@/utils/helper/application.ts';
  import { ArrowDownOutlined, EditOutlined } from '@ant-design/icons-vue';
  import PaginationCustom from '/@/components/Application/src/AppPagination.vue';
  import { useRouter } from 'vue-router';
  import { getListPromotion } from '/@/api/pages/promotion';
  import { LIST_TYPE_PROMOTION, LIST_TYPE_PROMOTION_OBJECT } from '/@/utils/constant';
  import dayjs from 'dayjs';
  import { useAppStore } from '/@/store/modules/app';

  export default {
    components: {
      Table,
      PaginationCustom,
      EditOutlined,
      Select,
      Button,
      ArrowDownOutlined,
    },
    setup() {
      const router = useRouter();
      const states = reactive({
        limit: 10,
        page: 1,
        rangeDate: [],
        loading: false,
        typePromotion: '',
        total: 0,
        dataTable: [],
      });
      const columns = [
        {
          title: '#',
          dataIndex: 'stt',
          key: 'stt',
        },
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },

        {
          title: 'Image',
          key: 'image',
          dataIndex: 'image',
        },
        {
          title: 'Created at',
          key: 'createAt',
          dataIndex: 'createAt',
        },
        {
          title: 'Preview',
          key: 'preview',
          dataIndex: 'preview',
        },
      ];

      const handleCreatePromotion = () => {
        router.push({
          name: 'CreatePromotionPage',
        });
      };

      const fetchListPromotion = async () => {
        try {
          states.loading = true;
          const params = {
            pageSize: states.limit,
            currentPage: states.page,
            filterKey: 'type',
            filterValue: states.typePromotion,
          };
          const res = await getListPromotion(params);
          states.total = res.data.paginateOption.count;
          states.dataTable = res.data.data?.map((item) => {
            return {
              id: item.id,
              key: res.data.data?.indexOf(item),
              title: item.title,
              type: item.type,
              image: item.featureImage,
              create_at: dayjs(item.createdAt).format('MMMM D, YYYY'),
            };
          });
        } catch (error) {
          console.log(error);
        } finally {
          states.loading = false;
        }
      };

      const changePage = (data) => {
        states.limit = data.size;
        states.page = data.page;
        fetchListPromotion();
      };

      const handleDirectEdit = (id) => {
        router.push({
          name: 'EditPromotionPage',
          params: {
            id: id,
          },
        });
      };

      watch(
        () => states.typePromotion,
        () => {
          useAppStore().setResetPage();
          fetchListPromotion();
        },
      );

      onMounted(() => {
        fetchListPromotion();
      });
      return {
        ...toRefs(states),
        columns,
        toFixedNumber,
        changePage,
        LIST_TYPE_PROMOTION_OBJECT,
        LIST_TYPE_PROMOTION,
        handleCreatePromotion,
        handleDirectEdit,
      };
    },
  };
</script>
