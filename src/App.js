import React, { useState, useEffect } from 'react';

// Компонент для відображення товарів
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({ name: '', description: '' });

  useEffect(() => {
    // Приклад запиту до API для отримання товарів і категорії
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
        setCategory(data.category);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>{category.description || category.name}</h1> {/* Вивести повну або скорочену назву категорії */}
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <p>Price: {(product.price / 100).toFixed(2)} UAH</p> {/* Вивести ціну в гривнях */}
            <button className="fab" onClick={() => addToCart(product.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <ProductForm />
    </div>
  );
};

// Функція для додавання товару до кошика
const addToCart = (productId) => {
  console.log(`Product ${productId} added to cart.`);
};

// Компонент для форми додавання нового товару
const ProductForm = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    category: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Запит для додавання товару через API
    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product added:', data);
        // Оновити список товарів або показати повідомлення про успіх
      })
      .catch(error => console.error('Error adding product:', error));
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <h2>Add New Product</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <label>
        Price (in kopiykas):
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          name="description"
          value={productData.description}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={productData.category}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductList;
