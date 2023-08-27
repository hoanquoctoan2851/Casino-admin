<template>
  <div class="w-full desktop:max-w-[200px] flex flex-col gap-2">
    <p class="text-cool-gray-300 text-base">Country</p>
    <Select
      :showSearch="true"
      class="w-full !cursor-pointer"
      v-model:value="countryName"
      @change="handleSelectCode"
    >
      <SelectOption v-for="item in countryCodeList" :key="item.code" :value="item.Name"
        ><div class="flex flex-row items-center gap-2"
          ><span v-if="item.code" :class="`fi fi-${item.code?.toLowerCase()}`"></span
          ><p>{{ item.Name }} </p>
        </div></SelectOption
      >
    </Select>
  </div>
</template>
<script>
  import { ref } from 'vue';
  import { Select, SelectOption } from 'ant-design-vue';
  import { countryCodeList } from '/@/utils/constant';
  export default {
    components: {
      Select,
      SelectOption,
    },
    emits: ['emit:countryCode'],
    setup(_, { emit }) {
      const countryName = ref('All');
      const countryCode = ref();

      const handleSelectCode = () => {
        countryCodeList.forEach((item) => {
          if (item.Name === countryName.value) {
            countryCode.value = item.code.toLowerCase();
          }
        });
        emit('emit:countryCode', countryCode.value);
      };
      return {
        countryName,
        countryCodeList,
        handleSelectCode,
      };
    },
  };
</script>
