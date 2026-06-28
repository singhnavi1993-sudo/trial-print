// src/services/db.js

const PRODUCTS_KEY = 'printcopy_products';
const CATEGORIES_KEY = 'printcopy_categories';
const BLOGS_KEY = 'printcopy_blogs';
const AUTH_KEY = 'printcopy_admin_auth';

// --- Authentication ---
export const loginAdmin = (username, password) => {
  // Hardcoded credentials as requested
  if (username === 'admin' && password === 'print123') {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
};

export const logoutAdmin = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = () => {
  return localStorage.getItem(AUTH_KEY) === 'true';
};


// --- Initial Dummy Data ---
const initialCategories = [
  { id: '1', name: 'SHOP BY INDUSTRY', slug: 'shop-by-industry', order: 1 },
  { id: '2', name: 'SHOP BY OCCASION', slug: 'shop-by-occasion', order: 2 },
  { id: '3', name: 'LED BOARDS', slug: 'led-boards', order: 3 },
  { id: '4', name: 'AWARDS & MEMENTOES', slug: 'awards-mementoes', order: 4 },
  { id: '5', name: 'GIFTING', slug: 'gifting', order: 5 },
  { id: '6', name: 'OUR B2B SERVICES', slug: 'our-b2b-services', order: 6 },
];

const initialProducts = [
  { id: '1', title: 'Acrylic Led Board', category: 'LED BOARDS', price: '₹499', image: 'https://images.unsplash.com/photo-1589330694653-06180a06ab78?auto=format&fit=crop&q=80&w=800', isBestSeller: true, order: 1 },
  { id: '2', title: 'Corporate Trophy', category: 'AWARDS & MEMENTOES', price: '₹899', image: 'https://images.unsplash.com/photo-1620645607310-9c169622d1cc?auto=format&fit=crop&q=80&w=800', isBestSeller: false, order: 2 },
  { id: '3', title: 'Business Gift Set', category: 'GIFTING', price: '₹1499', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800', isBestSeller: true, order: 3 },
];

export const initDB = () => {
  const existingCats = localStorage.getItem(CATEGORIES_KEY);
  // Auto-migrate if they still have the old dummy categories
  if (!existingCats || existingCats.includes('Branding & Advertising')) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(initialCategories));
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts)); // Wipe products too to match new categories
  }
  
  if (!localStorage.getItem(PRODUCTS_KEY)) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
  }
  if (!localStorage.getItem(BLOGS_KEY)) {
    localStorage.setItem(BLOGS_KEY, JSON.stringify([]));
  }
};


// --- Categories API ---
export const getCategories = () => {
  initDB();
  return JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]');
};

export const addCategory = (category) => {
  const categories = getCategories();
  const newCategory = { ...category, id: Date.now().toString() };
  categories.push(newCategory);
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  return newCategory;
};

export const updateCategory = (updatedCategory) => {
  const categories = getCategories();
  const index = categories.findIndex(c => c.id === updatedCategory.id);
  if (index !== -1) {
    categories[index] = updatedCategory;
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }
};

export const deleteCategory = (id) => {
  const categories = getCategories().filter(c => c.id !== id);
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};


// --- Products API ---
export const getProducts = () => {
  initDB();
  return JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
};

export const addProduct = (product) => {
  const products = getProducts();
  const newProduct = { ...product, id: Date.now().toString() };
  products.push(newProduct);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return newProduct;
};

export const updateProduct = (updatedProduct) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = updatedProduct;
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }
};

export const deleteProduct = (id) => {
  const products = getProducts().filter(p => p.id !== id);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

// --- Blogs API ---
export const getBlogs = () => {
  initDB();
  return JSON.parse(localStorage.getItem(BLOGS_KEY) || '[]');
};

export const addBlog = (blog) => {
  const blogs = getBlogs();
  const newBlog = { ...blog, id: Date.now().toString(), date: new Date().toISOString() };
  blogs.push(newBlog);
  localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
  return newBlog;
};

export const updateBlog = (updatedBlog) => {
  const blogs = getBlogs();
  const index = blogs.findIndex(b => b.id === updatedBlog.id);
  if (index !== -1) {
    blogs[index] = { ...updatedBlog, lastUpdated: new Date().toISOString() };
    localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
  }
};

export const deleteBlog = (id) => {
  const blogs = getBlogs().filter(b => b.id !== id);
  localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
};
