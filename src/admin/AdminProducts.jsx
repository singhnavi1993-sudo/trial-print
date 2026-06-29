import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { getProducts, addProduct, updateProduct, deleteProduct, getCategories } from '../services/db';
import './AdminProducts.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    categories: [],
    price: '',
    image: '',
    isBestSeller: false,
    order: 1
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const prods = await getProducts();
    const cats = await getCategories();
    setProducts(prods);
    setCategories(cats);
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      // Migrate old string 'category' to array 'categories' on edit
      const productCategories = product.categories 
        ? product.categories 
        : (product.category ? [product.category] : []);
        
      setFormData({
        ...product,
        categories: productCategories
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: '',
        categories: [],
        price: '',
        image: '',
        isBestSeller: false,
        order: products.length + 1
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleCategoryToggle = (catName) => {
    setFormData(prev => {
      const isSelected = prev.categories.includes(catName);
      if (isSelected) {
        return { ...prev, categories: prev.categories.filter(c => c !== catName) };
      } else {
        return { ...prev, categories: [...prev.categories, catName] };
      }
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 500) { 
        alert('File is too large for the database. Please upload an image smaller than 500KB, or use an image URL instead.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.categories.length === 0) {
      alert('Please select at least one category.');
      return;
    }
    // Remove the old 'category' string to prevent confusion in DB
    const { category, ...dataToSave } = formData;
    
    try {
      if (editingProduct) {
        await updateProduct({ ...dataToSave, id: editingProduct.id });
      } else {
        await addProduct(dataToSave);
      }
      await loadData();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. If you uploaded an image, it might be too large. Try using an image URL instead.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        await loadData();
      } catch (error) {
        alert("Failed to delete product.");
      }
    }
  };

  const renderCategories = (product) => {
    if (product.categories && product.categories.length > 0) {
      return product.categories.join(', ');
    }
    return product.category || 'None';
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Manage Products</h2>
        <button className="admin-btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> Add New Product
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Categories</th>
              <th>Price</th>
              <th>Priority / Order</th>
              <th>Best Seller</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.sort((a,b) => a.order - b.order).map(product => (
              <tr key={product.id}>
                <td>
                  <img src={product.image} alt={product.title} className="admin-table-img" />
                </td>
                <td className="font-medium">{product.title}</td>
                <td>{renderCategories(product)}</td>
                <td>{product.price}</td>
                <td>{product.order}</td>
                <td>
                  {product.isBestSeller ? (
                    <span className="badge badge-success">Yes</span>
                  ) : (
                    <span className="badge badge-gray">No</span>
                  )}
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn edit" onClick={() => handleOpenModal(product)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="action-btn delete" onClick={() => handleDelete(product.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">No products found. Add one!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button className="close-modal-btn" onClick={handleCloseModal}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="admin-modal-body">
              <div className="form-group">
                <label>Product Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>

              <div className="form-row">
                <div className="form-group" style={{ flex: '1.5' }}>
                  <label>Categories (Select one or more)</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem', background: '#f9fafb', padding: '1rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                    {categories.map(c => (
                      <label key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.9rem', marginRight: '0.5rem' }}>
                        <input 
                          type="checkbox" 
                          checked={formData.categories?.includes(c.name) || false}
                          onChange={() => handleCategoryToggle(c.name)}
                        />
                        {c.name}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="form-group" style={{ flex: '1' }}>
                  <label>Price (e.g. ₹499)</label>
                  <input type="text" name="price" value={formData.price} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="form-group">
                <label>Image (URL or Local File)</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="Paste image URL here..." required />
                  <div style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '500' }}>OR upload from computer:</div>
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ padding: '0.5rem', border: '1px dashed #d1d5db', background: '#f9fafb' }} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Display Priority (1 = First)</label>
                  <input type="number" name="order" value={formData.order} onChange={handleInputChange} min="1" required />
                </div>
                
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" name="isBestSeller" checked={formData.isBestSeller} onChange={handleInputChange} />
                    Mark as Best Seller
                  </label>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="admin-btn-secondary" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="admin-btn-primary">
                  {editingProduct ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
