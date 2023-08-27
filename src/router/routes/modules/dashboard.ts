import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard',
  meta: {
    hideChildrenInMenu: true,
    icon: 'menu-dashboard|svg',
    iconActive: 'menu-dashboard-active|svg',
    title: t('routes.dashboard.name'),
    orderNo: 1,
  },
  children: [
    {
      path: '',
      name: 'DashboardPage',
      component: () => import('/@/views/pages/dashboard/index.vue'),
      meta: {
        title: t('routes.dashboard.name'),
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
