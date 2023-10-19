import React, { FC, SetStateAction } from "react";
import ReactModal from "react-modal";
import { LoadingWheel } from "./LoadingWheel";

type DeleteConfirmModalProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  isError: boolean;
  onConfirm: () => Promise<string>;
};

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  open,
  setOpen,
  onConfirm,
  isLoading,
  isError,
}) => {
  console.log(isError);

  const onDeleteConfirm = async () => {
    await onConfirm();
    !isError && setOpen(false);
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
        },
      }}
    >
      <div className="flex flex-col justify-center items-center">
        {isLoading ? (
          <LoadingWheel />
        ) : (
          <>
            <p className="py-5 text-xl font-bold">
              Voce tem certeza que quer deletar?
            </p>
            <div className="flex justify-between gap-3">
              <button
                onClick={onDeleteConfirm}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg py-2 px-8 rounded mb-5"
                disabled={isLoading}
              >
                Confirmar
              </button>
              <button
                onClick={() => setOpen(false)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold text-lg py-2 px-8 rounded mb-5"
                disabled={isLoading}
              >
                Cancelar
              </button>
            </div>
          </>
        )}
        {isError && !isLoading && (
          <p className="py-5 text-red-500">
            Houve um error ao tentar deletar. Tente novamente...
          </p>
        )}
      </div>
    </ReactModal>
  );
};
