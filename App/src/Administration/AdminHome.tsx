import React, { FC, useContext, useEffect, useState } from "react";
import TenantsContext from "./Contexts/TenantsContext";

export const AdminHome: FC = () => {
  const [tenants, setTenants] = useState<string[]>([]);
  const tenantsContext = useContext(TenantsContext);
  useEffect(() => {
    tenantsContext
      .getTenants()
      .then((res) => {
        setTenants(res);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">Administracao Suites Tavares</h1>
      <p>{tenants}</p>
    </div>
  );
};
