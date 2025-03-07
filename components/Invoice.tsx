"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoading } from "../app/contexts/LoadingContext";

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
  const { setLoading } = useLoading();
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/data');
        const { data } = await res.json();

        if (data?.cars && data?.clients) {
          setData({ cars: data.cars, clients: data.clients });
        } else {
          console.error('Data structure is incorrect');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { clientId, carId, amount, advance, memo, date, dueDate, paymentMethod, paidStatus } = formData;
    const client = data.clients.find((c) => c.id === Number(clientId));
    // console.log('Selected client:', client);

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
      compagny_id: client?.isCompany === 1 ? client.compagny_id : null,
    };
    // console.log('Payload being sent:', bodyData);
    try {
      const res = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      if (res.ok) {
        toast.success(t('success_created'));
      } else {
        toast.error('failed_created');
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(`${name}: ${value}`);
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };


  const resetForm = () => {
    setFormData({
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
  };

  return (
    <div className="rounded-lg shadow-md bg-white p-6 w-full break-words">
      <h5 className="card-title text-xl font-semibold">{t('invoice_form')}</h5>
      <div className="mt-6">
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                type="submit"
                className="w-full sm:w-auto group relative flex items-stretch justify-center p-0.5 text-center font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
              >
                <span className="flex items-center gap-2 transition-all duration-150 justify-center rounded-md px-4 py-2 text-sm">
                  {t('save')}
                </span>
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto group relative flex items-stretch justify-center p-0.5 text-center font-medium bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                <span className="flex items-center gap-2 transition-all duration-150 justify-center rounded-md px-4 py-2 text-sm">
                  {t('cancel')}
                </span>
              </button>
            </div>
          </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Invoice;
