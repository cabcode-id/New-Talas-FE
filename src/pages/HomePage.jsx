import MainNews from "../components/CardNews/MainNews";
import RecentNews from "../components/CardNews/RecentNews";
import CardBeritaCompact from "../components/CardNews/CardBeritaCompact";
import ReactPaginate from "react-paginate";
import React, { useState, useEffect } from "react";
import { useDarkMode } from "../hooks/useDarkMode";
import { getNewsList, getTopNews, getNewsByCluster } from "../services/api/newsService";
import { getClusters } from "../services/api/clusterService";

function HomePage() {
  const [allNews, setNewsData] = useState(null); // null agar jelas belum ada data
  const [topNews, setTopNews] = useState(null);
  const [topNewsList, setTopNewsList] = useState(null);
  const [clusterZeroNews, setClusterZeroNews] = useState(null);
  const [error, setError] = useState(null);
  const [allCluster, setCluster] = useState(null);
  const [loadingNewsData, setLoadingNewsData] = useState(true);
  const [loadingTopNews, setLoadingTopNews] = useState(true);
  const [loadingTopNewsList, setLoadingTopNewsList] = useState(true);
  const [loadingClusterZeroNews, setLoadingClusterZeroNews] = useState(true);
  const [loadingClusters, setLoadingClusters] = useState(true);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    setLoadingNewsData(true);
    setLoadingTopNews(true);
    setLoadingTopNewsList(true);
    setLoadingClusterZeroNews(true);
    setLoadingClusters(true);
    setError(null);

    const loadNews = async () => {
      try {
        const data = await getNewsList();
        setNewsData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoadingNewsData(false);
      }
    };

    const loadTopNews = async () => {
      try {
        const data = await getTopNews(1);
        setTopNews(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoadingTopNews(false);
      }
    };

    const loadTopNewsList = async () => {
      try {
        const data = await getTopNews(4);
        setTopNewsList(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoadingTopNewsList(false);
      }
    };

    const loadClusterZeroNews = async () => {
      try {
        const data = await getNewsByCluster(0);
        setClusterZeroNews(data);
      } catch (err) {
        console.error("Error fetching cluster 0 news:", err);
      } finally {
        setLoadingClusterZeroNews(false);
      }
    };

    const loadClusters = async () => {
      try {
        const data = await getClusters();
        setCluster(data);
      } catch (err) {
        console.error("Error fetching clusters:", err);
        setCluster({ clusters: {} });
      } finally {
        setLoadingClusters(false);
      }
    };

    loadNews();
    loadTopNews();
    loadTopNewsList();
    loadClusterZeroNews();
    loadClusters();
  }, []);


  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const selectedNews = (Array.isArray(allNews?.data) ? allNews.data : []).slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const clusterList = Array.isArray(allCluster?.clusters)
    ? allCluster.clusters
    : Object.values(allCluster?.clusters || {});
  const primaryClusterName = clusterList[0] || "Trending Topics";
  const clusterZeroItems = Array.isArray(clusterZeroNews?.data)
    ? clusterZeroNews.data
    : [];


  const textClass = darkMode ? "text-white" : "text-black";
  const loadingBgClass = darkMode ? "bg-gray-700" : "bg-gray-100";
  const loadingTextClass = darkMode ? "text-gray-300" : "text-gray-500";
  const errorBgClass = darkMode ? "bg-red-900" : "bg-red-100";
  const errorTextClass = darkMode ? "text-red-300" : "text-red-500";
  const hrClass = darkMode ? "border-gray-700" : "border-gray-300";

  return (
    <div
      className={`flex flex-col ${textClass} px-3 sm:px-4 md:px-5 max-w-7xl mx-auto`}
    >
      {/* Top Section - Main Headline + Top News Sidebar */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Main Headline - Left Side (60%) */}
        <div className="w-full lg:w-[60%]">
          {loadingTopNews ? (
            <div
              className={`w-full h-80 flex justify-center items-center ${loadingBgClass} rounded-lg`}
            >
              <span className={loadingTextClass}>Loading...</span>
            </div>
          ) : error ? (
            <div
              className={`w-full h-80 flex justify-center items-center ${errorBgClass} rounded-lg`}
            >
              <span className={errorTextClass}>Error loading content</span>
            </div>
          ) : (
            topNews &&
            topNews.data &&
            topNews.data.length > 0 && (
              <MainNews
                key={0}
                data={{
                  title: topNews.data[0].title,
                  description: topNews.data[0].all_summary,
                  title_index: topNews.data[0].title_index,
                  image: topNews.data[0].image,
                }}
              />
            )
          )}
        </div>

        {/* Top News Sidebar - Right Side (40%) */}
        <div className="w-full lg:w-[40%]">
          <div className="flex items-center gap-2 h-8 mb-4">
            <div className="w-[4px] h-full bg-red-500 rounded-full" />
            <h2 className="font-bold text-lg">Top News</h2>
          </div>

          {loadingTopNewsList ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className={`h-20 ${loadingBgClass} rounded-lg flex items-center justify-center`}
                >
                  <span className={loadingTextClass}>Loading...</span>
                </div>
              ))}
            </div>
          ) : error ? (
            <div
              className={`p-4 ${errorBgClass} rounded-lg ${errorTextClass} text-center`}
            >
              Error loading content
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {(topNewsList?.data ?? []).slice(1, 5).map((news, index) => (
                <CardBeritaCompact
                  key={index}
                  data={{
                    title: news.title,
                    image: news.image,
                    title_index: news.title_index,
                    date: news.date || "",
                    source: news.source || "",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>


      <hr className={`my-5 sm:my-6 md:my-7 ${hrClass}`} />

      {/* Recent News Section - Two Column Layout */}
      <div className="mb-10 sm:mb-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

          {/* Left Column - Cluster 0 News using TopNews */}
          <div className="w-full lg:w-[30%]">
            <div className="flex items-center gap-2 h-8 mb-4 sm:mb-5">
              <div className="w-[6px] h-full bg-red-500 rounded-full" />
              <h2 className="font-bold text-lg sm:text-xl">{primaryClusterName}</h2>
            </div>

            {loadingClusterZeroNews ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className={`h-20 ${loadingBgClass} rounded-lg flex items-center justify-center`}
                  >
                    <span className={loadingTextClass}>Loading...</span>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div
                className={`p-4 ${errorBgClass} rounded-lg ${errorTextClass} text-center`}
              >
                Error loading content
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {clusterZeroItems.slice(0, 6).map((news, index) => (
                  <CardBeritaCompact
                    key={index}
                    data={{
                      title: news.title,
                      image: news.image,
                      title_index: news.title_index,
                      date: news.date || "",
                      source: news.source || "",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Recent News Grid */}
          <div className="w-full lg:w-[70%]">
            <div className="flex items-center gap-2 h-8 mb-4 sm:mb-5">
              <div className="w-[6px] h-full bg-red-500 rounded-full" />
              <h2 className="font-bold text-lg sm:text-xl">Recent News</h2>
            </div>

            {loadingNewsData ? (
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className={`h-32 ${loadingBgClass} rounded-lg flex items-center justify-center`}
                  >
                    <span className={loadingTextClass}>Loading...</span>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div
                className={`p-4 ${errorBgClass} rounded-lg ${errorTextClass} text-center`}
              >
                Error loading content
              </div>
            ) : (
              <div className="w-full grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                {selectedNews.map((news, index) => (
                  <RecentNews
                    key={index}
                    data={{
                      cluster: news.cluster,
                      title: news.title,
                      date: news.date,
                      title_index: news.title_index,
                      image: news.image,
                      description: news.all_summary,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          pageCount={Math.ceil((allNews?.data?.length ?? 0) / itemsPerPage)}
          onPageChange={handlePageChange}
          containerClassName={
            "flex gap-2 mt-6 select-none"
          }
          pageClassName={
            "px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 " +
            "hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          }
          activeClassName={
            "bg-red-500 text-white dark:bg-red-400 dark:text-white border-red-500 dark:border-red-400"
          }
          previousClassName={
            "px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 " +
            "hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          }
          nextClassName={
            "px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 " +
            "hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          }
          disabledClassName={
            "opacity-50 cursor-not-allowed"
          }
        />
      </div>


    </div>
  );
}

export default HomePage;
