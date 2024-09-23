import React from 'react';

const FilterProducts = ({ filter, handleFilterChange, priceRange, handlePriceChange, popularityRange, handlePopularityChange }) => {
  return (
      <div className="filter-container">

          <div>
              <h2>Filter by Price</h2>
              <select onChange={(e) => handlePriceChange(e.target.value)} value={priceRange}>
                  <option value="all">All</option>
                  <option value="0-5000">0 - 5000</option>
                  <option value="5000-10000">5000 - 10000</option>
                  <option value="10000-20000">10000 - 20000</option>
                  <option value="20000+">20000+</option>
              </select>
          </div>
          <div>
              <h2>Filter by Popularity</h2>
              <select onChange={(e) => handlePopularityChange(e.target.value)} value={popularityRange}>
                  <option value="all">All</option>
                  <option value="0-10000">0 - 10000</option>
                  <option value="10000-30000">10000 - 30000</option>
                  <option value="30000-50000">30000 - 50000</option>
                  <option value="50000+">50000+</option>
              </select>
          </div>
      </div>
  );
};


export default FilterProducts;
