import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import NotFound from "./NotFound";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";
import NewMission from "./NewMission";
import Profile from "./Profile";
import DetailsMission from "./DetailsMission";
import Events from "./Events";
import Formations from "./Formations";

export function MyRoutes() {
  const { loggedin, loading, user } = useAuth();

  if (loading) return <h1>loading...</h1>;

  if (!loggedin)
    return (
      <Routes>
        <Route path="/login" index element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );

  if (user.role === "user") {
    return (
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/new-mission" element={<NewMission />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/events" element={<Events />} />
          <Route path="/mission/:id" element={<DetailsMission />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route exact path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mission/:id" element={<DetailsMission />} />
        <Route path="/events" element={<Events />} />
        <Route path="/formations" element={<Formations />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
