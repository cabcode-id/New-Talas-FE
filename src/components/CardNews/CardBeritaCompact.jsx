import React from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../hooks/useDarkMode";

const CardBeritaCompact = ({ data }) => {
  const { darkMode } = useDarkMode();

  const cardClass = darkMode
    ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
    : "bg-white border-gray-200 hover:bg-gray-50";

  const titleClass = darkMode ? "text-white" : "text-gray-900";
  const detailsClass = darkMode ? "text-gray-400" : "text-gray-500";

  return (
    <Link to={`/news/detail/${data.title_index}`}>
      <div
        className={`flex flex-row items-center gap-4 p-3 border rounded-lg transition-colors ${cardClass}`}
      >
        <div className="w-20 h-20 flex-shrink-0">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div className="flex-1">
          <h3 className={`font-medium ${titleClass} line-clamp-2 mb-1`}>
            {data.title}
          </h3>
          <div className={`text-xs ${detailsClass} flex gap-2`}>
            <span>{data.date}</span>
            <span className="text-xs">•</span>
            <span>{data.source}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardBeritaCompact;
