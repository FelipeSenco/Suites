import React, { createContext, useEffect, useState } from "react";
import { TenantsApi } from "../Api/tenantsApi";

type TenantsContextType = {
  getTenants: () => Promise<string[]>;
};

const TenantsContext = createContext<TenantsContextType>({
  getTenants: () => Promise.resolve([]),
});

interface TenantsProviderProps {
  api: TenantsApi;
  children: React.ReactNode;
}

export const TenantsProvider: React.FC<TenantsProviderProps> = ({
  children,
  api,
}) => {
  const getTenants = async () => {
    const response = await api.getTenants();
    return response;
  };

  return (
    <TenantsContext.Provider
      value={{
        getTenants,
      }}
    >
      {children}
    </TenantsContext.Provider>
  );
};

export default TenantsContext;
