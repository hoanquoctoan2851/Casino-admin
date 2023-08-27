<template>
  <div>
    <div class="bg-[#1256BB] tabs-custom-default overflow-hidden rounded-2xl">
      <Tabs size="large" v-model:activeKey="activeKey" class="w-full">
        <template v-for="item in LIST_TABS" :key="item.key">
          <TabPane :tab="item.title">
            <template #tab> </template>
          </TabPane>
        </template>
      </Tabs>
    </div>
    <div class="mt-[12px]">
      <component class="enter-y rounded-2xl" :is="activeKey" />
    </div>
  </div>
</template>
<script>
  import { ref } from 'vue';
  import { Tabs } from 'ant-design-vue';
  import RankSetting from './component/tabs/TabRankSetting.vue';
  import Cashback from './component/tabs/TabCashback.vue';
  import RankUpgrade from './component/tabs/TabRankUpgrade.vue';
  import CashbackHistory from './component/tabs/CashbackHistory.vue';
  import Reward from './component/tabs/TabReward.vue';
  const LIST_TABS = [
    {
      title: 'Rank upgrade',
      key: 'RankUpgrade',
      value: 'RankUpgrade',
    },
    {
      title: 'Cashback',
      key: 'Cashback',
      value: 'Cashback',
    },
    {
      title: 'Cashback History',
      key: 'CashbackHistory',
      value: 'CashbackHistory',
    },
    {
      title: 'Reward',
      key: 'Reward',
      value: 'Reward',
    },
    {
      title: 'Rank setting',
      key: 'RankSetting',
      value: 'RankSetting',
    },
  ];
  export default {
    components: {
      Tabs,
      RankSetting,
      Cashback,
      RankUpgrade,
      CashbackHistory,
      Reward,
    },
    setup() {
      const activeKey = ref('RankUpgrade');
      return {
        LIST_TABS,
        activeKey,
      };
    },
  };
</script>
