<template>
  <Button
    v-if="typeButton === 'button'"
    @click="handleOpenModal"
    type="primary"
    class="w-[160px] mobile:w-full"
    >Edit rank</Button
  >
  <EditOutlined
    v-else
    @click="handleOpenModal"
    class="cursor-pointer text-lg"
    style="color: #00c566"
  />
  <div>
    <Modal
      centered
      width="921px"
      v-model:visible="visible"
      title="Edit rank"
      wrapClassName="modal-default label-white "
    >
      <div>
        <div class="grid grid-cols-2 mobile:grid-cols-1">
          <div>
            <div class="grid grid-cols-1 text-base mb-[53px] mobile:mb-5">
              <div class="flex flex-row gap-2 items-center">
                <p class="text-color-text-neuture-400">User:</p>
                <LoadingOutlined v-if="loading" />
                <p v-else class="text-white">{{ data?.name }}</p>
              </div>
              <div class="flex flex-row gap-2 items-center">
                <p class="text-color-text-neuture-400">Rank:</p>
                <LoadingOutlined v-if="loading" />
                <p v-else class="text-white capitalize">{{ data?.rank }}</p>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-2 mb-8 mobile:mb-5">
            <p class="text-base text-white mobile:text-sm">Select role</p>
            <Select
              class="w-full !cursor-pointer"
              v-model:value="state.rank"
              :options="masterData.getListRankSelect"
            />
            <Button
              :loading="state.loading"
              @click="handleUpdateRank"
              type="primary"
              class="mt-5"
              :disabled="!state.rank"
              >Submit</Button
            >
          </div>
        </div>
        <div>
          <Table
            class="w-full"
            :columns="columnsTableInformationRank"
            :data-source="masterData.getTableRankDetails"
            :pagination="false"
            :scroll="{ x: 400 }"
          >
            <template #headerCell="{ column }">
              <template v-if="column.key === 'userRank'">
                <div>
                  <span>
                    {{ column.title }}
                  </span>
                </div>
              </template>
            </template>
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'userRank'">
                <span class="!text-white font-semibold">{{ record.userRank }}</span>
              </template>
            </template>
          </Table>
        </div>
      </div>
      <template #footer> </template>
    </Modal>
  </div>
</template>
<script>
  import { Button, Modal, Table, Select } from 'ant-design-vue';
  import { reactive, ref, watch, onMounted, computed } from 'vue';
  import { apiUpdateRank } from '/@/api/pages/user-manager';
  import { useAppStore } from '/@/store/modules/app';
  import { router } from '/@/router';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { LoadingOutlined, EditOutlined } from '@ant-design/icons-vue';
  import { masterDataStore } from '/@/store/modules/masterData';
  export default {
    components: { Button, Table, EditOutlined, LoadingOutlined, Modal, Select },
    props: {
      dataProps: {
        type: Object,
        default: () => {},
      },
      typeButton: {
        type: String,
        default: 'button',
      },
      userId: {
        type: Number,
        default: null,
      },
      loading: {
        type: Boolean,
        default: () => false,
      },
    },
    emits: ['fetchData'],
    setup(prop) {
      const visible = ref(false);
      const masterData = masterDataStore();
      const appStore = useAppStore();
      const state = reactive({
        rank: '',
        loading: false,
      });

      const data = computed(() => {
        return {
          name: prop?.dataProps?.name || prop.dataProps?.username,
          rank: prop?.dataProps?.rank,
        };
      });
      const columnsTableInformationRank = [
        {
          title: 'User rank',
          dataIndex: 'userRank',
          key: 'userRank',
        },
        {
          title: 'Daily limit ($)',
          dataIndex: 'dailyLimit',
          key: 'dailyLimit',
        },
        {
          title: 'Max amount ($)',
          dataIndex: 'maxAmount',
          key: 'maxAmount',
        },
        {
          title: 'Min amount ($)',
          dataIndex: 'minAmount',
          key: 'minAmount',
        },
        {
          title: 'Cashback  (%)',
          dataIndex: 'cashback',
          key: 'cashback',
        },
      ];
      const handleOpenModal = () => {
        visible.value = !visible.value;
      };

      const handleUpdateRank = async () => {
        try {
          state.loading = true;
          const params = {
            userId: Number(router.currentRoute.value.params.id || prop.userId),
            rankId: Number(masterData.getListRankObject[state.rank].id),
          };
          const res = await apiUpdateRank(params);
          if (res.status === 200) {
            useMessage().createMessage.success('Update user rank successfully');
            appStore.setReCallApi();
            visible.value = false;
          }
        } catch (error) {
          console.log(error);
          useMessage().createMessage.error(
            Array.isArray(error?.data?.message) ? error.data.message[0] : error.data.message,
          );
        } finally {
          state.loading = false;
        }
      };

      const getRankInit = () => {
        masterData.getListRankSelect.forEach((item) => {
          if (item.label === prop.dataProps?.rank) {
            state.rank = item.value;
          }
        });
      };
      watch(
        () => prop.dataProps,
        () => {
          getRankInit();
        },
      );
      onMounted(() => {
        getRankInit();
      });
      return {
        state,
        visible,
        data,
        masterData,
        handleOpenModal,
        handleUpdateRank,
        columnsTableInformationRank,
      };
    },
  };
</script>
