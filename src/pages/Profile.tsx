import {
  Avatar,
  Box,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAccessToken } from "../accessToken";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "../generated/graphql";
import jwtDecode from "jwt-decode";

const Profile: React.FC = () => {
  const token = getAccessToken();
  const { userId }: any = jwtDecode(token);
  const { data, loading } = useProfileQuery({
    variables: {
      userId: String(userId),
    },
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [updateProfile] = useUpdateProfileMutation({
    variables: {
      input: {
        id: String(data?.profile?.user?.profileId),
        firstName,
        lastName,
      },
    },
  });

  useEffect(() => {
    if (data && data.profile) {
      setFirstName(data.profile.firstName || "");
      setLastName(data.profile.lastName || "");
    }
  }, [data]);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "firstName") {
      setFirstName(e.target.value);
    } else {
      setLastName(e.target.value);
    }
  };

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <Box textAlign="center" mt={5} maxW={400} mx="auto">
      <Avatar
        size="4xl"
        name="Segun Adebayo"
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
      />
      <FormControl mt={10}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            width="5.5rem"
            children={<span>First name:</span>}
          />
          <Input
            pl="6rem"
            variant="flushed"
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChangeName}
            onBlur={() => updateProfile()}
          />
        </InputGroup>
      </FormControl>
      <FormControl mt={10}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            width="5.5rem"
            children={<span>Last name:</span>}
          />
          <Input
            pl="6rem"
            variant="flushed"
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChangeName}
            onBlur={() => updateProfile()}
          />
        </InputGroup>
      </FormControl>
    </Box>
  );
};

export default Profile;
