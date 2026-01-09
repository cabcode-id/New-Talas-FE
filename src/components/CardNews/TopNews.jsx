import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlignmentBar from "./AlignmentBar";

function TopNews({ data }) {
  const navigate = useNavigate();

  if (!data || typeof data !== "object") return null;

  const formattedDate = useMemo(() => {
    if (!data.date) return "";
    try {
      return new Date(data.date).toLocaleDateString();
    } catch (error) {
      console.error("Error formatting date:", error);
      return data.date;
    }
  }, [data.date]);

  const newsId = useMemo(() => {
    if (data.id) return data.id;
    if (data.title_index) return data.title_index;
    if (data.title) return data.title.toLowerCase().replace(/\s+/g, "-");
    return "";
  }, [data]);

  const handleCardClick = (e) => {
    if (newsId) {
      e.preventDefault();

      navigate(`/news/detail/${newsId}`);
    } else {
      e.preventDefault();
      console.error("Cannot navigate: Missing news ID");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 
                bg-white rounded-lg border border-gray-800 
                hover:shadow-md transition-all duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="w-full text-center group">
        <h1
          className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold mb-2 sm:mb-3 
                      text-gray-900 group-hover:text-blue-600 transition-colors"
        >
          {data.title || "Breaking News"}
        </h1>

        {data.source && (
          <p className="hidden sm:block text-xs md:text-sm text-gray-500 mb-2">
            Source: {data.source}
          </p>
        )}

        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
          <AlignmentBar data={data.alignment || [0.2, 0.5, 0.8]} />
        </div>

        {formattedDate && (
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500 italic">
            {formattedDate}
          </p>
        )}
      </div>
    </div>
  );
}

export default TopNews;
