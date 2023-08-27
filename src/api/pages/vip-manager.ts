import { defHttp } from '/@/utils/http/axios';

enum Api {
  ApiGetListRankUpgrade = '/statistic/vip/user',
  ApiCashbackReport = '/vip/cashback',
  ApiCashbackHistory = '/vip/cashback-history',
  ApiCashbackDetails = '/vip/cashback',
  ApiApprove = '/vip/cashback/paid',
  ApiReject = '/vip/cashback/reject',
  ApiRewardHistory = '/vip/reward-history',
  ApiUpdateRankVip = '/vip/update-rank',
}

export function getListRankUpgrade(params) {
  return defHttp.get<any>(
    { url: Api.ApiGetListRankUpgrade, params: params },
    { errorMessageMode: 'none' },
  );
}

export function getListCashbackReport(params) {
  return defHttp.get<any>(
    { url: Api.ApiCashbackReport, params: params },
    { errorMessageMode: 'none' },
  );
}

export function getListCashbackHistory(params) {
  return defHttp.get<any>(
    { url: Api.ApiCashbackHistory, params: params },
    { errorMessageMode: 'none' },
  );
}

export function getListRewardHistory(params) {
  return defHttp.get<any>(
    { url: Api.ApiRewardHistory, params: params },
    { errorMessageMode: 'none' },
  );
}

export function getListCashbackDetails(params) {
  return defHttp.get<any>(
    { url: `${Api.ApiCashbackDetails}/${params.id}`, params: params },
    { errorMessageMode: 'none' },
  );
}

export function approveCashback(id) {
  return defHttp.post<any>({ url: `${Api.ApiApprove}/${id}` }, { errorMessageMode: 'none' });
}

export function rejectCashback(id) {
  return defHttp.post<any>({ url: `${Api.ApiReject}/${id}` }, { errorMessageMode: 'none' });
}

export function apiUpdateRank(params) {
  return defHttp.post<any>(
    { url: Api.ApiUpdateRankVip, data: params },
    { errorMessageMode: 'none' },
  );
}
