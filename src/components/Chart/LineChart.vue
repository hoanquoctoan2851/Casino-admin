<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script>
  import { ref, reactive, onMounted, watch } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  export default {
    name: 'LineChart',
    props: {
      width: {
        type: String,
        default: '100%',
      },
      height: {
        type: String,
        default: '328px',
      },
      dataChart: {
        type: Object,
        default: () => {},
      },
      nameSeries: {
        type: Object,
        default: () => {
          return {
            name: 'Token',
            unit: ' USDT',
          };
        },
      },
    },
    setup(prop) {
      const chartRef = ref();
      const { setOptions } = useECharts(chartRef);
      const option = reactive({
        xAxis: {
          type: 'category',
          data: prop.dataChart?.time ? prop.dataChart?.time : [],
        },
        yAxis: {
          name: 'People',
          type: 'value',
        },
        series: [
          {
            data: prop.dataChart?.data ? prop.dataChart?.data : [],
            type: 'line',
            smooth: true,
          },
        ],
      });

      watch(
        () => prop.dataChart,
        () => {
          option.xAxis.data = prop.dataChart?.time ? prop.dataChart?.time : [];
          option.series[0].data = prop.dataChart?.data ? prop.dataChart?.data : [];
          option.yAxis.name = prop.dataChart?.unit;
          setOptions(option);
        },
      );
      onMounted(() => setOptions(option));
      return { chartRef };
    },
  };
</script>
