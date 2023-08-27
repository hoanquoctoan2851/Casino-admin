<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { TreeChart } from 'echarts/charts';
  import echarts from '/@/utils/lib/echarts';
  echarts.use([TreeChart]);
  export default {
    name: 'TreeChart',
    props: {
      width: {
        type: String,
        default: '100%',
      },
      height: {
        type: String,
        default: '100%',
      },
      dataChart: {
        type: Object,
        default: () => ({
          name: 'Stefan Zweig',
          value: 'CEO',
          children: [
            {
              name: 'Leo Tolstoy',
              value: 'CFO',
              children: [
                {
                  name: 'Fyodor Dostoyevski',
                  value: 'Manager',
                },
                {
                  name: 'Edward III',
                  value: 'Manager',
                },
                {
                  name: 'Anna Karanina',
                  value: 'Manager',
                },
              ],
            },
            {
              name: 'Barrack Obama',
              value: 'CMO',
              children: [
                {
                  name: 'Henry Kissinger',
                  value: 'Social Media',
                },
                {
                  name: 'Abraham Lincoln',
                  value: 'Research',
                },
              ],
            },
          ],
        }),
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
      const option = reactive<any>({
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
        },
        series: [
          {
            type: 'tree',
            id: 0,
            data: [prop.dataChart],

            label: {
              name: 'tree1',
              top: '10%',
              left: '8%',
              bottom: '22%',
              right: '20%',
              animationDuration: 550,
              animationDurationUpdate: 750,
              formatter: [['{avatar|}', '{username|{b}}'].join(''), ['{userTitle|{c}}']].join('\n'),
              rich: {
                avatar: {
                  fontSize: 20,
                  padding: [20, 0, 0, 20],
                  width: 25,
                  height: 25,
                  borderWidth: 2,
                  backgroundColor: {
                    image:
                      'https://cdn.pixabay.com/photo/2016/02/19/15/46/labrador-retriever-1210559__340.jpg',
                    borderRadius: 100,
                  },
                },
                username: {
                  align: 'left',
                  padding: [0, 0, 0, 15],
                  verticalAlign: 'top',
                  fontSize: 18,
                  width: 50,
                  height: 50,
                },
                userTitle: {
                  align: 'left',
                  padding: [-30, 0, 0, 75],
                  verticalAlign: 'top',
                  color: '#808080',
                  fonntWeight: 10,
                  fontSize: 15,
                  width: 50,
                  height: 50,
                },
              },
            },
          },
        ],
      });
      onMounted(() => setOptions(option));
      return { chartRef };
    },
  };
</script>
