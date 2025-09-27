export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(price);
};

export const getStockStatus = (stock: number) => {
  if (stock > 10) {
    return {
      className: 'bg-green-100 text-green-800',
      status: 'En Stock'
    };
  } else if (stock > 0) {
    return {
      className: 'bg-yellow-100 text-yellow-800',
      status: 'Stock Bajo'
    };
  } else {
    return {
      className: 'bg-red-100 text-red-800',
      status: 'Sin Stock'
    };
  }
};