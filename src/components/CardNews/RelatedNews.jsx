import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RelatedNews({ data }) {
  if (!data || typeof data !== "object") return null;

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [data.image]);

  const parseRate = (val) => {
    try {
      return parseFloat(val) * 100 || 0;
    } catch {
      return 0;
    }
  };

  const biasPercentage = parseRate(data.bias);
  const hoaxPercentage = parseRate(data.hoax);
  const ideologyPercentage = parseRate(data.ideology);

  // Warna gradien untuk progress bar
  const biasColor = "linear-gradient(90deg, #4CAF50, #81C784)";
  const hoaxColor = "linear-gradient(90deg, #FF9800, #FFB74D)";
  const ideologyColor = "linear-gradient(90deg, #2E7D32, #66BB6A)";

  // Reusable progress bar
  const ProgressBar = ({ label, percentage, gradient }) => (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-700">
          {percentage.toFixed(0)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            background: gradient,
          }}
        ></div>
      </div>
    </div>
  );

  const newsId =
    data.id ||
    data.title_index ||
    (data.title ? data.title.toLowerCase().replace(/\s+/g, "-") : "");

  return (
    <div
      className="w-full flex flex-col md:flex-row justify-between mb-7 
                 bg-white p-6 rounded-2xl  shadow-md 
                 hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
    >
      <div className="flex-1 text-start md:pr-4">
        <h1 className="mb-2 text-lg md:text-xl font-bold text-gray-900 tracking-tight line-clamp-2">
          {data.title || "Untitled News"}
        </h1>
        <div className="flex flex-wrap items-center text-[12px] text-gray-600 mb-3 gap-2">
          <span className="px-4 py-1 rounded-full bg-gray-100">
            {data.date || "No date"}
          </span>
          <span className="px-4 py-1 rounded-full bg-blue-50 text-blue-500 font-medium">
            Source: {data.source || "Unknown"}
          </span>
        </div>

        <div className="space-y-4 mt-4">
          <ProgressBar
            label="Bias Rate"
            percentage={biasPercentage}
            gradient={biasColor}
          />
          <ProgressBar
            label="Hoax Rate"
            percentage={hoaxPercentage}
            gradient={hoaxColor}
          />
          <ProgressBar
            label="Ideology Rate"
            percentage={ideologyPercentage}
            gradient={ideologyColor}
          />
        </div>

        <Link
          to={data.url}
          className="mt-5 inline-flex items-center text-sm text-white font-semibold 
                     bg-blue-600 hover:bg-blue-700 rounded-full px-4 py-2 
                     shadow-sm transition-colors"
        >
          See more
          <svg
            className="w-4 h-4 ml-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default RelatedNews;
