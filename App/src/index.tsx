import React from "react";
import "./styles.css";
import { AdminHome } from "./Administration/AdminHome";
import { createRoot } from "react-dom/client";
import { TenantsProvider } from "./Administration/Contexts/TenantsContext";
import { TenantsApi } from "./Administration/Api/tenantsApi";
import { QueryClient, QueryClientProvider } from "react-query";
import Modal from "react-modal";

const tenantsApi = new TenantsApi();
const queryClient = new QueryClient();
Modal.setAppElement("#root");

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TenantsProvider api={tenantsApi}>
        <AdminHome />
      </TenantsProvider>
    </QueryClientProvider>
  );
};

const root = document.getElementById("root");
if (!root) throw new Error("No root element found");

const reactRoot = createRoot(root);

reactRoot.render(<App />);
