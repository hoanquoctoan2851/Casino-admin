<template>
  <div
    :class="prefixCls"
    class="relative bg-login-image w-full h-full p-[62px] overflow-hidden !overflow-y-scroll mobile:p-3 tablet:p-3"
  >
    <div
      :class="[
        'flex h-full bg-cover grid m-auto',
        getIsMobile ? 'w-full grid-cols-1' : 'grid-cols-2 tablet:grid-cols-1',
      ]"
    >
      <div class="hidden min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
        <div class="my-auto"> </div>
      </div>
      <div
        :class="[`${prefixCls}-form `, getIsMobile ? '' : 'p-9']"
        class="relative w-full m-auto md:px-6 rounded-md shadow-md w-full px-3 max-w-[450px] tablet:!bg-color-background-neuture-800 enter-x"
      >
        <LoginForm />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import LoginForm from './LoginForm.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useAppInject } from '/@/hooks/web/useAppInject';

  const { getIsMobile } = useAppInject();
  defineProps({
    sessionTimeout: {
      type: Boolean,
    },
  });

  const { prefixCls } = useDesign('login');
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-login';
  @logo-prefix-cls: ~'@{namespace}-app-logo';
  @countdown-prefix-cls: ~'@{namespace}-countdown-input';
  @dark-bg: #293146;

  html[data-theme='dark'] {
    .@{prefix-cls} {
      background-color: transparent;

      .ant-input,
      .ant-input-password {
        background-color: #232a3b;
      }

      .ant-btn:not(.ant-btn-link):not(.ant-btn-primary) {
        border: 1px solid #4a5569;
      }

      &-form {
        background: rgba(255, 255, 255, 0.05) !important;
        border-radius: 21px;
        max-height: 800px;
        height: 100%;

        @media screen and (max-width: 1024px) {
          background: #17181f !important;
        }
      }

      .app-iconify {
        color: #fff;
      }
    }

    input.fix-auto-fill,
    .fix-auto-fill input {
      -webkit-text-fill-color: #c9d1d9 !important;
      box-shadow: inherit !important;
    }
  }

  .@{prefix-cls} {
    min-height: 100%;
    overflow: hidden;
    @media (max-width: @screen-xl) {
      background-color: #293146;

      .@{prefix-cls}-form {
        background-color: #fff;
      }
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin-left: -48%;
      background-position: 100%;
      background-repeat: no-repeat;
      background-size: auto 100%;
      content: '';
      @media (max-width: @screen-xl) {
        display: none;
      }
    }

    .@{logo-prefix-cls} {
      position: absolute;
      top: 12px;
      height: 30px;

      &__title {
        font-size: 16px;
        color: #fff;
      }

      img {
        width: 32px;
      }
    }

    .container {
      .@{logo-prefix-cls} {
        display: flex;
        width: 60%;
        height: 80px;

        &__title {
          font-size: 24px;
          color: #fff;
        }

        img {
          width: 48px;
        }
      }
    }

    &-sign-in-way {
      .anticon {
        font-size: 22px;
        color: #888;
        cursor: pointer;

        &:hover {
          color: @primary-color;
        }
      }
    }

    .@{countdown-prefix-cls} input {
      min-width: unset;
    }

    .ant-divider-inner-text {
      font-size: 12px;
      color: @text-color-secondary;
    }
  }

  .bg-login-image {
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    background-image: url(/@/assets/images/bg-login.png);
  }
</style>
