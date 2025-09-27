import React from 'react';
import { Package } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
      <div className="flex items-center space-x-3">
        <div className="bg-red-100 p-2 rounded-full">
          <Package className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <h3 className="text-red-800 font-semibold">Error de Conexión</h3>
          <p className="text-red-700">{message}</p>
          <button
            onClick={onRetry}
            className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    </div>
  );
};