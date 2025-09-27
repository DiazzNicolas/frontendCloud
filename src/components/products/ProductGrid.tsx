import React from 'react';
import { Package } from 'lucide-react';
import { Producto } from '../../types/product.types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  productos: Producto[];
  searchTerm: string;
  onEdit: (producto: Producto) => void;
  onDelete: (id: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  productos, 
  searchTerm, 
  onEdit, 
  onDelete 
}) => {
  if (productos.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          {searchTerm ? 'No se encontraron productos' : 'No hay productos'}
        </h3>
        <p className="text-gray-500">
          {searchTerm ? 'Intenta con otro término de búsqueda' : 'Comienza agregando tu primer producto'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};