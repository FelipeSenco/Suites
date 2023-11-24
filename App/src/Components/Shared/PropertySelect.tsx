import React, { FC, SetStateAction } from "react";

type PropertySelectProps = {
  propertyId: string;
  setPropertyId: React.Dispatch<SetStateAction<string>>;
  properties: Property[];
};

const PropertySelect: FC<PropertySelectProps> = ({
  propertyId,
  setPropertyId,
  properties,
}) => {
  return (
    <select
      className="border rounded p-2 w-full focus:border-blue-500"
      id="property"
      onChange={(e) => {
        setPropertyId(e.currentTarget.value);
      }}
      value={propertyId}
      placeholder="Escolha um imovel"
    >
      <option key={"empty"} value={""}>
        Escolha um imovel
      </option>
      {properties.map((property) => (
        <option key={property.id} value={property.id}>
          {property.name}
        </option>
      ))}
    </select>
  );
};

export default PropertySelect;
