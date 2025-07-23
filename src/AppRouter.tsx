import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TestApp from "./App";
import { Care } from "./components/Care";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

export default function AppRouter() {
  const currentPath = window.location.pathname;

  if (currentPath === "/dashboard") {
    return (
      <AuthProvider>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </AuthProvider>
    );
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestApp />} />
        <Route path="/care" element={<Care />} />
      </Routes>
    </Router>
  );

  // Default route - test application
}
