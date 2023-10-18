import React, { useContext } from "react";
import TenantsContext from "../../Contexts/TenantsContext";
import { useMutation, useQuery } from "react-query";

export const useTenantsQuery = (enabled = false) => {
  const { getTenants } = useContext(TenantsContext);

  const { data, isError, isLoading, refetch } = useQuery(
    [keys.tenants],
    getTenants,
    {
      enabled,
      initialData: [] as Tenant[],
      onError: (error: Error) => console.log(error),
    }
  );

  const tenants = data as Tenant[];
  return { tenants, isError, isLoading, refetch };
};

export const useAddTenantMutation = () => {
  const { addTenant } = useContext(TenantsContext);
  const { refetch } = useTenantsQuery();

  return useMutation(addTenant, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      refetch();
    },
  });
};

const keys = {
  tenants: "tenants",
};
