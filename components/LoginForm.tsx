"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import i18n from "../lib/i18n";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiEye, HiEyeOff } from "react-icons/hi";

const LoginForm: React.FC = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { push } = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        setLoading(true);

        let valid = true;
        if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            setEmailError(t('invalidEmail'));
            valid = false;
        }
        if (password.length < 6) {
            setPasswordError(t('passwordTooShort'));
            valid = false;
        }

        if (!valid) {
            setLoading(false);
            return;
        }

        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        setLoading(false);

        if (res?.error) {
            if (res.error === 'CredentialsSignin') {
                toast.error(t('invalidCredentials'));
            } else {
                toast.error(t('somethingWentWrong'));
            }
        } else if (res?.ok) {
            push('/dashboard');
        }
    };

    const handleLanguageChange = (language: "en" | "fr" | "es" | "de") => {
        i18n.changeLanguage(language);
        localStorage.setItem("language", language);
    };

    return (
        <>
            <div className="absolute top-2 right-2">
                <select
                    value={i18n.language}
                    onChange={(e) => handleLanguageChange(e.target.value as "en" | "fr" | "es" | "de")}
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
                                <strong className="text-lg sm:text-xl text-gray-800">{t("welcome")}</strong>
                                <p className="text-sm sm:text-base text-gray-600 mt-1">{t("signIn")}</p>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    {t("email")}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder={t('enter_email')}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-sm sm:text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    required
                                />
                                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                            </div>
                            {/* <div className="flex flex-col space-y-1">
                                <div className="flex justify-between items-center">
                                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                        {t("password")}
                                    </label>
                                    <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">
                                        {t("forgotPassword")}
                                    </a>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={password}
                                        className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-sm sm:text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute top-2 right-2 text-gray-500"
                                    >
                                        {showPassword ? <HiEyeOff /> : <HiEye />}
                                    </button>
                                </div>
                                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                            </div> */}
                            <div className="flex flex-col space-y-1">
                                <div className="flex justify-between items-center">
                                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                        {t("password")}
                                    </label>
                                    <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">
                                        {t("forgotPassword")}
                                    </a>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-sm sm:text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        placeholder={t('enter_password')}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer text-gray-400 focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                                    >
                                        {showPassword ? <HiEyeOff /> : <HiEye />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading || password.length < 6}
                                    className={`w-full px-3 py-2 rounded-3xl text-sm sm:text-base font-medium text-white ${isLoading || password.length < 6 ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                >
                                    {isLoading ? (
                                        <span className="flex justify-center items-center">
                                            <svg
                                                className="animate-spin h-5 w-5 text-white mr-2"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v8H4z"
                                                ></path>
                                            </svg>
                                            {t('loading')}
                                        </span>
                                    ) : (
                                        t('signIn')
                                    )}
                                </button>
                            </div>
                            <p className="mt-4 text-center text-sm text-gray-500">
                                {t("notAMember")}{" "}
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    {t("signUp")}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </form>
        </>
    );
};

export default LoginForm;
