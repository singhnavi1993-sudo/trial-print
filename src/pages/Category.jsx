import React from 'react';
import './Category.css';

const Category = () => {
  // Placeholder categories based on the user's requirement for 9 categories
  const categories = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    name: `Category ${i + 1}`,
    image: `https://picsum.photos/seed/cat${i+1}/400/300`
  }));

  return (
    <div className="category-page">
      <div className="category-hero bg-black">
        <div className="container text-center text-white">
          <h1 className="text-yellow">Our Categories</h1>
          <p>Explore our wide range of print and copy services.</p>
        </div>
      </div>
      
      <div className="container section-padding">
        <div className="category-grid">
          {categories.map(cat => (
            <div key={cat.id} className="category-card">
              <div className="category-image-wrap">
                <img src={cat.image} alt={cat.name} className="category-image" />
              </div>
              <h3 className="category-title">{cat.name}</h3>
              <button className="btn btn-primary mt-4">View Products</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
