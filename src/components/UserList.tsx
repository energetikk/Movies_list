
const UserList = async ({card}) => {
  return (
    <div>
    <p className="movies__card-name">{card.name}</p>
    <p className="movies__card-name">{card.email}</p>
    <p className="movies__card-name">{card.role}</p>
    <p className="movies__card-name">{card.createdAt.toDateString()}</p>
    <p className="movies__card-name">{card.createdAt.toTimeString()}</p>
    </div>
  );
};

export { UserList };