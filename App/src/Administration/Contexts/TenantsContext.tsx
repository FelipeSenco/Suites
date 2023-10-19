import React, { createContext, useEffect, useState } from "react";
import { TenantsApi } from "../Api/tenantsApi";

type TenantsContextType = {
  getTenants: () => Promise<Tenant[]>;
  tenants: Tenant[];
  addTenant: (data: AddTenantData) => Promise<string>;
  editTenant: (data: Tenant) => Promise<string>;
  deleteTenant: (tenantId: string) => Promise<string>;
};

const TenantsContext = createContext<TenantsContextType>({
  getTenants: () => Promise.resolve([]),
  tenants: [],
  addTenant: () => Promise.resolve(""),
  editTenant: () => Promise.resolve(""),
  deleteTenant: () => Promise.resolve(""),
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
    return await api.getTenants();
  };

  const addTenant = async (data: AddTenantData) => {
    return await api.addTenant(data);
  };

  const editTenant = async (data: Tenant) => {
    return await api.editTenant(data);
  };

  const deleteTenant = async (tenantId: string) => {
    return await api.deleteTenant(tenantId);
  };

  return (
    <TenantsContext.Provider
      value={{
        getTenants,
        addTenant,
        editTenant,
        deleteTenant,
        tenants,
      }}
    >
      {children}
    </TenantsContext.Provider>
  );
};

export default TenantsContext;
