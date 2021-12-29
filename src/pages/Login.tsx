import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { setAccessToken } from "../accessToken";

const Login: React.FC = () => {
  const [login] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegisterUser = async () => {
    setIsLoading(true);
    const response = await login({
      variables: {
        input: {
          email,
          password,
        },
      },
      update: (store, { data }) => {
        if (!data) {
          return null;
        }

        store.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: "Query",
            me: data.login.user,
          },
        });
      },
    });

    if (response && response.data) {
      setAccessToken(response.data.login.accessToken || "");
    }

    if (response.data?.login.error) {
      setError(response.data.login.error.message);
      setIsLoading(false);
      return;
    }

    navigate("/");
  };

  return (
    <Box width="600px" maxW={600} mt={10} mx="auto">
      <Heading textAlign="center" my={10}>
        Sign in
      </Heading>
      <FormControl mb={5}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {!!error && <FormHelperText color="coral">{error}</FormHelperText>}
      </FormControl>
      <Flex justifyContent="space-between" mt={5}>
        <Button
          isLoading={isLoading}
          colorScheme="teal"
          onClick={handleRegisterUser}
        >
          Login
        </Button>
        <Button colorScheme="teal" variant="link">
          <Link to="/forgot_password">Forgot password?</Link>
        </Button>
      </Flex>
    </Box>
  );
};

export default Login;
