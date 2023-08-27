import { useI18n } from '/@/hooks/web/useI18n';
import IconCartTotalDeposit from '/@/assets/svg/dashboard/cart-total-deposit.svg';
import IconCartTotalWithdraw from '/@/assets/svg/dashboard/cart-total-withdraw.svg';
import IconCartTotalCashback from '/@/assets/svg/dashboard/cart-total-cashback.svg';
import IconCartTotalAffPayment from '/@/assets/svg/dashboard/cart-total-aff-payment.svg';
import ActiveIconCart from '/@/assets/svg/dashboard/today-active-cart.svg';
import NewIconCart from '/@/assets/svg/dashboard/today-new-cart.svg';
import TurnOverIconCart from '/@/assets/svg/dashboard/today-turn-over-cart.svg';
import GgrIconCart from '/@/assets/svg/dashboard/today-ggr-cart.svg';
import SymbolSbg from '/@/assets/image-mock/sbg-symbol.png';
import { convertObjectToArray } from '/@/utils/helper/application';
import { formatMoney } from '/@/utils';

export function useDashboardState() {
  const { t } = useI18n();

  const LIST_CART_FORM = {
    total_deposit: {
      title: t('routes.dashboard.today.total_deposit'),
      icon: IconCartTotalDeposit,
      color: false,
      unit: '$',
    },
    total_withdraw: {
      title: t('routes.dashboard.today.total_withdraw'),
      icon: IconCartTotalWithdraw,
      color: false,
      unit: '$',
    },
    total_cashback: {
      title: t('routes.dashboard.today.total_cashback'),
      icon: IconCartTotalCashback,
      unit: '$',
    },
    total_aff_payment: {
      title: t('routes.dashboard.today.total_aff_payment'),
      icon: IconCartTotalAffPayment,
      unit: '$',
    },
  };

  const LIST_CART_FORM_DAILY = {
    active_player: {
      title: t('routes.dashboard.today.active_player'),
      icon: ActiveIconCart,
      color: false,
      unit: '',
    },
    new_player: {
      title: t('routes.dashboard.today.new_player'),
      icon: NewIconCart,
      color: false,
      unit: '',
    },
    turn_over: {
      title: t('routes.dashboard.today.turn_over'),
      icon: TurnOverIconCart,
      unit: '$',
      color: true,
    },
    ggr: {
      title: t('routes.dashboard.today.ggr'),
      icon: GgrIconCart,
      unit: '$',
      color: true,
    },
  };

  const LIST_MENU_ITEMS_CHART = {
    active_player: {
      title: t('routes.dashboard.today.active_player'),
      icon: true,
      color: false,
      unit: '',
    },
    new_player: {
      title: t('routes.dashboard.today.new_player'),
      icon: true,
      color: false,
      unit: '',
    },
    turn_over: {
      title: t('routes.dashboard.today.turn_over'),
      unit: '$',
      color: true,
    },
    ggr: {
      title: t('routes.dashboard.today.ggr'),
      unit: '$',
      color: true,
    },
  };

  const renderKeyMapDailyReport = (key) => {
    if (key === 'activePlayer') return 'active_player';
    if (key === 'ggr') return 'ggr';
    if (key === 'newPlayer') return 'new_player';
    if (key === 'turnOver') return 'turn_over';
    return '';
  };

  const mapDataDailyReport = (data) => {
    return convertObjectToArray(data, (key, value) => ({
      key: renderKeyMapDailyReport(key),
      value: value * (key == 'ggr' ? -1 : 1),
    }));
  };

  const renderKeyMapTransactionReport = (key) => {
    if (key === 'cashback') return 'total_cashback';
    if (key === 'deposit') return 'total_deposit';
    if (key === 'reward') return 'total_aff_payment';
    if (key === 'withdraw') return 'total_withdraw';
    return '';
  };

  const mapDataTransactionReport = (data) => {
    return convertObjectToArray(data, (key, value) => ({
      key: renderKeyMapTransactionReport(key),
      value: value,
    }));
  };

  const mapDataListToken = (data: any) => {
    return data?.map((item: any) => {
      return {
        symbol: item.symbol,
        deposit: item.deposit || 0,
        ggr: item.ggr || 0,
        withdraw: item.withdraw || 0,
        balance: item.balance || 0,
        icon: SymbolSbg,
        key: data.indexOf(item),
        profit: item.turnover || 0,
      };
    });
  };

  const mapDataListPlayerData = (data) => {
    return data?.map((item) => {
      return {
        key: data.indexOf(item),
        name: item.username,
        winrate: item.winRate + '%',
        turnover: item.turnover,
        ggr: item.ggr,
      };
    });
  };
  const mapDataListGame = (data) => {
    return data?.map((item) => {
      return {
        name: item.name,
        value: {
          ggr: formatMoney(item.ggr, 2),
          turnOver: formatMoney(item.turnover, 2),
          winRate: item.winRate + '%',
        },
      };
    });
  };
  return {
    LIST_CART_FORM,
    LIST_CART_FORM_DAILY,
    LIST_MENU_ITEMS_CHART,
    mapDataDailyReport,
    mapDataListPlayerData,
    mapDataListToken,
    mapDataListGame,
    mapDataTransactionReport,
  };
}
