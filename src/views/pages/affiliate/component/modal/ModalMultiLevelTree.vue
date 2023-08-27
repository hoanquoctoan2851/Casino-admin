<template>
  <div>
    <Modal
      centered
      wrapClassName="modal-tree-affiliate"
      width="90%"
      v-model:visible="visible"
      title="Affiliate tree of user anhnt"
    >
      <div class="h-[70vh]">
        <TreeChart class="w-full" />
      </div>
      <template #footer> </template>
    </Modal>
    <partition-outlined @click="handleOpenModal" class="cursor-pointer hover:text-primary" />
  </div>
</template>
<script>
  import { ref } from 'vue';
  import { Modal } from 'ant-design-vue';
  import { PartitionOutlined } from '@ant-design/icons-vue';
  import TreeChart from '/@/components/Chart/TreeChart.vue';
  export default {
    components: {
      Modal,
      PartitionOutlined,
      TreeChart,
    },
    setup() {
      const visible = ref(false);

      const handleOpenModal = () => {
        visible.value = true;
      };
      return {
        visible,
        handleOpenModal,
      };
    },
  };
</script>
