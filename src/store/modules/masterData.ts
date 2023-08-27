import { defineStore } from 'pinia';
import { store } from '/@/store';
import {
  getListTokenInfo,
  getListAdmin,
  getListGameInfo,
  getListRank,
} from '/@/api/applicaton/master-data';
import { convertObjectToArray } from '/@/utils/helper/application';
export const masterDataStore = defineStore({
  id: 'app-master-data',
  state: (): any => ({
    listToken: {},
    listChain: {},
    listAdmin: [],
    listGame: [],
    listRank: [],
  }),
  getters: {
    getListTokenObject(): any {
      const objectToken = {};
      this.listToken?.forEach((element) => {
        objectToken[element.symbol] = {
          name: element.name,
          icon: element.icon,
          id: element.id,
          symbol: element.symbol,
        };
      });
      return objectToken;
    },
    getListChain(): any {
      const objectChain = {};
      this.listChain?.forEach((element) => {
        objectChain[element.chainId] = {
          name: element.networkName,
          link: element.explorerUrl,
          icon: element.icon,
          id: element.id,
          chainId: element.chainId,
        };
      });
      return objectChain;
    },
    getListTokenArray(): any {
      return convertObjectToArray(this.listToken, (key, value) => ({
        name: key,
        label: value.name,
        value: value.symbol,
        ...value,
      }));
    },

    getListAdminSelect(): any {
      const listAdmin = this.listAdmin?.map((adminData) => {
        return {
          label: adminData.username,
          value: adminData.username,
          key: adminData.id,
        };
      });
      listAdmin.unshift({
        label: 'All',
        value: '',
        key: 'all',
      });
      return listAdmin;
    },
    getListGameSelect(): any {
      const listGame = this.listGame?.map((gameData) => {
        return {
          label: gameData.name,
          value: gameData.gameCode,
          key: gameData.gameCode,
        };
      });
      listGame.unshift({
        label: 'All',
        value: '',
        key: 'all',
      });
      return listGame;
    },
    getListRank(): any {
      return this.listRank;
    },
    getListRankSelect(): any {
      const listRank = this.listRank?.map((rank) => {
        return {
          label: rank.label,
          key: rank.id,
          value: rank.type,
        };
      });
      listRank.unshift({
        label: 'All',
        value: '',
        key: 'all',
      });
      return listRank;
    },
    getTableRankDetails(): any {
      return this.listRank?.map((item) => {
        return {
          id: item.id,
          userRank: item.label,
          dailyLimit: item.dailyWithdraw,
          maxAmount: item.maxWithdraw,
          minAmount: item.minWithdraw,
          cashback: item.cashback,
        };
      });
    },

    getListRankObject(): any {
      const listRank = {};
      this.listRank?.forEach((item) => {
        listRank[item.type] = item;
      });
      return listRank;
    },
  },
  actions: {
    async setListToken() {
      try {
        const res = await getListTokenInfo();
        this.listChain = res.data.chain;
        this.listToken = res.data.token;
      } catch (error) {
        console.log(error);
      }
    },
    async setListAdmin() {
      try {
        const res = await getListAdmin();
        this.listAdmin = res?.data;
      } catch (error) {
        console.log(error);
      }
    },
    async setListGame() {
      try {
        const res = await getListGameInfo();
        this.listGame = res?.data;
      } catch (error) {
        console.log(error);
      }
    },
    async setListRank() {
      try {
        const res = await getListRank();
        this.listRank = res?.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return masterDataStore(store);
}
