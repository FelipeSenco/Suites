import React, { FC } from "react";

import { Link, Outlet } from "react-router-dom";

export const AdminHome: FC = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export const Header: FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-3xl font-bold">Administracao Suites Tavares</h1>
      <nav className="p-5">
        <ul className="flex gap-4 text-lg">
          <li>
            <Link to="/" className="hover:underline ml-4">
              Inquilinos
            </Link>
          </li>
          <li>
            <Link to="/properties" className="hover:underline ml-4">
              Imoveis
            </Link>
          </li>
          <li>
            <Link to="/payments" className="hover:underline ml-4">
              Pagamentos
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
