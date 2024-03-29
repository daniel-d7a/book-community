import Home from "./Components/Home/Home";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Components/Signup/signup";
import Login from "./Components/Login/login";
import TestQueries from "./testQueries";
import Profile from "./Components/profile/Profile";
import Nav from "./Components/Nav/Nav";
import Yelo from "./Components/Yelo/Yelo";


const restricted_paths = ["/login", "/signup"];

function App() {
  return (
    <>
      <div className="mb-0 overflow-hidden">
        <Routes>
          <Route path="*" element={<Home />} />
          {/* <Route path="/notifications" element={<Notifications />} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<TestQueries />} />
          <Route path={`/profile/:user_id`} Component={Profile} />
          <Route path="/yelo" element={<Yelo/>} />
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
