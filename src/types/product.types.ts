export interface Producto {
  _id?: string; // Cambiar de id a _id para coincidir con MongoDB
  nombre: string;
  precio: number;
  stock: number;
  imageUrl?: string; // Añadir campo de imagen
}

export interface ProductoUpdate {
  nombre?: string;
  precio?: number;
  stock?: number;
  imageUrl?: string; // Añadir campo de imagen
}

export interface ProductFormData extends Producto {}