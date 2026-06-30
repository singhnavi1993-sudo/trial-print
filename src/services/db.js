// src/services/db.js
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

const PRODUCTS_KEY = 'printcopy_products';
const CATEGORIES_KEY = 'printcopy_categories';
const BLOGS_KEY = 'printcopy_blogs';
const AUTH_KEY = 'printcopy_admin_auth';
const THEME_KEY = 'printcopy_theme';

// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if Firebase is actually configured (not dummy text)
const isFirebaseConfigured = 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== 'your_api_key_here' && 
  firebaseConfig.projectId;

let app;
let db;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

// --- Authentication ---
// We keep auth simple/local for now unless you want Firebase Auth later
export const loginAdmin = (username, password) => {
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

// --- Initial Dummy Data (For LocalStorage Fallback) ---
const initialCategories = [
  { id: '1', name: 'SHOP BY INDUSTRY', slug: 'shop-by-industry', order: 1 },
  { id: '2', name: 'SHOP BY OCCASION', slug: 'shop-by-occasion', order: 2 },
  { id: '3', name: 'LED BOARDS', slug: 'led-boards', order: 3 },
  { id: '4', name: 'AWARDS & MEMENTOES', slug: 'awards-mementoes', order: 4 },
  { id: '5', name: 'GIFTING', slug: 'gifting', order: 5 },
  { id: '6', name: 'OUR B2B SERVICES', slug: 'our-b2b-services', order: 6 },
];

const initialProducts = [
  { id: '1', title: 'Acrylic Led Board', categories: ['LED BOARDS'], price: '₹499', image: 'https://images.unsplash.com/photo-1589330694653-06180a06ab78?auto=format&fit=crop&q=80&w=800', isBestSeller: true, order: 1 },
  { id: '2', title: 'Corporate Trophy', categories: ['AWARDS & MEMENTOES'], price: '₹899', image: 'https://images.unsplash.com/photo-1620645607310-9c169622d1cc?auto=format&fit=crop&q=80&w=800', isBestSeller: false, order: 2 },
  { id: '3', title: 'Business Gift Set', categories: ['GIFTING'], price: '₹1499', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800', isBestSeller: true, order: 3 },
];

export const initLocalDB = () => {
  const existingCats = localStorage.getItem(CATEGORIES_KEY);
  if (!existingCats || existingCats.includes('Branding & Advertising')) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(initialCategories));
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
  }
  
  if (!localStorage.getItem(PRODUCTS_KEY)) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
  }
  if (!localStorage.getItem(BLOGS_KEY)) {
    localStorage.setItem(BLOGS_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(THEME_KEY)) {
    localStorage.setItem(THEME_KEY, JSON.stringify({ 
      accentColor1: '#dc2626', 
      accentColor2: '#f59e0b',
      headerBg: '#ffffff',
      pageBg: '#ffffff'
    }));
  }
};


// --- Universal Async API ---
// These functions will automatically use Firebase if configured, otherwise fallback to LocalStorage

// CATEGORIES
export const getCategories = async () => {
  if (isFirebaseConfigured) {
    const querySnapshot = await getDocs(collection(db, "categories"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } else {
    initLocalDB();
    return JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]');
  }
};

export const addCategory = async (category) => {
  if (isFirebaseConfigured) {
    const docRef = await addDoc(collection(db, "categories"), category);
    return { id: docRef.id, ...category };
  } else {
    const categories = JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]');
    const newCategory = { ...category, id: Date.now().toString() };
    categories.push(newCategory);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    return newCategory;
  }
};

export const updateCategory = async (updatedCategory) => {
  if (isFirebaseConfigured) {
    const { id, ...data } = updatedCategory;
    const docRef = doc(db, "categories", id);
    await updateDoc(docRef, data);
  } else {
    const categories = JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]');
    const index = categories.findIndex(c => c.id === updatedCategory.id);
    if (index !== -1) {
      categories[index] = updatedCategory;
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    }
  }
};

export const deleteCategory = async (id) => {
  if (isFirebaseConfigured) {
    await deleteDoc(doc(db, "categories", id));
  } else {
    const categories = JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]').filter(c => c.id !== id);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }
};

// PRODUCTS
export const getProducts = async () => {
  if (isFirebaseConfigured) {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } else {
    initLocalDB();
    return JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
  }
};

export const addProduct = async (product) => {
  if (isFirebaseConfigured) {
    const docRef = await addDoc(collection(db, "products"), product);
    return { id: docRef.id, ...product };
  } else {
    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    const newProduct = { ...product, id: Date.now().toString() };
    products.push(newProduct);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return newProduct;
  }
};

export const updateProduct = async (updatedProduct) => {
  if (isFirebaseConfigured) {
    const { id, ...data } = updatedProduct;
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, data);
  } else {
    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    }
  }
};

export const deleteProduct = async (id) => {
  if (isFirebaseConfigured) {
    await deleteDoc(doc(db, "products", id));
  } else {
    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]').filter(p => p.id !== id);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }
};

// BLOGS
export const getBlogs = async () => {
  if (isFirebaseConfigured) {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } else {
    initLocalDB();
    return JSON.parse(localStorage.getItem(BLOGS_KEY) || '[]');
  }
};

export const addBlog = async (blog) => {
  if (isFirebaseConfigured) {
    const newBlogData = { ...blog, date: new Date().toISOString() };
    const docRef = await addDoc(collection(db, "blogs"), newBlogData);
    return { id: docRef.id, ...newBlogData };
  } else {
    const blogs = JSON.parse(localStorage.getItem(BLOGS_KEY) || '[]');
    const newBlog = { ...blog, id: Date.now().toString(), date: new Date().toISOString() };
    blogs.push(newBlog);
    localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
    return newBlog;
  }
};

export const updateBlog = async (updatedBlog) => {
  if (isFirebaseConfigured) {
    const { id, ...data } = updatedBlog;
    data.lastUpdated = new Date().toISOString();
    const docRef = doc(db, "blogs", id);
    await updateDoc(docRef, data);
  } else {
    const blogs = JSON.parse(localStorage.getItem(BLOGS_KEY) || '[]');
    const index = blogs.findIndex(b => b.id === updatedBlog.id);
    if (index !== -1) {
      blogs[index] = { ...updatedBlog, lastUpdated: new Date().toISOString() };
      localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
    }
  }
};

export const deleteBlog = async (id) => {
  if (isFirebaseConfigured) {
    await deleteDoc(doc(db, "blogs", id));
  } else {
    const blogs = JSON.parse(localStorage.getItem(BLOGS_KEY) || '[]').filter(b => b.id !== id);
    localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
  }
};

// THEME
export const getThemeSettings = async () => {
  if (isFirebaseConfigured) {
    try {
      const docRef = doc(db, "settings", "theme");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        const defaultTheme = { 
          accentColor1: '#dc2626', 
          accentColor2: '#f59e0b',
          headerBg: '#ffffff',
          pageBg: '#ffffff'
        };
        await setDoc(docRef, defaultTheme);
        return defaultTheme;
      }
    } catch (error) {
      console.error("Error fetching theme:", error);
      return { accentColor1: '#dc2626', accentColor2: '#f59e0b', headerBg: '#ffffff', pageBg: '#ffffff' };
    }
  } else {
    initLocalDB();
    return JSON.parse(localStorage.getItem(THEME_KEY) || '{"accentColor1":"#dc2626","accentColor2":"#f59e0b","headerBg":"#ffffff","pageBg":"#ffffff"}');
  }
};

export const updateThemeSettings = async (themeSettings) => {
  if (isFirebaseConfigured) {
    const docRef = doc(db, "settings", "theme");
    await setDoc(docRef, themeSettings, { merge: true });
  } else {
    localStorage.setItem(THEME_KEY, JSON.stringify(themeSettings));
  }
};
