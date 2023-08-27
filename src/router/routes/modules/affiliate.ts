import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const affiliate: AppRouteModule = {
  path: '/affiliate',
  name: 'Affiliate',
  component: LAYOUT,
  redirect: '/affiliate',
  meta: {
    hideChildrenInMenu: true,
    icon: 'menu-affiliate|svg',
    iconActive: 'menu-affiliate-active|svg',
    title: t('routes.affiliate.name'),
    orderNo: 6,
    hideMenu: true,
  },
  children: [
    {
      path: '',
      name: 'AffiliatePage',
      component: () => import('/@/views/pages/affiliate/index.vue'),
      meta: {
        title: t('routes.affiliate.name'),
        hideMenu: true,
      },
    },
  ],
};

export default affiliate;
