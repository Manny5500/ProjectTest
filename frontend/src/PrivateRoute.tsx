import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/qmmc/loginloginJSON.action", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(data.isLoggedIn);
      })
      .catch((err) => {
        console.error("Failed to fetch login status:", err);
        setIsAuthenticated(false);
      });
  }, []);
  

  if (isAuthenticated === null) return null; // or a loading spinner

  return isAuthenticated ? children : <Navigate to="/signin" />;
}
