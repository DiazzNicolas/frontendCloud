import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import { Producto, ProductFormData } from '../../types/product.types';
import { productService } from '../../services/productService';

interface ProductModalProps {
  isOpen: boolean;
  editingProduct: Producto | null;
  onClose: () => void;
  onSave: (formData: ProductFormData, isEditing: boolean) => Promise<void>;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  editingProduct,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    nombre: '',
    precio: 0,
    stock: 0,
    imageUrl: ''
  });

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
      setPreviewUrl(editingProduct.imageUrl || '');
    } else {
      setFormData({
        nombre: '',
        precio: 0,
        stock: 0,
        imageUrl: ''
      });
      setPreviewUrl('');
    }
    setSelectedFile(null);
  }, [editingProduct, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
    }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Crear preview local
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async (): Promise<string> => {
    if (!selectedFile) return formData.imageUrl || '';

    try {
      setUploading(true);
      
      // Generar nombre único para el archivo
      const timestamp = Date.now();
      const fileName = `${timestamp}_${selectedFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      
      // Obtener URL presignada
      const { uploadUrl, publicUrl } = await productService.generatePresignedUrl(fileName);
      
      // Subir archivo a S3
      await productService.uploadImage(uploadUrl, selectedFile);
      
      return publicUrl;
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      throw new Error('Error al subir la imagen');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Subir imagen si hay una nueva seleccionada
      let imageUrl = formData.imageUrl;
      if (selectedFile) {
        imageUrl = await handleImageUpload();
      }

      const dataToSave = {
        ...formData,
        precio: isNaN(formData.precio) || formData.precio === 0 ? 0 : formData.precio,
        stock: isNaN(formData.stock) || formData.stock === 0 ? 0 : formData.stock,
        imageUrl
      };

      await onSave(dataToSave, !!editingProduct);
      onClose();
    } catch (err) {
      alert('Error al guardar el producto');
    } finally {
      setSaving(false);
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setFormData(prev => ({ ...prev, imageUrl: '' }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
        </div>
        
        <div className="p-6 space-y-4">
          {/* Campo de nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
              maxLength={100}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Campos de precio y stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Precio (S/)</label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                required
                min="0.01"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Campo de imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Imagen</label>
            
            {/* Preview de imagen */}
            {previewUrl && (
              <div className="relative mb-3">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Input de archivo */}
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-6 h-6 mb-2 text-gray-400" />
                  <p className="text-xs text-gray-500">
                    {selectedFile ? selectedFile.name : 'Seleccionar imagen'}
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </label>
            </div>
          </div>
          
          {/* Botones */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={saving || uploading}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || uploading}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors disabled:opacity-50"
            >
              {saving ? 'Guardando...' : uploading ? 'Subiendo...' : (editingProduct ? 'Actualizar' : 'Crear')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};