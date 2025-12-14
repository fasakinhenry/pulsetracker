import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Transfer from "../pages/Transfer";
import TransferSuccess from "../pages/TransferSuccess";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transfer"
        element={
          <ProtectedRoute>
            <Transfer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transfer-success"
        element={
          <ProtectedRoute>
            <TransferSuccess />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
