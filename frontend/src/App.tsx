import React, { useState, useMemo } from 'react';
import {
  Header,
  LoadingSpinner,
  ErrorMessage,
  ProductSearch,
  ProductStats,
  ProductGrid,
  ProductModal
} from './components';
import { useProducts } from './hooks/useProducts';
import { Producto, ProductoUpdate } from './types/product.types';

const App: React.FC = () => {
  const {
    productos,
    loading,
    error,
    fetchProductos,
    createProduct,
    updateProduct,
    deleteProduct
  } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);

  // Filtrar productos por término de búsqueda
  const filteredProductos = useMemo(() => 
    productos.filter(producto =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    ), [productos, searchTerm]);

  // Abrir modal para crear/editar
  const handleOpenModal = (producto?: Producto) => {
    setEditingProduct(producto || null);
    setShowModal(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  // Guardar producto (crear o actualizar)
  const handleSaveProduct = async (formData: Producto, isEditing: boolean) => {
    if (isEditing && editingProduct) {
      // Crear objeto con solo los campos que cambiaron
      const updateData: ProductoUpdate = {};
      if (formData.nombre !== editingProduct.nombre) updateData.nombre = formData.nombre;
      if (formData.descripcion !== editingProduct.descripcion) updateData.descripcion = formData.descripcion;
      if (formData.precio !== editingProduct.precio) updateData.precio = formData.precio;
      if (formData.stock !== editingProduct.stock) updateData.stock = formData.stock;
      
      await updateProduct(editingProduct.id!, updateData);
    } else {
      await createProduct(formData);
    }
  };

  // Eliminar producto
  const handleDeleteProduct = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) return;
    await deleteProduct(id);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-50">
      <Header onNewProduct={() => handleOpenModal()} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <ErrorMessage message={error} onRetry={fetchProductos} />
        ) : (
          <>
            <ProductSearch
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />

            <ProductStats productos={productos} />

            <ProductGrid
              productos={filteredProductos}
              searchTerm={searchTerm}
              onEdit={handleOpenModal}
              onDelete={handleDeleteProduct}
            />
          </>
        )}
      </main>

      <ProductModal
        isOpen={showModal}
        editingProduct={editingProduct}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
      />
    </div>
  );
};

export default App;