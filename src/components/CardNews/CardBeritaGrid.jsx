import React from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../hooks/useDarkMode";
import { motion } from "framer-motion";

const CardBeritaGrid = ({ data }) => {
  const { darkMode } = useDarkMode();

  const cardClass = darkMode ? "border-none" : "bg-white border-none";
  const titleClass = darkMode ? "text-white" : "text-gray-900";
  const descriptionClass = darkMode ? "text-gray-300" : "text-gray-700";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        transition: { duration: 0.3 },
      }}
      className="h-full"
    >
      <Link to={`/news/detail/${data.title_index}`}>
        <div
          className={`h-full border rounded-sm overflow-hidden transition-colors ${cardClass}`}
        >
          <motion.div 
            className="h-40 sm:h-48 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={data.image || "https://via.placeholder.com/400x200"}
              alt={data.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400x200";
                e.target.onerror = null;
              }}
            />
          </motion.div>

          <div className="py-3 px-2">
            <h4 className={`font-medium ${titleClass} line-clamp-2 mb-2`}>
              {data.title}
            </h4>
            <p className={`text-sm ${descriptionClass} line-clamp-3`}>
              {data.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CardBeritaGrid;
