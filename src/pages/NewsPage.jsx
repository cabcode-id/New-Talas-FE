import CardBeritaDetail from "../components/CardNews/CardBeritaDetail";
import CardBeritaCompact from "../components/CardNews/CardBeritaCompact";
import RelatedNews from "../components/CardNews/RelatedNews";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getNewsDetail, getNewsList } from "../services/api/newsService";

function NewsPage() {
  const { title_index } = useParams();
  const [newsDetail, setNewsDetail] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [loadingList, setLoadingList] = useState(true);
  const [errorDetail, setErrorDetail] = useState(null);
  const [errorList, setErrorList] = useState(null);
  const [rates, setRates] = useState([]);

  useEffect(() => {
    if (!title_index) {
      return;
    }

    const fetchNewsDetail = async () => {
      setLoadingDetail(true);
      setErrorDetail(null);
      setRates([]);
      setNewsDetail(null);

      try {
        const detail = await getNewsDetail(title_index);
        setNewsDetail(detail);
      } catch (err) {
        setErrorDetail(err);
      } finally {
        setLoadingDetail(false);
      }
    };

    const fetchOtherNews = async () => {
      setLoadingList(true);
      setErrorList(null);
      setNewsList(null);

      try {
        const list = await getNewsList();
        setNewsList(list);
      } catch (err) {
        setErrorList(err);
      } finally {
        setLoadingList(false);
      }
    };

    fetchNewsDetail();
    fetchOtherNews();
  }, [title_index]);

  const shuffleNews = (newsArray) => {
    return newsArray.sort(() => Math.random() - 0.5);
  };

  const handleSelectRate = (rate) => {
    setRates((prevRates) => {
      if (Array.isArray(prevRates) && prevRates.length === 0) {
        return [rate];
      } else {
        return [...prevRates, rate];
      }
    });
  };

  useEffect(() => {
    if (newsDetail && newsDetail.articles && newsDetail.articles.length > 0) {
      newsDetail.articles.forEach((news) => {
        handleSelectRate(news.ideology);
      });
    }
  }, [newsDetail]);

  if (loadingDetail) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-gray-500">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4">Loading news content...</p>
        </div>
      </div>
    );
  }

  // Extract news title and source for display
  const newsTitle =
    newsDetail?.title || title_index?.replace(/-/g, " ") || "Unknown News";
  const newsSource = newsDetail?.source || "Unknown Source";
  const newsDate = newsDetail?.date || "No date";

  return (
    <div className="w-full px-3 mx-auto max-w-7xl">
      <div className="flex flex-col  lg:flex-row gap-6 lg:gap-8 mb-10 sm:mb-16 2md:mb-20">
        {/* Main Content */}
        <div className="w-full">
          {/* News Detail Card */}
          <div>
            {errorDetail ? (
              <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {newsTitle}
                </h2>
                <div className="p-4 bg-white border border-red-300 rounded-lg text-red-600">
                  <p className="font-medium mb-2">
                    Error loading news details:
                  </p>
                  <p>{errorDetail.message || "Failed to load news content"}</p>
                  <p className="mt-4">
                    <Link to="/" className="text-blue-600 hover:underline">
                      Return to homepage
                    </Link>
                  </p>
                </div>
              </div>
            ) : newsDetail ? (
              <div className=" rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                    {newsTitle}
                  </h1>
                  <div className="flex flex-wrap text-sm text-gray-600 mt-2 gap-x-4">
                    <p>{newsDate}</p>
                  </div>
                </div>

                <div className="p-2">
                  <CardBeritaDetail
                    data={{
                      time: newsDetail.date,
                      image: newsDetail.image,
                      description: newsDetail.all_summary,
                      analysis: newsDetail.analysis,
                      source: newsDetail.source,
                    }}
                    rates={rates.length > 0 ? rates : []}
                    hideHeader={true}
                  />
                </div>
              </div>
            ) : (
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {newsTitle}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  Source: {newsSource}
                </p>
                <p className="text-gray-500 text-center p-4">
                  No news details found for this article
                </p>
              </div>
            )}
          </div>

          <hr className="my-5 sm:my-6 md:my-7 border-gray-300" />

          {/* Related News Section */}
          <div className="mb-6 sm:mb-8">
            <h2 className="font-bold text-xl sm:text-2xl mb-4 sm:mb-5">
              Related News
            </h2>
            {errorDetail && !newsDetail ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-500">
                Error: {errorDetail.message || "Failed to load related news"}
              </div>
            ) : newsDetail &&
              newsDetail.articles &&
              newsDetail.articles.length > 0 ? (
              <div className="space-y-4 sm:space-y-6">
                {newsDetail.articles.map((news, index) => (
                  <RelatedNews
                    key={index}
                    data={{
                      title: news.title,
                      url: news.url,
                      source: news.source,
                      date: news.date,
                      bias: news.bias,
                      hoax: news.hoax,
                      ideology: news.ideology,
                      rate: news.ideology,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 text-center">
                No related news found
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:max-w-md mt-6 lg:mt-0">
          <div className="top-24">
            <h2 className="font-bold text-xl sm:text-2xl mb-4 sm:mb-5">
              Other News
            </h2>
            {loadingList ? (
              <div className="flex flex-col justify-center items-center h-32">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
                <p className="mt-4">Loading other news...</p>
              </div>
            ) : errorList && !newsList?.data ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-500">
                Error: {errorList.message || "Failed to load other news"}
              </div>
            ) : newsList && newsList.data && newsList.data.length > 0 ? (
              <div className="flex flex-col gap-4">
                {shuffleNews(
                  newsList.data
                    .slice(0, 13)
                    .filter((news) => news.title_index !== title_index)
                    .map((news, index) => (
                      <CardBeritaCompact
                        key={index}
                        data={{
                          title: news.title,
                          title_index: news.title_index,
                          image: news.image,
                          date: news.date,
                          source: news.source,
                        }}
                      />
                    ))
                )}
              </div>
            ) : (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 text-center">
                No other news found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
