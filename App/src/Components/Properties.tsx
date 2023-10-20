import React, { FC, useContext } from "react";
import PropertiesContext from "../Administration/Contexts/PropertiesContext";
import { usePropertiesQuery } from "../Administration/Api/Queries/PropertiesQueries";

export const Properties: React.FC = () => {
  const { properties } = usePropertiesQuery();
  return (
    <div>
      <table className="border-collapse w-full mt-10">
        <thead>
          <tr>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Endereco</th>
            <th className="border p-2">Quartos</th>
            <th className="border p-2">Inquilinos</th>
            <th className="border p-2">Vagas</th>
          </tr>
        </thead>
        <tbody>
          {properties?.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.address}</td>
              <td className="border p-2">{p.rooms}</td>
              <td className="border p-2">{p.numberOfTenants}</td>
              <td className="border p-2">{p.vacancies}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
