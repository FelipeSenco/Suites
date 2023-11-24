import React, { FC, useState } from "react";
import TenantSelect from "./TenantSelect";
import { useTenantsQuery } from "../../Administration/Api/Queries/TenantQueries";
import YearSelect from "./YearsSelect";
import MonthSelect from "./MonthSelect";
import { usePropertiesQuery } from "../../Administration/Api/Queries/PropertiesQueries";
import PropertySelect from "./PropertySelect";

type PaymentsFilterProps = {};

const PaymentsFilter: FC<PaymentsFilterProps> = ({}) => {
  const { tenants } = useTenantsQuery(true);
  const { properties } = usePropertiesQuery(true);
  const [tenantId, setTenantId] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [month, setMonth] = useState(0);

  return (
    <div className="flex p-3 w-full">
      <div className="flex gap-3 justify-between w-4/5">
        <TenantSelect
          setTenantId={setTenantId}
          tenantId={tenantId}
          tenants={tenants}
        />
        <PropertySelect
          propertyId={propertyId}
          setPropertyId={setPropertyId}
          properties={properties}
        />
        <MonthSelect month={month} setMonth={setMonth} />
        <YearSelect year={year} setYear={setYear} />
      </div>
    </div>
  );
};

export default PaymentsFilter;
