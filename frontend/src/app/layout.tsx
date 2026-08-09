import React from 'react';

export const metadata = {
  title: 'LeadPilot AI - Intelligent Sales Automation',
  description: 'Discover, qualify, and convert leads with AI-powered multi-agent sales automation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
