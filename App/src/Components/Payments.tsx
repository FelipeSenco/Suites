import React, { FC, SetStateAction, useEffect, useState } from "react";

import { useTenantsQuery } from "../Administration/Api/Queries/TenantQueries";
import MonthSelect from "./Shared/MonthSelect";
import YearSelect from "./Shared/YearsSelect";
import ReactModal from "react-modal";
import { AddTenantLoadingSkeleton } from "./Tenants";
import { useAddPaymentMutation } from "../Administration/Api/Queries/PaymentsQueries";

export const Payments: FC = () => {
  const payments: Payment[] = [];
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-center mt-5">
        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold text-lg py-2 px-8 rounded"
        >
          Adicionar
        </button>
      </div>
      <table className="border-collapse w-full mt-5">
        <thead>
          <tr>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Sobrenome</th>
            <th className="border p-2">Imovel</th>
            <th className="border p-2">Valor</th>
            <th className="border p-2">DataDoPagamento</th>
            <th className="border p-2">ReferenteMes</th>
            <th className="border p-2">ReferenteAno</th>
            <th className="border p-2 w-1"></th>
            <th className="border p-2 w-1"></th>
          </tr>
        </thead>
        <tbody>
          {/* {payments.map((t) => (
            <tr key={t.id}>
              <td className="border p-2">{t.name}</td>
              <td className="border p-2">{t.lastName}</td>
              <td className="border p-2">{t.email}</td>
              <td className="border p-2">{t.cellPhone}</td>
              <td className="border p-2">{getPropertyName(t.propertyId)}</td>
              <td className="border p-2">{t.roomNumber}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => {
                    setCurrentTenant(t);
                    setEditModalOpen(true);
                  }}
                >
                  Editar
                </button>
              </td>
              <td className="border p-2">
                <button
                  onClick={() => {
                    setCurrentTenant(t);
                    setDeleteModalOpen(true);
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
      <AddPaymentModal open={addModalOpen} setOpen={setAddModalOpen} />

      {/* {deleteModalOpen && (
        <DeleteConfirmModal
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          isLoading={isDeleteLoading}
          isError={isDeleteError}
          onConfirm={() => deleteTenant(currentTenant.id)}
        />
      )} */}
    </div>
  );
};

type PaymentFormProps = {
  currentPayment?: Payment;
  onCancel: () => void;
  onSubmit: (
    tenantId: string,
    amount: number,
    dateOfPayment: Date,
    referenceMonth: number,
    referenceYear: string,
    receipt?: string,
    id?: string
  ) => Promise<unknown>;
  isLoading: boolean;
  isError: boolean;
};

export const PaymentForm: FC<PaymentFormProps> = ({
  currentPayment,
  onCancel,
  onSubmit,
  isLoading,
  isError,
}) => {
  const { tenants } = useTenantsQuery(true);
  const [tenantId, setTenantId] = useState(currentPayment?.tenantId || "");
  const [amount, setAmount] = useState(currentPayment?.amount || 0);
  const [dateOfPayment, setDateOfPayment] = useState(
    currentPayment?.dateOfPayment || ""
  );
  const [month, setMonth] = useState(currentPayment?.referenceMonth || 1);
  const [year, setYear] = useState(
    currentPayment?.referenceYear || new Date().getFullYear().toString()
  );
  const [receipt, setReceipt] = useState(currentPayment?.receipt || "");
  const [showValidationmessages, setShowValidationMessages] = useState(false);

  const allValid =
    !!tenantId && !!amount && !!dateOfPayment && !!month && !!year;

  const resetForm = () => {
    setTenantId("");
    setAmount(0);
    setDateOfPayment(new Date(Date.now()));
    setMonth(0);
    setYear("");
    setReceipt("");
  };

  const onSubmitClick = async () => {
    setShowValidationMessages(true);
    if (allValid) {
      await onSubmit(
        tenantId,
        amount,
        new Date(dateOfPayment),
        month,
        year,
        receipt,
        currentPayment?.id
      );
      if (!isError) {
        resetForm();
        setShowValidationMessages(false);
      }
    }
  };

  if (isLoading) return <AddTenantLoadingSkeleton />;

  return (
    <div className="p-5">
      <div className="space-y-4">
        <div className="flex flex-row gap-5">
          <div className="flex flex-col w-2/5">
            <label htmlFor="tenant" className="text-gray-700 font-bold mb-1">
              Imovel
            </label>
            <select
              className="border rounded p-2 w-full focus:border-blue-500"
              id="tenant"
              onChange={(e) => {
                setTenantId(e.currentTarget.value);
              }}
              value={tenantId}
              placeholder="Escolha um inquilino"
            >
              <option key={"empty"} value={""}>
                Escolha um inquilino
              </option>
              {tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {`${tenant.name} ${tenant.lastName}`}
                </option>
              ))}
            </select>
            {showValidationmessages && !tenantId && (
              <p className="text-red-500">Inquilino é necessário</p>
            )}
          </div>
          <div className="flex flex-col w-1/5">
            <label htmlFor="amount" className="text-gray-700 font-bold mb-1">
              Quantia
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              required
              className="border rounded p-2 w-full focus:border-blue-500"
              placeholder="Quantia"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
            {showValidationmessages && !amount && (
              <p className="text-red-500">A quantia é necessária</p>
            )}
          </div>
          <div className="flex flex-col w-2/5">
            <label htmlFor="month" className="text-gray-700 font-bold mb-1">
              Referente ao mês:
            </label>
            <MonthSelect month={month} setMonth={setMonth} />
            {showValidationmessages && !month && (
              <p className="text-red-500">O mês é necessário</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-5">
        <div className="flex flex-col w-2/5">
          <label
            htmlFor="dateOfPayment"
            className="text-gray-700 font-bold mb-1"
          >
            Data do pagamento
          </label>
          <input
            type="date"
            id="dateOfPayment"
            name="dateOfPayment"
            required
            className="border rounded p-2 w-full focus:border-blue-500"
            placeholder="Data do pagamento"
            value={dateOfPayment.toString()}
            onChange={(e) => setDateOfPayment(e.target.value.toString())}
          />
          {showValidationmessages && !dateOfPayment && (
            <p className="text-red-500">A data é necessária</p>
          )}
        </div>
        <div className="flex flex-col w-1/5">
          <label htmlFor="year" className="text-gray-700 font-bold mb-1">
            Ano
          </label>
          <YearSelect year={year} setYear={setYear} />
          {showValidationmessages && !year && (
            <p className="text-red-500">O ano é necessário</p>
          )}
        </div>
        <div className="flex flex-col w-2/5">
          <label htmlFor="receipt" className="text-gray-700 font-bold mb-1">
            Comprovante:
          </label>
          <input
            type="file"
            id="receipt"
            accept=".png"
            onChange={(e) => {
              setReceipt(e.target.value);
              console.log(receipt);
            }}
          />
        </div>
      </div>
      <div className="flex justify-center items-center mt-5 flex-col">
        <div className="flex w-1/2 justify-center gap-10">
          <button
            onClick={onCancel}
            className="bg-red-500 hover:bg-red-700 text-white font-bold text-lg py-2 px-8 rounded mb-5"
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            onClick={onSubmitClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg py-2 px-8 rounded mb-5"
            disabled={isLoading}
          >
            Enviar
          </button>
        </div>
        {isError && (
          <p className="text-red-500">
            Houve um problema ao tentar salvar. Tente novamente...
          </p>
        )}
      </div>
    </div>
  );
};

type AddPaymentModalProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

const AddPaymentModal: React.FC<AddPaymentModalProps> = ({ open, setOpen }) => {
  const {
    mutateAsync: addPayment,
    isError,
    isLoading,
  } = useAddPaymentMutation();

  const onSubmitClick = async (
    tenantId: string,
    amount: number,
    dateOfPayment: Date,
    referenceMonth: number,
    referenceYear: string,
    receipt?: string
  ) => {
    await addPayment({
      tenantId,
      amount,
      dateOfPayment,
      referenceMonth,
      referenceYear,
      receipt,
    });
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
          width: "80%",
          height: "50%",
        },
      }}
    >
      <div className="h-48">
        <p className="py-5">Adicionar inquilino:</p>
        <PaymentForm
          currentPayment={null}
          onCancel={() => setOpen(false)}
          onSubmit={onSubmitClick}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </ReactModal>
  );
};
