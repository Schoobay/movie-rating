import React, { createContext, useContext, useState } from "react";

// Create a context
const SearchContext = createContext();

// Create a custom hook to access the context
export const useSearchContext = () => {
  return useContext(SearchContext);
};

// Create a provider component
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const setSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
