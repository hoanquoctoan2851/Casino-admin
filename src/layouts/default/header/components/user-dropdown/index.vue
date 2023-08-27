<template>
  <Dropdown
    class="!h-full !bg-color-background-neuture-800 rounded-2xl md:mr-10"
    placement="bottomLeft"
    :overlayClassName="`${prefixCls}-dropdown-overlay display-menu-dropdown`"
  >
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
      <span :class="`${prefixCls}__info`">
        <span :class="`${prefixCls}__name  `" class="truncate">
          {{ getUserInfo.email || 'Admin' }}
        </span>
      </span>
    </span>

    <template #overlay>
      <Menu @click="handleMenuClick" class="!rounded-xl overflow-hidden">
        <MenuItem
          key="logout"
          :text="t('layout.header.dropdownItemLoginOut')"
          icon="ion:power-outline"
        />
      </Menu>
    </template>
  </Dropdown>
</template>
<script lang="ts">
  // components
  import { Dropdown, Menu } from 'ant-design-vue';

  import { defineComponent, computed } from 'vue';

  import { useUserStore } from '/@/store/modules/user';
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useModal } from '/@/components/Modal';

  // import headerImg from '/@/assets/images/header.jpg';
  import { propTypes } from '/@/utils/propTypes';
  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';

  export default defineComponent({
    name: 'UserDropdown',
    components: {
      Dropdown,
      Menu,
      MenuItem: createAsyncComponent(() => import('./DropMenuItem.vue')),
    },
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
    },
    setup() {
      const { prefixCls } = useDesign('header-user-dropdown');
      const { t } = useI18n();
      const { getShowDoc, getUseLockPage } = useHeaderSetting();
      const userStore = useUserStore();

      const getUserInfo = computed(() => {
        const { email } = userStore.getUserInfo || {};
        return { email };
      });

      const [register] = useModal();

      //  login out
      function handleLoginOut() {
        userStore.confirmLoginOut();
      }

      function handleMenuClick() {
        handleLoginOut();
      }

      return {
        prefixCls,
        t,
        getUserInfo,
        handleMenuClick,
        getShowDoc,
        register,
        getUseLockPage,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-user-dropdown';

  .@{prefix-cls} {
    height: @header-height;
    padding: 0 0 0 10px;
    padding-right: 10px;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      margin-right: 12px;
    }

    &__header {
      border-radius: 50%;
    }

    &__name {
      font-size: 14px;
    }

    &--dark {
      &:hover {
        background-color: @header-dark-bg-hover-color;
      }
    }

    &--light {
      &:hover {
        background-color: @header-light-bg-hover-color;
      }

      .@{prefix-cls}__name {
        color: @text-color-base;
      }

      .@{prefix-cls}__desc {
        color: @header-light-desc-color;
      }
    }

    &-dropdown-overlay {
      .ant-dropdown-menu-item {
        min-width: 160px;
      }
    }
  }
</style>
