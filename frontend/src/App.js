import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import UserList from "./components/UserList";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuthStore from "./store/authStore";

const App = () => {
  const user = useAuthStore((state) => state.user);

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
