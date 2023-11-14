import React, { FC, SetStateAction, useState } from "react";
import ReactModal from "react-modal";
import { LoadingWheel } from "./LoadingWheel";
import {
  useAddReceiptMutation,
  useReceiptQuery,
} from "../../Administration/Api/Queries/PaymentsQueries";

type ReceiptModalProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  payment: Payment;
};

export const ReceiptModal: FC<ReceiptModalProps> = ({
  open,
  setOpen,
  payment,
}) => {
  const { receipt, isLoading, isError } = useReceiptQuery(payment?.id, true);
  const {
    mutateAsync: addReceipt,
    isError: isMutationError,
    isLoading: isMutationLoading,
  } = useAddReceiptMutation();

  const [newReceipt, setNewReceipt] = useState("");
  return (
    <ReactModal
      isOpen={open}
      style={{
        overlay: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        content: {
          position: "relative",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          outline: "none",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          background: "#fff",
          top: "auto",
          left: "auto",
          right: "auto",
          bottom: "auto",
        },
      }}
    >
      <div className="flex flex-col justify-center items-center">
        {isLoading ? (
          <LoadingWheel />
        ) : (
          <div className="flex flex-col justify-between gap-5">
            <img src={receipt?.image} />
            {!receipt?.image && !isError && (
              <p>Não existe imagem de recibo associado a esse pagamento.</p>
            )}
            {isError && (
              <p>
                Houve um error ao tentar achar a imagem. Atualize a página e
                tente novamente.
              </p>
            )}
            <div className="flex flex-col bg-gray-200 p-2 ">
              <label htmlFor="receipt" className="text-gray-700 font-bold mb-1">
                Atualizar Comprovante
              </label>
              <input
                type="file"
                id="receipt"
                accept=".png"
                onChange={(e) => {
                  setNewReceipt(e.target.value);
                  console.log(e);
                }}
              />
            </div>
            <div className="flex justify-between gap-3">
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold text-lg py-2 px-8 rounded mb-5"
                disabled={isLoading}
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  console.log({ id: payment.id, image: newReceipt });
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg py-2 px-8 rounded mb-5"
                disabled={isLoading}
              >
                {receipt ? "Editar" : "Adicionar"}
              </button>
            </div>
          </div>
        )}
        {isMutationError && !isMutationLoading && (
          <p className="py-5 text-red-500">
            Houve um error ao tentar adcionar. Tente novamente...
          </p>
        )}
      </div>
    </ReactModal>
  );
};
