import React from 'react';
import '@/styles/globals.css';
import { AppProvider } from '@/providers/AppProvider';

export const metadata = {
  title: 'LeadPilot AI - Intelligent Sales Automation Workspace',
  description: 'Discover, qualify, and convert leads with AI-powered autonomous sales agents.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
