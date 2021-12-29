import { useEffect, useState } from "react";
import { setAccessToken } from "./accessToken";
import AppRoutes from "./Routes";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (res) => {
        const data = await res.json();
        setAccessToken(data.accessToken);
        setIsLoading(false)
    });
  }, []);

  if (isLoading) {
    return <div>Loading app ...</div>;
  }

  return <AppRoutes />;
};

export default App;
