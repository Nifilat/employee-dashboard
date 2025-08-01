import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { AppRoutes } from './routes';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster position="top-right" richColors closeButton expand={false} duration={4000} />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
