import dayjs from 'dayjs';
import { FORMAT_TIME, countryCodeList } from '/@/utils/constant';
import { compactString, formatMoney } from '/@/utils';

export function useUserManagerDetailsState() {
  const LIST_TABS = [
    {
      title: 'Account & balance',
      key: 'AccountBalance',
      value: 'AccountBalance',
    },
    {
      title: 'Withdraw & deposit history',
      key: 'WithdrawAndDeposit',
      value: 'WithdrawAndDeposit',
    },
    {
      title: 'Game history',
      key: 'GameHistory',
      value: 'GameHistory',
    },
    {
      title: 'Play history',
      key: 'PlayHistory',
      value: 'PlayHistory',
    },
  ];
  const LIST_PERMISSION_MODAL = [
    {
      title: 'Player',
      content: "Player at client site, can play game, can't access admin site",
    },
    {
      title: 'Supervisor',
      content:
        'Player at client site, can play game, can access admin site, can view all statistic information but can not perform any action',
    },
    {
      title: 'Promotion manager',
      content:
        'Player at client site, can play game, can access admin site, can view and perform all promotion related action!',
    },
    {
      title: 'User manager',
      content:
        'Player at client site, can play game, can access admin site, can view and perform all user related action!',
    },
    {
      title: 'Transaction manager',
      content:
        'Player at client site, can play game, can access admin site, can view and perform all transaction related action!',
    },
  ];

  const columnsTransactionHistory = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
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
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
    },
    {
      title: 'Network',
      key: 'network',
      dataIndex: 'network',
    },
    {
      title: 'Hash',
      key: 'hash',
      dataIndex: 'hash',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Note',
      key: 'note',
      dataIndex: 'note',
    },
    {
      title: 'Date',
      key: 'date',
      dataIndex: 'date',
    },
  ];

  const columnsTransactionStatistics = [
    {
      title: 'Token',
      dataIndex: 'token',
      key: 'token',
    },
    {
      title: 'Deposit',
      dataIndex: 'deposit',
      key: 'deposit',
    },
    {
      title: 'Withdraw',
      dataIndex: 'withdraw',
      key: 'withdraw',
    },
    {
      title: 'Deposit time',
      dataIndex: 'depositTime',
      key: 'depositTime',
    },
    {
      title: 'Withdraw time',
      dataIndex: 'withdrawTime',
      key: 'withdrawTime',
    },
  ];

  const columnsGameHistory = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Game',
      dataIndex: 'game',
      key: 'game',
    },
    {
      title: 'Turn Over($)',
      key: 'turnover',
      dataIndex: 'turnover',
    },
    {
      title: 'Casino GGR($)',
      key: 'ggr',
      dataIndex: 'ggr',
    },
    {
      title: 'User Win Rate',
      key: 'winRate',
      dataIndex: 'winRate',
    },
  ];

  const columnsPlayHistory = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Game',
      dataIndex: 'game',
      key: 'game',
    },
    {
      title: 'Round',
      key: 'round',
      dataIndex: 'round',
    },
    {
      title: 'Bet Amount',
      key: 'betAmount',
      dataIndex: 'betAmount',
    },
    {
      title: 'Casino Profit',
      key: 'profit',
      dataIndex: 'profit',
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
      title: 'Date',
      key: 'date',
      dataIndex: 'date',
    },
  ];
  const mapDataInfomationUser = (data) => {
    return {
      name: data.username,
      id: data.id,
      email: data.email,
      phone: data.phone,
      joinDate: dayjs(data.createdAt).format('MMMM D, YYYY'),
      rank: data.rank,
      refCode: data.affiliatedCode,
      country: countryCodeList.find((item) => item.code === data.country)?.Name,
      status: data.isActive,
      verify: data.isActive2FA,
    };
  };

  const mapDataTableBalance = (data) => {
    return data.map((item) => {
      return {
        key: data.indexOf(item),
        symbol: item.symbol,
        balance: item.balance,
      };
    });
  };

  const mapDataWalletAddress = (data) => {
    return data.map((item) => {
      return {
        key: data.indexOf(item),
        address: item.walletAddress,
        chain: item.chain,
        name: item.networkName,
      };
    });
  };

  const mapDataTableGameHistory = async (data, currentPage = 1, pageSize = 10) => {
    return await data?.map((item, index) => {
      return {
        index: (currentPage - 1) * pageSize + index + 1,
        key: item.id,
        name: item.name,
        turnover: formatMoney(item.turnover, 2),
        ggr: formatMoney(item.ggr, 2),
        winRate: formatMoney(item.winRate, 2),
      };
    });
  };

  const mapDataTablePlayHistory = async (data, currentPage = 1, pageSize = 10) => {
    return await data?.map((item, index) => {
      return {
        index: (currentPage - 1) * pageSize + index + 1,
        key: data.indexOf(item),
        name: item.name,
        round: compactString(item.round),
        betAmount: formatMoney(item.betAmount, 3),
        profit: formatMoney(item.winAmount, 3),
        token: item.token,
        rate: formatMoney(item.rate),
        date: dayjs(item.createdAt).format(FORMAT_TIME.FULL),
      };
    });
  };

  return {
    LIST_TABS,
    LIST_PERMISSION_MODAL,
    columnsTransactionHistory,
    columnsTransactionStatistics,
    columnsGameHistory,
    columnsPlayHistory,
    mapDataInfomationUser,
    mapDataTableBalance,
    mapDataWalletAddress,
    mapDataTableGameHistory,
    mapDataTablePlayHistory,
  };
}
