import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../hooks/useDarkMode";

function MainNews({ data }) {
  const { darkMode } = useDarkMode();

  const newsId = useMemo(() => {
    if (data && typeof data === "object") {
      if (data.id) return data.id;
      if (data.title_index) return data.title_index;
      if (data.title) return data.title.toLowerCase().replace(/\s+/g, "-");
    }
    return "";
  }, [data]);

  if (!data || typeof data !== "object") return null;

  // Default image with fallback
  const imageUrl = data.image;

  const cardClass = darkMode
    ? "border-none"
    : "bg-white border-gray-200 hover:bg-gray-50";

  return (
    <div
      className={`flex flex-col h-[320px] lg:h-[400px] border   
      rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 
      ${cardClass}`}
    >
      <Link
        to={`/news/detail/${newsId}`}
        className="relative w-full h-full"
        onClick={(e) => {
          if (!newsId) {
            e.preventDefault();
            console.error("Cannot navigate: Missing news ID");
          }
        }}
      >
        {/* Image with responsive sizing */}
        <img
          className="object-cover w-full h-full"
          src={imageUrl}
          alt={data.title ? `${data.title} image` : "News image"}
          loading="lazy"
          onError={(e) => {
            e.target.src = "/icon-news.png";
            e.target.onerror = null;
          }}
        />

        {/* Gradient Overlay with Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end">
          <div className="p-4 lg:p-6">
            <h5 className="mb-2 text-lg lg:text-xl font-bold tracking-tight text-white line-clamp-2">
              {data.title || "Untitled News"}
            </h5>

            <p className="text-sm font-normal line-clamp-2 text-gray-200">
              {data.description || "No description available"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MainNews;
