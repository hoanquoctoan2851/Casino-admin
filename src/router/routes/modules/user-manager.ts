import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
const userManager: AppRouteModule = {
  path: '/user-manager',
  name: 'UserManger',
  component: LAYOUT,
  redirect: '/user-manager',
  meta: {
    hideChildrenInMenu: true,
    icon: 'menu-user-manager|svg',
    iconActive: 'menu-user-manager-active|svg',
    title: t('routes.user-manager.name'),
    orderNo: 2,
  },
  children: [
    {
      path: '',
      name: 'UserManagerPage',
      component: () => import('/@/views/pages/user-manager/index.vue'),
      meta: {
        title: t('routes.user-manager.name'),
        hideMenu: true,
      },
    },
    {
      path: 'details/:id',
      name: 'UserManagerDetailsPage',
      component: () => import('/@/views/pages/user-manager-details/index.vue'),
      meta: {
        title: 'Details User',
        hideMenu: false,
      },
    },
  ],
};

export default userManager;
