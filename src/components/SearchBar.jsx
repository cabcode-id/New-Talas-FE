import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full">
      <Search
        size={14}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500"
      />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search"
        className="w-full h-8 pl-8 pr-3 rounded bg-zinc-800/80 border border-zinc-700/50 text-sm text-zinc-200 placeholder-zinc-500 focus:bg-zinc-800 focus:border-zinc-600 focus:outline-none transition-colors"
        onKeyDown={handleKeyPress}
        aria-label="Search"
      />
    </div>
  );
}

export default SearchBar;
