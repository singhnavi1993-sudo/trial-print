import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, FileText } from 'lucide-react';
import { getBlogs, addBlog, updateBlog, deleteBlog } from '../services/db';
import './AdminProducts.css'; // Reusing the same CSS for tables and modals

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    image: '',
    isPublished: true
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const fetchedBlogs = await getBlogs();
    setBlogs(fetchedBlogs);
  };

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData(blog);
    } else {
      setEditingBlog(null);
      setFormData({
        title: '',
        author: 'Admin',
        content: '',
        image: '',
        isPublished: true
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
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
      if (file.size > 1024 * 1024 * 1.5) { // 1.5MB limit
        alert('File is too large. Please upload an image smaller than 1.5MB to save local storage space.');
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
    if (editingBlog) {
      await updateBlog({ ...formData, id: editingBlog.id });
    } else {
      await addBlog(formData);
    }
    await loadData();
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      await deleteBlog(id);
      await loadData();
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Manage Blogs</h2>
        <button className="admin-btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> Create New Blog
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Cover Image</th>
              <th>Blog Title</th>
              <th>Author</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.sort((a,b) => new Date(b.date) - new Date(a.date)).map(blog => (
              <tr key={blog.id}>
                <td>
                  {blog.image ? (
                    <img src={blog.image} alt={blog.title} className="admin-table-img" style={{objectFit: 'cover', width: '80px', height: '50px'}} />
                  ) : (
                    <div style={{width: '80px', height: '50px', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', color: '#9ca3af'}}>
                      <FileText size={20} />
                    </div>
                  )}
                </td>
                <td className="font-medium" style={{maxWidth: '250px'}}>{blog.title}</td>
                <td>{blog.author}</td>
                <td>{new Date(blog.date).toLocaleDateString()}</td>
                <td>
                  {blog.isPublished ? (
                    <span className="badge badge-success">Published</span>
                  ) : (
                    <span className="badge badge-gray">Draft</span>
                  )}
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn edit" onClick={() => handleOpenModal(blog)} title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button className="action-btn delete" onClick={() => handleDelete(blog.id)} title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4">No blogs found. Create your first post!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{maxWidth: '700px'}}>
            <div className="admin-modal-header">
              <h3>{editingBlog ? 'Edit Blog Post' : 'Create Blog Post'}</h3>
              <button className="close-modal-btn" onClick={handleCloseModal}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="admin-modal-body">
              <div className="form-group">
                <label>Blog Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label>Author</label>
                <input type="text" name="author" value={formData.author} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label>Cover Image (URL or Local File)</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="Paste image URL here..." />
                  <div style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '500' }}>OR upload from computer:</div>
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ padding: '0.5rem', border: '1px dashed #d1d5db', background: '#f9fafb' }} />
                </div>
              </div>

              <div className="form-group">
                <label>Blog Content (Text)</label>
                <textarea 
                  name="content" 
                  value={formData.content} 
                  onChange={handleInputChange} 
                  required 
                  style={{ minHeight: '150px', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical' }}
                  placeholder="Write your blog post here..."
                ></textarea>
              </div>

              <div className="form-group checkbox-group" style={{justifyContent: 'flex-start'}}>
                <label className="checkbox-label">
                  <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleInputChange} />
                  Publish immediately
                </label>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="admin-btn-secondary" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="admin-btn-primary">
                  {editingBlog ? 'Save Changes' : 'Create Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
