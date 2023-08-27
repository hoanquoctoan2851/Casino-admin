import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetListUser = '/user',
  ApiBandUser = '/user/ban',
  ApiGetDetailsUser = '/user',
  ApiUpdateDeposit = '/transaction/deposit',
  ApiUpdatePermission = '/user/update-role',
  ApiUserTransactionHistory = '/user/transaction-history',
  ApiGameHistory = '/user/game-history',
  ApiPlayHistory = '/user/play-history',
  ApiUpdateRank = '/user/rank',
}

export function getListUser(params) {
  return defHttp.get<any>({ url: Api.GetListUser, params: params }, { errorMessageMode: 'none' });
}

export function apiBandUser(params) {
  return defHttp.post<any>(
    { url: `${Api.ApiBandUser}/${params.userId}`, params },
    { errorMessageMode: 'none' },
  );
}

export function apiGetDetailsUser(params) {
  return defHttp.get<any>(
    { url: `${Api.ApiGetDetailsUser}/${params}` },
    { errorMessageMode: 'none' },
  );
}

export function apiGetHistoryTransaction(params) {
  return defHttp.get<any>(
    { url: Api.ApiUserTransactionHistory, params: params },
    { errorMessageMode: 'none' },
  );
}

export function apiGetGameHistory(params) {
  return defHttp.get<any>(
    { url: Api.ApiGameHistory, params: params },
    { errorMessageMode: 'none' },
  );
}

export function apiGetPlayHistory(params) {
  return defHttp.get<any>(
    { url: Api.ApiPlayHistory, params: params },
    { errorMessageMode: 'none' },
  );
}

export function apiUpdateDeposit(params) {
  return defHttp.post<any>({ url: Api.ApiUpdateDeposit, params }, { errorMessageMode: 'none' });
}

export function apiUpdatePermission(params) {
  return defHttp.post<any>({ url: Api.ApiUpdatePermission, params }, { errorMessageMode: 'none' });
}

export function apiGetBalanceToken(id) {
  return defHttp.get<any>({ url: `/users/balance-token/${id}` }, { errorMessageMode: 'none' });
}

export function apiUpdateRank(params) {
  return defHttp.post<any>({ url: Api.ApiUpdateRank, data: params }, { errorMessageMode: 'none' });
}
