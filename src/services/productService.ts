import { Producto, ProductoUpdate } from '../types/product.types';

const API_BASE_URL = 'http://18.232.149.60:8000';

export const productService = {
  // Obtener todos los productos
  async getAll(): Promise<Producto[]> {
    const response = await fetch(`${API_BASE_URL}/productos`);
    if (!response.ok) throw new Error('Error al cargar productos');
    return response.json();
  },

  // Obtener producto por ID
  async getById(id: string): Promise<Producto> {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`);
    if (!response.ok) throw new Error('Error al cargar producto');
    return response.json();
  },

  // Crear producto
  async create(producto: Producto): Promise<Producto> {
    const response = await fetch(`${API_BASE_URL}/productos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    });
    if (!response.ok) throw new Error('Error al crear producto');
    return response.json();
  },

  // Actualizar producto
  async update(id: string, updateData: ProductoUpdate): Promise<Producto> {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    if (!response.ok) throw new Error('Error al actualizar producto');
    return response.json();
  },

  // Eliminar producto
  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error al eliminar producto');
  }
};