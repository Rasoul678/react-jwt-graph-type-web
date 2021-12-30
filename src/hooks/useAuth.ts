import { useEffect, useState } from "react";
import { useMeQuery } from "../generated/graphql";

export const useAuth = () => {
  const { data, loading } = useMeQuery({
    fetchPolicy: "network-only",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (!loading && data && data.me) {
      setIsAuth(true);
      setIsLoading(false);
    }

    if (!loading && data && !data.me) {
      setIsAuth(false);
      setIsLoading(false);
    }

    return () => {
      setIsLoading(true);
      setIsAuth(false);
    };
  }, [data, loading]);

  return { isLoading, isAuth, data };
};
