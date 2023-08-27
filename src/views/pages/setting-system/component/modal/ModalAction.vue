<template>
  <div>
    <Modal
      :destroyOnClose="true"
      wrap-class-name="modal-default"
      :width="getIsMobile ? '100%' : '100%'"
      class="!max-w-[1249px]"
      v-model:visible="visible"
    >
      <div>
        <KeepAlive>
          <component :is="activeKey" :dataAdmin="dataModal" @changeModal="changeModal" />
        </KeepAlive>
      </div>
      <template #title>
        <div class="flex flex-row justify-between items-center mobile:flex-col gap-4">
          <p>Edit</p>
          <div
            class="flex items-center justify-end px-14 rounded-lg bg-color-background-neuture-700"
          >
            <Tabs v-model:activeKey="activeKey">
              <template v-for="item in renderListTab" :key="item.key">
                <TabPane :tab="item.title">
                  <template #tab> </template>
                </TabPane>
              </template>
            </Tabs>
          </div>
          <div></div>
        </div>
      </template>
      <template #footer> </template>
    </Modal>
    <img :src="PenEdit" @click="handleOpenModal" class="cursor-pointer hover:text-primary" />
  </div>
</template>
<script>
  import { ref, watch, onMounted, computed } from 'vue';
  import { Modal } from 'ant-design-vue';
  import PenEdit from '/@/assets/svg/pen-edit.svg';
  import TabsEditPermission from '../tabs/TabsEditPermission.vue';
  import TabsPermissionHistory from '../tabs/TabsPermissionHistory.vue';
  import { Tabs } from 'ant-design-vue';
  import { useAppInject } from '/@/hooks/web/useAppInject';

  export default {
    components: {
      Modal,
      Tabs,
      TabsEditPermission,
      TabsPermissionHistory,
    },
    props: {
      dataModal: {
        type: Object,
        default: () => {},
      },
    },
    setup(prop) {
      const visible = ref(false);
      const { getIsMobile } = useAppInject();
      const activeKey = ref('TabsEditPermission');
      const handleOpenModal = () => {
        visible.value = true;
      };

      const renderListTab = computed(() => {
        if (prop.dataModal.adminType === 3) {
          return [
            {
              title: 'Action history',
              key: 'TabsPermissionHistory',
              value: 'TabsPermissionHistory',
            },
          ];
        } else {
          return [
            {
              title: 'Edit permission',
              key: 'TabsEditPermission',
              value: 'TabsEditPermission',
            },
            {
              title: 'Action history',
              key: 'TabsPermissionHistory',
              value: 'TabsPermissionHistory',
            },
          ];
        }
      });

      const changeModal = (data) => {
        visible.value = data;
      };
      const initTabActive = () => {
        if (prop.dataModal.adminType === 3) {
          activeKey.value = 'TabsPermissionHistory';
        } else {
          activeKey.value = 'TabsEditPermission';
        }
      };

      watch(
        () => prop.dataModal,
        () => {
          initTabActive();
        },
      );
      onMounted(() => {
        initTabActive();
      });
      return {
        visible,
        activeKey,
        PenEdit,
        renderListTab,
        getIsMobile,
        handleOpenModal,
        changeModal,
      };
    },
  };
</script>
