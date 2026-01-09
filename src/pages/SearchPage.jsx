import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import RecentNews from "../components/CardNews/RecentNews";
import { searchNewsByTitle } from "../services/api/searchService";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  useEffect(() => {
    const fetchSearchResult = async () => {
      if (!query) {
        return;
      }

      setLoading(true);
      setError(null);
      setVisibleCount(10);

      try {
        const data = await searchNewsByTitle(query);
        setSearchQuery(data.data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResult();
  }, [query]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const visibleNews = searchQuery.slice(0, visibleCount);

  return (
    <div className="px-3 sm:px-4 md:px-6 2md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 mx-auto max-w-7xl mb-6">
      <h1 className="font-bold text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4 md:mb-5 text-gray-900">
        {query ? (
          <>
            Search Results for <span className="text-[#FF8585]">"{query}"</span>
          </>
        ) : (
          "Search Results"
        )}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px] bg-gray-50 rounded-lg p-6">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#FF8585] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-gray-600">Searching for results...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 text-red-600">
          <p className="font-medium mb-2">Error occurred while searching</p>
          <p className="text-sm">{error.message || "Please try again later"}</p>
        </div>
      ) : searchQuery.length > 0 ? (
        <>
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {visibleNews.map((news, index) => (
              <RecentNews
                key={index}
                data={{
                  title: news.title,
                  description: news.all_summary,
                  image: news.image,
                  title_index: news.title_index,
                }}
              />
            ))}
          </div>

          {visibleCount < searchQuery.length && (
            <div className="flex justify-center mt-6 sm:mt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-[#FF8585] text-white rounded-lg transition-all duration-300 hover:bg-[#FF6666] hover:text-white"
              >
                Load More News
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sm:p-8 text-center">
          <div className="text-gray-500 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto mb-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="text-lg sm:text-xl font-medium mb-2">
              No results found
            </h3>
            <p className="text-sm sm:text-base">
              We couldn't find any matches for{" "}
              <span className="font-medium">"{query}"</span>
            </p>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>Try adjusting your search term or using different keywords</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
