import React from 'react';
import { Edit3, Trash2, Package } from 'lucide-react';
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
      {/* Imagen del producto */}
      <div className="h-48 bg-gray-100 relative overflow-hidden">
        {producto.imageUrl ? (
          <img
            src={producto.imageUrl}
            alt={producto.nombre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Fallback si la imagen no carga
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-16 w-16 text-gray-300" />
          </div>
        )}
        
        {/* Fallback icon (hidden by default) */}
        <div className=" absolute inset-0 flex items-center justify-center bg-gray-100">
          <Package className="h-16 w-16 text-gray-300" />
        </div>

        {/* Botones de acción */}
        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(producto)}
            className="p-2 bg-white/90 text-gray-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-all backdrop-blur-sm"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(producto._id!)}
            className="p-2 bg-white/90 text-gray-600 hover:text-red-600 hover:bg-white rounded-lg transition-all backdrop-blur-sm"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Contenido del producto */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {producto.nombre}
          </h3>
        </div>
    
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