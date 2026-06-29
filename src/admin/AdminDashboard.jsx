import React, { useState, useEffect } from 'react';
import { Package, Tags, FileText, ChevronRight, TrendingUp, Edit2, Trash2, X, Plus } from 'lucide-react';
import { getProducts, getCategories, getBlogs, addProduct, updateProduct, deleteProduct } from '../services/db';
import './AdminDashboard.css';
import './AdminProducts.css'; // Import this to use the modal styles

const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: 0, categories: 0, blogs: 0 });
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    image: '',
    isBestSeller: false,
    order: 1
  });

  const loadData = async () => {
    const loadedCategories = await getCategories();
    const loadedProducts = await getProducts();
    const loadedBlogs = await getBlogs();

    setStats({
      products: loadedProducts.length,
      categories: loadedCategories.length,
      blogs: loadedBlogs.length
    });

    setCategories(loadedCategories);
    setProducts(loadedProducts);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenModal = (product = null, defaultCategory = '') => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        title: '',
        category: defaultCategory || (categories.length > 0 ? categories[0].name : ''),
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024 * 1.5) { 
        alert('File is too large. Please upload an image smaller than 1.5MB.');
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
    if (editingProduct) {
      await updateProduct({ ...formData, id: editingProduct.id });
    } else {
      await addProduct(formData);
    }
    await loadData();
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      await loadData();
      handleCloseModal(); // close modal if they delete from inside an edit
    }
  };

  // Group products by category
  const categoriesWithProducts = categories.map(cat => ({
    ...cat,
    products: products.filter(p => p.categories?.includes(cat.name) || p.category === cat.name)
  }));

  // Sort categories by order
  categoriesWithProducts.sort((a, b) => a.order - b.order);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h2>Dashboard Overview</h2>
          <p>Welcome back! Here's what's happening with your store today.</p>
        </div>
      </div>
      
      {/* Top Stats Row */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper bg-red-light">
            <Package size={24} className="text-red" />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Products</div>
            <div className="stat-value">{stats.products}</div>
          </div>
          <div className="stat-trend positive">
            <TrendingUp size={16} /> <span>Active</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper bg-yellow-light">
            <Tags size={24} className="text-yellow" />
          </div>
          <div className="stat-content">
            <div className="stat-label">Store Categories</div>
            <div className="stat-value">{stats.categories}</div>
          </div>
          <div className="stat-trend positive">
            <TrendingUp size={16} /> <span>Organized</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper bg-blue-light">
            <FileText size={24} className="text-blue" />
          </div>
          <div className="stat-content">
            <div className="stat-label">Published Blogs</div>
            <div className="stat-value">{stats.blogs}</div>
          </div>
          <div className="stat-trend positive">
            <TrendingUp size={16} /> <span>Live</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="dashboard-main-section">
        <div className="section-header">
          <h3>Store Inventory Breakdown</h3>
          <p>View your products organized by their assigned categories.</p>
        </div>

        <div className="category-inventory-grid">
          {categoriesWithProducts.map(category => (
            <div key={category.id} className="category-card">
              <div className="category-card-header">
                <h4>{category.name}</h4>
                <span className="count-badge">{category.products.length} Items</span>
              </div>
              
              <div className="category-card-body">
                {category.products.length > 0 ? (
                  <ul className="product-list">
                    {category.products.map(product => (
                      <li key={product.id} className="product-list-item" onClick={() => handleOpenModal(product)} style={{cursor: 'pointer'}} title="Click to edit">
                        <div className="product-list-item-left">
                          {product.image && product.image.startsWith('http') || product.image.startsWith('data:') ? (
                            <img src={product.image} alt={product.title} className="product-tiny-img" />
                          ) : (
                            <div className="product-tiny-placeholder"><Package size={14}/></div>
                          )}
                          <div className="product-list-info">
                            <span className="product-list-title">{product.title}</span>
                            <span className="product-list-price">{product.price}</span>
                          </div>
                        </div>
                        {product.isBestSeller && <span className="bestseller-star" title="Best Seller">★</span>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="empty-category">
                    <p>No products in this category yet.</p>
                  </div>
                )}
              </div>
              <div className="category-card-footer">
                <button 
                  onClick={() => handleOpenModal(null, category.name)} 
                  className="view-more-link" 
                  style={{background:'none', border:'none', cursor:'pointer', width:'100%', padding:'0.5rem'}}
                >
                  <Plus size={16} /> Add Product to {category.name}
                </button>
              </div>
            </div>
          ))}
        </div>
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
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} required>
                    <option value="" disabled>Select a category</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
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

              <div className="admin-modal-footer" style={{justifyContent: editingProduct ? 'space-between' : 'flex-end'}}>
                {editingProduct && (
                  <button type="button" className="admin-btn-secondary" style={{color: '#dc2626', borderColor: '#fca5a5'}} onClick={() => handleDelete(editingProduct.id)}>
                    <Trash2 size={16} style={{display:'inline', marginRight:'4px'}} /> Delete
                  </button>
                )}
                <div style={{display:'flex', gap:'1rem'}}>
                  <button type="button" className="admin-btn-secondary" onClick={handleCloseModal}>Cancel</button>
                  <button type="submit" className="admin-btn-primary">
                    {editingProduct ? 'Save Changes' : 'Add Product'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
