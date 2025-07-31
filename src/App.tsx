import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { AppRoutes } from './routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster position="top-right" richColors closeButton expand={false} duration={4000} />
    </BrowserRouter>
  );
};

export default App;
