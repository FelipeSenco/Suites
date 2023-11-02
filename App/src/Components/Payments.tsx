import React, { FC } from "react";

export const Payments: FC = () => {
  const payments: Payment[] = [];

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
