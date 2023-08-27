import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const transaction: AppRouteModule = {
  path: '/transaction',
  name: 'Transaction',
  component: LAYOUT,
  redirect: '/transaction',
  meta: {
    hideChildrenInMenu: true,
    icon: 'menu-transaction|svg',
    iconActive: 'menu-transaction-active|svg',
    title: t('routes.transaction.name'),
    orderNo: 4,
  },
  children: [
    {
      path: '',
      name: 'TransactionPage',
      component: () => import('/@/views/pages/transaction/index.vue'),
      meta: {
        title: t('routes.transaction.name'),
        hideMenu: true,
      },
    },
  ],
};

export default transaction;
