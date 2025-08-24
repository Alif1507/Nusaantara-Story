import { Navigate } from "react-router-dom";
import { useAuthToken } from "../auth/AuthContextToken";

export default function ProtectedRoute({children} : {children: React.ReactElement}) {
  const { user } = useAuthToken();
  if (!user) return <Navigate to="/login"/>
  return children;
}