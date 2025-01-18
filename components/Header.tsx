'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useTranslation } from 'next-i18next';
import i18n from '../lib/i18n';

const userInfo = {
  name: 'John Doe',
  email: 'pKwJt@example.com',
  profileImage: '/images/user-2.jpg'
};
const Header = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { t } = useTranslation();
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  const handleLanguageChange = (language: 'en' | 'fr' | 'es' | 'de') => {
    i18n.changeLanguage(language);
};

  return (
    <div>
      <nav className="flex items-center justify-between bg-white p-4 sticky top-0 z-40">
        <Icon
          icon="bx:menu"
          className="text-gray-800 cursor-pointer"
          width="24"
          height="24"
          onClick={toggleSidebar}
        />
        {t('welcome')}
        <div className="flex items-center space-x-4">
          <div className="mr-4">
            <select
              onChange={(e) => handleLanguageChange(e.target.value as 'en' | 'fr' | 'es' | 'de')}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
          <a href="#" className="flex items-center text-gray-800">
            <span className="mr-2 text-lg">{userInfo.name}</span>
            <Image
              src={userInfo.profileImage}
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover"
              width={36}
              height={36}
              unoptimized
            />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Header;
