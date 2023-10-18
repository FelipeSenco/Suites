import React, { createContext, useEffect, useState } from "react";
import { TenantsApi } from "../Api/tenantsApi";

type TenantsContextType = {
  getTenants: () => Promise<Tenant[]>;
  tenants: Tenant[];
  addTenant: (data: AddTenantData) => Promise<string>;
};

const TenantsContext = createContext<TenantsContextType>({
  getTenants: () => Promise.resolve([]),
  tenants: [],
  addTenant: () => Promise.resolve(""),
});

interface TenantsProviderProps {
  api: TenantsApi;
  children: React.ReactNode;
}

export const TenantsProvider: React.FC<TenantsProviderProps> = ({
  children,
  api,
}) => {
  const [tenants, setTenants] = useState<Tenant[]>([]);

  useEffect(() => {
    getTenants()
      .then((res) => {
        setTenants(res);
      })
      .catch((e) => console.log(e));
  }, []);

  const getTenants = async (): Promise<Tenant[]> => {
    const response = await api.getTenants();
    return response;
  };

  const addTenant = async (data: AddTenantData) => {
    const response = await api.addTenant(data);
    return response;
  };

  return (
    <TenantsContext.Provider
      value={{
        getTenants,
        addTenant,
        tenants,
      }}
    >
      {children}
    </TenantsContext.Provider>
  );
};

export default TenantsContext;
