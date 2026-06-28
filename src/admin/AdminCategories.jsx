import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../services/db';
import './AdminProducts.css'; // Reuse table and modal styles

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    order: 1
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setCategories(getCategories());
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData(category);
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        slug: '',
        order: categories.length + 1
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Auto-generate slug from name
    if (name === 'name' && !editingCategory) {
      setFormData({
        ...formData,
        name: value,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory({ ...formData, id: editingCategory.id });
    } else {
      addCategory(formData);
    }
    loadData();
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
      loadData();
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Manage Categories</h2>
        <button className="admin-btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> Add New Category
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>URL Slug</th>
              <th>Priority / Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.sort((a,b) => a.order - b.order).map(category => (
              <tr key={category.id}>
                <td className="font-medium">{category.name}</td>
                <td><code style={{background:'#f3f4f6', padding:'2px 6px', borderRadius:'4px'}}>{category.slug}</code></td>
                <td>{category.order}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn edit" onClick={() => handleOpenModal(category)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="action-btn delete" onClick={() => handleDelete(category.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">No categories found. Add one!</td>
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
              <h3>{editingCategory ? 'Edit Category' : 'Add New Category'}</h3>
              <button className="close-modal-btn" onClick={handleCloseModal}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="admin-modal-body">
              <div className="form-group">
                <label>Category Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label>URL Slug (Auto-generated)</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label>Display Priority (1 = First)</label>
                <input type="number" name="order" value={formData.order} onChange={handleInputChange} min="1" required />
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="admin-btn-secondary" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="admin-btn-primary">
                  {editingCategory ? 'Save Changes' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
