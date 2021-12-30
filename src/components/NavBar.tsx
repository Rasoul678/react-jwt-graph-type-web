import { Button, Flex, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

const NavBar: React.FC = () => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    setAccessToken("");
    await client.resetStore();
  };

  let body: any = null;

  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = (
      <>
        <Button textColor="orange.300" variant="link" colorScheme="teal">
          <Link to="profile">{data.me.email}</Link>
        </Button>
        <Button variant="link" colorScheme="teal" onClick={handleLogout}>
          Logout
        </Button>
      </>
    );
  } else {
    body = (
      <>
        <Button variant="link" colorScheme="teal">
          <Link to="register">Register</Link>
        </Button>
        <Button variant="link" colorScheme="teal">
          <Link to="login">Login</Link>
        </Button>
      </>
    );
  }

  return (
    <Flex justifyContent="space-between" padding={5}>
      <Button variant="link" colorScheme="teal">
        <Link to="/">Home</Link>
      </Button>
      <Stack direction="row">{body}</Stack>
    </Flex>
  );
};

export default NavBar;
