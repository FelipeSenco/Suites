import React, { FC, useContext, useEffect, useState } from "react";
import TenantsContext from "../Administration/Contexts/TenantsContext";
import { cellPhoneRegex, emailRegex } from "../Types/utils";

export const Tenants: FC = () => {
  const tenantsContext = useContext(TenantsContext);
  const { tenants } = tenantsContext;

  return (
    <div>
      <h1 className="text-3xl font-bold">Administracao Suites Tavares</h1>
      <table className="border-collapse w-full mt-10">
        <thead>
          <tr>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Sobrenome</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Celular</th>
            <th className="border p-2 w-1"></th>
            <th className="border p-2 w-1"></th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((t) => (
            <tr key={t.id}>
              <td className="border p-2">{t.name}</td>
              <td className="border p-2">{t.lastName}</td>
              <td className="border p-2">{t.email}</td>
              <td className="border p-2">{t.cellPhone}</td>
              <td className="border p-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                  Editar
                </button>
              </td>
              <td className="border p-2">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddTenantArea />
    </div>
  );
};

const AddTenantArea: React.FC = () => {
  const { addTenant } = useContext(TenantsContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameValid, setLastNameValid] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [cellPhone, setCellPhone] = useState("");
  const [cellPhoneValid, setCellPhoneValid] = useState(false);
  const [showValidationmessages, setShowValidationMessages] = useState(false);

  useEffect(() => {
    validateFields();
  }, [name, lastName, cellPhone, email]);

  const validateFields = () => {
    setNameValid(!!name);
    setLastNameValid(!!lastName);
    setEmailValid(emailRegex.test(email));
    setCellPhoneValid(cellPhoneRegex.test(cellPhone));
  };

  const onSubmitClick = () => {
    setShowValidationMessages(true);
    const allValid = nameValid && lastNameValid && emailValid && cellPhoneValid;
    allValid && addTenant({ name, lastName, email, cellPhone });
  };

  return (
    <div className="mt-10 p-5">
      <div className="flex items-center justify-center">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold text-lg py-2 px-8 rounded mb-5"
        >
          {showAddForm ? `Esconder` : `Adicionar`}
        </button>
      </div>
      {showAddForm && (
        <>
          <div className="space-y-4">
            <div className="flex flex-row gap-5">
              <div className="flex flex-col w-1/2">
                <label htmlFor="name" className="text-gray-700 font-bold mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="border rounded p-2 w-full focus:border-blue-500"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {showValidationmessages && !nameValid && (
                  <p className="text-red-500">Nome eh necessario</p>
                )}
              </div>
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="lastname"
                  className="text-gray-700 font-bold mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  required
                  className="border rounded p-2 w-full focus:border-blue-500"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {showValidationmessages && !lastNameValid && (
                  <p className="text-red-500">Sobrenome eh necessario</p>
                )}
              </div>
            </div>

            <div className="flex flex-row gap-5">
              <div className="flex flex-col w-1/2">
                <label htmlFor="email" className="text-gray-700 font-bold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="border rounded p-2 w-full focus:border-blue-500"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {showValidationmessages && !emailValid && (
                  <p className="text-red-500">Use um email valido</p>
                )}
              </div>

              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="cellphone"
                  className="text-gray-700 font-bold mb-1"
                >
                  Cell Phone
                  <span className="text-gray-500 font-normal text-sm mb-1">
                    {` (DDD e numero sem espacos. Ex: 11999998888)`}
                  </span>
                </label>
                <input
                  type="tel"
                  id="cellphone"
                  name="cellphone"
                  required
                  className="border rounded p-2 w-full focus:border-blue-500"
                  placeholder="Enter Cell Phone"
                  value={cellPhone}
                  onChange={(e) => setCellPhone(e.target.value)}
                />
                {showValidationmessages && !cellPhoneValid && (
                  <p className="text-red-500">Use um numero valido</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-5">
            <button
              onClick={onSubmitClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg py-2 px-8 rounded mb-5"
            >
              Enviar
            </button>
          </div>
        </>
      )}
    </div>
  );
};
