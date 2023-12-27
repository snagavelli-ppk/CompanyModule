import { useState } from "react";
import { authToken } from "./context/context";
import AuthToken from "./components/authToken";
import Home from "./components/Home";
const App = () => {
  const [token, setToken] = useState<string>("");
  const [auth, setAuth] = useState<boolean>(true);
  const handleSubmit = (token: string) => {
    setToken(token);
    setAuth(false);

  };

  return (
    <>
      {auth && <AuthToken onSubmit={handleSubmit} />}
      {!auth && (
        <authToken.Provider value={{ token }}>
          <Home />
        </authToken.Provider>
      )}
    </>
  );
};

export default App;
