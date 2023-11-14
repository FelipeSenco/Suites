import React, { createContext, useContext } from "react";
import { PaymentsApi } from "../Api/paymentsApi";

type PaymentsContextType = {
  addPayment: (data: AddPaymentData) => Promise<string>;
  editPayment: (data: EditPaymentData) => Promise<string>;
  getPayments: () => Promise<Payment[]>;
  deletePayment: (id: string) => Promise<string>;
};

const PaymentsContext = createContext<PaymentsContextType>(
  {} as PaymentsContextType
);

interface PaymentsProviderProps {
  api: PaymentsApi;
  children: React.ReactNode;
}

export const PaymentsProvider: React.FC<PaymentsProviderProps> = ({
  children,
  api,
}) => {
  const getPayments = (): Promise<Payment[]> => {
    return api.getPayments();
  };

  const addPayment = (data: AddPaymentData): Promise<string> => {
    return api.addPayment(data);
  };

  const editPayment = (data: EditPaymentData): Promise<string> => {
    return api.editPayment(data);
  };

  const deletePayment = (id: string): Promise<string> => {
    return api.deletePayment(id);
  };

  return (
    <PaymentsContext.Provider
      value={{
        addPayment,
        getPayments,
        editPayment,
        deletePayment,
      }}
    >
      {children}
    </PaymentsContext.Provider>
  );
};

export const usePaymentsContext = () => {
  const context = useContext(PaymentsContext);

  if (context === undefined) {
    console.warn("useMyContext must be used within a MyContextProvider");
  }

  return context;
};

export default PaymentsContext;
