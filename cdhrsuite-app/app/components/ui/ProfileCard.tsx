import React from 'react';

interface ProfileCardProps {
  title: string;
  children: React.ReactNode;
}

export default function ProfileCard({ title, children }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="bg-gray-50 border-b py-3 px-4">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

interface ProfileFieldProps {
  label: string;
  value?: string | number | null;
  className?: string;
}

export function ProfileField({ label, value, className }: ProfileFieldProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-base">{value || '-'}</p>
    </div>
  );
}