import React from "react";
import "./styles.css";
import { AdminHome } from "./Administration/AdminHome";
import { createRoot } from "react-dom/client";
import { TenantsProvider } from "./Administration/Contexts/TenantsContext";
import { TenantsApi } from "./Administration/Api/tenantsApi";

const tenantsApi = new TenantsApi();

const App: React.FC = () => {
  return (
    <TenantsProvider api={tenantsApi}>
      <AdminHome />
    </TenantsProvider>
  );
};

const root = document.getElementById("root");
if (!root) throw new Error("No root element found");

const reactRoot = createRoot(root);

reactRoot.render(<App />);
