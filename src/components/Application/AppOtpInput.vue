<script setup lang="ts">
  import { ref } from 'vue';
  import VOtpInput from 'vue3-otp-input';
  import { useMessage } from '/@/hooks/web/useMessage';
  const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);
  const bindValue = ref('');

  const { createMessage } = useMessage();
  const emit = defineEmits(['getOtp']);
  const handleOnComplete = (value: string) => {
    const checkString = /[a-zA-Z]/.test(value);
    if (checkString) {
      createMessage.error('The OTP code can only contain numeric characters.');
    } else {
      emit('getOtp', bindValue.value);
    }
  };
  const handleOnChange = (value: string) => {
    emit('getOtp', value);
  };
</script>

<template>
  <div class="w-full otp-input-custom">
    <!-- <button @click="clear">clear</button> -->
    <!-- <button @click="fill">fill</button> -->
    <VOtpInput
      ref="otpInput"
      input-classes="otp-input"
      :conditionalClass="['one', 'two', 'three', 'four', 'five']"
      separator=" "
      inputmode="numeric"
      inputType="letter-numeric"
      :num-inputs="6"
      v-model:value="bindValue"
      :should-auto-focus="true"
      @on-change="handleOnChange"
      @on-complete="handleOnComplete"
      :placeholder="['', '', '', '', '']"
    />
  </div>
</template>

<style lang="scss">
  .otp-input-custom {
    .otp-input {
      width: 45px;
      height: 45px;
      padding: 5px;
      font-size: 20px;
      border-radius: 4px;
      border: 1px solid rgba(0, 0, 0, 0.3);
      text-align: center;
      background-color: #292a34;
    }

    .otp-input.is-complete {
      background-color: #e4e4e4;
    }

    .otp-input.error {
      border: 1px solid red !important;
    }

    .otp-input::-webkit-inner-spin-button,
    .otp-input::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input::placeholder {
      font-size: 15px;
      text-align: center;
      font-weight: 600;
    }
  }
  .otp-input-custom > div {
    justify-content: space-between;
    width: 100%;
  }
</style>
