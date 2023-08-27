<template>
  <div class="flex flex-col gap-10">
    <div class="w-full rounded-2xl bg-gradient-to-b from-white to-[#1256BB] p-[1px]">
      <div
        class="flex flex-row relative tablet:flex-wrap w-full pb-12 gap-5 items-center p-[25px] rounded-2xl bg-color-background-neuture-800 mobile:flex-wrap"
      >
        <div class="min-w-[400px] mobile:min-w-[100%] tablet:min-w-[100%]">
          <AppRangeDate @emit:rangeDate="changeRangeDate" />
        </div>
        <div class="grid grid-cols-3 w-full gap-4 mobile:grid-cols-1">
          <div class="w-full flex flex-col gap-1">
            <p>Type</p>
            <Select
              class="w-full"
              :options="LIST_TYPE_TRANSACTION_ARRAY"
              v-model:value="typeTransaction"
            />
          </div>
          <div class="w-full flex flex-col gap-1">
            <p>Tokens</p>
            <Select class="w-full" v-model:value="token">
              <SelectOption :value="''">All</SelectOption>
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
          </div>
          <div class="w-full flex flex-col gap-1">
            <p>Approver </p>
            <Select
              class="w-full"
              :options="masterData.getListAdminSelect"
              v-model:value="approver"
            />
          </div>
          <!-- <div
            class="absolute h-[50px] left-5 right-5 -bottom-[24px] flex justify-center items-center"
          >
            <Button
              @click="fetchListTransaction"
              class="w-full max-w-[282px] mobile:max-w-[100%]"
              type="primary"
              >Filter</Button
            >
          </div> -->
        </div>
      </div>
    </div>
    <div class="bg-color-background-neuture-800 p-5 rounded-2xl mobile:p-3">
      <Table
        class="w-full"
        :columns="columnsTableTransaction"
        :data-source="dataTable"
        :pagination="false"
        :loading="loading"
        :scroll="{ x: 1100 }"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'amount'">
            <div
              @click="handleSortData('amount')"
              class="flex flex-row gap-2 cursor-pointer select-none items-center"
              :class="sortKey === 'amount' ? 'text-primary' : ''"
            >
              <span>
                {{ column.title }}
              </span>
              <div v-if="sortKey === 'amount'">
                <arrow-down-outlined v-if="sortValue === 'desc'" />
                <arrow-up-outlined v-else />
              </div>
            </div>
          </template>
          <template v-if="column.key === 'rate'">
            <div
              @click="handleSortData('rate')"
              class="flex flex-row gap-2 cursor-pointer select-none items-center"
              :class="sortKey === 'rate' ? 'text-primary' : ''"
            >
              <span>
                {{ column.title }}
              </span>
              <div v-if="sortKey === 'rate'">
                <arrow-down-outlined v-if="sortValue === 'desc'" />
                <arrow-up-outlined v-else />
              </div>
            </div>
          </template>
          <template v-if="column.key === 'date'">
            <div
              @click="handleSortData('createdAt')"
              class="flex flex-row gap-2 cursor-pointer select-none items-center"
              :class="sortKey === 'createdAt' ? 'text-primary' : ''"
            >
              <span>
                {{ column.title }}
              </span>
              <div v-if="sortKey === 'createdAt'">
                <arrow-down-outlined v-if="sortValue === 'desc'" />
                <arrow-up-outlined v-else />
              </div>
            </div>
          </template>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'stt'">
            <span>{{ record?.index }}</span>
          </template>
          <template v-else-if="column.key === 'username'">
            <span class="cursor-pointer">{{ record.name }}</span>
          </template>
          <template v-else-if="column.key === 'type'">
            <span :style="`color: ${LIST_TYPE_TRANSACTION_OBJECT[record.type]?.color}`">{{
              LIST_TYPE_TRANSACTION_OBJECT[record.type]?.label
            }}</span>
          </template>
          <template v-else-if="column.key === 'token'">
            <div class="flex flex-row gap-2 items-center">
              <img class="h-6 w-6" :src="record.token?.icon" />
              <span class="uppercase">{{ record.token?.symbol }}</span>
            </div>
          </template>
          <template v-else-if="column.key === 'rate'">
            <span>{{ record?.rate || '-' }} </span>
          </template>
          <template v-else-if="column.key === 'amount'"
            ><span class="text-white"
              >{{ Intl.NumberFormat('en-US').format(toFixedNumber(record.amount)) }}
            </span>
          </template>
          <template v-else-if="column.key === 'approver'">
            <span>{{ record?.approver?.name }}</span></template
          >
          <template v-else-if="column.key === 'status'">
            <div>
              <span :style="`color: ${LIST_TYPE_STATUS_OBJECT[record.status]?.color}`">{{
                LIST_TYPE_STATUS_OBJECT[record.status]?.label || record.status
              }}</span>
            </div>
          </template>
          <template v-else-if="column.key === 'date'">
            <span>{{ record?.date }}</span>
          </template>
        </template>
        <template #title> </template>
        <template #footer>
          <div class="mt-8">
            <PaginationCustom @changeCurrentPage="changePagination" :total="total" />
          </div>
        </template>
        <template #expandedRowRender="{ record }">
          <div
            v-if="!['pending'].includes(record?.status)"
            class="w-full p-5 grid grid-cols-2 tablet:grid-cols-1 mobile:grid-cols-1 mobile:p-0 w-full"
          >
            <div class="flex flex-col gap-5 mobile:mb-5">
              <div class="flex flex-row gap-3">
                <p class="text-white w-[70px] mobile:w-[50px]">From:</p>
                <div class="flex flex-row gap-3">
                  <p
                    class="w-[300px] mobile:w-full mobile:max-w-[150px] truncate"
                    :id="record.key + 'from'"
                    >{{ record.fWalletAddress || '-' }}</p
                  >
                  <p class="underline cursor-pointer text-white">See</p>
                  <CopyText :id-copy="record.key + 'from'" />
                </div>
              </div>
              <div class="flex flex-row gap-3">
                <p class="text-white w-[70px] mobile:w-[50px]">To:</p>
                <div class="flex flex-row gap-3">
                  <p class="w-[300px] truncate mobile:max-w-[150px]" :id="record.key + 'to'">{{
                    record.tWalletAddress || '-'
                  }}</p>
                  <p class="underline cursor-pointer text-white">See</p>
                  <CopyText :id-copy="record.key + 'to'" />
                </div>
              </div>
              <div class="flex flex-row gap-3">
                <p class="text-white w-[70px] mobile:w-[50px]">TxHash:</p>
                <div class="flex flex-row gap-3">
                  <p class="w-[300px] truncate mobile:max-w-[150px]" :id="record.key + 'TxHash'">{{
                    record.hash || '-'
                  }}</p>
                  <p class="underline cursor-pointer text-white">See</p>
                  <CopyText :id-copy="record.key + 'TxHash'" />
                </div>
              </div>
              <div class="flex flex-row gap-3">
                <p class="text-white min-w-[70px] mobile:min-w-[50px]">Note:</p>
                <p>{{ record.note || '-' }}</p>
              </div>
            </div>
            <div
              class="pl-[70px] mobile:pl-0 tablet:pl-0"
              v-if="['handling', 'pending'].includes(record.status)"
            >
              <div>
                <Form
                  autocomplete="off"
                  :model="formState"
                  layout="vertical"
                  :hideRequiredMark="true"
                >
                  <FormItem label="Txhash" v-bind="validateInfos.hash">
                    <div class="flex flex-row gap-4 items-centers">
                      <Input v-model:value="formState.hash" />
                      <Button
                        html-type="submit"
                        @click="handleUpdateApprover(1, formState, record.id)"
                        class="min-w-[49px]"
                        type="green-color"
                        ><template #icon> <CheckOutlined class="!text-xl" /> </template
                      ></Button>
                    </div>
                  </FormItem>
                  <FormItem label="Note" v-bind="validateInfos.note">
                    <div class="flex flex-row gap-4 items-centers">
                      <Input v-model:value="formState.note" />
                      <Button
                        html-type="submit"
                        @click="handleUpdateApprover(0, formState, record.id)"
                        class="min-w-[49px]"
                        type="red-color"
                        ><template #icon> <CloseOutlined class="!text-xl" /> </template
                      ></Button>
                    </div>
                  </FormItem>
                </Form>
              </div>
            </div>
          </div>
          <div v-if="record?.status === 'pending'" class="flex">
            <Button @click="handleUpdatePerformer(record.id)" class="m-auto" type="yellow-color"
              >I want handle this request</Button
            >
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
  import { reactive, watch, toRefs } from 'vue';
  import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue';
  import AppRangeDate from '/@/components/Application/src/AppRangeDate.vue';
  import {
    Select,
    Button,
    SelectOption,
    FormItem,
    Form,
    Table,
    Input,
    message,
  } from 'ant-design-vue';
  import { toFixedNumber } from '/@/utils/helper/application.ts';
  import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons-vue';
  import PaginationCustom from '/@/components/Application/src/AppPagination.vue';
  import CopyText from '/@/components/Application/src/CopyText.vue';
  import { useTransactionState } from './useTransaction.ts';
  import { getListTransaction, updateApprover, updatePerformer } from '/@/api/pages/transaction';
  import { masterDataStore } from '/@/store/modules/masterData.ts';
  import { useUserStore } from '/@/store/modules/user';
  import { useAppStore } from '/@/store/modules/app';

  import {
    LIST_TYPE_TRANSACTION_ARRAY,
    LIST_TYPE_TRANSACTION_OBJECT,
    LIST_TYPE_STATUS_ARRAY,
    LIST_TYPE_STATUS_OBJECT,
  } from '/@/utils/constant';
  const useForm = Form.useForm;
  export default {
    components: {
      AppRangeDate,
      Select,
      Table,
      Input,
      SelectOption,
      PaginationCustom,
      CheckOutlined,
      CloseOutlined,
      ArrowUpOutlined,
      Button,
      Form,
      CopyText,
      FormItem,
      ArrowDownOutlined,
    },
    setup() {
      const { userInfo } = useUserStore();
      const formState = reactive({
        hash: '',
        note: '',
      });
      const { mapDataTableTransaction } = useTransactionState();
      const rulesRef = reactive({
        hash: [
          {
            required: true,
            message: 'Please input Txhash',
          },
        ],

        note: [
          {
            required: true,
            message: 'Please input note',
          },
        ],
      });
      const { validate, validateInfos } = useForm(formState, rulesRef, {
        onValidate: (...args) => console.log(...args),
      });
      const masterData = masterDataStore();
      const { columnsTableTransaction } = useTransactionState();
      const states = reactive({
        loading: false,
        typeTransaction: '',
        total: 0,
        limit: 10,
        page: 1,
        token: '',
        approver: '',
        rangeDate: [],
        dataTable: [],
        sortValue: 'desc',
        sortKey: 'createdAt',
      });

      const fetchListTransaction = async () => {
        try {
          states.loading = true;
          const params = {
            pageSize: states.limit,
            sortKey: states.sortKey,
            sortDirection: states.sortValue,
            currentPage: states.page,
            filterKey: `${states.typeTransaction ? 'type,' : ''}${states.token ? 'symbol,' : ''}${
              states.approver ? 'performed_by,' : ''
            }`,
            filterValue: `${
              states.typeTransaction ? states.typeTransaction?.toUpperCase() + ',' : ''
            }${states.token ? states.token + ',' : ''}${
              states.approver ? states.approver + ',' : ''
            }`,
            endDate: states.rangeDate[1] ? states.rangeDate[1] : null,
            startDate: states.rangeDate[0] ? states.rangeDate[0] : null,
          };
          const res = await getListTransaction(params);
          states.total = res.data?.paginateOptions.count;
          states.dataTable = mapDataTableTransaction(res.data.data, states.page, states.limit);
          console.log(states.dataTable);
          states.loading = false;
        } catch (error) {
          console.log(error);
        } finally {
          states.loading = false;
        }
      };

      const handleUpdateApprover = async (status, data, id) => {
        await validate(status === 0 ? 'note' : 'hash')
          .then(async () => {
            try {
              const params = {
                id: id,
                status: status,
                hash: data?.hash,
                note: formState.note,
              };
              const res = await updateApprover(params);
              if (res.data) {
                fetchListTransaction();
                message.success('Action success');
              }
            } catch (error) {
              console.log(error);
            }
          })
          .catch((err) => {
            console.log('error', err);
          });
      };

      const handleUpdatePerformer = async (id) => {
        try {
          const params = {
            id,
          };
          const res = await updatePerformer(params);
          if (res.data) {
            fetchListTransaction();
            message.success('Update performer success');
          }
        } catch (error) {
          console.log(error);
        }
      };

      const changePagination = (data) => {
        states.limit = data.size;
        states.page = data.page;
        fetchListTransaction();
      };

      const changeRangeDate = (rangDate) => {
        states.rangeDate = rangDate;
        useAppStore().setResetPage();
        fetchListTransaction();
      };

      const handleSortData = (key) => {
        states.sortValue = states.sortValue === 'desc' ? 'asc' : 'desc';
        states.sortKey = key;
        fetchListTransaction();
      };

      watch(
        () => [states.token, states.approver, states.typeTransaction],
        () => {
          useAppStore().setResetPage();
          fetchListTransaction();
        },
      );

      return {
        ...toRefs(states),
        formState,
        rulesRef,
        columnsTableTransaction,
        handleUpdatePerformer,
        handleSortData,
        LIST_TYPE_TRANSACTION_ARRAY,
        LIST_TYPE_TRANSACTION_OBJECT,
        LIST_TYPE_STATUS_ARRAY,
        LIST_TYPE_STATUS_OBJECT,
        masterData,
        toFixedNumber,
        changePagination,
        changeRangeDate,
        validateInfos,
        fetchListTransaction,
        handleUpdateApprover,
        userInfo,
      };
    },
  };
</script>
