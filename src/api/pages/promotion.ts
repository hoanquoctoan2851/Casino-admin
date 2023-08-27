import { defHttp } from '/@/utils/http/axios';

enum Api {
  ApiGetListPromotion = '/promotion',
  ApiCreatePromotion = '/promotion/create',
  ApiUpdatePromotion = '/promotion/update',
}

export function getListPromotion(params) {
  return defHttp.get<any>(
    { url: Api.ApiGetListPromotion, params: params },
    { errorMessageMode: 'none' },
  );
}

export function createPromotion(params, id) {
  return defHttp.post<any>(
    { url: `${Api.ApiCreatePromotion}${id ? '/' + id : ''}`, data: params },
    { errorMessageMode: 'none' },
  );
}

export function updatePromotion(params) {
  return defHttp.post<any>(
    { url: Api.ApiUpdatePromotion, data: params },
    { errorMessageMode: 'none' },
  );
}

export function getDetailsPromotion(id) {
  return defHttp.get<any>(
    { url: `${Api.ApiGetListPromotion}/${id}` },
    { errorMessageMode: 'none' },
  );
}
