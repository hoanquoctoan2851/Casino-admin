import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const promotion: AppRouteModule = {
  path: '/promotion',
  name: 'Promotion',
  component: LAYOUT,
  redirect: '/promotion',
  meta: {
    hideChildrenInMenu: true,
    icon: 'menu-promotion|svg',
    iconActive: 'menu-promotion-active|svg',
    title: t('routes.promotion.name'),
    orderNo: 5,
  },
  children: [
    {
      path: '',
      name: 'PromotionPage',
      component: () => import('/@/views/pages/promotion/index.vue'),
      meta: {
        title: t('routes.promotion.name'),
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
    {
      path: 'create-promotion',
      name: 'CreatePromotionPage',
      component: () => import('/@/views/pages/promotion/CreatePromotion.vue'),
      meta: {
        title: t('routes.promotion.create_promotion'),
        hideMenu: true,
      },
    },

    {
      path: 'edit-promotion/:id',
      name: 'EditPromotionPage',
      component: () => import('/@/views/pages/promotion/CreatePromotion.vue'),
      meta: {
        title: 'Edit promotion',
        hideMenu: true,
      },
    },
  ],
};

export default promotion;
