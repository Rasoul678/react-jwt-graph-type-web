import { useUsersQuery } from "../generated/graphql";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { data, loading } = useUsersQuery({ fetchPolicy: "network-only" });

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div>
      {data.users.map((user) => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  );
};

export default Home;
