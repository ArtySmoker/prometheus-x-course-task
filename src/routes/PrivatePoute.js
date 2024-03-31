import { Navigate } from "react-router-dom";
import { useState } from "react";

export default function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("username")
  );

  return isAuthenticated ? children : <Navigate to="/signin" />;
}
