import type { ValidationRule, FormInstance } from 'ant-design-vue/lib/form/Form';
import type { NamePath } from 'ant-design-vue/lib/form/interface';
import { ref, computed, unref, Ref } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';

export enum LoginStateEnum {
  LOGIN,
}

const currentState = ref(LoginStateEnum.LOGIN);

// import { createGlobalState } from '@vueuse/core'

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state;
  }

  const getLoginState = computed(() => currentState.value);

  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN);
  }

  return { setLoginState, getLoginState, handleBackLogin };
}

export function useFormValid<T extends Object = any>(formRef: Ref<FormInstance>) {
  const validate = computed(() => {
    const form = unref(formRef);
    return form?.validate ?? ((_nameList?: NamePath) => Promise.resolve());
  });

  async function validForm() {
    const form = unref(formRef);
    if (!form) return;
    const data = await form.validate();
    return data as T;
  }

  return { validate, validForm };
}

export function useFormRules(formData?: Recordable) {
  const { t } = useI18n();
  const validatePass = async (_rule: Rule, value: string) => {
    if (/[a-zA-Z]/.test(value)) {
      return Promise.reject('The OTP code can only contain numeric characters.');
    } else {
      if (value?.length < 6) {
        return Promise.reject('The OTP code must have 6 digits.');
      }
      return Promise.resolve();
    }
  };
  const getAccountFormRule = computed(() => createRule(t('sys.login.accountPlaceholder')));
  const getPasswordFormRule = computed(() => createRule(t('sys.login.passwordPlaceholder')));
  const getOtpFormRule = computed(() => createRuleOtp(validatePass));

  const getFormRules = computed((): { [k: string]: ValidationRule | ValidationRule[] } => {
    const accountFormRule = unref(getAccountFormRule);
    const passwordFormRule = unref(getPasswordFormRule);
    const otpFormRule = unref(getOtpFormRule);
    return {
      account: accountFormRule,
      password: passwordFormRule,
      otp: otpFormRule,
    };
  });
  return { getFormRules };
}

function createRule(message: string) {
  return [
    {
      required: true,
      message,
      trigger: 'change',
    },
  ];
}

function createRuleOtp(functionValidate: any) {
  return [
    {
      trigger: 'change',
      validator: functionValidate,
    },
  ];
}
