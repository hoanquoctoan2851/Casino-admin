export function useUserManagerState() {
  const columnsTableUserManager = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Rank',
      key: 'rank',
      dataIndex: 'rank',
    },
    {
      title: 'Balance($)',
      key: 'balance',
      dataIndex: 'balance',
    },
    {
      title: 'Last play',
      key: 'lastPlay',
      dataIndex: 'lastPlay',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Country',
      key: 'country',
      dataIndex: 'country',
      align: 'center',
    },
    {
      title: 'Join date',
      key: 'joinDate',
      dataIndex: 'joinDate',
    },
    {
      title: 'Active',
      key: 'active',
      dataIndex: 'active',
      align: 'center',
    },
  ];

  return { columnsTableUserManager };
}
