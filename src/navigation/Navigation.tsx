import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SplashScreen from "../pages/SplashScreen";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";

const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Route */}
        <Route element={<PrivateRoute />}>
          <Route path="/Home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Navigation;
