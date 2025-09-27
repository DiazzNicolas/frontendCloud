import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';
import { Producto } from '../../types/product.types';
import { formatPrice, getStockStatus } from '../../utils/formatters';

interface ProductCardProps {
  producto: Producto;
  onEdit: (producto: Producto) => void;
  onDelete: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  producto, 
  onEdit, 
  onDelete 
}) => {
  const stockStatus = getStockStatus(producto.stock);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {producto.nombre}
          </h3>
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(producto)}
              className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(producto.id!)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{producto.descripcion}</p>
        
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">
            {formatPrice(producto.precio)}
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${stockStatus.className}`}>
            Stock: {producto.stock}
          </div>
        </div>
      </div>
    </div>
  );
};