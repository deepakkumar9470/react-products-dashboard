import React, { useState ,useEffect} from 'react';

const SearchProducts = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        onSearch(searchTerm); 
      }, 500);
  
      return () => clearTimeout(delayDebounceFn); 
    }, [searchTerm, onSearch]);
  

  return (
    <div className="search-bar" >
      <input
        type="text"
        placeholder="Search for products..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchProducts;
