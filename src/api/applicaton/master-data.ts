import { defHttp } from '/@/utils/http/axios';
enum Api {
  ApiGetTokenInfo = '/master-data/token',
  ApiGetListAdmin = '/master-data/admin',
  ApiGetListGame = '/master-data/game',
  ApiGetListRank = '/master-data/rank',
}

export function getListTokenInfo() {
  return defHttp.get<any>({ url: Api.ApiGetTokenInfo });
}

export function getListAdmin() {
  return defHttp.get<any>({
    url: Api.ApiGetListAdmin,
  });
}

export function getListGameInfo() {
  return defHttp.get<any>({ url: Api.ApiGetListGame });
}

export function getListRank() {
  return defHttp.get<any>({ url: Api.ApiGetListRank });
}
