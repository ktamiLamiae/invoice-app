"use client";
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Icon } from '@iconify/react';

const Sidebar = () => {
  const { t } = useTranslation();
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  return (
    <section
      id="sidebar"
      className={`fixed top-0 left-0 w-60 h-full bg-white z-50 font-sans transition-all duration-300 ease-in-out ${
        isSidebarVisible ? 'block' : 'hidden'
      } lg:block`}
    >
      <a href="#" className="flex items-center p-4 text-blue-600 font-bold text-2xl">
        <Icon icon="bxs:smile" className="text-blue-600" width={24} height={24} />
        <span className="ml-2">{t('appName')}</span>
      </a>
      <ul className="mt-12 space-y-4">
        <li className={activeMenu === "dashboard" ? "active" : ""}>
          <button
            onClick={() => handleMenuClick("dashboard")}
            className={`flex items-center p-4 w-full text-left ${
              activeMenu === "dashboard"
                ? "bg-gray-200 text-blue-600 font-bold border-l-4 border-blue-600"
                : "hover:bg-gray-300 text-gray-800"
            }`}
          >
            <Icon
              icon="bxs:dashboard"
              width={20}
              height={20}
              className={activeMenu === "dashboard" ? "text-blue-600" : ""}
            />
            <span className="ml-3">{t('dashboard')}</span>
          </button>
        </li>
        <li className={activeMenu === "store" ? "active" : ""}>
          <button
            onClick={() => handleMenuClick("store")}
            className={`flex items-center p-4 w-full text-left ${
              activeMenu === "store"
                ? "bg-gray-200 text-blue-600 font-bold border-l-4 border-blue-600"
                : "hover:bg-gray-300 text-gray-800"
            }`}
          >
            <Icon
              icon="bxs:shopping-bag-alt"
              width={20}
              height={20}
              className={activeMenu === "store" ? "text-blue-600" : ""}
            />
            <span className="ml-3">{t('myStore')}</span>
          </button>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
