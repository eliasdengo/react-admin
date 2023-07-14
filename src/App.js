import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Jlist from "./pages/jlist/Jlist";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Job from "./pages/jobs/Job";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { jobInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import {AuthContext } from "./context/AuthContext"

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const {currentUser} =useContext(AuthContext)

  const RequireAuth=({children})=>{
    return currentUser ?(children):<Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
           <Route path="login" element={<Login />} />
            <Route index element={<RequireAuth><Home /></RequireAuth>} />
          
            <Route path="users">
              <Route index element={<RequireAuth><List /></RequireAuth>} />
              <Route path=":userId" element={<RequireAuth><Single /></RequireAuth>} />
              <Route
                path="new"
                element={<RequireAuth><New inputs={userInputs} title="Add New User" /></RequireAuth>}
              />
            </Route>
            <Route path="jobs">
              <Route index element={<RequireAuth><Jlist /></RequireAuth>} />
              <Route path=":jobId" element={<RequireAuth><Single /></RequireAuth>} />
              <Route
                path="job"
                element={<RequireAuth><Job inputs={jobInputs} title="Add New job" /></RequireAuth>}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
