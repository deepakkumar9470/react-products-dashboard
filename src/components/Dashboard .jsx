import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import ProductList from "../pages/ProductList ";
import data from "../data/produtcsdata.json";
import SearchProducts from "./SearchProducts";
import FilterProducts from "./FilterProducts";

const Dashboard = () => {
  const ITEMS_PER_PAGE = 20;
  const [filter, setFilter] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [popularityRange, setPopularityRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handlePriceChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
    setCurrentPage(1);
  };

  const handlePopularityChange = (newPopularityRange) => {
    setPopularityRange(newPopularityRange);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query.toLowerCase());
    setCurrentPage(1);
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

    // Filter by status (if applicable)
    if (filter !== "all") {
      matchesFilter = product.status === filter;
    }

    // Filter by price range
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      matchesPrice = max
        ? Number(product.price) >= min && Number(product.price) <= max
        : Number(product.price) >= min;
    }

    // Filter by popularity range
    if (popularityRange !== "all") {
      const [min, max] = popularityRange.split("-").map(Number);
      matchesPopularity = max
        ? Number(product.popularity) >= min && Number(product.popularity) <= max
        : Number(product.popularity) >= min;
    }

    if (searchQuery) {
      matchesSearch = product.title.toLowerCase().includes(searchQuery);
    }

    return matchesFilter && matchesPrice && matchesPopularity && matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginationLinks = [];
  const maxLinks = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxLinks / 2));
  const endPage = Math.min(totalPages, startPage + maxLinks - 1);

  for (let i = startPage; i <= endPage; i++) {
    paginationLinks.push(i);
  }

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
        {paginationLinks.map((page) => (
          <button
            key={page}
            className={`pagination-link ${page === currentPage ? 'active' : ''}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
