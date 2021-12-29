import { Button, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <Stack direction="row" padding={4}>
      <Button variant="link" colorScheme="teal">
        <Link to="/">Home</Link>
      </Button>
      <Button variant="link" colorScheme="teal">
        <Link to="register">Register</Link>
      </Button>
      <Button variant="link" colorScheme="teal">
        <Link to="login">Login</Link>
      </Button>
    </Stack>
  );
};

export default NavBar;
