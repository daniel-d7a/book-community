import Home from "./Components/Home/Home";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Components/Signup/signup";
import Login from "./Components/Login/login";
import TestQueries from "./testQueries";


function App() {

  return (
    <>
      <div className="mb-0 overflow-hidden">
        <Routes>
          <Route path="/" element={<Home/>} />
          {/* <Route path="/notifications" element={<Notifications />} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<TestQueries />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
