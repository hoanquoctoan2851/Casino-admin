<template>
  <div
    class="pagination-custom-default flex flex-row justify-between items-center"
    :class="total ? '' : 'hidden'"
  >
    <div class="flex flex-row items-center gap-2 text-secondary mobile:hidden">
      <p>{{ 'Show rows:' }}</p>
      <div class="custom-select-default">
        <Select :options="selectOptionSizePage" v-model:value="pageSize" />
      </div>
    </div>
    <Pagination
      :responsive="true"
      v-model:current="currentPage"
      :pageSize="pageSize"
      :showSizeChanger="false"
      :total="total"
    />
  </div>
</template>
<script>
  import { ref, watch, computed } from 'vue';
  import {} from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';
  import { Pagination, Select } from 'ant-design-vue';
  import { useAppStore } from '/@/store/modules/app';

  export default {
    name: 'PaginationCustom',
    components: {
      Pagination,
      Select,
    },
    props: {
      optionSizePage: {
        type: Array,
        default: () => [10, 20, 30, 40, 50],
      },
      total: {
        type: Number,
        default: 0,
      },
      page: {
        type: Number,
        default: () => 1,
      },
      size: {
        type: Number,
        default: () => 10,
      },
    },
    emits: ['changeCurrentPage'],
    setup(prop, { emit }) {
      const { t } = useI18n();
      const appStore = useAppStore();

      const currentPage = ref(1);
      const pageSize = ref(10);
      const scrollToTop = () => {
        document.getElementById('top-scroll')?.scrollIntoView({
          behavior: 'smooth',
        });
      };
      watch(
        () => currentPage.value,
        () => {
          scrollToTop();
          emit('changeCurrentPage', { page: currentPage.value, size: pageSize.value });
        },
      );
      watch(
        () => [prop.page, prop.size],
        () => {
          currentPage.value = prop.page;
          pageSize.value = prop.size;
        },
      );
      watch(
        () => pageSize.value,
        () => {
          scrollToTop();
          if (currentPage.value === 1) {
            emit('changeCurrentPage', { page: currentPage.value, size: pageSize.value });
          } else {
            currentPage.value = 1;
          }
        },
      );

      watch(
        () => appStore.resetPageBySearch,
        () => {
          if (currentPage.value !== 1) {
            currentPage.value = 1;
          }
        },
      );
      const selectOptionSizePage = computed(() => {
        return prop.optionSizePage.map((item) => {
          return {
            label: item + ' items',
            value: item,
            key: item,
          };
        });
      });
      return { pageSize, currentPage, selectOptionSizePage, t };
    },
  };
</script>
