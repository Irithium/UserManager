import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuthStore from "./store/useAuthStore";
import Register from "./components/Auth/Register";
import UserList from "./components/Users/UserList";
import Login from "./components/Auth/Login";

const App = () => {
  const user = useAuthStore((state) => state.user);
  const initializeUser = useAuthStore((state) => state.initializeUser);

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path={process.env.REACT_APP_REGISTER_URL}
            element={<Register />}
          />
          <Route path={process.env.REACT_APP_LOGIN_URL} element={<Login />} />
          <Route
            path={process.env.REACT_APP_USERS_GET_URL}
            element={<ProtectedRoute element={UserList} />}
          />
          <Route
            path="/"
            element={
              user ? (
                <Navigate to={process.env.REACT_APP_LOGIN_URL} />
              ) : (
                <Navigate to={process.env.REACT_APP_USERS_GET_URL} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
