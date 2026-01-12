import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchNewsByTitle } from "../services/api/searchService";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import formatDate from "../utils/formatDate";

// Skeleton Loading Card
const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700/50">
      <div className="w-full sm:w-48 h-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-xl"
        style={{ backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-full" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-32" />
      </div>
    </div>
  </div>
);

// News Card Component with Premium Design
const SearchResultCard = ({ news, index }) => {
  const { day, date, time } = formatDate(news.date);
  const newsId = news.title_index || news.id || news.title?.toLowerCase().replace(/\s+/g, '-');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link to={`/news/detail/${newsId}`} className="group block">
        <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700/50 hover:border-[#E87C2A]/30 dark:hover:border-[#E87C2A]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#E87C2A]/5">
          {/* Image */}
          <div className="relative overflow-hidden rounded-xl w-full sm:w-48 h-40 sm:h-32 flex-shrink-0">
            <motion.img
              src={news.image || '/placeholder-image.jpg'}
              alt={news.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => { e.target.src = '/placeholder-image.jpg'; }}
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="flex items-center gap-1 px-2 py-1 bg-white/90 dark:bg-gray-800/90 rounded-full text-xs font-medium text-gray-800 dark:text-white shadow-md backdrop-blur-sm">
                <Icon icon="ph:arrow-right-bold" className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            {/* Category Badge */}
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2 py-0.5 bg-[#1E3A5F]/10 dark:bg-[#60A5FA]/20 text-[#1E3A5F] dark:text-[#60A5FA] text-xs font-medium rounded-md">
                <Icon icon="ph:newspaper-duotone" className="w-3 h-3 mr-1" />
                News
              </span>
            </div>

            {/* Title */}
            <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg leading-snug line-clamp-2 mb-2 group-hover:text-[#E87C2A] transition-colors duration-300">
              {news.title}
            </h3>

            {/* Description */}
            {news.all_summary && (
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                {news.all_summary}
              </p>
            )}

            {/* Meta */}
            <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-xs">
              <span className="flex items-center gap-1">
                <Icon icon="ph:calendar" className="w-3.5 h-3.5" />
                {day}, {date}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
              <span className="flex items-center gap-1">
                <Icon icon="ph:clock" className="w-3.5 h-3.5" />
                {time}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Featured Result Card (for first result)
const FeaturedResultCard = ({ news }) => {
  const { day, date, time } = formatDate(news.date);
  const newsId = news.title_index || news.id || news.title?.toLowerCase().replace(/\s+/g, '-');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Link to={`/news/detail/${newsId}`} className="group block">
        <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">
          {/* Background Image */}
          <div className="relative h-64 sm:h-80 md:h-96">
            <motion.img
              src={news.image || '/placeholder-image.jpg'}
              alt={news.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => { e.target.src = '/placeholder-image.jpg'; }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              {/* Featured Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-3"
              >
                <span className="inline-flex items-center px-3 py-1 bg-[#E87C2A] text-white text-xs font-semibold rounded-full">
                  <Icon icon="ph:star-fill" className="w-3.5 h-3.5 mr-1" />
                  Best Match
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-amber-200 transition-colors duration-300 line-clamp-3"
              >
                {news.title}
              </motion.h2>

              {/* Description */}
              {news.all_summary && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-200 text-sm md:text-base line-clamp-2 mb-4 max-w-2xl"
                >
                  {news.all_summary}
                </motion.p>
              )}

              {/* Meta */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4 text-gray-300 text-sm"
              >
                <span className="flex items-center gap-1.5">
                  <Icon icon="ph:calendar-duotone" className="w-4 h-4" />
                  {`${day}, ${date}`}
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon icon="ph:clock-duotone" className="w-4 h-4" />
                  {time}
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

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
  const featuredNews = visibleNews[0];
  const remainingNews = visibleNews.slice(1);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 mx-auto max-w-7xl min-h-screen">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-8 bg-[#E87C2A] rounded-full" />
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Search Results
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E3A5F] dark:text-white">
              {query ? (
                <>
                  Results for{" "}
                  <span className="text-[#E87C2A]">
                    "{query}"
                  </span>
                </>
              ) : (
                "Search Results"
              )}
            </h1>
          </div>

          {!loading && searchQuery.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full"
            >
              <Icon icon="ph:article-duotone" className="w-5 h-5 text-[#E87C2A]" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {searchQuery.length} articles found
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Content */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 bg-white dark:bg-[#1E293B] border border-[#E87C2A]/30 dark:border-[#E87C2A]/30 rounded-2xl text-center"
        >
          <Icon icon="ph:warning-circle-duotone" className="w-16 h-16 mx-auto text-[#E87C2A] mb-4" />
          <h3 className="text-xl font-bold text-[#1E3A5F] dark:text-white mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {error.message || "Failed to search news. Please try again later."}
          </p>
        </motion.div>
      ) : searchQuery.length > 0 ? (
        <>
          {/* Featured Result */}
          {featuredNews && <FeaturedResultCard news={featuredNews} />}

          {/* Remaining Results Grid */}
          {remainingNews.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              {remainingNews.map((news, index) => (
                <SearchResultCard key={index} news={news} index={index} />
              ))}
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < searchQuery.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center mt-8"
            >
              <button
                onClick={handleLoadMore}
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-[#1E3A5F] dark:bg-[#60A5FA] text-white dark:text-[#0F172A] font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="absolute inset-0 bg-[#E87C2A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2">
                  <Icon icon="ph:plus-circle-bold" className="w-5 h-5" />
                  Load More Results
                </span>
              </button>
            </motion.div>
          )}

          {/* End Message */}
          {visibleCount >= searchQuery.length && searchQuery.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-10 py-6 border-t border-gray-200 dark:border-gray-700"
            >
              <Icon icon="ph:check-circle-duotone" className="w-10 h-10 mx-auto text-emerald-500 mb-2" />
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                You've seen all the results
              </p>
            </motion.div>
          )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-12 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-2xl text-center"
        >
          <Icon icon="ph:magnifying-glass-duotone" className="w-20 h-20 mx-auto text-[#1E3A5F]/30 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-bold text-[#1E3A5F] dark:text-white mb-2">
            No Results Found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            We couldn't find any matches for{" "}
            <span className="font-semibold text-[#1E3A5F] dark:text-[#60A5FA]">"{query}"</span>
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <span className="text-sm text-gray-500 dark:text-gray-400">Suggestions:</span>
            <span className="px-3 py-1 bg-[#1E3A5F]/10 dark:bg-[#60A5FA]/20 text-[#1E3A5F] dark:text-[#60A5FA] text-sm rounded-full">
              Try different keywords
            </span>
            <span className="px-3 py-1 bg-[#1E3A5F]/10 dark:bg-[#60A5FA]/20 text-[#1E3A5F] dark:text-[#60A5FA] text-sm rounded-full">
              Check spelling
            </span>
            <span className="px-3 py-1 bg-[#1E3A5F]/10 dark:bg-[#60A5FA]/20 text-[#1E3A5F] dark:text-[#60A5FA] text-sm rounded-full">
              Use broader terms
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default SearchPage;
