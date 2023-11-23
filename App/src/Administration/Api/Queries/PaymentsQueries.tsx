import { useMutation, useQuery, useQueryClient } from "react-query";
import PaymentsContext, {
  usePaymentsContext,
} from "../../Contexts/PaymentsContext";
import { useContext } from "react";

export const usePaymentsQuery = (enabled = false) => {
  const { getPayments } = useContext(PaymentsContext);

  const { data, isError, isLoading, refetch } = useQuery(
    [paymentKeys.payments],
    getPayments,
    {
      enabled,
      initialData: [] as Payment[],
      onError: (error: Error) => console.log(error),
    }
  );

  const payments = data as Payment[];
  return { payments, isError, isLoading, refetch };
};

export const useAddPaymentMutation = () => {
  const { addPayment } = usePaymentsContext();
  const { refetch } = usePaymentsQuery();

  return useMutation(addPayment, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data, args, context) => {
      refetch();
    },
  });
};

export const useEditPaymentMutation = () => {
  const { editPayment } = usePaymentsContext();
  const { refetch } = usePaymentsQuery();

  return useMutation(editPayment, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data, args, context) => {
      refetch();
    },
  });
};

export const useDeletePaymentMutation = () => {
  const { deletePayment } = usePaymentsContext();
  const { refetch } = usePaymentsQuery();

  return useMutation(deletePayment, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data, args, context) => {
      refetch();
    },
  });
};

export const useReceiptQuery = (paymentId: string, enabled = false) => {
  const { getReceipt } = useContext(PaymentsContext);

  const { data, isError, isLoading, refetch } = useQuery(
    [paymentKeys.receipt, paymentId],
    () => getReceipt(paymentId),
    {
      enabled,
      initialData: {} as Receipt,
      onError: (error: Error) => console.log(error),
    }
  );
  const receipt = data as Receipt;
  return { receipt, isError, isLoading, refetch };
};

export const useAddReceiptMutation = () => {
  const { addReceipt } = usePaymentsContext();
  const queryClient = useQueryClient();

  return useMutation(addReceipt, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data, args, context) => {
      queryClient.setQueryData([paymentKeys.payments], (oldData: Payment[]) =>
        oldData.map((p) =>
          p.id === args.id ? { ...p, receipt: args.image } : p
        )
      );
      queryClient.setQueryData(
        [paymentKeys.receipt, args.id],
        (oldData: Receipt) => {
          return { ...oldData, image: args.image };
        }
      );
    },
  });
};

export const paymentKeys = {
  payments: "payments",
  receipt: "receipt",
};
