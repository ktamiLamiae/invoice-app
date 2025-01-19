"use client";
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import i18n from '../lib/i18n';

const LoginForm: React.FC = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await res.json();

        if (result.success) {
            window.location.href = '/dashboard';
        } else {
            alert(result.message);
        }
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
        <>
        <div className="absolute top-2 right-2">
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
        <form onSubmit={handleSubmit}>
            <div className="h-screen flex items-center justify-center bg-[#f1f1f1]">
                <div className="relative bg-white w-full max-w-[400px] sm:max-w-sm md:max-w-md h-auto shadow-[2px_9px_49px_-17px_rgba(0,0,0,0.1)] p-6 sm:p-8 rounded-3xl">
                    <div className="flex flex-col min-h-full justify-center gap-6">
                        <div className="text-center">
                            <strong className="text-lg sm:text-xl text-gray-800">{t('welcome')}</strong>
                            <p className="text-sm sm:text-base text-gray-600 mt-1">{t('signIn')}</p>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                {t('email')}
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-sm sm:text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <div className="flex justify-between items-center">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    {t('password')}
                                </label>
                                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">
                                    {t('forgotPassword')}
                                </a>
                            </div>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-sm sm:text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <button
                                className="w-full px-3 py-2 bg-indigo-600 text-white rounded-3xl text-sm sm:text-base font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                            >
                                {t('signIn')}
                            </button>
                        </div>
                        <p className="mt-4 text-center text-sm text-gray-500">
                            {t('notAMember')}{' '}
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                {t('signUp')}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </form>
        </>
    );
};

export default LoginForm;
