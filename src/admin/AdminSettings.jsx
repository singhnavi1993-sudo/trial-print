import React, { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { getThemeSettings, updateThemeSettings } from '../services/db';
import './AdminSettings.css';

const AdminSettings = () => {
  const [theme, setTheme] = useState({
    accentColor1: '#dc2626',
    accentColor2: '#f59e0b',
    headerBg: '#ffffff',
    pageBg: '#ffffff',
    navLinkColor: '#18181b',
    textColor: '#000000',
    bgHero: 'transparent',
    bgIndustry: 'transparent',
    bgBestSellers: 'transparent',
    bgOccasion: 'transparent',
    bgInstagram: 'transparent',
    bgCustomIdeas: 'transparent',
    bgPerfectGift: 'transparent',
    bgRoomDecor: 'transparent',
    bgShowroom: 'transparent',
    bgConfidence: 'transparent',
    bgB2B: 'transparent',
    bgBulkOrder: 'transparent'
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
    } else if (name === 'headerBg') {
      document.documentElement.style.setProperty('--header-bg', value);
    } else if (name === 'pageBg') {
      document.documentElement.style.setProperty('--page-bg', value);
    } else if (name === 'navLinkColor') {
      document.documentElement.style.setProperty('--nav-link-color', value);
    } else if (name === 'textColor') {
      document.documentElement.style.setProperty('--text-primary', value);
    } else if (name === 'textFooter') {
      if (value !== 'transparent') {
        document.documentElement.style.setProperty('--text-footer', value);
      } else {
        document.documentElement.style.removeProperty('--text-footer');
      }
    } else if (name.startsWith('bg')) {
      const cssVar = '--bg-' + name.substring(2).toLowerCase();
      if (value !== 'transparent') {
        document.documentElement.style.setProperty(cssVar, value);
      } else {
        document.documentElement.style.removeProperty(cssVar);
      }
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
    const defaultTheme = { 
      accentColor1: '#dc2626', 
      accentColor2: '#f59e0b', 
      headerBg: '#ffffff', 
      pageBg: '#ffffff', 
      navLinkColor: '#18181b', 
      textColor: '#000000',
      bgHero: 'transparent',
      bgIndustry: 'transparent',
      bgBestSellers: 'transparent',
      bgOccasion: 'transparent',
      bgInstagram: 'transparent',
      bgCustomIdeas: 'transparent',
      bgPerfectGift: 'transparent',
      bgRoomDecor: 'transparent',
      bgShowroom: 'transparent',
      bgConfidence: 'transparent',
      bgB2B: 'transparent',
      bgBulkOrder: 'transparent',
      bgFooter: 'transparent',
      textFooter: 'transparent'
    };
    setTheme(defaultTheme);
    document.documentElement.style.setProperty('--color-red', defaultTheme.accentColor1);
    document.documentElement.style.setProperty('--color-yellow', defaultTheme.accentColor2);
    document.documentElement.style.setProperty('--header-bg', defaultTheme.headerBg);
    document.documentElement.style.setProperty('--page-bg', defaultTheme.pageBg);
    document.documentElement.style.setProperty('--nav-link-color', defaultTheme.navLinkColor);
    document.documentElement.style.setProperty('--text-primary', defaultTheme.textColor);
    
    // Reset all section variables
    Object.keys(defaultTheme).forEach(key => {
      if (key.startsWith('bg') && key !== 'bgPrimary' && key !== 'bgSecondary') {
        const cssVar = '--bg-' + key.substring(2).toLowerCase();
        if (defaultTheme[key] !== 'transparent') {
          document.documentElement.style.setProperty(cssVar, defaultTheme[key]);
        } else {
          document.documentElement.style.removeProperty(cssVar);
        }
      }
    });
  };

  const sectionConfig = [
    { name: 'bgHero', label: 'Banner (Hero)', desc: 'Top slider section' },
    { name: 'bgIndustry', label: 'Shop By Industry', desc: 'Industry categories grid' },
    { name: 'bgBestSellers', label: 'Best Sellers', desc: 'Best selling products carousel' },
    { name: 'bgOccasion', label: 'Shop By Occasion', desc: 'Occasion categories grid' },
    { name: 'bgInstagram', label: 'Instagram Reels', desc: 'Social media section' },
    { name: 'bgCustomIdeas', label: 'Custom Ideas', desc: 'Custom branding ideas' },
    { name: 'bgPerfectGift', label: 'Perfect Gift', desc: 'Gifting section' },
    { name: 'bgRoomDecor', label: 'Room Decor', desc: 'Room decoration products' },
    { name: 'bgShowroom', label: 'Showroom Shine', desc: 'Showroom display items' },
    { name: 'bgConfidence', label: 'Confidence Builder', desc: 'Trust and stats section' },
    { name: 'bgB2B', label: 'B2B Services', desc: 'Corporate services' },
    { name: 'bgBulkOrder', label: 'Bulk Order Form', desc: 'Contact/Bulk order section' }
  ];

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

            <div className="form-row">
              <div className="form-group">
                <label>Header Background Color</label>
                <div className="color-picker-wrapper">
                  <input 
                    type="color" 
                    name="headerBg" 
                    value={theme.headerBg} 
                    onChange={handleChange}
                    className="color-picker"
                  />
                  <span className="color-value">{theme.headerBg}</span>
                </div>
                <small>Background color for the top navigation bar.</small>
              </div>

              <div className="form-group">
                <label>Page Background Color</label>
                <div className="color-picker-wrapper">
                  <input 
                    type="color" 
                    name="pageBg" 
                    value={theme.pageBg} 
                    onChange={handleChange}
                    className="color-picker"
                  />
                  <span className="color-value">{theme.pageBg}</span>
                </div>
                <small>Global background color for the entire website.</small>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Nav Link Color</label>
                <div className="color-picker-wrapper">
                  <input 
                    type="color" 
                    name="navLinkColor" 
                    value={theme.navLinkColor} 
                    onChange={handleChange}
                    className="color-picker"
                  />
                  <span className="color-value">{theme.navLinkColor}</span>
                </div>
                <small>Color for header navigation links.</small>
              </div>

              <div className="form-group">
                <label>Text & Titles Color</label>
                <div className="color-picker-wrapper">
                  <input 
                    type="color" 
                    name="textColor" 
                    value={theme.textColor} 
                    onChange={handleChange}
                    className="color-picker"
                  />
                  <span className="color-value">{theme.textColor}</span>
                </div>
                <p className="admin-help">Choose the primary text color (does not affect footer).</p>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Footer Background Color</label>
                <div className="color-picker-wrapper">
                  <input 
                    type="color" 
                    name="bgFooter" 
                    value={theme.bgFooter === 'transparent' ? '#ffffff' : theme.bgFooter || '#ffffff'} 
                    onChange={handleChange} 
                    className="color-picker"
                  />
                  <span className="color-value">{theme.bgFooter}</span>
                </div>
                <p className="admin-help">Background color for the footer.</p>
              </div>

              <div className="form-group">
                <label>Footer Text Color</label>
                <div className="color-picker-wrapper">
                  <input 
                    type="color" 
                    name="textFooter" 
                    value={theme.textFooter === 'transparent' ? '#ffffff' : theme.textFooter || '#ffffff'} 
                    onChange={handleChange} 
                    className="color-picker"
                  />
                  <span className="color-value">{theme.textFooter}</span>
                </div>
                <p className="admin-help">Text color specifically for the footer.</p>
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

        {/* Section Backgrounds */}
        <div className="settings-card">
          <div className="settings-card-header">
            <h3>Section Backgrounds</h3>
            <p>Customize the background color of specific homepage sections independently. If set to transparent or white, they will inherit the global page background.</p>
          </div>
          
          <form className="settings-form" onSubmit={handleSave}>
            <div className="form-grid">
              {sectionConfig.map(section => (
                <div className="form-group" key={section.name}>
                  <label>{section.label}</label>
                  <div className="color-picker-wrapper">
                    <input 
                      type="color" 
                      name={section.name} 
                      value={theme[section.name] === 'transparent' ? '#ffffff' : theme[section.name]} 
                      onChange={handleChange}
                      className="color-picker"
                    />
                    <span className="color-value">{theme[section.name]}</span>
                  </div>
                  <small>{section.desc}</small>
                </div>
              ))}
            </div>

            <div className="settings-actions">
              <button type="submit" className="btn btn-primary" disabled={isSaving}>
                {isSaving ? 'Saving...' : <><Save size={16} /> Save Changes</>}
              </button>
            </div>
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
