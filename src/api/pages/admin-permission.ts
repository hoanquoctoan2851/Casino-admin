import { defHttp } from '/@/utils/http/axios';

enum Api {
  ApiGetListAdminPermission = '/permission',
  ApiUpdatePermission = '/permission',
  ApiHistoryEditPermission = '/log/user-history',
}

export function getListPermission(params) {
  return defHttp.get<any>(
    { url: Api.ApiGetListAdminPermission, params: params },
    { errorMessageMode: 'none' },
  );
}

export function updatePermission(params) {
  return defHttp.post<any>(
    { url: Api.ApiUpdatePermission, params: params },
    { errorMessageMode: 'none' },
  );
}

export function getHistoryEditPermission(params) {
  return defHttp.get<any>(
    { url: Api.ApiHistoryEditPermission, params },
    { errorMessageMode: 'none' },
  );
}
