import dayjs from 'dayjs';
import { formatMoney } from '/@/utils';
import { FORMAT_TIME } from '/@/utils/constant';

export function useVipManagerState() {
  const columnsTableCashbackDetails = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Token',
      dataIndex: 'token',
      key: 'token',
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate    ',
    },
    {
      title: 'Deposit($)',
      dataIndex: 'deposit',
      key: 'deposit',
    },
    {
      title: 'Withdraw($)',
      dataIndex: 'withdraw',
      key: 'withdraw',
    },
    {
      title: 'Reward($)',
      dataIndex: 'reward',
      key: 'reward',
    },
    {
      title: 'Provisional Cashback($)',
      dataIndex: 'provisional',
      key: 'provisional',
    },
    {
      title: 'Actual cashback($)',
      dataIndex: 'actual',
      key: 'actual ',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Paid at',
      dataIndex: 'paidAt',
      key: 'paidAt',
    },
  ];

  const columnsTableCashbackHistoryDetails = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Username',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Deposit($)',
      dataIndex: 'deposit',
      key: 'deposit',
    },
    {
      title: 'Withdraw($)',
      dataIndex: 'withdraw',
      key: 'withdraw',
    },
    {
      title: 'Total reward($)',
      dataIndex: 'reward',
      key: 'reward',
    },

    {
      title: 'Cashback',
      dataIndex: 'cashback',
      key: 'cashback',
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate    ',
    },
    {
      title: 'Admin',
      dataIndex: 'admin',
      key: 'admin',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
  ];

  const columnsCashback = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Vip',
      key: 'vip',
      dataIndex: 'vip',
    },
    {
      title: 'Deposit($)',
      key: 'deposit',
      dataIndex: 'deposit',
    },
    {
      title: 'Withdraw($)',
      key: 'withDraw',
      dataIndex: 'withDraw',
    },
    {
      title: 'Balance($)',
      key: 'balance',
      dataIndex: 'balance',
    },
    {
      title: 'Total reward($)',
      key: 'profit',
      dataIndex: 'profit',
    },

    {
      title: 'Rate (%)',
      key: 'rate',
      dataIndex: 'rate',
    },
    {
      title: 'Cashback($)',
      key: 'cashback',
      dataIndex: 'cashback',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
    },
  ];

  const columnsCashbackHistory = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Deposit($)',
      key: 'deposit',
      dataIndex: 'deposit',
    },
    {
      title: 'Withdraw($)',
      key: 'withDraw',
      dataIndex: 'withDraw',
    },
    {
      title: 'Balance($)',
      key: 'balance',
      dataIndex: 'balance',
    },
    {
      title: 'Total reward($)',
      key: 'reward',
      dataIndex: 'reward',
    },
    {
      title: 'Cashback($)',
      key: 'cashback',
      dataIndex: 'cashback',
    },
    {
      title: 'Rate',
      key: 'rate',
      dataIndex: 'rate',
    },
    {
      title: 'Admin',
      key: 'admin',
      dataIndex: 'admin',
    },
    {
      title: 'Time',
      key: 'time',
      dataIndex: 'time',
    },
  ];

  const columnsRankUpgrade = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Rank',
      key: 'rank',
      dataIndex: 'rank',
    },
    {
      title: 'Turn over($)',
      key: 'turnOver',
      dataIndex: 'turnOver',
    },
    {
      title: 'User GGR($)',
      key: 'ggr',
      dataIndex: 'ggr',
    },
    {
      title: 'Withdraw($)',
      key: 'withDraw',
      dataIndex: 'withDraw',
    },
    {
      title: 'Deposit($)',
      key: 'deposit',
      dataIndex: 'deposit',
    },
    {
      title: 'Bet time',
      key: 'betTime',
      dataIndex: 'betTime',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
    },
  ];

  const columnsReward = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: 'Total bet($)',
      dataIndex: 'totalBet',
      key: 'totalBet',
    },
    {
      title: 'Reward($)',
      dataIndex: 'reward',
      key: 'reward',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
  ];

  const columnsTableRankSetting = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: 'Daily limit',
      dataIndex: 'dailyLimit',
      key: 'dailyLimit',
    },
    {
      title: 'Min Amount',
      dataIndex: 'minAmount',
      key: 'minAmount',
    },
    {
      title: 'Max Amount',
      dataIndex: 'maxAmount',
      key: 'maxAmount',
    },
    {
      title: 'Cashback rate',
      dataIndex: 'cashbackRate',
      key: 'cashbackRate',
    },
    {
      title: 'Reward rate',
      dataIndex: 'rewardRate',
      key: 'rewardRate',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  const columnsTableRankSettingSecond = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Username',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Current rank',
      dataIndex: 'currentRank',
      key: 'currentRank',
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return {
    columnsTableCashbackDetails,
    columnsCashback,
    columnsRankUpgrade,
    columnsTableCashbackHistoryDetails,
    columnsCashbackHistory,
    columnsTableRankSettingSecond,
    columnsTableRankSetting,
    columnsReward,
  };
}

export async function mapDataRankUpgrade(data, currentPage = 1, pageSize = 10) {
  return await data?.map((item, index) => ({
    index: (currentPage - 1) * pageSize + index + 1,
    key: item.userId,
    id: item.userId,
    name: item.username,
    rank: item.label,
    turnOver: formatMoney(item.bet, 2),
    ggr: formatMoney(item.earn, 2),
    withDraw: formatMoney(item.withdraw, 2),
    deposit: formatMoney(item.deposit, 2),
    betTime: item.betCount,
  }));
}

export async function mapDataCashback(data: any, currentPage = 1, pageSize = 10) {
  return await data?.map((item, index) => {
    const cashback =
      (item.totalDeposit - item.totalWithdraw - (item.totalBalance || 0)) *
        (item.cashbackRate / 100) -
      item.totalReward;
    return {
      index: (currentPage - 1) * pageSize + index + 1,
      idUer: item.userId,
      key: item.userId,
      name: item.username,
      vip: item.label,
      balance: formatMoney(item.totalBalance, 2),
      rate: formatMoney(item.cashbackRate, 2),
      withDraw: formatMoney(item.totalWithdraw, 2),
      deposit: formatMoney(item.totalDeposit, 2),
      reward: formatMoney(item.totalReward, 2),
      cashback: formatMoney(cashback < 0 ? 0 : cashback, 2),
    };
  });
}

export async function mapDataCashbackHistory(data: any, currentPage = 1, pageSize = 10) {
  return await data?.map((item, index) => {
    return {
      index: (currentPage - 1) * pageSize + index + 1,
      idUser: item.userId,
      key: item.userId,
      name: item.username,
      balance: formatMoney(item.paidBalance, 2),
      rate: item.paidCashbackRate,
      reward: formatMoney(item.totalReward, 2),
      status: item.paidAt > 0 ? 'Paid' : 'Rejected',
      withdraw: formatMoney(item.totalWithdraw, 2),
      deposit: formatMoney(item.totalDeposit, 2),
      cashback: formatMoney(item.paidCashback, 2),
      admin: item.paidBy || '-',
      time: dayjs(item.paidAt).format(FORMAT_TIME.FULL),
    };
  });
}

export async function mapDataReward(data: any, currentPage = 1, pageSize = 10) {
  return await data?.map((item, index) => {
    return {
      index: (currentPage - 1) * pageSize + index + 1,
      name: item.username,
      rank: item.rank,
      reward: formatMoney(item.rewardAmount, 2),
      totalBet: formatMoney(item.betAmount, 2),
      time: dayjs(item.createdAt).format(FORMAT_TIME.FULL),
    };
  });
}

export async function mapDataRankSetting(data: any, currentPage = 1, pageSize = 10) {
  return await data?.map((item, index) => {
    return {
      index: (currentPage - 1) * pageSize + index + 1,
      key: item.userId,
      name: item.username,
      totalBet: formatMoney(item.bet, 2),
      rawBet: item.bet,
      requireBet: item.label,
      currentRank: item.label,
      affiliateCommission: item.affiliateCommission,
      affiliateReferal: item.affiliateReferal,
      affiliateBonus: item.affiliateBonus,
    };
  });
}
