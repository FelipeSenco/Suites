import React, { createContext, useEffect, useState } from "react";
import { PropertiesApi } from "../Api/propertiesApi";
import { useQueryClient } from "react-query";
import { propertiesKeys } from "../Api/Queries/PropertiesQueries";

type PropertiesContextType = {
  getProperties: () => Promise<Property[]>;
};

const PropertiesContext = createContext<PropertiesContextType>({
  getProperties: () => Promise.resolve([]),
});

interface PropertiesProviderProps {
  api: PropertiesApi;
  children: React.ReactNode;
}

export const PropertiesProvider: React.FC<PropertiesProviderProps> = ({
  children,
  api,
}) => {
  const queryCLient = useQueryClient();
  useEffect(() => {
    getProperties()
      .then((r) => {
        queryCLient.setQueryData(propertiesKeys.properties, r);
      })
      .catch((e) => console.log(e));
  }, []);

  const getProperties = async (): Promise<Property[]> => {
    return await api.getProperties();
  };

  return (
    <PropertiesContext.Provider
      value={{
        getProperties,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
};

export default PropertiesContext;
