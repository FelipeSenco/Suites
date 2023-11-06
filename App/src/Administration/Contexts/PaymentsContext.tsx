import React, { createContext, useContext } from "react";
import { PaymentsApi } from "../Api/paymentsApi";

type PaymentsContextType = {
  addPayment: (data: AddPaymentData) => Promise<string>;
};

const PaymentsContext = createContext<PaymentsContextType>({
  addPayment: () => Promise.resolve(""),
});

interface PaymentsProviderProps {
  api: PaymentsApi;
  children: React.ReactNode;
}

export const PaymentsProvider: React.FC<PaymentsProviderProps> = ({
  children,
  api,
}) => {
  const addPayment = (data: AddPaymentData): Promise<string> => {
    return api.addPayment(data);
  };

  return (
    <PaymentsContext.Provider
      value={{
        addPayment,
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
