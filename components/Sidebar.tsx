'use client';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

type MenuType = 'dashboard' | 'add-invoices' | 'list-invoices' | null;

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const [isSidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<MenuType>(null);

  const handleMenuClick = (menu: MenuType) => {
    setActiveMenu(activeMenu === menu ? null : menu); 
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <section
      id="sidebar"
      className={`fixed top-0 left-0 w-60 h-full bg-white z-50 font-sans transition-all duration-300 ease-in-out ${
        isSidebarVisible ? 'block' : 'hidden'
      } lg:block`}
    >
      <div className="flex items-center p-4 text-indigo-700 font-bold text-2xl">
        <Icon icon="bxs:smile" className="text-indigo-700" width={24} height={24} />
        <span className="ml-2">{t('appName')}</span>
      </div>
      <ul className="mt-12 space-y-4">
        <li>
          <Link
            href="/dashboard"
            className={`flex items-center p-4 w-full text-left ${
              activeMenu === 'dashboard'
                ? 'bg-gray-200 text-indigo-700 font-bold border-l-4 border-indigo-700'
                : 'hover:bg-gray-300 text-gray-800'
            }`}
            onClick={() => handleMenuClick('dashboard')}
          >
            <Icon
              icon="material-symbols-light:dashboard-outline-rounded"
              width={20}
              height={20}
              className={activeMenu === 'dashboard' ? 'text-indigo-700' : ''}
            />
            <span className="ml-3">{t('dashboard')}</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/pages/add-invoices"
            className={`flex items-center p-4 w-full text-left ${
              activeMenu === 'add-invoices'
                ? 'bg-gray-200 text-indigo-700 font-bold border-l-4 border-indigo-700'
                : 'hover:bg-gray-300 text-gray-800'
            }`}
            onClick={() => handleMenuClick('add-invoices')}
          >
            <Icon
              icon="basil:invoice-outline"
              width={20}
              height={20}
              className={activeMenu === 'add-invoices' ? 'text-indigo-700' : ''}
            />
            <span className="ml-3">{t('addInvoice')}</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/pages/list-invoices"
            className={`flex items-center p-4 w-full text-left ${
              activeMenu === 'list-invoices'
                ? 'bg-gray-200 text-indigo-700 font-bold border-l-4 border-indigo-700'
                : 'hover:bg-gray-300 text-gray-800'
            }`}
            onClick={() => handleMenuClick('list-invoices')}
          >
            <Icon
              icon="clarity:list-line"
              width={20}
              height={20}
              className={activeMenu === 'list-invoices' ? 'text-indigo-700' : ''}
            />
            <span className="ml-3">{t('listInvoices')}</span>
          </Link>
        </li>
        <li>
          <button
            className="flex items-center p-4 w-full text-left hover:bg-gray-300 text-gray-800"
            onClick={handleLogout}
          >
            <Icon
              icon="tabler:logout"
              width={20}
              height={20}
              className="text-gray-800"
            />
            <span className="ml-3">{t('logout')}</span>
          </button>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
