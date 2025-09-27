import React from 'react';
import { Package, Box, DollarSign } from 'lucide-react';
import { Producto } from '../../types/product.types';
import { formatPrice, formatNumber } from '../../utils/formatters';

interface ProductStatsProps {
  productos: Producto[];
}

export const ProductStats: React.FC<ProductStatsProps> = ({ productos }) => {
  const totalStock = productos.reduce((sum, p) => sum + p.stock, 0);
  const totalValue = productos.reduce((sum, p) => sum + (p.precio * p.stock), 0);
  const lowStockProducts = productos.filter(p => p.stock <= 5 && p.stock > 0).length;
  const outOfStockProducts = productos.filter(p => p.stock === 0).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Productos */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Productos</p>
            <p className="text-3xl font-bold text-gray-900">{formatNumber(productos.length)}</p>
            {(lowStockProducts > 0 || outOfStockProducts > 0) && (
              <p className="text-xs text-red-500 mt-1">
                {outOfStockProducts > 0 && `${outOfStockProducts} sin stock`}
                {outOfStockProducts > 0 && lowStockProducts > 0 && ', '}
                {lowStockProducts > 0 && `${lowStockProducts} stock bajo`}
              </p>
            )}
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>
      
      {/* Stock Total */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Stock Total</p>
            <p className="text-3xl font-bold text-gray-900">{formatNumber(totalStock)}</p>
            <p className="text-xs text-gray-500 mt-1">
              Unidades en inventario
            </p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <Box className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>
      
      {/* Valor Inventario */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Valor Inventario</p>
            <p className="text-3xl font-bold text-gray-900">{formatPrice(totalValue)}</p>
            <p className="text-xs text-gray-500 mt-1">
              Valor total en stock
            </p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <DollarSign className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>
    </div>
  );
};