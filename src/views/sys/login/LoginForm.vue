<template>
  <div class="flex flex-col mt-6">
    <div>
      <img class="w-[232px] mb-[74px]" :src="LogoTextIcon" />
    </div>
    <div>
      <p class="text-4xl mb-9 font-semibold text-white">Welcome back</p>
    </div>
    <Form
      class="p-4 enter-x"
      :model="formData"
      :hideRequiredMark="true"
      :rules="getFormRules"
      ref="formRef"
      layout="vertical"
      v-show="getShow"
      @keypress.enter="handleLogin"
    >
      <FormItem name="account" label="Username" class="enter-x !mb-10">
        <Input
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.userName')"
          class="fix-auto-fill"
        />
      </FormItem>
      <FormItem name="password" label="Password" class="enter-x !mb-10">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </FormItem>
      <FormItem label="OTP" name="otp" class="enter-x !mb-10">
        <AppOtpInput @get-otp="getOtp" />
      </FormItem>
      <FormItem class="enter-x !mb-10">
        <Button type="primary" block @click="handleLogin" :loading="loading">
          {{ t('sys.login.loginButton') }}
        </Button>
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';
  import { Form, Input, Button } from 'ant-design-vue';
  import AppOtpInput from '/@/components/Application/AppOtpInput.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import { SITE_CONFIG } from '/@/utils/siteConfig';
  // import { useDesign } from '/@/hooks/web/useDesign';
  const LogoTextIcon = SITE_CONFIG.SITE.LOGO;
  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { notification, createMessage } = useMessage();
  // const { prefixCls } = useDesign('login');
  const userStore = useUserStore();

  const { getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);
  const formData = reactive({
    account: '',
    password: '',
    otp: '',
  });
  const { validForm } = useFormValid(formRef);
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);
  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    try {
      loading.value = true;
      const userInfo = await userStore.login({
        password: data.password,
        username: data.account,
        mode: 'none',
        otp: formData.otp,
      });
      if (userInfo) {
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
          duration: 3,
        });
      }
    } catch (error: any) {
      createMessage.error('Network error');
    } finally {
      loading.value = false;
    }
  }

  const getOtp = (token) => {
    formData.otp = token;
  };
</script>
