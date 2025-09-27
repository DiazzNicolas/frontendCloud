import { Producto, ProductoUpdate } from '../types/product.types';

// Usar variable de entorno o fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://d5a92f4425ab.ngrok-free.app';

// Debug: verificar qué URL se está usando
console.log('API_BASE_URL:', API_BASE_URL); // Ya está en HTTPS, perfecto

// Headers comunes para ngrok
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true' // Este header es clave para ngrok
});

export const productService = {
  // Obtener todos los productos
  async getAll(): Promise<Producto[]> {
    const response = await fetch(`${API_BASE_URL}/productos`, {
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al cargar productos');
    return response.json();
  },

  // Crear producto
  async create(producto: Omit<Producto, '_id'>): Promise<Producto> {
    const response = await fetch(`${API_BASE_URL}/productos`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(producto)
    });
    if (!response.ok) throw new Error('Error al crear producto');
    return response.json();
  },

  // Actualizar producto
  async update(id: string, updateData: ProductoUpdate): Promise<Producto> {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updateData)
    });
    if (!response.ok) throw new Error('Error al actualizar producto');
    return response.json();
  },

  // Eliminar producto
  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al eliminar producto');
  },

  // Generar URL presignada para subir imágenes
  async generatePresignedUrl(fileName: string): Promise<{uploadUrl: string, publicUrl: string}> {
    const response = await fetch(`${API_BASE_URL}/productos/generate-presigned-url?file_name=${fileName}`, {
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al generar URL presignada');
    return response.json();
  },

  // Subir imagen a S3
  async uploadImage(uploadUrl: string, file: File): Promise<void> {
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      }
    });
    if (!response.ok) throw new Error('Error al subir imagen');
  }
};