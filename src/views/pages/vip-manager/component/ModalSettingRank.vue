<template>
  <EditOutlined @click="handleOpenModal" type="green-color" class="w-[160px] mobile:w-full" />
  <div>
    <Modal
      centered
      width="813px"
      v-model:visible="visible"
      title="Update Rank Setting"
      @change="resetModal"
      wrapClassName="modal-default label-white"
    >
      <Form :model="state" layout="vertical" :hideRequiredMark="true">
        <div class="mb-4">
          <p>
            Rank: <span>{{ dataRank?.rank }}</span>
          </p>
        </div>
        <div class="flex flex-row gap-5 mobile:flex-wrap mobile:w-full mobile:flex-col">
          <FormItem
            has-feedback
            class="w-full"
            label="Min withdraw"
            v-bind="validateInfos.minWithdraw"
          >
            <InputNumber v-model:value="state.minWithdraw" />
          </FormItem>
          <FormItem
            has-feedback
            class="w-full"
            label="Max withdraw"
            v-bind="validateInfos.minWithdraw"
          >
            <InputNumber v-model:value="state.maxWithdraw" />
          </FormItem>
          <FormItem
            has-feedback
            class="w-full"
            label="Daily withdraw"
            v-bind="validateInfos.minWithdraw"
          >
            <InputNumber v-model:value="state.dailyWithdraw" />
          </FormItem>
        </div>
        <div class="flex flex-row gap-5 mobile:flex-wrap mobile:w-full mobile:flex-col">
          <FormItem
            has-feedback
            class="w-full"
            label="Affiliate Bonus"
            v-bind="validateInfos.minWithdraw"
          >
            <InputNumber v-model:value="state.affiliateBonus" />
          </FormItem>
          <FormItem
            has-feedback
            class="w-full"
            label="Affiliate Commission"
            v-bind="validateInfos.minWithdraw"
          >
            <InputNumber v-model:value="state.affiliateCommission" />
          </FormItem>
          <FormItem
            has-feedback
            class="w-full"
            label="Affiliate Refferal"
            v-bind="validateInfos.minWithdraw"
          >
            <InputNumber v-model:value="state.affiliateReferal" />
          </FormItem>
        </div>
        <div class="flex flex-row gap-5 mobile:flex-wrap mobile:w-full mobile:flex-col">
          <FormItem
            has-feedback
            class="w-full"
            label="Cashback Rate (%)"
            v-bind="validateInfos.cashback"
          >
            <InputNumber v-model:value="state.cashback" />
          </FormItem>
          <FormItem has-feedback class="w-full" label="Reward Rate" v-bind="validateInfos.reward">
            <InputNumber v-model:value="state.reward" />
          </FormItem>
          <FormItem
            has-feedback
            class="w-full"
            label="Exp to next level"
            v-bind="validateInfos.minWithdraw"
          >
            <InputNumber v-model:value="state.requireTotalBet" />
          </FormItem>
        </div>
        <div class="flex mt-[33px]">
          <div class="mb-0 m-auto flex flex-row gap-4 items-center w-full mobile:flex-col">
            <Button
              :loading="state.loading"
              class="w-full min-w-[200px]"
              type="primary"
              @click="handleUpdateRank"
              >Save</Button
            >
            <Button class="w-full min-w-[200px]" type="default" @click="closeModal">Cancel</Button>
          </div>
        </div>
      </Form>
      <template #footer> </template>
    </Modal>
  </div>
</template>
<script>
  import { Button, Modal, InputNumber, FormItem, Form, message } from 'ant-design-vue';
  import { reactive, ref, watch } from 'vue';
  import { masterDataStore } from '/@/store/modules/masterData';
  import { useUserStore } from '/@/store/modules/user';
  import { EditOutlined } from '@ant-design/icons-vue';
  import { apiUpdateRank } from '/@/api/pages/vip-manager';

  export default {
    components: {
      Button,
      InputNumber,
      EditOutlined,
      Form,
      FormItem,
      Modal,
    },
    props: {
      dataRank: {
        type: Object,
        default: () => {},
      },
      rankObject: {
        default: () => {},
        type: Object,
      },
    },

    setup(prop) {
      const useForm = Form.useForm;
      const masterData = masterDataStore();
      const currentBalance = ref(0);
      const visible = ref(false);
      const { userInfo } = useUserStore();
      const state = reactive({
        loading: false,
        minWithdraw: prop.rankObject[prop.dataRank.rank]?.minWithdraw || 0,
        maxWithdraw: prop.rankObject[prop.dataRank.rank]?.maxWithdraw || 0,
        dailyWithdraw: prop.rankObject[prop.dataRank.rank]?.dailyWithdraw || 0,
        affiliateBonus: prop.rankObject[prop.dataRank.rank]?.affiliateBonus || 0,
        affiliateCommission: prop.rankObject[prop.dataRank.rank]?.affiliateCommission || 0,
        affiliateReferal: prop.rankObject[prop.dataRank.rank]?.affiliateReferal || 0,
        cashback: prop.rankObject[prop.dataRank.rank]?.cashback || 0,
        reward: prop.rankObject[prop.dataRank.rank]?.reward || 0,
        requireTotalBet: prop.rankObject[prop.dataRank.rank]?.requireTotalBet || 0,
        type: prop.rankObject[prop.dataRank.rank]?.type,
        rank: prop.dataRank?.rank?.toLowerCase(),
      });
      const checkNumber = async (_rule, value) => {
        if (value < 0) {
          return Promise.reject('Minumum value is 0');
        } else {
          return Promise.resolve();
        }
      };
      const checkReward = async (_rule, value) => {
        if (value > 1) {
          return Promise.reject('Maximum value is 1 ( ~ 100%).');
        } else if (value < 0) {
          return Promise.reject('Minumum value is 0 ( ~ 0%).');
        }
        return Promise.resolve();
      };
      const checkCashback = async (_rule, value) => {
        if (value > 100) {
          return Promise.reject('Maximum value is 100.');
        } else if (value < 0) {
          return Promise.reject('Minumum value is 0.');
        }
        return Promise.resolve();
      };

      const rulesRef = reactive({
        minWithdraw: [
          {
            required: true,
            message: 'Please input value',
          },
          {
            trigger: 'change',
            validator: checkNumber,
          },
        ],
        maxWithdraw: [
          {
            required: true,
            message: 'Please input value',
          },
          {
            trigger: 'change',
            validator: checkNumber,
          },
        ],
        reward: [
          {
            required: true,
            message: 'Please input value',
          },
          {
            trigger: 'change',
            validator: checkReward,
          },
        ],
        cashback: [
          {
            required: true,
            message: 'Please input value',
          },
          {
            trigger: 'change',
            validator: checkCashback,
          },
        ],
      });
      const { validate, validateInfos, resetFields } = useForm(state, rulesRef, {
        // onValidate: (...args) => {},
      });

      const handleOpenModal = () => {
        visible.value = !visible.value;
      };

      const handleUpdateRank = async () => {
        validate()
          .then(async () => {
            state.loading = true;
            try {
              const res = await apiUpdateRank(state);
              if (res.data) {
                message.success('Update rank success');
                await masterDataStore().setListRank();
                visible.value = false;
              }
            } catch (error) {
            } finally {
              state.loading = false;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
      const resetModal = () => {
        resetFields();
      };

      const closeModal = () => {
        visible.value = false;
      };
      watch(
        () => visible.value,
        () => {
          resetModal();
        },
      );

      return {
        state,
        masterData,
        visible,
        rulesRef,
        validateInfos,
        userInfo,
        currentBalance,
        handleOpenModal,
        closeModal,
        resetModal,
        handleUpdateRank,
      };
    },
  };
</script>
