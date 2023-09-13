import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Courses from "../Pages/Courses/Courses";
import CreateCourse from "../Pages/CreateCourse/CreateCourse";
import AllCourses from "../Pages/Courses/AllCourses";
import Subject from "../Pages/Courses/Subject";
import { useSelector } from "react-redux";
import Login from "../Pages/Auth/Login/Login";
import Signup from "../Pages/Auth/Signup/Signup";
import ProtectedRoute from "./ProtectedRoute";
import Test from "../Pages/Test";
import Users from "./../Pages/Users/Users";
import Config from "./../Pages/Config/Config";

const ApplicationRoutes = ({ getCurrentPath }) => {
  const location = useLocation();
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  React.useEffect(() => {
    getCurrentPath(location.pathname);
  }, [location.pathname, getCurrentPath]);

  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/login"
        element={loggedIn === "true" ? <Navigate to="/" /> : <Login />}
      />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate to="/courses" />} />
        <Route path="/courses" element={<Courses />}>
          <Route path="" element={<Navigate to="all" />} />
          <Route path="all" element={<AllCourses />} />
          <Route path=":course_id" element={<Subject />} />
        </Route>
        <Route path="/users" element={<Users />} />
        <Route path="/configuration" element={<Config />} />
        <Route path="/create-course" element={<CreateCourse />} />
      </Route>
      <Route path="test" element={<Test />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default ApplicationRoutes;
