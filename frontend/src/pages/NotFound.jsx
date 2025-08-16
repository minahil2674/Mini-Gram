import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="mb-4 text-gray-600">Oops! The page you're looking for doesn’t exist.</p>
      <Link to="/" className="text-blue-600 underline">Go back home</Link>
    </div>
  );
}
