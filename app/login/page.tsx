import React from 'react';
import LoginForm from '../../components/LoginForm';
import { LanguageProvider } from '../../app/contexts/LanguageContext';


const LoginPage: React.FC = () => {
  return (
    <div>
      <LanguageProvider>
        <LoginForm />
      </LanguageProvider>
    </div>
  );
};

export default LoginPage;
