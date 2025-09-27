export interface Producto {
  id?: string;
  nombre: string;
  precio: number;
  stock: number;
}

export interface ProductoUpdate {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  stock?: number;
}

export interface ProductFormData extends Producto {}