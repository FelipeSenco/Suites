type Tenant = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  cellPhone: string;
  propertyId: string;
  roomNumber: number;
};

type AddTenantData = {
  name: string;
  lastName: string;
  email: string;
  cellPhone: string;
  propertyId: string;
  roomNumber: number;
};

type Property = {
  id: string;
  name: string;
  address: string;
  rooms: number;
  numberOfTenants: number;
  vacancies: number;
};
