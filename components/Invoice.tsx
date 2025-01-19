"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from 'next-i18next';

interface Client {
  id: number;
  name: string;
  isCompany: number;
  companyName?: string;
  surname?: string;
  firstname?: string;
  company_id?: number;
}

interface Car {
  id: number;
  chassisNumber: string;
}

interface FormData {
  clientId: string | number;
  carId: string | number;
  amount: string | number;
  advance: string | number;
  memo: string;
  date: string;
  dueDate: string;
  paymentMethod: string;
  paidStatus: string;
}

const Invoice = () => {
  const { t } = useTranslation();

  const [data, setData] = useState<{ cars: Car[]; clients: Client[] }>({ cars: [], clients: [] });
  const [formData, setFormData] = useState<FormData>({
    clientId: '',
    carId: '',
    amount: '',
    advance: '',
    memo: '',
    date: '',
    dueDate: '',
    paymentMethod: 'Cash',
    paidStatus: 'Unpaid',
  });

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/data');
      const fetchedData = await res.json();
      if (fetchedData?.data?.cars && fetchedData?.data?.clients) {
        setData({ cars: fetchedData.data.cars, clients: fetchedData.data.clients });
      } else {
        console.error('Data structure is incorrect');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { clientId, carId, amount, advance, memo, date, dueDate, paymentMethod, paidStatus } = formData;
    const client = data.clients.find((c) => c.id === Number(clientId));

    const bodyData = {
      client_id: clientId,
      car_id: carId,
      amount,
      advance,
      memo,
      date,
      dueDate,
      paymentMethod,
      paidStatus,
      company_id: client?.isCompany === 1 ? client.company_id : null,
    };

    try {
      const res = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      if (res.ok) {
        console.log('Invoice created successfully');
      } else {
        console.error('Failed to create invoice');
      }
    } catch (error) {
      console.error('Error submitting invoice:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="rounded-lg shadow-md bg-white p-6 w-full break-words">
      <h5 className="card-title text-xl font-semibold">{t('invoice_form')}</h5>
      <div className="mt-6">
        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="clientId" className="text-sm font-medium text-gray-900">{t('client')}</label>
                <select
                  id="clientId"
                  name="clientId"
                  value={formData.clientId}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm rounded-lg"
                >
                  <option value="">{t('select_client')}</option>
                  {data.clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.isCompany === 1
                        ? client.companyName
                        : `${client.surname} ${client.firstname}`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="carId" className="text-sm font-medium text-gray-900">{t('vehicle')}</label>
                <select
                  id="carId"
                  name="carId"
                  value={formData.carId}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm rounded-lg"
                >
                  <option value="">{t('select_vehicle')}</option>
                  {data.cars.map((car) => (
                    <option key={car.id} value={car.id}>{car.chassisNumber}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="text-sm font-medium text-gray-900">{t('date')}</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm rounded-lg"
                  required
                />
              </div>

              <div>
                <label htmlFor="dueDate" className="text-sm font-medium text-gray-900">{t('deadline')}</label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm rounded-lg"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="amount" className="text-sm font-medium text-gray-900">{t('amount')}</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="block w-full border border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm rounded-lg"
                  required
                />
              </div>

              <div>
                <label htmlFor="advance" className="text-sm font-medium text-gray-900">{t('advance')}</label>
                <input
                  type="number"
                  id="advance"
                  name="advance"
                  value={formData.advance}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="block w-full border border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm rounded-lg"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="paymentMethod" className="text-sm font-medium text-gray-900">{t('payment_method')}</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm rounded-lg"
                >
                  <option value="Cash">{t('cash')}</option>
                  <option value="Credit Card">{t('credit_card')}</option>
                  <option value="Bank Transfer">{t('bank_transfer')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="paidStatus" className="text-sm font-medium text-gray-900">{t('payment_status')}</label>
                <select
                  id="paidStatus"
                  name="paidStatus"
                  value={formData.paidStatus}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm rounded-lg"
                >
                  <option value="Unpaid">{t('unpaid')}</option>
                  <option value="Paid">{t('paid')}</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="memo" className="text-sm font-medium text-gray-900">{t('memo')}</label>
              <textarea
                id="memo"
                name="memo"
                value={formData.memo}
                onChange={handleChange}
                rows={4}
                className="block w-full border border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm rounded-lg"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="group relative flex items-stretch justify-center p-0.5 text-center font-medium bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
            >
              <span className="flex items-center gap-2 transition-all duration-150 justify-center rounded-md px-4 py-2 text-sm">
                {t('save')}
              </span>
            </button>
            <button
              type="reset"
              className="group relative flex items-stretch justify-center p-0.5 text-center font-medium bg-red-500 text-white rounded-lg"
            >
              <span className="flex items-center gap-2 transition-all duration-150 justify-center rounded-md px-4 py-2 text-sm">
                {t('cancel')}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Invoice;
