import React, { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { getThemeSettings, updateThemeSettings } from '../services/db';
import './AdminSettings.css';

const AdminSettings = () => {
  const [theme, setTheme] = useState({
    accentColor1: '#dc2626',
    accentColor2: '#f59e0b'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTheme = async () => {
      const currentTheme = await getThemeSettings();
      setTheme(currentTheme);
    };
    fetchTheme();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTheme(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Live preview
    if (name === 'accentColor1') {
      document.documentElement.style.setProperty('--color-red', value);
    } else if (name === 'accentColor2') {
      document.documentElement.style.setProperty('--color-yellow', value);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');
    
    try {
      await updateThemeSettings(theme);
      setMessage('Theme settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving settings. Please try again.');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    const defaultTheme = { accentColor1: '#dc2626', accentColor2: '#f59e0b' };
    setTheme(defaultTheme);
    document.documentElement.style.setProperty('--color-red', defaultTheme.accentColor1);
    document.documentElement.style.setProperty('--color-yellow', defaultTheme.accentColor2);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Settings</h2>
      </div>

      <div className="admin-settings-container">
        <div className="settings-card">
          <div className="settings-card-header">
            <h3>Theme Customization</h3>
            <p>Customize the primary and secondary colors of the website.</p>
          </div>
          
          <form className="settings-form" onSubmit={handleSave}>
            <div className="form-row">
              <div className="form-group">
                <label>Primary Accent Color</label>
                <div className="color-picker-wrapper">
                  <input 
                    type="color" 
                    name="accentColor1" 
                    value={theme.accentColor1} 
                    onChange={handleChange}
                    className="color-picker"
                  />
                  <span className="color-value">{theme.accentColor1}</span>
                </div>
                <small>Used for buttons, highlights, and primary accents.</small>
              </div>

              <div className="form-group">
                <label>Secondary Accent Color</label>
                <div className="color-picker-wrapper">
                  <input 
                    type="color" 
                    name="accentColor2" 
                    value={theme.accentColor2} 
                    onChange={handleChange}
                    className="color-picker"
                  />
                  <span className="color-value">{theme.accentColor2}</span>
                </div>
                <small>Used for borders, underlines, and secondary accents.</small>
              </div>
            </div>

            <div className="settings-actions">
              <button 
                type="button" 
                className="btn btn-outline" 
                onClick={handleReset}
              >
                <RefreshCw size={16} /> Reset to Defaults
              </button>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : <><Save size={16} /> Save Changes</>}
              </button>
            </div>
            
            {message && (
              <div className={`status-message ${message.includes('Error') ? 'error' : 'success'}`}>
                {message}
              </div>
            )}
          </form>
        </div>
        
        {/* Preview Section */}
        <div className="settings-card preview-card">
          <div className="settings-card-header">
            <h3>Live Preview</h3>
          </div>
          <div className="theme-preview-box">
            <h1 style={{ color: theme.accentColor1 }}>Headline Example</h1>
            <p style={{ margin: '1rem 0', color: 'var(--text-primary)' }}>This is how your text will look with the <span style={{ color: theme.accentColor2, fontWeight: 'bold' }}>secondary color</span> acting as a highlight.</p>
            <button style={{ backgroundColor: theme.accentColor1, color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              Primary Button
            </button>
            <button style={{ backgroundColor: 'transparent', color: theme.accentColor1, border: `2px solid ${theme.accentColor2}`, padding: '0.75rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginLeft: '1rem' }}>
              Secondary Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
