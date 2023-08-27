<template>
  <div class="flex flex-col gap-1">
    <p v-if="renRoute" class="text-normal">Time</p>
    <RangePicker
      v-model:value="rangeDate"
      :allowEmpty="[true, true]"
      class="w-full"
      :ranges="ranges"
      separator="-"
      :disabled-date="disabledDate"
      :placeholder="['Start', 'End']"
      :format="'DD/MM/YYYY'"
      value-format="YYYY/MM/DD"
    />
  </div>
</template>
<script lang="ts">
  // comment
  import dayjs, { Dayjs } from 'dayjs';
  import { RangePicker } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { defineComponent, ref, computed, watch, onMounted } from 'vue';
  import { useAppInject } from '/@/hooks/web/useAppInject';
  import { router } from '/@/router';
  const date = new Date();

  // Get the user's browser's GMT offset in minutes
  const gmtOffsetMinutes = date.getTimezoneOffset();
  const timeStampToGmt = gmtOffsetMinutes * 60 * 1000 * -1;
  type RangeValue = [Dayjs, Dayjs];
  export default defineComponent({
    components: { RangePicker },
    props: {
      rangeDateProp: {
        type: Array,
        default: () => [],
      },
    },
    emits: ['emit:rangeDate'],
    setup(_, { emit }) {
      const { getIsMobile } = useAppInject();
      const rangeDate = ref<Array<any>>([
        dayjs().subtract(30, 'day').startOf('day'),
        dayjs().endOf('day'),
      ]);
      const { t } = useI18n();
      const ranges = {
        Today: [dayjs().startOf('day'), dayjs().endOf('date')] as RangeValue,
        'This month': [dayjs().startOf('month'), dayjs().endOf('day')] as RangeValue,
        'This week': [dayjs().startOf('week'), dayjs().endOf('day')] as RangeValue,
      };

      const disabledDate = (current: Dayjs) => {
        return current && current > dayjs().endOf('day');
      };
      const renRoute = computed(() => {
        if (router.currentRoute.value.path.includes('dashboard')) {
          return false;
        }
        return true;
      });
      watch(
        () => rangeDate.value,
        () => {
          console.log(dayjs(rangeDate?.value?.[0]));
          emit('emit:rangeDate', [
            rangeDate?.value?.[0]
              ? dayjs(rangeDate?.value?.[0]).unix() * 1000 + timeStampToGmt
              : '',
            rangeDate?.value?.[1]
              ? dayjs(rangeDate.value?.[1]).endOf('day').unix() * 1000 + timeStampToGmt
              : '',
          ]);
        },
      );
      onMounted(() => {
        emit('emit:rangeDate', [
          rangeDate?.value?.[0] ? dayjs(rangeDate?.value?.[0]).unix() * 1000 + timeStampToGmt : '',
          rangeDate?.value?.[1]
            ? dayjs(rangeDate.value?.[1]).endOf('day').unix() * 1000 + timeStampToGmt
            : '',
        ]);
      });
      return {
        t,
        disabledDate,
        rangeDate,
        getIsMobile,
        renRoute,
        ranges,
      };
    },
  });
</script>
