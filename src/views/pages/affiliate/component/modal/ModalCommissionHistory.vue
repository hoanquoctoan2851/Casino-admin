<template>
  <div>
    <Modal
      centered
      wrapClassName="modal-tree-affiliate"
      width="90%"
      v-model:visible="visible"
      title="Commission tree of user anhnt"
    >
      <div class="bg-color-background-neuture-800 px-[33px]">
        <Table
          class="w-full"
          :columns="columns"
          :data-source="dataTable"
          :scroll="{ x: 1000 }"
          :pagination="false"
        >
          <template #headerCell="{}"> </template>
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'stt'">
              <span>{{ dataTable.indexOf(record) + 1 }}</span>
            </template>
            <template v-else-if="column.key === 'amount'">
              <span>{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.amount)) }} </span>
            </template>
            <template v-else-if="column.key === 'preCommission'">
              <span
                >{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.preCommission)) }}
              </span>
            </template>
            <template v-else-if="column.key === 'commissionPost'">
              <span
                >{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.commissionPost)) }}
              </span>
            </template>
            <template v-else-if="column.key === 'createAt'">
              <span>{{ record.createAt }} </span></template
            >
          </template>
          <template #footer>
            <div class="mt-8">
              <PaginationCustom />
            </div>
          </template>
        </Table>
      </div>
    </Modal>
    <FieldTimeOutlined @click="handleOpenModal" class="cursor-pointer hover:text-primary" />
  </div>
</template>
<script>
  import { ref } from 'vue';
  import { Modal } from 'ant-design-vue';
  import { FieldTimeOutlined } from '@ant-design/icons-vue';
  import { Table } from 'ant-design-vue';
  import PaginationCustom from '/@/components/Application/src/AppPagination.vue';
  import { toFixedNumber } from '/@/utils/helper/application.ts';

  const columns = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Amount($)',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Pre commission($)',
      key: 'preCommission',
      dataIndex: 'preCommission',
    },
    {
      title: 'Commission post($)',
      key: 'commissionPost',
      dataIndex: 'commissionPost',
    },
    {
      title: 'Create at',
      key: 'createAt',
      dataIndex: 'createAt',
    },
  ];
  export default {
    components: {
      Modal,
      Table,
      PaginationCustom,
      FieldTimeOutlined,
    },
    props: {
      dataTable: {
        type: Array,
        default: () => [
          {
            key: '1',
            amount: 23423423.23423,
            preCommission: 342323.243,
            commissionPost: 23423.4234,
            createAt: '6:00 23/01/2023',
          },
          {
            key: '2',
            amount: 23423423.23423,
            preCommission: 342323.243,
            commissionPost: 23423.4234,
            createAt: '6:00 23/01/2023',
          },
          {
            key: '3',
            amount: 23423423.23423,
            preCommission: 342323.243,
            commissionPost: 23423.4234,
            createAt: '6:00 23/01/2023',
          },
          {
            key: '4',
            amount: 23423423.23423,
            preCommission: 342323.243,
            commissionPost: 23423.4234,
            createAt: '6:00 23/01/2023',
          },
          {
            key: '5',
            amount: 23423423.23423,
            preCommission: 342323.243,
            commissionPost: 23423.4234,
            createAt: '6:00 23/01/2023',
          },
          {
            key: '6',
            amount: 23423423.23423,
            preCommission: 342323.243,
            commissionPost: 23423.4234,
            createAt: '6:00 23/01/2023',
          },
        ],
      },
    },
    setup() {
      const visible = ref(false);

      const handleOpenModal = () => {
        visible.value = true;
      };
      return {
        visible,
        columns,
        toFixedNumber,
        handleOpenModal,
      };
    },
  };
</script>
