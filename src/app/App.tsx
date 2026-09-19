import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import Home from "../features/home/Home";
import Citas from "../features/citas/Citas";
import Admin from "../features/admin/Admin";
import NotFound from "./NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/citas" element={<Citas />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
