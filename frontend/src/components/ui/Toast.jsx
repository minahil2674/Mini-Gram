import React from 'react';

export default function Toast({ message, type = "info" }) {
  const color = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }[type];

  return (
    <div className={`fixed top-4 right-4 text-white px-4 py-2 rounded shadow-lg ${color}`}>
      {message}
    </div>
  );
}
