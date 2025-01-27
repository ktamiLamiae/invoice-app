"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { useLoading } from "../app/contexts/LoadingContext"; // Importer le context

interface ProfileData {
  id: number;
  email: string;
  name: string;
  company_id: number;
  company_name: string;
}

interface Company {
  id: number;
  company_name: string;
}

const UserProfile: React.FC = () => {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const { setLoading } = useLoading(); // Utiliser le setLoading du contexte
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyId: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [data, setData] = useState<ProfileData | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [profileImage, setProfileImage] = useState<string>(
    session?.user?.image || "/images/default-img.jpg"
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      if (!session) return;
      setLoading(true); // Activer le chargement
      try {
        const res = await fetch("/api/get-profile");
        const result = await res.json();
        if (res.ok && result.success) {
          setData(result.data.user);
          setFormData({
            name: result.data.user.name,
            email: result.data.user.email,
            companyId: result.data.user.compagny_id.toString(),
            password: "",
            confirmPassword: "",
          });
          setCompanies(result.data.companies);
        } else {
          setErrorMessage(result.message);
        }
      } catch (error) {
        setErrorMessage(`Error fetching user data: ${error.message}`);
      } finally {
        setLoading(false); // Désactiver le chargement
      }
    };
    fetchData();
  }, [session, setLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, companyId } = formData;
    if (password !== confirmPassword) {
      setErrorMessage(t("passwords_do_not_match"));
      return;
    }

    if (!name || !email || !password || !confirmPassword || !companyId) {
      setErrorMessage(t("please_fill_all_fields"));
      return;
    }

    setLoading(true);
    try {
      const dataToSend = { name, email, password, companyId, id: data?.id, image: imageFile };
      const res = await fetch("/api/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await res.json();
      if (result.success) {
        toast.success(t("profile_updated_successfully"));
      } else {
        toast.error(t("profile_update_failed"));
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setProfileImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyId: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-lg shadow-md bg-white p-6 relative w-full break-words">
        <h5 className="card-title">{t("profile_form")}</h5>
        <div className="mt-6">
          <div className="grid">
            <div className="col-span-12">
              <div className="flex flex-col gap-4">
                {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
                <div className="relative group rounded-full overflow-hidden w-20 h-20 bg-gray-200">
                  <Image
                    className="w-full h-full object-cover hover:cursor-pointer"
                    src={profileImage}
                    width={100}
                    height={100}
                    alt="User profile image"
                  />
                  <div className="absolute inset-0 bg-gray-500 bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <label
                      htmlFor="imageUpload"
                      className="text-white text-sm text-center cursor-pointer"
                    >
                      {t("change_image")}
                    </label>
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-900" htmlFor="name">
                    {t("name")}
                  </label>
                  <input
                    className="block w-full border border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                    id="name"
                    name="name"
                    placeholder={t("name")}
                    required
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-900" htmlFor="email">
                    {t("email")}
                  </label>
                  <input
                    className="block w-full border border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                    id="email"
                    name="email"
                    placeholder={t("email")}
                    required
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-900" htmlFor="companyId">
                    {t("company")}
                  </label>
                  <select
                    id="companyId"
                    name="companyId"
                    value={formData.companyId}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm rounded-lg"
                  >
                    <option value="" disabled>
                      {t("select_company")}
                    </option>
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.company_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-900" htmlFor="password">
                    {t("password")}
                  </label>
                  <input
                    className="block w-full border border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                    id="password"
                    name="password"
                    placeholder={t("password")}
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-900" htmlFor="confirmPassword">
                    {t("confirm_password")}
                  </label>
                  <input
                    className="block w-full border border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder={t("confirm_password")}
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
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
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default UserProfile;
