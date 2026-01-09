import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNewsByCluster } from '../services/api/newsService';
import { getClusters } from '../services/api/clusterService';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import formatDate from '../utils/formatDate';

// Skeleton Loading Component
const SkeletonCard = ({ isHero = false }) => (
  <div className={`animate-pulse ${isHero ? 'col-span-full' : ''}`}>
    <div className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-2xl ${isHero ? 'h-80 md:h-96' : 'h-64'}`}
      style={{ backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
    <div className="mt-4 space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-24" />
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-full" />
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-32" />
    </div>
  </div>
);

// Hero News Card Component
const HeroNewsCard = ({ news }) => {
  const { day, date, time } = formatDate(news.date);
  const newsId = news.title_index || news.id || news.title?.toLowerCase().replace(/\s+/g, '-');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="col-span-full"
    >
      <Link to={`/news/detail/${newsId}`} className="group block">
        <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500">
          {/* Background Image with Overlay */}
          <div className="relative h-80 md:h-[450px] lg:h-[500px]">
            <motion.img
              src={news.image || '/placeholder-image.jpg'}
              alt={news.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => { e.target.src = '/placeholder-image.jpg'; }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-amber-200 transition-colors duration-300"
              >
                {news.title}
              </motion.h2>

              {/* Description */}
              {news.all_summary && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-200 text-sm md:text-base line-clamp-2 mb-4 max-w-3xl"
                >
                  {news.all_summary}
                </motion.p>
              )}

              {/* Meta info */}
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

// News Grid Card Component
const NewsGridCard = ({ news, index, variant = 'default' }) => {
  const { day, date, time } = formatDate(news.date);
  const newsId = news.title_index || news.id || news.title?.toLowerCase().replace(/\s+/g, '-');

  const isLarge = variant === 'large';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={isLarge ? 'md:col-span-2 md:row-span-2' : ''}
    >
      <Link to={`/news/detail/${newsId}`} className="group block h-full">
        <div className="relative h-full bg-white dark:bg-[#2a2d35] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 border border-gray-100 dark:border-gray-700/50">
          {/* Image Container */}
          <div className={`relative overflow-hidden ${isLarge ? 'h-56 md:h-72' : 'h-44 sm:h-48'}`}>
            <motion.img
              src={news.image || '/placeholder-image.jpg'}
              alt={news.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => { e.target.src = '/placeholder-image.jpg'; }}
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Read More Icon */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <span className="flex items-center gap-1 px-3 py-1.5 bg-white/95 dark:bg-gray-800/95 rounded-full text-xs font-medium text-gray-800 dark:text-white shadow-lg backdrop-blur-sm">
                Read More
                <Icon icon="ph:arrow-right-bold" className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5">
            {/* Category Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center px-2.5 py-1 bg-gradient-to-r from-rose-100 to-orange-100 dark:from-rose-900/40 dark:to-orange-900/40 text-rose-600 dark:text-rose-400 text-xs font-medium rounded-lg">
                <Icon icon="ph:newspaper-duotone" className="w-3.5 h-3.5 mr-1" />
                News
              </span>
            </div>

            {/* Title */}
            <h3 className={`font-bold text-gray-900 dark:text-white mb-3 group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors duration-300 ${isLarge ? 'text-xl md:text-2xl line-clamp-3' : 'text-base sm:text-lg line-clamp-2'}`}>
              {news.title}
            </h3>

            {/* Description - Only for large cards */}
            {isLarge && news.all_summary && (
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                {news.all_summary}
              </p>
            )}

            {/* Meta */}
            <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-xs">
              <span className="flex items-center gap-1">
                <Icon icon="ph:calendar" className="w-3.5 h-3.5" />
                {date}
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

const ClusterPage = () => {
  const [clusterData, setClusterData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(13);
  const [clusterList, setClusterList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { index } = useParams();

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  useEffect(() => {
    const fetchCluster = async () => {
      setLoading(true);
      setError(null);

      try {
        const [clusterNews, clusters] = await Promise.all([
          getNewsByCluster(index),
          getClusters(),
        ]);

        setClusterData(clusterNews);
        setClusterList(clusters);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (index) {
      fetchCluster();
    }
  }, [index]);

  const clusterName = clusterList?.clusters?.[index] ?? 'Loading...';
  const newsArray = useMemo(() =>
    Array.isArray(clusterData?.data) ? clusterData.data : [],
    [clusterData]
  );

  const visibleNews = useMemo(() =>
    newsArray.slice(0, visibleCount),
    [newsArray, visibleCount]
  );

  const heroNews = visibleNews[0];
  const gridNews = visibleNews.slice(1);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 mx-auto max-w-7xl min-h-screen">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 sm:mb-10"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-8 bg-rose-400 rounded-full" />
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Cluster News
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="bg-red-400 bg-clip-text text-transparent">
                {clusterName}
              </span>
            </h1>
          </div>

          {!loading && newsArray.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full"
            >
              <Icon icon="ph:article-duotone" className="w-5 h-5 text-rose-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {newsArray.length} articles found
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonCard isHero />
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800/50 rounded-2xl text-center"
        >
          <Icon icon="ph:warning-circle-duotone" className="w-16 h-16 mx-auto text-red-400 mb-4" />
          <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-red-500 dark:text-red-300">
            {error.message || "Failed to load news details"}
          </p>
        </motion.div>
      ) : newsArray.length > 0 ? (
        <>
          {/* News Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
            {/* Hero Card */}
            {heroNews && <HeroNewsCard news={heroNews} />}

            {/* Grid Cards with varied sizes */}
            {gridNews.map((news, idx) => (
              <NewsGridCard
                key={idx}
                news={news}
                index={idx}
                variant={idx === 0 || idx === 5 ? 'large' : 'default'}
              />
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < newsArray.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center mt-10 sm:mt-12"
            >
              <button
                onClick={handleLoadMore}
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-rose-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="absolute inset-0 bg-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2">
                  <Icon icon="ph:plus-circle-bold" className="w-5 h-5" />
                  Load More Articles
                </span>
              </button>
            </motion.div>
          )}

          {/* End Message */}
          {visibleCount >= newsArray.length && newsArray.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-10 py-6 border-t border-gray-200 dark:border-gray-700"
            >
              <Icon icon="ph:check-circle-duotone" className="w-10 h-10 mx-auto text-emerald-500 mb-2" />
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                You've reached the end of this cluster
              </p>
            </motion.div>
          )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl text-center"
        >
          <Icon icon="ph:newspaper-clipping-duotone" className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-600 dark:text-gray-300 mb-2">
            No News Found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            There are no articles in this cluster yet.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ClusterPage;
