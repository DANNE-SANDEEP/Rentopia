import React from 'react';

export const Alert = ({ children, variant }) => {
  const bgColor = variant === 'destructive' ? 'bg-red-100' : 'bg-yellow-100';
  const textColor = variant === 'destructive' ? 'text-red-800' : 'text-yellow-800';
  
  return (
    <div className={`p-4 ${bgColor} ${textColor} rounded-md`}>
      {children}
    </div>
  );
};

export const AlertDescription = ({ children }) => {
  return <p className="text-sm">{children}</p>;
};