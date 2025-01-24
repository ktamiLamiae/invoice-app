"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Invoice {
  id: number;
  surname: string;
  firstname: string;
  chassisNumber: string;
  brand: string;
  dueDate: string;
  amount: number;
  advance: number;
  paidStatus: boolean;
  isCompany: boolean;
  companyName?: string;
}

const ListInvoices: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const { t } = useTranslation();
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/list-invoices", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { data } = await res.json();
        setInvoices(data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } 
    };
    fetchData();
  }, []);

  const toggleMenu = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const formatDate = (date: string) => {
    const dateObject = new Date(date);
    return dateObject.toLocaleDateString();
  };

  const handleDetail = (id: number) => {
    console.log("View details for invoice:", id);
  };

  const handleEdit = (id: number) => {
    console.log("Edit invoice:", id);
  };

  return (
    <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
      <div className="flex flex-row justify-between items-center m-6">
        <h3 className="text-lg font-semibold ml-3 text-slate-800">
          {t("list_invoices")}
        </h3>
        <Link
          href="/dashboard/pages/add-invoices"
          className="group relative flex items-stretch justify-center p-1.5 text-center font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
        >
          {t("create_invoice")}
        </Link>
      </div>

        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  {t("chassisNumber")}
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  {t("brand")}
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  {t("FullName")}
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  {t("deadline")}
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  {t("paid_status")}
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  {t("actions")}
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="p-4 border-b border-slate-200">
                  <p className="block text-sm text-slate-800">
                    {invoice.chassisNumber}
                  </p>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <p className="block text-sm text-slate-800">{invoice.brand}</p>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <p className="block text-sm text-slate-800">
                    {invoice.isCompany
                      ? invoice.companyName
                      : `${invoice.surname} ${invoice.firstname}`}
                  </p>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <p className="block text-sm text-slate-800">
                    {formatDate(invoice.dueDate)}
                  </p>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <p className="block text-sm text-slate-800">
                    {invoice.paidStatus ? t("paid") : t("unpaid")}
                  </p>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <div className="inline-block text-left">
                    <button
                      onClick={() => toggleMenu(index)}
                      type="button"
                      className="flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                      id={`menu-button-${index}`}
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    {openMenuIndex === index && (
                      <div
                        className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                        role="menu"
                      >
                        <a
                          href="#"
                          onClick={() => handleDetail(invoice.id)}
                          className="block px-4 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                          role="menuitem"
                        >
                          {t("detail")}
                        </a>
                        <a
                          href="#"
                          onClick={() => handleEdit(invoice.id)}
                          className="block px-4 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                          role="menuitem"
                        >
                          {t("edit")}
                        </a>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default ListInvoices;
