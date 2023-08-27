import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const vipManager: AppRouteModule = {
  path: '/vip-manager',
  name: 'VipManager',
  component: LAYOUT,
  redirect: '/vip-manager',
  meta: {
    hideChildrenInMenu: true,
    icon: 'menu-vip-manager|svg',
    iconActive: 'menu-vip-manager-active|svg',
    title: t('routes.vip-manager.name'),
    orderNo: 3,
  },
  children: [
    {
      path: '',
      name: 'VipManagerPage',
      component: () => import('/@/views/pages/vip-manager/index.vue'),
      meta: {
        title: t('routes.vip-manager.name'),
        hideMenu: true,
      },
    },
    {
      path: 'cashback-details/:id',
      name: 'CashbackDetailsPage',
      component: () => import('/@/views/pages/vip-manager/CashbackDetails.vue'),
      meta: {
        title: 'Cashback details',
        hideMenu: false,
      },
    },
    {
      path: 'cashback-history-details/:id',
      name: 'CashbackHistoryDetailsPage',
      component: () => import('/@/views/pages/vip-manager/CashbackHistoryDetails.vue'),
      meta: {
        title: 'Cashback history details',
        hideMenu: false,
      },
    },
  ],
};

export default vipManager;
