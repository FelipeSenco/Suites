import { useContext } from "react";
import PropertiesContext from "../../Contexts/PropertiesContext";
import { useQuery } from "react-query";

export const usePropertiesQuery = (enabled = false) => {
  const { getProperties } = useContext(PropertiesContext);

  const { data, isError, isLoading, refetch } = useQuery(
    [propertiesKeys.properties],
    getProperties,
    {
      enabled,
      initialData: [] as Property[],
      onError: (error: Error) => console.log(error),
    }
  );

  const properties = data as Property[];
  return { properties, isError, isLoading, refetch };
};

export const propertiesKeys = {
  properties: "properties",
};
