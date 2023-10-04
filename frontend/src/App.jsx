import React from "react";
import { BrowserRouter } from "react-router-dom";
import { MyRoutes } from "./containers/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import NotificationProvider from "./context/NotificationContext";

const App = () => (
  <BrowserRouter>
    <NotificationProvider>
      <AuthProvider>
        <MyRoutes />
      </AuthProvider>
    </NotificationProvider>
  </BrowserRouter>
);

export default App;
