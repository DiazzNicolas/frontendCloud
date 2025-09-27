// Formatear precio en soles peruanos
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2
  }).format(price);
};

// Obtener estado del stock con colores
export const getStockStatus = (stock: number) => {
  if (stock === 0) {
    return {
      className: 'bg-red-100 text-red-800',
      label: 'Sin stock'
    };
  } else if (stock <= 5) {
    return {
      className: 'bg-yellow-100 text-yellow-800',
      label: 'Stock bajo'
    };
  } else {
    return {
      className: 'bg-green-100 text-green-800',
      label: 'En stock'
    };
  }
};

// Formatear números grandes
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-PE').format(num);
};