import { Route, Routes } from "react-router";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route element={<Login />} path="/login" />
      <Route element={<SignUp />} path="/signup" />
    </Routes>
  );
}

export default App;
