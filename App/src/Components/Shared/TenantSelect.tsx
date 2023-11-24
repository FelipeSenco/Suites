import React, { FC, SetStateAction } from "react";

type TenantSelectProps = {
  setTenantId: React.Dispatch<SetStateAction<string>>;
  tenants: Tenant[];
  tenantId: string;
};

const TenantSelect: FC<TenantSelectProps> = ({
  tenants,
  setTenantId,
  tenantId,
}) => {
  return (
    <select
      className="border rounded p-2 w-full focus:border-blue-500"
      id="tenant"
      onChange={(e) => {
        setTenantId(e.currentTarget.value);
      }}
      value={tenantId}
      placeholder="Escolha um inquilino"
    >
      <option key={"empty"} value={""}>
        Escolha um inquilino
      </option>
      {tenants.map((tenant) => (
        <option key={tenant.id} value={tenant.id}>
          {`${tenant.name} ${tenant.lastName}`}
        </option>
      ))}
    </select>
  );
};

export default TenantSelect;
