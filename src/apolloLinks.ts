import { TokenRefreshLink } from "apollo-link-token-refresh";
import { getAccessToken, setAccessToken } from "./accessToken";
import jwtDecode from "jwt-decode";
import { ApolloLink, Observable } from "apollo-link";
import { HttpLink } from "apollo-link-http";

export const tokenRefreshLink: any = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();

    if (!token) {
      return true;
    }

    try {
      const { exp }: any = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    });
  },
  handleFetch: (accessToken) => {
    //! set the access token
    setAccessToken(accessToken);
  },
  handleError: (err) => {
    console.warn("Your refresh token is invalid. Try to re-login");
    console.error(err);
  },
});

export const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = getAccessToken();

          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `bearer ${accessToken}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

export const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});
