import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProviderToken } from "./auth/AuthContextToken";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import EditBook from "./pages/EditBook";
import ViewPublic from "./pages/ViewPublic";
import HomeCoba from "./pages/HomeCoba";
import GuestRoute from "./routes/GuestRoute";
import RegisterPage from "./pages/RegisterPage";
import Recomendasi from "./pages/Recomendasi";

export default function App() {
  return (
    <AuthProviderToken>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={ <GuestRoute>
                <LoginPage />
              </GuestRoute>} />
          <Route path="/register" element={ <GuestRoute>
                <RegisterPage />
              </GuestRoute>} />
          <Route path="/" element={<HomeCoba />} />
          <Route path="/dashboard" element={
            <ProtectedRoute> 
            <Dashboard/>
          </ProtectedRoute>} />
          <Route path="/books/new" element={
            <ProtectedRoute>
              <EditBook/>
            </ProtectedRoute>
          } />
          <Route path="/books/:id/edit" element={<ProtectedRoute>
            <EditBook/>
          </ProtectedRoute>} />
          <Route path="/view/:slug" element={<ProtectedRoute><ViewPublic/></ProtectedRoute>} />
          <Route path="/recomendasi" element={
            <ProtectedRoute>
              <Recomendasi/>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProviderToken>
  );
}
