import React, { useState, useContext } from "react";
import { AppContext } from "../Context/AppContext";

const Header = () => {
  const { setSearchQuery } = useContext(AppContext);
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSearchQuery(value); // Update context
  };

  return (
    <div className="fixed top-0 inset-x-0 w-full border-b-2 border-gray-300 shadow-md bg-white py-4 z-50">
      <header className="flex items-center justify-between px-4 max-w-6xl mx-auto">
        {/* Title aligned to the leftmost corner */}
        <h1 className="font-bold text-2xl md:text-3xl uppercase text-gray-800 flex-shrink-0">
          Blogs
        </h1>

        {/* Centered Search Bar */}
        <div className="flex-grow flex justify-center">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search blogs..."
            className="w-full md:w-2/3 lg:w-1/2 p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
      </header>
    </div>
  );
};

export default Header;



