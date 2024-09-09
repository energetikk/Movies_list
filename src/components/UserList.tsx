
const UserList = async ({card}: any) => {
  return (
    <div className="flex flex-col w-80 border-2 border-green-600 h-24 rounded-xl p-2 text-xs">
      <p>{`Имя: ${card.name}`}</p>
      <p>{`Email: ${card.email}`}</p>
      <div className="flex">
        <span>Уровень доступа:</span>
        <p className="text-red-700">{card.role}</p>
      </div>
      <p>{card.createdAt.toDateString()}</p>
      <p>{card.createdAt.toTimeString()}</p>
    </div>
  );
};

export { UserList };