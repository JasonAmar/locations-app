import { useCallback, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./user/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Login from "./user/pages/Login";
import { AuthContextProvider } from "./shared/context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContextProvider value={{ isLoggedIn, login, logout }}>
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/:userId/places" element={<UserPlaces />} />
            {isLoggedIn && <Route path="/places/new" element={<NewPlace />} />}
            {isLoggedIn && (
              <Route path="/places/:placeId" element={<UpdatePlace />} />
            )}
            {!isLoggedIn && <Route path="/login" element={<Login />} />}
            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? "/" : "/login"} />}
            />
          </Routes>
        </main>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
