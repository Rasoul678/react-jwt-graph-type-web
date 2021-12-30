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
import { decode } from "js-base64";
import { useResetPasswordMutation } from "../generated/graphql";

const ResetPassword: React.FC = () => {
  const [resetPassword] = useResetPasswordMutation();
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleResetPassword = async () => {
    setIsSending(true);
    const response = await resetPassword({
      variables: {
        input: {
          password: newPassword,
          token: decode(window.location.search.split("=")[1]),
        },
      },
    });

    if (response.data) {
      setError(response.data?.resetPassword.message);
    }
    setIsSending(false);
  };

  const handleChangePasswordInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(e.target.value);
  };

  return (
    <Box width="600px" maxW={600} mt={10} mx="auto">
      <Heading textAlign="center" my={10}>
        Reset password
      </Heading>
      <FormControl mb={5}>
        <FormLabel htmlFor="password">New password</FormLabel>
        <Input
          id="password"
          type="password"
          onChange={handleChangePasswordInput}
        />
        {!!error && <FormHelperText color="coral">{error}</FormHelperText>}
      </FormControl>
      <Button
        isLoading={isSending}
        colorScheme="teal"
        mt={5}
        onClick={handleResetPassword}
      >
        Reset password
      </Button>
    </Box>
  );
};

export default ResetPassword;
