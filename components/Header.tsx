'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import i18n from '../lib/i18n';
import Link from 'next/link';
import { useSession } from "next-auth/react";

const Header: React.FC = () => {
  const [isSidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const { data: session } = useSession();

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleLanguageChange = (language: 'en' | 'fr' | 'es' | 'de') => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as 'en' | 'fr' | 'es' | 'de';
    if (storedLanguage && storedLanguage !== i18n.language) {
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

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
        <div className="flex items-center space-x-4">
          <div className="mr-4">
            <select
              value={i18n.language}
              onChange={(e) => handleLanguageChange(e.target.value as 'en' | 'fr' | 'es' | 'de')}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
          <Link href="/dashboard/pages/user-profile" className="flex items-center text-gray-800">
            <div className="flex flex-col text-right mr-2">
              {/* {session?.user?.name && <span className="text-lg font-medium">{session.user.name}</span>} */}
              {session?.user?.email && <span className="text-sm text-gray-600">{session.user.email}</span>}
            </div>
            <Image
              src={session?.user?.image || '/images/default-img.jpg'}
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover"
              width={36}
              height={36}
              unoptimized
            />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
