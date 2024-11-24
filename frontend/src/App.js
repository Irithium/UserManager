import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import UserList from "./components/UserList";
import TestimonialCarousel from "./components/Test";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<TestimonialCarousel />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
