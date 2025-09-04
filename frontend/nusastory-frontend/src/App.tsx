import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProviderToken } from "./auth/AuthContextToken";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import EditBook from "./pages/EditBook";
import ViewPublic from "./pages/ViewPublic";
import Landing from "./Landing";
import GuestRoute from "./routes/GuestRoute";
import Cerita from "./Cerita";
import Recomendasi from "./pages/Recomendasi";
import ChatStreamPage from "./pages/ChatStreamPage";
import AudioLibraryPlayer from "./components/AudioBookPlayer";
import Bacacerita from "./Bacacerita";
import About from "./About";

function App() {
  return (
    <AuthProviderToken>
      <BrowserRouter>
        <Routes>
          {/* Guest Routes */}
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <RegisterPage />
              </GuestRoute>
            }
          />

          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/tentang" element={<About />} />
          <Route path="/cerita" element={<Cerita />} />
          <Route path="/baca" element={<Bacacerita />} />
          <Route path="/audiobook" element={<AudioLibraryPlayer />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recomendasi"
            element={
              <ProtectedRoute>
                <Recomendasi />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books/new"
            element={
              <ProtectedRoute>
                <EditBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books/:id/edit"
            element={
              <ProtectedRoute>
                <EditBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view/:slug"
            element={
              <ProtectedRoute>
                <ViewPublic />
              </ProtectedRoute>
            }
          />
          <Route
            path="/nasa"
            element={
              <ProtectedRoute>
                <ChatStreamPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProviderToken>
  );
}

export default App;