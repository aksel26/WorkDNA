import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TestApp from "./App";
import { Care } from "./components/Care";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestApp />} />
        <Route path="/care" element={<Care />} />
        <Route
          path="/dashboard"
          element={
            <AuthProvider>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </AuthProvider>
          }
        />
      </Routes>
    </Router>
  );

  // Default route - test application
}
