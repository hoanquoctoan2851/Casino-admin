<template>
  <div>
    <Modal
      centered
      wrapClassName="modal-tree-affiliate"
      width="90%"
      v-model:visible="visible"
      title="Pay"
    >
      <div class="p-[33px] flex flex-col gap-[33px]">
        <div
          class="border border-color-background-neuture-700 p-[29px] rounded-2xl flex flex-row justify-between items-center"
        >
          <div class="flex flex-col gap-1 w-full">
            <p class="font-semibold text-2xl">{{ dataUser.name }}</p>
            <p class="text-color-text-neuture-300 text-base">{{ dataUser.phone }}</p>
            <p class="text-color-text-neuture-300 text-base">{{ dataUser.mail }}</p>
          </div>
          <div class="flex flex-row gap-5 w-full items-center">
            <div
              class="rounded-xl bg-[#1256BB] text-white w-full max-w-[308px] p-5 flex flex-col gap-2"
            >
              <p class="font-normal text-base text-stroke-color-text-neuture-300"
                >Commission balance</p
              >
              <p class="text-2xl font-semibold">{{
                Intl.NumberFormat('en-US').format(toFixedNumber(dataUser.balanceCommission))
              }}</p>
            </div>
            <div
              class="rounded-xl bg-[#1256BB] text-white p-5 w-full max-w-[308px] flex flex-col gap-2"
            >
              <p class="font-normal text-base text-stroke-color-text-neuture-300"
                >Total commission</p
              >
              <p class="text-2xl font-semibold">{{
                Intl.NumberFormat('en-US').format(toFixedNumber(dataUser.totalCommission))
              }}</p>
            </div>
          </div>
        </div>
        <div class="flex w-full flex-row gap-5">
          <div class="flex w-full flex-col gap-2">
            <p class="text-white">Balance pay for user</p>
            <Input class="!rounded-lg"
          /></div>
          <div class="flex w-full flex-col gap-2">
            <p class="text-white">2fa code</p>
            <Input class="!rounded-lg" />
          </div>
        </div>
        <div class="flex flex-row flex-wrap items-center justify-center w-full gap-5">
          <Button class="w-[200px]" type="primary">Pay</Button>
          <Button class="w-[200px]">Cancel</Button>
        </div>
      </div>
      <template #footer> </template>
    </Modal>
    <dollar-circle-outlined @click="handleOpenModal" class="cursor-pointer hover:text-primary" />
  </div>
</template>
<script>
  import { ref } from 'vue';
  import { Modal, Input, Button } from 'ant-design-vue';
  import { DollarCircleOutlined } from '@ant-design/icons-vue';
  import { toFixedNumber } from '/@/utils/helper/application.ts';

  export default {
    components: {
      Modal,
      Input,
      Button,
      DollarCircleOutlined,
    },
    props: {
      dataUser: {
        type: Object,
        default: () => {
          return {
            name: 'Bogdan Krivenchenko',
            phone: '012345567890',
            mail: 'Bogdan Krivenchenko @gmail.com',
            balanceCommission: 2342342.234,
            totalCommission: 21312.123,
          };
        },
      },
    },
    setup() {
      const visible = ref(false);
      const handleOpenModal = () => {
        visible.value = true;
      };
      return {
        visible,
        toFixedNumber,
        handleOpenModal,
      };
    },
  };
</script>
