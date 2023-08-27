<template>
  <div>
    <div class="w-full rounded-2xl bg-gradient-to-b from-white to-[#1256BB] mb-4 p-[1px]">
      <div
        class="flex relative h-full w-full pb-[16px] flex-col gap-[42px] items-center p-[25px] mobile:p-3 rounded-2xl justify-center bg-color-background-neuture-800 back"
      >
        <div class="flex flex-row justify-between mobile:flex-col w-full items-center">
          <div class="text-sm text-color-text-neuture-300 mb-6 flex flex-col gap-2 w-full">
            <p class="text-white font-normal text-xl">Hoangtoan</p>
            <p>Hoangtoana1@gmail.com</p>
            <p>0969985433</p>
          </div>
        </div>
        <div class="mb-8 w-full">
          <ListCartDetails :dataCartProp="dataInformation" />
        </div>
      </div>
    </div>
    <TableCashbackHistoryDetails />
  </div>
</template>
<script>
  import { onMounted, ref } from 'vue';
  import ListCartDetails from './component/ListCartDetails.vue';
  import { useI18n } from 'vue-i18n';
  import TableCashbackHistoryDetails from './component/TableCashbackHistoryDetails.vue';

  export default {
    components: {
      ListCartDetails,
      TableCashbackHistoryDetails,
    },
    setup() {
      const { t } = useI18n();
      const dataTable = ref([]);

      onMounted(() => {});
      return {
        t,
        dataTable,
      };
    },
  };
</script>
