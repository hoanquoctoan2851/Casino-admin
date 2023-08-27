<template>
  <div class="grid grid-cols-2 gap-5 mobile:grid-cols-1">
    <div class="rounded-2xl bg-color-background-neuture-800 p-7 w-full">
      <p class="mb-4 text-xl text-white font-normal">Permission Type</p>
      <div class="flex flex-col gap-6">
        <div
          v-for="item in LIST_PERMISSION_INSTRUCT"
          :key="item.title"
          class="flex text-color-text-neuture-300 text-base flex-col gap-1"
        >
          <p>{{ item.title }}</p>
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>
    <div class="rounded-2xl bg-color-background-neuture-800 p-7 w-full">
      <p class="mb-4 text-xl text-white font-normal">Permission Status</p>
      <div class="flex flex-col gap-6">
        <div
          v-for="item in LIST_PERMISSION_STATUS"
          :key="item.title"
          class="flex text-color-text-neuture-300 text-base flex-col gap-1"
        >
          <p>{{ item.title }}</p>
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    setup() {
      const LIST_PERMISSION_INSTRUCT = [
        {
          title: 'User Info',
          content: 'Manage user info in User Manage Dashboard and User Detail Screen',
        },
        {
          title: 'User Vip',
          content: 'Manage user info in User Vip Statistic Screen',
        },
        {
          title: 'User Cashback',
          content: 'Manage user info in User Cashback Report Screen',
        },
        {
          title: 'User Statistic',
          content: 'Manage user info in User Statistic Screen',
        },
        {
          title: 'User Rank',
          content: 'Manage user rank setting in Setting Screen',
        },
        {
          title: 'User Referral',
          content: 'Manage user ref in Referral Screen',
        },
        {
          title: 'Manage Transaction',
          content: 'Manage user transaction in Transaction Manage Dashboard',
        },
        {
          title: 'Manage Promotion',
          content: 'Manage site promotion in Promotion Manage Dashboard',
        },
      ];

      const LIST_PERMISSION_STATUS = [
        {
          title: 'Not set',
          content: 'Not allow to access data',
        },
        {
          title: 'Not allow',
          content: 'Not allow to access data',
        },
        {
          title: 'Viewable',
          content: 'Can access and retrieve data but can nit perform any modification',
        },
        {
          title: 'Editable',
          content: 'Can access, retrieve data and can perform any modification',
        },
      ];
      return {
        LIST_PERMISSION_INSTRUCT,
        LIST_PERMISSION_STATUS,
      };
    },
  };
</script>
