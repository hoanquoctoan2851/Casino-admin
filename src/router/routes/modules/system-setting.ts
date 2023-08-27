import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const systemSetting: AppRouteModule = {
  path: '/system-setting',
  name: 'SystemSetting',
  component: LAYOUT,
  redirect: '/system-setting',
  meta: {
    hideChildrenInMenu: true,
    icon: 'menu-setting|svg',
    iconActive: 'menu-setting-active|svg',
    title: t('routes.system-setting.name'),
    orderNo: 7,
  },
  children: [
    {
      path: '',
      name: 'SystemSettingPage',
      component: () => import('/@/views/pages/setting-system/index.vue'),
      meta: {
        title: t('routes.system-setting.name'),
        hideMenu: true,
      },
    },
  ],
};

export default systemSetting;
