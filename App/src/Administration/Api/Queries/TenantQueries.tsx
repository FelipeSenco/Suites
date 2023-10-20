import React, { useContext } from "react";
import TenantsContext from "../../Contexts/TenantsContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { propertiesKeys, usePropertiesQuery } from "./PropertiesQueries";

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
  const queryClient = useQueryClient();
  const currentData: Tenant[] = queryClient.getQueryData(keys.tenants);
  const { refetch: refetchProperties } = usePropertiesQuery();

  return useMutation(addTenant, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data, args, context) => {
      queryClient.setQueryData(keys.tenants, [
        ...currentData,
        { ...args, id: data },
      ]);
      refetchProperties();
    },
  });
};

export const useEditTenantMutation = () => {
  const { editTenant } = useContext(TenantsContext);
  const queryClient = useQueryClient();
  const currentData: Tenant[] = queryClient.getQueryData(keys.tenants);

  return useMutation(editTenant, {
    onMutate: (args) => {
      queryClient.setQueryData(
        keys.tenants,
        currentData.map((t) => (t.id === args.id ? args : t))
      );
    },
    onError: (error: Error) => {
      console.log(error);
      queryClient.setQueryData(keys.tenants, currentData);
    },
  });
};

export const useDeleteTenantMutation = () => {
  const { deleteTenant } = useContext(TenantsContext);
  const queryClient = useQueryClient();
  const currentData: Tenant[] = queryClient.getQueryData(keys.tenants);
  const { refetch: refetchProperties } = usePropertiesQuery();

  return useMutation(deleteTenant, {
    onMutate: (args) => {
      queryClient.setQueryData(
        keys.tenants,
        currentData.filter((t) => t.id !== args)
      );
    },
    onError: (error: Error) => {
      console.log(error);
      queryClient.setQueryData(keys.tenants, currentData);
    },
    onSuccess: () => {
      refetchProperties();
    },
  });
};

const keys = {
  tenants: "tenants",
};
