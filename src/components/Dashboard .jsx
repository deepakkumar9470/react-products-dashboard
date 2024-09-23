import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import ProductList from "../pages/ProductList ";
import data from "../data/produtcsdata.json";
import SearchProducts from "./SearchProducts";
import FilterProducts from "./FilterProducts";

const Dashboard = () => {
  const ITEMS_PER_PAGE = 20;
  const [filter, setFilter] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [popularityRange, setPopularityRange] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePriceChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePopularityChange = (newPopularityRange) => {
    setPopularityRange(newPopularityRange);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query.toLowerCase());
    setCurrentPage(1); // Reset to first page on search
  };

  const productsArray = Object.entries(data.products).map(([key, value]) => ({
    id: key,
    ...value,
  }));

  const filteredProducts = productsArray.filter((product) => {
    let matchesFilter = true;
    let matchesPrice = true;
    let matchesPopularity = true;
    let matchesSearch = true;

    if (filter !== 'all') {
      matchesFilter = product.status === filter; // Ensure your product has a 'status' property
    }

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      matchesPrice = (max ? Number(product.price) >= min && Number(product.price) <= max : Number(product.price) >= min);
    }

    if (popularityRange !== 'all') {
      const [min, max] = popularityRange.split('-').map(Number);
      matchesPopularity = (max ? Number(product.popularity) >= min && Number(product.popularity) <= max : Number(product.popularity) >= min);
    }

    if (searchQuery) {
      matchesSearch = product.title.toLowerCase().includes(searchQuery);
    }

    return matchesFilter && matchesPrice && matchesPopularity && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <>
      <SearchProducts onSearch={handleSearchChange} />
      <FilterProducts
        filter={filter}
        handleFilterChange={handleFilterChange}
        priceRange={priceRange}
        handlePriceChange={handlePriceChange}
        popularityRange={popularityRange}
        handlePopularityChange={handlePopularityChange}
      />
       <div className="product-grid">
        {currentProducts.map((product) => (
          <ProductList key={product.id} p={product} />
        ))}
      </div>

      <div className="pagination">
        <button
          className="pagination-link"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        {[...Array(totalPages).keys()].slice(currentPage - 1, currentPage + 4).map((number) => (
          <button
            key={number + 1}
            className={`pagination-link ${number + 1 === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(number + 1)}
          >
            {number + 1}
          </button>
        ))}

        <button
          className="pagination-link"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Dashboard;
