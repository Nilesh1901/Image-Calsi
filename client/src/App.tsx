import { lazy } from "react";
import { Route, Routes } from "react-router";
const SignUp = lazy(() => import("./pages/SignUp"));
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Login />} path="/login" />
      <Route element={<SignUp />} path="/signup" />
    </Routes>
  );
}

export default App;
