import { BrowserRouter } from "react-router-dom";
import { TemaProvider } from "../features/tema";
import AppRoutes from "./AppRoutes";
import Layout from "./Layout";

// Todo lo que está dentro de <TemaProvider> puede usar useTema().
export default function App() {
  return (
    <TemaProvider>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </TemaProvider>
  );
}
