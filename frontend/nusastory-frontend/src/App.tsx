import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProviderToken } from "./auth/AuthContextToken";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import ProjectsPage from "./pages/ProjectsPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import EditBook from "./pages/EditBook";
import ViewPublic from "./pages/ViewPublic";

export default function App() {
  return (
    <AuthProviderToken>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={
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
        </Routes>
      </BrowserRouter>
    </AuthProviderToken>
  );
}
