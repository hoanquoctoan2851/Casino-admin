import dayjs from 'dayjs';
import { useAppInject } from '/@/hooks/web/useAppInject';
import { masterDataStore } from '/@/store/modules/masterData';
import { formatMoney } from '/@/utils';
import { FORMAT_TIME } from '/@/utils/constant';

export function useTransactionState() {
  const { getIsMobile } = useAppInject();
  const masterData = masterDataStore();
  const columnsTableTransaction = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
      width: '50px',
      fixed: true,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      fixed: !getIsMobile.value,
    },
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
    },
    {
      title: 'Token',
      key: 'token',
      dataIndex: 'token',
    },
    {
      title: 'Rate',
      key: 'rate',
      dataIndex: 'rate',
    },
    {
      title: 'Amount($)',
      key: 'amount',
      dataIndex: 'amount',
    },
    {
      title: 'Approver',
      key: 'approver',
      dataIndex: 'approver',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Date',
      key: 'date',
      dataIndex: 'date',
    },
  ];

  const mapDataTableTransaction = (data, currentPage = 1, pageSize = 10) => {
    return data?.map((item, index) => {
      const params = {
        index: (currentPage - 1) * pageSize + index + 1,
        id: item.id,
        key: data.indexOf(item),
        name: item.target,
        hash: item.hash,
        note: item.note,
        fWalletAddress: item.fWalletAddress,
        tWalletAddress: item.tWalletAddress,
        type: item.type?.toLowerCase(),
        token: masterData.getListTokenObject[item.symbol],
        rate: formatMoney(item.rate, 6),
        amount: item.amount,
        approver: {
          name: item.performedBy,
          id: item.id,
        },
        status: item.status.toLowerCase(),
        date: dayjs(item.createdAt).format(FORMAT_TIME.FULL),
      };
      return params;
    });
  };
  return {
    columnsTableTransaction,
    mapDataTableTransaction,
  };
}
