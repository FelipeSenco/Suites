import React, { FC, SetStateAction, useEffect, useState } from "react";
import { cellPhoneRegex, emailRegex } from "../Types/utils";
import {
  useAddTenantMutation,
  useDeleteTenantMutation,
  useEditTenantMutation,
  useTenantsQuery,
} from "../Administration/Api/Queries/TenantQueries";
import ReactModal from "react-modal";
import { DeleteConfirmModal } from "./Shared/DeleteConfirmModal";
import { usePropertiesQuery } from "../Administration/Api/Queries/PropertiesQueries";

export const Tenants: FC = () => {
  const { tenants } = useTenantsQuery(true);
  const {
    mutateAsync: deleteTenant,
    isLoading: isDeleteLoading,
    isError: isDeleteError,
  } = useDeleteTenantMutation();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentTenant, setCurrentTenant] = useState<Tenant>(null);
  const { properties } = usePropertiesQuery();

  return (
    <div>
      <table className="border-collapse w-full mt-10">
        <thead>
          <tr>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Sobrenome</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Celular</th>
            <th className="border p-2">Imovel</th>
            <th className="border p-2">Quarto</th>
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
              <td className="border p-2">{t.propertyName}</td>
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
          ))}
        </tbody>
      </table>
      <AddTenantArea />
      {editModalOpen && (
        <EditTenantModal
          open={editModalOpen}
          setOpen={setEditModalOpen}
          currentTenant={currentTenant}
        />
      )}
      {deleteModalOpen && (
        <DeleteConfirmModal
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          isLoading={isDeleteLoading}
          isError={isDeleteError}
          onConfirm={() => deleteTenant(currentTenant.id)}
        />
      )}
    </div>
  );
};

const AddTenantArea: React.FC = () => {
  const { mutateAsync: addTenant, isError, isLoading } = useAddTenantMutation();
  const [showAddForm, setShowAddForm] = useState(false);

  const onSubmitClick = async (
    name: string,
    lastName: string,
    email: string,
    cellPhone: string,
    propertyId: string,
    roomNumber: number
  ) => {
    await addTenant({
      name,
      lastName,
      email,
      cellPhone,
      propertyId,
      roomNumber,
    });
    setShowAddForm(false);
  };

  if (isLoading) return <AddTenantLoadingSkeleton />;

  return (
    <div className="mt-4 p-5">
      {!showAddForm && (
        <div className="flex items-center justify-center">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold text-lg py-2 px-8 rounded mb-5"
          >
            {showAddForm ? `Esconder` : `Adicionar`}
          </button>
        </div>
      )}
      {showAddForm && (
        <TenantForm
          onSubmit={onSubmitClick}
          onCancel={() => setShowAddForm(false)}
          isError={isError}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

type EditTenantModalProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  currentTenant: Tenant;
};

const EditTenantModal: React.FC<EditTenantModalProps> = ({
  open,
  setOpen,
  currentTenant,
}) => {
  const {
    mutateAsync: editTenant,
    isError,
    isLoading,
  } = useEditTenantMutation();

  const onSubmitClick = async (
    name: string,
    lastName: string,
    email: string,
    cellPhone: string,
    propertyId: string,
    roomNumber: number,
    id?: string
  ) => {
    const tenantId = id || "";
    await editTenant({
      id: tenantId,
      name,
      lastName,
      email,
      cellPhone,
      propertyId,
      roomNumber,
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
        <p className="py-5">
          Editando:{" "}
          <span className="font-bold text-lg">
            {currentTenant.name} {currentTenant.lastName}
          </span>
        </p>
        <TenantForm
          onSubmit={onSubmitClick}
          onCancel={() => setOpen(false)}
          isError={isError}
          isLoading={isLoading}
          currentTenant={currentTenant}
        />
      </div>
    </ReactModal>
  );
};

type TenantFormProps = {
  isError: boolean;
  isLoading: boolean;
  onSubmit: (
    name: string,
    lastName: string,
    email: string,
    cellPhone: string,
    propertyId: string,
    roomNumber: number,
    id?: string
  ) => Promise<unknown>;
  onCancel: () => void;
  currentTenant?: Tenant;
};

const TenantForm: React.FC<TenantFormProps> = ({
  onSubmit,
  onCancel,
  isError,
  isLoading,
  currentTenant,
}) => {
  const { properties } = usePropertiesQuery();
  const [name, setName] = useState(currentTenant?.name || "");
  const [nameValid, setNameValid] = useState(false);
  const [lastName, setLastName] = useState(currentTenant?.lastName || "");
  const [lastNameValid, setLastNameValid] = useState(false);
  const [email, setEmail] = useState(currentTenant?.email || "");
  const [emailValid, setEmailValid] = useState(false);
  const [cellPhone, setCellPhone] = useState(currentTenant?.cellPhone || "");
  const [cellPhoneValid, setCellPhoneValid] = useState(false);
  const [propertyId, setPropertyId] = useState(currentTenant?.propertyId || "");
  const [roomNumber, setRoomNumber] = useState(currentTenant?.roomNumber);
  const [showValidationmessages, setShowValidationMessages] = useState(false);

  const maxRooms = properties.find((p) => p.id === propertyId)?.rooms;

  useEffect(() => {
    validateFields();
  }, [name, lastName, cellPhone, email, propertyId]);

  const validateFields = () => {
    setNameValid(!!name);
    setLastNameValid(!!lastName);
    setEmailValid(emailRegex.test(email));
    setCellPhoneValid(cellPhoneRegex.test(cellPhone));
  };

  const resetForm = () => {
    setName("");
    setLastName("");
    setEmail("");
    setCellPhone("");
  };

  const onSubmitClick = async () => {
    setShowValidationMessages(true);
    const allValid =
      nameValid &&
      lastNameValid &&
      emailValid &&
      cellPhoneValid &&
      !!propertyId &&
      !!roomNumber;
    if (allValid) {
      await onSubmit(
        name,
        lastName,
        email,
        cellPhone,
        propertyId,
        roomNumber,
        currentTenant?.id
      );
      if (!isError) {
        resetForm();
        setShowValidationMessages(false);
      }
    }
  };

  if (isLoading) return <AddTenantLoadingSkeleton />;
  return (
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
            <label htmlFor="lastname" className="text-gray-700 font-bold mb-1">
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
            <label htmlFor="cellphone" className="text-gray-700 font-bold mb-1">
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
        <div className="flex flex-row gap-5">
          <div className="flex flex-col w-1/2">
            <label htmlFor="property" className="text-gray-700 font-bold mb-1">
              Imovel
            </label>
            <select
              className="border rounded p-2 w-full focus:border-blue-500"
              id="property"
              onChange={(e) => {
                setPropertyId(e.currentTarget.value);
              }}
              value={propertyId}
              placeholder="Escolha um imovel"
            >
              <option key={"empty"} value={""}>
                Escolha um imovel
              </option>
              {properties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.name}
                </option>
              ))}
            </select>
            {showValidationmessages && !propertyId && (
              <p className="text-red-500">Imovel eh necessario</p>
            )}
          </div>
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="roomNumber"
              className="text-gray-700 font-bold mb-1"
            >
              Numero do Quarto
              <span className="text-gray-500 font-normal text-sm mb-1">
                {propertyId
                  ? `Escolha um quarto de 1 a ${maxRooms}`
                  : "Escolha um imovel antes do quarto"}
              </span>
            </label>
            <input
              type="number"
              id="roomNumber"
              name="roomNumber"
              max={maxRooms}
              min={1}
              required
              className="border rounded p-2 w-full focus:border-blue-500"
              value={roomNumber || 0}
              onChange={(e) => {
                let i = parseInt(e.target.value);
                i = i > maxRooms ? maxRooms : i;
                i = i < 1 ? 1 : i;
                setRoomNumber(i);
              }}
              disabled={!propertyId}
            />
            {showValidationmessages && !roomNumber && (
              <p className="text-red-500">Quarto eh necessario</p>
            )}
          </div>
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
    </>
  );
};

const AddTenantLoadingSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse mt-20 p-5">
      <div className="flex flex-row gap-5">
        <div className="flex flex-col w-1/2">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        </div>

        <div className="flex flex-col w-1/2">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>

      <div className="flex flex-row gap-5">
        <div className="flex flex-col w-1/2">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        </div>

        <div className="flex flex-col w-1/2">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
      <p className="text-lg">Carregando...</p>
    </div>
  );
};
