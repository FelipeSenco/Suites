import React, { ChangeEvent, FC, SetStateAction, useState } from "react";
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

  const [newReceiptImage, setNewReceiptImage] = useState("");

  const onUpdate = async () => {
    await addReceipt({ id: payment.id, image: newReceiptImage });
    !isError && setOpen(false);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1];
        setNewReceiptImage(base64);
      };
      reader.onerror = (error) => {
        console.error("Error: ", error);
      };
    }
  };

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
          height: "600px",
          width: "700px",
        },
      }}
    >
      <div className="flex flex-col justify-center items-center">
        {isLoading ? (
          <LoadingWheel />
        ) : (
          <div className="flex flex-col justify-between items-center gap-5 overflow-y-auto">
            <img
              className="w-1/2 h-1/2"
              src={
                newReceiptImage?.length > 0
                  ? `data:image/png;base64,${newReceiptImage}`
                  : `data:image/png;base64,${receipt?.image}`
              }
              alt="No image"
            />
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
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex justify-between gap-3 w-full">
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold text-lg py-2 px-8 rounded mb-5"
                disabled={isLoading}
              >
                Fechar
              </button>
              <button
                onClick={onUpdate}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg py-2 px-8 rounded mb-5"
                disabled={isLoading || newReceiptImage.length === 0}
              >
                {receipt.image ? "Editar" : "Adicionar"}
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
