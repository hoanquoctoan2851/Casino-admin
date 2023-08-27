import { defHttp } from '/@/utils/http/axios';

enum Api {
  DailyReport = '/statistic/dashboard/daily',
  TransactionReport = '/statistic/dashboard/transaction',
  GeneralGraph = '/statistic/chart/dashboard/general',
  TokenReport = '/statistic/dashboard/token',
  UserReport = '/statistic/dashboard/user',
  GameReport = '/statistic/dashboard/game',
}

// IResultGetListDailyReport
interface IResultGetListDailyReport {
  status: string;
  data: {
    activePlayer: number;
    newPlayer: number;
    turnOver: number;
    ggr: number;
  };
}

// IResultGetListDailyReport
interface IResultGetTransactionReport {
  status: string;
  data: {
    deposit: number;
    withdraw: number;
    cashback: number;
    reward: number;
  };
}

// IResultGetListTokenReport
interface DataTokenReport {
  symbol: string;
  deposit: number;
  withdraw: number;
  balance: number;
  turnover: number;
  ggr: number;
}
interface IResultGetListTokenReport {
  status: string;
  data: Array<DataTokenReport>;
}

// IResultGeneralGraph
interface IResultGeneralGraph {
  status: string;
  data: {
    time: Array<string>;
    turnOver: Array<number>;
    ggr: Array<number>;
    activePlayer: Array<number>;
    newPlayer: Array<number>;
  };
}

// IResultgetListUserReport
interface DataUserReport {
  username: string;
  winRate: string;
  turnover: number;
  ggr: number;
}
interface IResultGetListUserReport {
  status: string;
  data: Array<DataUserReport>;
}

// IResultgetListUserReport
interface DataGameReport {
  name: string;
  winRate: string;
  turnover: number;
  ggr: number;
}
interface IResultGetListGameReport {
  status: string;
  data: Array<DataGameReport>;
}

export function getListDailyReport(params) {
  return defHttp.get<IResultGetListDailyReport>({ url: Api.DailyReport, params: params });
}

export function getTransactionReport(params) {
  return defHttp.get<IResultGetTransactionReport>({ url: Api.TransactionReport, params: params });
}

export function getListTokenReport(params) {
  return defHttp.get<IResultGetListTokenReport>({ url: Api.TokenReport, params: params });
}

export function getGeneralGraph(params) {
  return defHttp.get<IResultGeneralGraph>({ url: Api.GeneralGraph, params: params });
}

export function getListUserReport(params) {
  return defHttp.get<IResultGetListUserReport>({ url: Api.UserReport, params: params });
}

export function getGameReport(params) {
  return defHttp.get<IResultGetListGameReport>({ url: Api.GameReport, params: params });
}
