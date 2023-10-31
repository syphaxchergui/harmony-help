import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import NotFound from "./NotFound";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";
import NewMission from "./NewMission";
import Profile from "./Profile";

export function MyRoutes() {
  const { loggedin, loading } = useAuth();

  if (loading) return <h1>loading...</h1>;

  if (!loggedin)
    return (
      <Routes>
        <Route path='/login' index element={<Login />} />
        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>
    );

  return (
    <Routes>
      <Route exact path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/new-mission' element={<NewMission />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}
