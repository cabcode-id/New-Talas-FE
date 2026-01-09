import React from "react";
import { Link, useNavigate } from "react-router-dom";

function CategoriesCard({ data, isActive = false, useSearch = false }) {
  const navigate = useNavigate();

  if (!data || !data.name) return null;

  const handleCategoryClick = (e) => {
    if (useSearch) {
      e.preventDefault();
      navigate(`/search?query=${encodeURIComponent(data.name)}`);
    }
  };

  const categoryUrl = useSearch
    ? `/search?query=${encodeURIComponent(data.name)}`
    : data.slug
    ? `/category/${data.slug}`
    : `/category/${data.name.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="relative group">
      <Link
        to={categoryUrl}
        onClick={handleCategoryClick}
        className={`
          block text-sm sm:text-base md:text-base 
          font-medium transition-all duration-200
          p-1.5 sm:p-2 md:p-2.5
          rounded-md 
          ${
            isActive
              ? "text-blue-600 bg-blue-50"
              : "text-gray-700 hover:bg-gray-100"
          }
        `}
        aria-current={isActive ? "page" : undefined}
      >
        {data.name}

        {data.count !== undefined && (
          <span
            className={`
              ml-2 inline-flex items-center justify-center px-2 py-0.5 
              text-xs font-medium rounded-full
              ${
                isActive
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-600"
              }
            `}
          >
            {data.count}
          </span>
        )}
      </Link>

      <div
        className={`
          absolute bottom-0 left-0 h-0.5 sm:h-1 
          bg-blue-500
          transition-all duration-300 ease-out
          ${isActive ? "w-full" : "w-0 group-hover:w-full"}
        `}
        aria-hidden="true"
      ></div>
    </div>
  );
}

export default CategoriesCard;
