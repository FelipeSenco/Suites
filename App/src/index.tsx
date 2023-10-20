import React from "react";
import "./styles.css";
import { createRoot } from "react-dom/client";
import { TenantsProvider } from "./Administration/Contexts/TenantsContext";
import { TenantsApi } from "./Administration/Api/tenantsApi";
import { QueryClient, QueryClientProvider } from "react-query";
import Modal from "react-modal";
import axios from "axios";
import { AdminHome } from "./Administration/AdminHome";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Tenants } from "./Components/Tenants";
import { Properties } from "./Components/Properties";
import { Payments } from "./Components/Payments";
import { PropertiesProvider } from "./Administration/Contexts/PropertiesContext";
import { PropertiesApi } from "./Administration/Api/propertiesApi";

const tenantsApi = new TenantsApi();
const propertiesApi = new PropertiesApi();
const queryClient = new QueryClient();
axios.defaults.timeout = 5000;

Modal.setAppElement("#root");

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminHome />,
    children: [
      {
        path: "/",
        element: <Tenants />,
      },
      {
        path: "/properties",
        element: <Properties />,
      },
      {
        path: "/payments",
        element: <Payments />,
      },
    ],
  },
]);

const root = document.getElementById("root");
if (!root) throw new Error("No root element found");

const reactRoot = createRoot(root);

reactRoot.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PropertiesProvider api={propertiesApi}>
        <TenantsProvider api={tenantsApi}>
          <RouterProvider router={router} />
        </TenantsProvider>
      </PropertiesProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
