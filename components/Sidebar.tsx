'use client';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Icon } from '@iconify/react';
import Link from 'next/link';

type MenuType = 'dashboard' | 'add-invoices' | 'list-invoices';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const [isSidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<MenuType>('dashboard');

  const handleMenuClick = (menu: MenuType) => {
    setActiveMenu(menu);
  };

  return (
    <section
      id="sidebar"
      className={`fixed top-0 left-0 w-60 h-full bg-white z-50 font-sans transition-all duration-300 ease-in-out ${
        isSidebarVisible ? 'block' : 'hidden'
      } lg:block`}
    >
      <div className="flex items-center p-4 text-blue-600 font-bold text-2xl">
        <Icon icon="bxs:smile" className="text-blue-600" width={24} height={24} />
        <span className="ml-2">{t('appName')}</span>
      </div>
      <ul className="mt-12 space-y-4">
        <li>
          <Link
            href="/dashboard"
            className={`flex items-center p-4 w-full text-left ${
              activeMenu === 'dashboard'
                ? 'bg-gray-200 text-blue-600 font-bold border-l-4 border-blue-600'
                : 'hover:bg-gray-300 text-gray-800'
            }`}
            onClick={() => handleMenuClick('dashboard')}
          >
            <Icon
              icon="bxs:dashboard"
              width={20}
              height={20}
              className={activeMenu === 'dashboard' ? 'text-blue-600' : ''}
            />
            <span className="ml-3">{t('dashboard')}</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/pages/add-invoices"
            className={`flex items-center p-4 w-full text-left ${
              activeMenu === 'add-invoices'
                ? 'bg-gray-200 text-blue-600 font-bold border-l-4 border-blue-600'
                : 'hover:bg-gray-300 text-gray-800'
            }`}
            onClick={() => handleMenuClick('add-invoices')}
          >
            <Icon
              icon="bxs:shopping-bag-alt"
              width={20}
              height={20}
              className={activeMenu === 'add-invoices' ? 'text-blue-600' : ''}
            />
            <span className="ml-3">{t('addInvoices')}</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/pages/list-invoices"
            className={`flex items-center p-4 w-full text-left ${
              activeMenu === 'list-invoices'
                ? 'bg-gray-200 text-blue-600 font-bold border-l-4 border-blue-600'
                : 'hover:bg-gray-300 text-gray-800'
            }`}
            onClick={() => handleMenuClick('list-invoices')}
          >
            <Icon
              icon="bxs:shopping-bag-alt"
              width={20}
              height={20}
              className={activeMenu === 'list-invoices' ? 'text-blue-600' : ''}
            />
            <span className="ml-3">{t('listInvoices')}</span>
          </Link>
        </li>
        <li>
          <button
            className="flex items-center p-4 w-full text-left hover:bg-gray-300 text-gray-800"
            // onClick={handleLogout}
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
