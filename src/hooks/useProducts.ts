import { useState, useEffect } from 'react';
import { Producto, ProductoUpdate } from '../types/product.types';
import { productService } from '../services/productService';

export const useProducts = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProductos(data);
      setError(null);
    } catch (err) {
      setError('Error al conectar con el servidor. Verifica que el backend esté ejecutándose.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (producto: Omit<Producto, '_id'>) => {
    try {
      await productService.create(producto);
      await fetchProductos();
    } catch (err) {
      console.error('Error al crear producto:', err);
      throw err;
    }
  };

  const updateProduct = async (id: string, updateData: ProductoUpdate) => {
    try {
      await productService.update(id, updateData);
      await fetchProductos();
    } catch (err) {
      console.error('Error al actualizar producto:', err);
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await productService.delete(id);
      await fetchProductos();
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return {
    productos,
    loading,
    error,
    fetchProductos,
    createProduct,
    updateProduct,
    deleteProduct
  };
};