<template>
  <div>
    <div class="w-full rounded-2xl bg-gradient-to-b from-white to-[#1256BB] p-[1px]">
      <div
        class="flex relative h-full w-full pb-[80px] flex-col gap-[42px] items-center p-[25px] mobile:p-3 rounded-2xl justify-center bg-color-background-neuture-800 back"
      >
        <div class="flex flex-row justify-between flex-wrap w-full items-center">
          <div class="text-sm text-color-text-neuture-300 mb-6 flex flex-col gap-2">
            <p class="text-white font-normal text-xl">{{ dataUser?.name }}</p>
            <p>{{ dataUser?.email }}</p>
            <p>{{ dataUser?.phone }}</p>
          </div>
          <div class="flex flex-row flex-wrap gap-3 mb-6">
            <ModalDeposit :dataToken="stateData.dataTokenDeposit" />
            <ModalEditPermission :dataProps="stateData.dataEditPermission" />
            <ModalEditRank :dataProps="dataUser" />
            <div class="flex flex-row mobile:w-full gap-3">
              <Popconfirm
                placement="leftBottom"
                @confirm="handleUnBand(dataUser?.id, dataUser?.status)"
                :title="
                  !dataUser?.status
                    ? t('routes.user-manager.title_confirm_unband')
                    : t('routes.user-manager.title_confirm_band')
                "
                ok-text="Yes"
                cancel-text="No"
              >
                <Button
                  :type="dataUser?.status ? 'red-color' : 'green-color'"
                  class="!w-[100%] !p-3"
                >
                  <template #icon
                    ><img :src="dataUser?.status ? IconBandedWhite : IconUnbanded"
                  /></template>
                </Button>
              </Popconfirm>
              <!-- <Button type="yellow-color" class="!w-[100%] !p-3">
                <template #icon><img :src="ThreeUserIcon" /></template>
              </Button> -->
            </div>
          </div>
        </div>
        <div
          class="text-color-text-neuture-300 flex flex-row w-full justify-between flex-wrap mobile:grid mobile:grid-cols-2 mobile:gap-y-3 mobile:mb-8"
        >
          <div class="w-[171px] h-[42px]">
            <p class="text-center">Join date</p>
            <p class="text-center font-normal text-white">{{ dataUser?.joinDate }}</p>
          </div>
          <div class="w-[171px] h-[42px]">
            <p class="text-center">Rank</p>
            <p class="text-center font-normal text-white">{{ dataUser?.rank }}</p>
          </div>
          <div class="w-[171px] h-[42px]">
            <p class="text-center">Ref code</p>
            <p class="text-center font-normal text-white">{{
              dataUser?.refCode ? dataUser?.refCode : '-'
            }}</p>
          </div>
          <div class="w-[171px] h-[42px]">
            <p class="text-center">Country</p>
            <p class="text-center font-normal text-white">{{ dataUser?.country }}</p>
          </div>
          <div class="w-[171px] h-[42px]">
            <p class="text-center">Status</p>
            <p
              :class="[
                'text-center font-normal',
                dataUser?.status ? 'text-color-background-green-1' : 'text-color-background-red-1',
              ]"
              >{{ dataUser?.status ? 'Active' : 'Deactivate' }}</p
            >
          </div>
          <div class="w-[171px] h-[42px]">
            <p class="text-center">2FA</p>
            <p
              :class="[
                'text-center font-normal',
                dataUser?.verify ? 'text-color-background-green-1' : 'text-color-background-red-1',
              ]"
              >{{ dataUser?.verify ? 'Active' : 'Deactivate' }}</p
            >
          </div>
        </div>
        <div class="mb-8 w-full">
          <ListCartDetails :dataCartProp="dataInformation" />
        </div>
        <div
          class="bg-[#1256BB] tabs-custom-default overflow-hidden rounded-2xl absolute tablet:right-[12px] tablet:left-[12px] mobile:-bottom-[24px] -bottom-[30px] right-[60px] left-[60px] mobile:left-[8px] mobile:right-[8px]"
        >
          <Tabs size="large" v-model:activeKey="activeKey" class="w-full">
            <template v-for="item in LIST_TABS" :key="item.key">
              <TabPane :tab="item.title">
                <template #tab> </template>
              </TabPane>
            </template>
          </Tabs>
        </div>
      </div>
    </div>
    <div class="mt-[64px]">
      <component class="enter-y rounded-2xl" :is="activeKey" :data="stateData[`${activeKey}`]" />
    </div>
  </div>
</template>
<script>
  import { ref, onMounted, reactive, watch } from 'vue';
  import { Button, Popconfirm } from 'ant-design-vue';
  import IconBandedWhite from '/@/assets/svg/banded-white-icon.svg';
  import ThreeUserIcon from '/@/assets/svg/three-user-icon.svg';
  import AccountBalance from './tabs/AccountBalance.vue';
  import GameHistory from './tabs/GameHistory.vue';
  import WithdrawAndDeposit from './tabs/WithdrawAndDeposit.vue';
  import PlayHistory from './tabs/PlayHistory.vue';
  import { Tabs } from 'ant-design-vue';
  import { useUserManagerDetailsState } from './useUserDetails';
  import { apiGetDetailsUser } from '/@/api/pages/user-manager';
  import ListCartDetails from './component/ListCartDetails.vue';
  import ModalDeposit from './component/ModalDeposit.vue';
  import ModalEditPermission from './component/ModalEditPermission.vue';
  import ModalEditRank from '/@/components/Application/src/RankUpgrade.vue';
  import IconUnbanded from '/@/assets/svg/user-manager/icon-unbanded.svg';
  import { useI18n } from 'vue-i18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { apiBandUser } from '/@/api/pages/user-manager';
  import { router } from '/@/router';
  import { useAppStore } from '/@/store/modules/app';
  export default {
    components: {
      Button,
      Tabs,
      TabPane: Tabs.TabPane,
      AccountBalance,
      GameHistory,
      WithdrawAndDeposit,
      PlayHistory,
      ListCartDetails,
      ModalDeposit,
      ModalEditPermission,
      ModalEditRank,
      Popconfirm,
    },
    setup() {
      const activeKey = ref('AccountBalance');
      const { LIST_TABS, mapDataInfomationUser } = useUserManagerDetailsState();
      const appStore = useAppStore();
      const { t } = useI18n();
      const dataUser = ref(null);
      const dataInformation = ref(null);
      const stateData = reactive({
        dataTokenDeposit: {},
        AccountBalance: '',
        GameHistory: '',
        WithdrawAndDeposit: {
          transactionHistory: [],
          transactionStatistics: [],
        },
        PlayHistory: '',
        dataEditPermission: {
          userName: '',
          roleValue: '',
        },
      });

      const setupDataProps = (data) => {
        stateData.dataEditPermission.userName = data.info.username;
        stateData.dataEditPermission.roleValue = data.info.type;
      };

      const fetchUserDetails = async () => {
        try {
          const res = await apiGetDetailsUser(router.currentRoute.value.params.id);
          dataUser.value = mapDataInfomationUser(res?.data.info);
          dataInformation.value = res.data;
          stateData.AccountBalance = res.data;
          stateData.AccountBalance.tokens?.forEach((element) => {
            stateData.dataTokenDeposit[element.symbol] = element;
          });
          setupDataProps(res.data);
        } catch (error) {
          console.log(error);
        }
      };

      const handleUnBand = async (id, status) => {
        try {
          const params = {
            userId: id,
            value: status ? 0 : 1,
            reason: '',
          };
          const res = await apiBandUser(params);
          if (res.data)
            useMessage().createMessage.success(status ? 'Account locked' : 'Account unlocked');
          fetchUserDetails();
        } catch (error) {
          console.log(error);
          useMessage().createMessage.error(t('common.error_message'));
        }
      };

      watch(
        () => activeKey.value,
        () => {
          if (activeKey.value === 'AccountBalance') {
            fetchUserDetails();
          }
        },
      );
      watch(
        () => appStore.reCallApi,
        () => {
          fetchUserDetails();
        },
      );
      onMounted(() => {
        fetchUserDetails();
      });
      return {
        t,
        activeKey,
        dataUser,
        handleUnBand,
        stateData,
        dataInformation,
        IconBandedWhite,
        ThreeUserIcon,
        LIST_TABS,
        IconUnbanded,
      };
    },
  };
</script>
