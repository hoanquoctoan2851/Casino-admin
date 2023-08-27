import { defHttp } from '/@/utils/http/axios';

enum Api {
  ApiGetListTransaction = '/transaction',
  ApiUpdateApprover = '/transaction/withdraw',
  ApiPerformer = '/transaction/set-performer',
}

interface IResultGetListTransaction {
  data: {};
}

export function getListTransaction(params) {
  return defHttp.get<IResultGetListTransaction>(
    { url: Api.ApiGetListTransaction, params: params },
    { errorMessageMode: 'none' },
  );
}

export function updateApprover(params) {
  return defHttp.post<any>({ url: Api.ApiUpdateApprover, params }, { errorMessageMode: 'none' });
}

export function updatePerformer(params) {
  return defHttp.post<any>({ url: Api.ApiPerformer, data: params }, { errorMessageMode: 'none' });
}
