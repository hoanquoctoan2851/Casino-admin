<template>
  <div class="flex flex-col gap-[38px]">
    <div>
      <TodayStatistics />
    </div>
    <div class="flex flex-col gap-5">
      <div class="flex flex-row items-center justify-between">
        <div class="w-full h-[1px] bg-[#7B7E92]"> </div>
        <div class="w-full px-2 flex gap-2 flex-row items-center rounded-lg max-w-[400px]">
          <!-- <p class="text-white">Week</p>
          <div class="h-[23px] w-[1px] !bg-white"></div> -->
          <AppRangeDate @emit:range-date="getRangeDate" />
        </div>
        <div class="w-full h-[1px] bg-[#7B7E92]"> </div>
      </div>
      <div>
        <ListCartStatistics :dataReportDaily="dataReportDaily" />
      </div>
      <div>
        <ChartStatistics :dataDailyReport="dataDailyReport" :dataGraph="dataGraph" />
      </div>
      <div>
        <TokenData :dataTable="dataListToken" @sortData="sortDataTableToken" />
      </div>
      <div class="flex flex-row h-fit gap-5 screen-hide-sidebar:flex-wrap">
        <div class="w-full h-full">
          <PlayerData :dataTable="dataListPlayer" @sortData="sortDataTablePlayer" />
        </div>
        <div class="w-[500px] screen-hide-sidebar:w-full">
          <GameDataDashboard
            :dataTable="dataListGame"
            @fetch:gameData="fetchGameData"
            :loading="loadingGameData"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { reactive, toRefs, ref, watch } from 'vue';
  import TodayStatistics from './component/TodayDailyStatistics.vue';
  import AppRangeDate from '/@/components/Application/src/AppRangeDate.vue';
  import ListCartStatistics from './component/TransactionStatistics.vue';
  import ChartStatistics from './component/ChartStatistics.vue';
  import TokenData from './component/TokenData.vue';
  import PlayerData from './component/PlayerData.vue';
  import GameDataDashboard from './component/GameData.vue';
  import { useDashboardState } from './useDashboard';
  import {
    getTransactionReport,
    getGeneralGraph,
    getListTokenReport,
    getListUserReport,
    getGameReport,
  } from '/@/api/pages/dashboard';
  export default {
    components: {
      TodayStatistics,
      AppRangeDate,
      ListCartStatistics,
      ChartStatistics,
      TokenData,
      PlayerData,
      GameDataDashboard,
    },
    setup() {
      const rangeDate = ref([]);
      const states = reactive({
        typeGameData: 'ggr',
        loadingGameData: false,
        dataReportDaily: [],
        dataDailyReport: [],
        dataGraph: {},
        dataListToken: [],
        dataListPlayer: [],
        dataListGame: [],
      });
      const { mapDataTransactionReport, mapDataListToken, mapDataListPlayerData, mapDataListGame } =
        useDashboardState();

      //transaction report
      const fetchListTransactionReport = async () => {
        try {
          const params = {
            startDate: rangeDate.value?.[0] ? rangeDate.value?.[0] : null,
            endDate: rangeDate.value?.[1] ? rangeDate.value?.[1] : null,
          };
          const res = await getTransactionReport(params);
          states.dataReportDaily = await mapDataTransactionReport(res.data);
        } catch (error) {
          console.log(error);
        }
      };

      // daily report
      const sumArray = (array) => {
        return array?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      };

      // data graph
      const fetchDataGraph = async () => {
        try {
          const params = {
            startDate: rangeDate.value?.[0] ? rangeDate.value?.[0] : null,
            endDate: rangeDate.value?.[1] ? rangeDate.value?.[1] : null,
          };
          const res = await getGeneralGraph(params);
          states.dataGraph = {
            active_player: res.data.activePlayer,
            new_player: res.data.newPlayer,
            turn_over: res.data.turnOver,
            ggr: res.data.ggr,
            time: res.data.time,
          };

          states.dataDailyReport = [
            {
              key: 'active_player',
              value: sumArray(res.data.activePlayer),
            },
            {
              key: 'new_player',
              value: sumArray(res.data.newPlayer),
            },
            {
              key: 'turn_over',
              value: sumArray(res.data.turnOver),
            },
            {
              key: 'ggr',
              value: sumArray(res.data.ggr),
            },
          ];
        } catch (error) {
          console.log(error);
        }
      };

      // list data token

      const fetchListDataToken = async (sortKey = 'deposit', sortValue = 'desc') => {
        try {
          const params = {
            startDate: rangeDate.value?.[0] ? rangeDate.value?.[0] : null,
            endDate: rangeDate.value?.[1] ? rangeDate.value?.[1] : null,
            sortKey: sortKey,
            sortDirection: sortValue,
          };
          const res = await getListTokenReport(params);
          states.dataListToken = await mapDataListToken(res.data);
        } catch (error) {
          console.log(error);
        }
      };

      // list user report
      const fetchListUserData = async (sortKey = 'deposit', sortValue = 'desc') => {
        try {
          const params = {
            startDate: rangeDate.value?.[0] ? rangeDate.value?.[0] : null,
            endDate: rangeDate.value?.[1] ? rangeDate.value?.[1] : null,
            sortKey: sortKey,
            sortDirection: sortValue,
          };
          const res = await getListUserReport(params);
          states.dataListPlayer = await mapDataListPlayerData(res.data);
        } catch (error) {
          console.log(error);
        }
      };

      // list game report
      const fetchListGameData = async () => {
        try {
          states.loadingGameData = true;
          const params = {
            startDate: rangeDate.value?.[0] ? rangeDate.value?.[0] : null,
            endDate: rangeDate.value?.[1] ? rangeDate.value?.[1] : null,
            sortKey: states.typeGameData,
          };
          const res = await getGameReport(params);
          states.dataListGame = await mapDataListGame(res.data);
        } catch (error) {
          console.log(error);
        } finally {
          states.loadingGameData = false;
        }
      };

      const getRangeDate = (value) => {
        rangeDate.value = value;
      };

      const fetchData = async () => {
        await fetchListTransactionReport();
        await fetchDataGraph();
        await fetchListDataToken();
        await fetchListUserData();
        await fetchListGameData();
      };

      const fetchGameData = (data) => {
        states.typeGameData = data;
        fetchListGameData();
      };

      const sortDataTableToken = (value) => {
        fetchListDataToken(value.sortKey, value.sortValue);
      };

      const sortDataTablePlayer = (value) => {
        fetchListUserData(value.sortKey, value.sortValue);
      };

      watch(
        () => rangeDate.value,
        () => {
          fetchData();
        },
      );

      // onMounted(() => {
      //   fetchData();
      // });
      return {
        ...toRefs(states),
        getRangeDate,
        fetchGameData,
        sortDataTableToken,
        sortDataTablePlayer,
      };
    },
  };
</script>
