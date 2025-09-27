import { Producto, ProductoUpdate } from '../types/product.types';

// Forzar HTTPS - reemplazar http con https si existe
let API_BASE_URL = 'https://f8dae8ef47c5.ngrok-free.app';

// Seguridad extra: convertir cualquier HTTP a HTTPS
if (API_BASE_URL.startsWith('http://')) {
  API_BASE_URL = API_BASE_URL.replace('http://', 'https://');
}

// Debug: verificar qué URL se está usando
console.log('API_BASE_URL:', API_BASE_URL);
console.log('Tipo de protocolo:', API_BASE_URL.startsWith('https') ? 'HTTPS ✓' : 'HTTP ✗'); // Ya está en HTTPS, perfecto

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