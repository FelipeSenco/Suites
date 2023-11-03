import React, { FC, useState } from "react";

import { useTenantsQuery } from "../Administration/Api/Queries/TenantQueries";
import MonthSelect from "./Shared/MonthSelect";
import YearSelect from "./Shared/YearsSelect";

export const Payments: FC = () => {
  const payments: Payment[] = [];

  return (
    <div>
      <table className="border-collapse w-full mt-10">
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
      <AddPaymentForm />

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

type AddPaymentFormProps = {
  currentPayment?: Payment;
};

export const AddPaymentForm: FC<AddPaymentFormProps> = ({ currentPayment }) => {
  const { tenants } = useTenantsQuery();
  const [tenantId, setTenantId] = useState(currentPayment?.tenantId || "");
  const [amount, setAmount] = useState(currentPayment?.amount || 0);
  const [dateOfPayment, setDateOfPayment] = useState(
    currentPayment?.dateOfPayment || ""
  );
  const [month, setMonth] = useState(currentPayment?.referenceMonth || 0);
  const [year, setYear] = useState(currentPayment?.referenceYear || "");
  const [receipt, setReceipt] = useState(currentPayment?.receipt || "");
  const [showValidationmessages, setShowValidationMessages] = useState(false);

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
              placeholder="Escolha um imovel"
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
        </div>
      </div>
    </div>
  );
};
