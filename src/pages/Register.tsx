import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { setAccessToken } from "../accessToken";

const Register: React.FC = () => {
  const [register] = useRegisterMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate();

  const handleRegisterUser = async () => {
    setIsRegistering(true);
    const response = await register({
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
            me: data.register.user,
          },
        });
      },
    });

    if (response && response.data) {
      setAccessToken(response.data.register.accessToken || "");
    }

    if (response.data?.register.error) {
      setError(response.data.register.error.message);
      setIsRegistering(false);
      return;
    }

    navigate("/");
  };

  return (
    <Box maxW={600} mt={10} mx="auto">
      <Heading textAlign="center" my={10}>
        Sign up
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
      <Button
        isLoading={isRegistering}
        colorScheme="teal"
        variant="ghost"
        mt={5}
        onClick={handleRegisterUser}
      >
        Register
      </Button>
    </Box>
  );
};

export default Register;
