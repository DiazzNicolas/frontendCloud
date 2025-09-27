import { Producto, ProductoUpdate } from '../types/product.types';

const API_BASE_URL = 'https://d5a92f4425ab.ngrok-free.app'; // Ajusta según tu configuración

export const productService = {
  // Obtener todos los productos
  async getAll(): Promise<Producto[]> {
    const response = await fetch(`${API_BASE_URL}/productos`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) throw new Error('Error al cargar productos');
    return response.json();
  },

  // Crear producto
  async create(producto: Omit<Producto, '_id'>): Promise<Producto> {
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
  },

  // Generar URL presignada para subir imágenes
  async generatePresignedUrl(fileName: string): Promise<{uploadUrl: string, publicUrl: string}> {
    const response = await fetch(`${API_BASE_URL}/productos/generate-presigned-url?file_name=${fileName}`, {
      headers: {
        'Content-Type': 'application/json',
      }
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