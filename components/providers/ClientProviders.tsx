"use client";

import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AlertModalProvider } from '@/components/ui/alert-modal';
import { AddressProvider } from '@/contexts/AddressContext';
import Header from '@/components/header/Header';
import Footer from '@/components/common/Footer';
import { usePathname } from 'next/navigation';

interface ClientProvidersProps {
  children: React.ReactNode;
  webData: any; // Define a proper type for WebData if available
}

export const ClientProviders: React.FC<ClientProvidersProps> = ({ children, webData }) => {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const isAdminPath = pathname.startsWith('/admin');

  // Ensure client-side rendering is complete before showing Header/Footer
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <AlertModalProvider>
      <AddressProvider>
        {isClient && !isAdminPath && <Header webData={webData} logo={webData?.logo} />}
        {children}
        {isClient && !isAdminPath && <Footer webData={webData} logo={webData?.logo} />}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#000000",
              color: "#00ff00",
            },
          }}
        />
      </AddressProvider>
    </AlertModalProvider>
  );
};
