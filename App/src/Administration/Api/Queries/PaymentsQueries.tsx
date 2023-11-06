import { useMutation } from "react-query";
import { usePaymentsContext } from "../../Contexts/PaymentsContext";

export const useAddPaymentMutation = () => {
  const { addPayment } = usePaymentsContext();
  const refetch = () => console.log("refetch payments");

  return useMutation(addPayment, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data, args, context) => {
      refetch();
    },
  });
};
