import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
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
        <Box textColor="orange.300" fontWeight="bold">
          {data.me.email}
        </Box>
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
