import React from 'react';

const ProductList  = ({p}) => {
  return (
    <div className="product-card">
    <div className="product-info">
      <h3 className="product-title">{p.title}</h3>
      <p className="product-price">${p.price}</p>
      <p className="product-popularity">Popularity: {p.popularity}</p>
    </div>
  </div>
  )
}

export default ProductList 