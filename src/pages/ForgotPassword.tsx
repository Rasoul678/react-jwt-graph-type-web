import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useSendResetPasswordEmailMutation } from "../generated/graphql";

const ForgotPassword: React.FC = () => {
  const [senResetPassEmail] = useSendResetPasswordEmailMutation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendResetEmail = async () => {
    setIsSending(true);
    const response = await senResetPassEmail({
      variables: {
        email,
      },
    });

    if (response.data) {
      setError(response.data?.sendResetPasswordEmail.message);
    }
    setIsSending(false);
  };

  const handleChangeEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };

  return (
    <Box width="600px" maxW={600} mt={10} mx="auto">
      <Heading textAlign="center" my={10}>
        Enter your recovery email
      </Heading>
      <FormControl mb={5}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input id="email" type="email" onChange={handleChangeEmailInput} />
        {!!error && <FormHelperText color="coral">{error}</FormHelperText>}
      </FormControl>
      <Button
        isLoading={isSending}
        colorScheme="teal"
        mt={5}
        onClick={handleSendResetEmail}
      >
        Send
      </Button>
    </Box>
  );
};

export default ForgotPassword;
