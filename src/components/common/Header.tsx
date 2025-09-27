import React from 'react';
import { ShoppingCart, Plus } from 'lucide-react';

interface HeaderProps {
  onNewProduct: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNewProduct }) => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <ShoppingCart className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mi Tienda</h1>
              <p className="text-gray-600">Gestión de Productos</p>
            </div>
          </div>
          <button
            onClick={onNewProduct}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span>Nuevo Producto</span>
          </button>
        </div>
      </div>
    </header>
  );
};