<template>
  <Button @click="handleOpenModal" type="green-color" class="w-[160px] mobile:w-full"
    >Deposit</Button
  >
  <div>
    <Modal
      centered
      width="813px"
      v-model:visible="visible"
      title="Deposit"
      @change="resetModal"
      wrapClassName="modal-default label-white "
    >
      <Form :model="state" layout="vertical" :hideRequiredMark="true">
        <div class="flex flex-row gap-5 mobile:flex-wrap mobile:w-full mobile:flex-col">
          <FormItem has-feedback class="w-full" label="Token" v-bind="validateInfos.token">
            <Select class="w-full" v-model:value="state.token">
              <SelectOption :value="''" />
              <SelectOption
                v-for="item in masterData.getListTokenArray"
                :key="item.id"
                :value="item.symbol"
                ><div class="flex flex-row items-center gap-2">
                  <img class="w-6 h-6" :src="item.icon" />
                  <p>{{ item.label }}</p>
                </div></SelectOption
              >
            </Select>
          </FormItem>
          <FormItem has-feedback class="w-full" label="Type" v-bind="validateInfos.token">
            <Select class="w-full" v-model:value="state.type" :options="LIST_TYPE" />
          </FormItem>
        </div>
        <FormItem
          has-feedback
          class="w-full"
          label="Token Amount"
          v-bind="validateInfos.tokenAmount"
        >
          <InputNumber v-model:value="state.tokenAmount" />
        </FormItem>
        <FormItem has-feedback label="Reason" v-bind="validateInfos.reason">
          <Textarea v-model:value="state.reason" :auto-size="{ minRows: 4, maxRows: 6 }" />
        </FormItem>
        <div
          class="flex flex-row justify-between items-center mt-[33px] mobile:gap-5 mobile:flex-wrap"
        >
          <div class="grid grid-cols-1 text-base mobile:gap-3 mobile:text-xs">
            <div class="flex flex-row gap-2 items-center">
              <p class="text-color-text-neuture-400">Current balance: </p>
              <p class="text-white">{{ Intl.NumberFormat('en-US').format(currentBalance) }}</p>
            </div>
            <div class="flex flex-row gap-2 items-center">
              <p class="text-color-text-neuture-400">Performed by: </p>
              <p class="text-white">{{ userInfo.username }}</p>
            </div>
          </div>
          <FormItem class="!mb-0 w-full max-w-[262px] mobile:max-w-[100%]">
            <Button
              :loading="state.loading"
              class="w-full"
              type="primary"
              @click="handleUpdateDeposit"
              >Submit</Button
            >
          </FormItem>
        </div>
      </Form>
      <template #footer> </template>
    </Modal>
  </div>
</template>
<script>
  import {
    Button,
    Modal,
    InputNumber,
    Textarea,
    Select,
    SelectOption,
    FormItem,
    Form,
  } from 'ant-design-vue';
  import { reactive, ref, watch, computed } from 'vue';
  import { masterDataStore } from '/@/store/modules/masterData';
  import { apiUpdateDeposit } from '/@/api/pages/user-manager';
  import { useUserStore } from '/@/store/modules/user';
  import { router } from '/@/router';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useAppStore } from '/@/store/modules/app';
  import { toFixedNumber } from '/@/utils/helper/application';

  const LIST_TYPE = [
    {
      label: 'DEPOSIT',
      value: 'DEPOSIT',
    },
    {
      label: 'BONUS',
      value: 'BONUS',
    },
    {
      label: 'REWARD',
      value: 'REWARD',
    },
  ];
  export default {
    components: {
      Button,
      InputNumber,
      Form,
      Select,
      SelectOption,
      Textarea,
      FormItem,
      Modal,
    },
    props: {
      dataToken: {
        type: Object,
        default: () => {},
      },
    },
    setup(prop) {
      const useForm = Form.useForm;
      const masterData = masterDataStore();
      const { createMessage } = useMessage();

      const visible = ref(false);
      const { userInfo } = useUserStore();
      const state = reactive({
        loading: false,
        token: 'BNB',
        tokenAmount: 0,
        type: 'BONUS',
        reason: '',
      });
      const validateTokenAmount = async (_rule, value) => {
        if (value + currentBalance.value < 0) {
          return Promise.reject('The input value exceeds the allowed quantity.');
        } else {
          return Promise.resolve();
        }
      };
      const rulesRef = reactive({
        token: [
          {
            required: true,
            message: 'Please select token',
          },
        ],
        tokenAmount: [
          {
            required: true,
            message: 'Please input token amount',
          },
          {
            trigger: 'change',
            validator: validateTokenAmount,
          },
        ],
        reason: [
          {
            required: true,
            message: 'Please input reason',
          },
        ],
      });
      const { validate, validateInfos, resetFields } = useForm(state, rulesRef, {
        onValidate: (...args) => console.log(...args),
      });

      const handleOpenModal = () => {
        visible.value = !visible.value;
      };

      const handleUpdateDeposit = async () => {
        validate()
          .then(async () => {
            state.loading = true;
            try {
              const params = {
                userId: router.currentRoute.value.params.id,
                tokenSymbol: state.token,
                note: state.reason,
                value: state.tokenAmount,
                type: state.type,
              };
              const res = await apiUpdateDeposit(params);
              if (res.data) {
                createMessage.success('Update success');
                useAppStore().setReCallApi();
                visible.value = false;
              }
            } catch (error) {
              createMessage.error(
                Array.isArray(error.data.message) ? error.data.message[0] : error.data.message,
              );
            } finally {
              state.loading = false;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };

      const resetModal = () => {
        (state.token = ''), (state.tokenAmount = 0), (state.reason = '');
        resetFields();
      };
      watch(
        () => visible.value,
        () => {
          resetModal();
        },
      );

      const currentBalance = computed(() => {
        return toFixedNumber(prop.dataToken[state.token]?.balance);
      });
      return {
        state,
        masterData,
        visible,
        rulesRef,
        validateInfos,
        userInfo,
        currentBalance,
        LIST_TYPE,
        handleOpenModal,
        resetModal,
        handleUpdateDeposit,
      };
    },
  };
</script>
