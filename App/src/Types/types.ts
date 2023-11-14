type Tenant = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  cellPhone: string;
  propertyId: string;
  propertyName: string;
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

type EditTenantData = {
  id: string;
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

type Payment = {
  id: string;
  tenantId: string;
  tenantName: string;
  tenantLastName: string;
  propertyName: string;
  roomNumber: string;
  amount: number;
  dateOfPayment: Date;
  referenceMonth: number;
  referenceYear: string;
  hasReceipt: boolean;
};

type AddPaymentData = {
  tenantId: string;
  amount: number;
  dateOfPayment: Date;
  referenceMonth: number;
  referenceYear: string;
};

type EditPaymentData = {
  id: string;
  tenantId: string;
  amount: number;
  dateOfPayment: Date;
  referenceMonth: number;
  referenceYear: string;
};

type Receipt = {
  id: string;
  image: string;
};
