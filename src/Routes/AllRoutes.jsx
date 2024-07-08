import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import SignUp from "../Pages/SignUp";
import SignIn from "../Pages/SignIn";
import PrivateRoutes from "./PrivateRoutes";
import TaskList from "../Pages/TaskList";

export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />
        <Route
          path="/tasklist"
          element={
            <PrivateRoutes>
              <TaskList />
            </PrivateRoutes>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
}
