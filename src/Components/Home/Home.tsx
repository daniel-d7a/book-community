import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Feed from "../Feed/Feed";
import Profile from "../profile/Profile";

export default function Home() {
  const navigate = useNavigate();
  const logOut = () => {
    window.localStorage.removeItem("currentUser");
    window.sessionStorage.removeItem("currentUser");
    navigate("/login");
  };

  if (
    !window.localStorage.getItem("currentUser") &&
    !window.sessionStorage.getItem("currentUser")
  ) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="bg-slate-900 mb-0 overflow-hidden">
      <Routes>
          <Route path="*" element={<Feed/>} />
          <Route path={`/profile/:user_id`} element={<Profile/>} />
        </Routes>
    </div>
  );
}
