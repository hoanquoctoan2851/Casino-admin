<template>
  <Button @click="handleOpenModal" type="primary" class="w-[160px] mobile:w-full"
    >Edit Permission</Button
  >
  <div>
    <Modal
      centered
      width="921px"
      :destroyOnClose="true"
      v-model:visible="visible"
      title="Edit Permission"
      wrapClassName="modal-default label-white "
    >
      <div class="w-full flex flex-row mobile:flex-wrap gap-[34px] mobile:gap-5">
        <div class="w-full flex flex-col gap-5 max-w-[310px] mobile:max-w-[100%]">
          <div class="grid grid-cols-1 text-base mb-[53px] mobile:mb-5">
            <div class="flex flex-row gap-2 items-center mobile:text-sm">
              <p class="text-color-text-neuture-400">User: </p>
              <p class="text-white">{{ dataProps.userName }}</p>
            </div>
            <div class="flex flex-row gap-2 items-center mobile:text-sm">
              <p class="text-color-text-neuture-400">Current role: </p>
              <p class="text-white">{{ renderRole }}</p>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <p class="text-base text-white mobile:text-sm">Select role</p>
            <Select
              :disabled="state.role === 3"
              class="w-full !cursor-pointer"
              v-model:value="state.role"
              @change="handleSelectRole"
            >
              <SelectOption
                :disabled="item.value === 3"
                v-for="item in LIST_ROLE_USER_ACCESS"
                :key="item.value"
                :value="item.value"
                >{{ item.label }}</SelectOption
              >
            </Select>
          </div>
          <Button
            :disabled="state.role === 3"
            @click="handleUpdatePermission"
            type="primary"
            class="w-full"
            >Submit</Button
          >
        </div>
        <div class="w-full flex flex-col gap-[1px] rounded-lg overflow-hidden">
          <div
            v-for="item in LIST_PERMISSION_MODAL"
            :key="item.title"
            class="bg-color-background-neuture-700 flex flex-col px-5 py-3"
          >
            <p class="text-base font-normal text-white mobile:text-sm">{{ item.title }}</p>
            <p class="text-color-text-neuture-300 mobile:text-xs">{{ item.content }}</p>
          </div>
        </div>
      </div>
      <template #footer> </template>
    </Modal>
  </div>
</template>
<script>
  import { Button, Modal, Select, SelectOption } from 'ant-design-vue';
  import { reactive, watch, ref, onMounted, computed } from 'vue';
  import { useUserManagerDetailsState } from '../useUserDetails';
  import { LIST_ROLE_USER_ACCESS } from '/@/utils/constant.ts';
  import { apiUpdatePermission } from '/@/api/pages/user-manager';
  import { router } from '/@/router';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useAppStore } from '/@/store/modules/app';

  export default {
    components: { Button, Modal, Select, SelectOption },
    props: {
      dataProps: {
        type: Object,
        default: () => {
          return {
            userName: '',
            roleValue: '',
          };
        },
      },
    },
    setup(prop) {
      const visible = ref(false);
      const state = reactive({
        role: null,
        loading: false,
      });
      const { LIST_PERMISSION_MODAL } = useUserManagerDetailsState();
      const handleOpenModal = () => {
        visible.value = !visible.value;
      };

      const renderRole = computed(() => {
        return LIST_ROLE_USER_ACCESS.find((item) => item.value === prop.dataProps.roleValue)?.label;
      });
      const handleUpdatePermission = async () => {
        try {
          state.loading = true;
          const params = {
            userId: router.currentRoute.value.params.id,
            newRole: state.role,
          };
          const res = await apiUpdatePermission(params);
          if (res.data) useMessage().createMessage.success('Role update successful');
          useAppStore().setReCallApi();
          visible.value = false;
        } catch (error) {
          useMessage().createMessage.error(
            Array.isArray(error.data.message) ? error.data.message[0] : error.data.message,
          );
        } finally {
          state.loading = false;
        }
      };

      const handleSelectRole = () => {
        console.log(state.role);
      };
      watch(
        () => prop.dataProps.roleValue,
        () => {
          state.role = prop.dataProps?.roleValue;
        },
      );
      onMounted(() => {
        state.role = prop.dataProps?.roleValue;
      });
      return {
        state,
        visible,
        handleOpenModal,
        handleUpdatePermission,
        handleSelectRole,
        renderRole,
        LIST_PERMISSION_MODAL,
        LIST_ROLE_USER_ACCESS,
      };
    },
  };
</script>
