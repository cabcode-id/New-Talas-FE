import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../hooks/useDarkMode";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import formatDate from "../../utils/formatDate";

function RecentNews({ data }) {
  const { day, date, time } = formatDate(data.date);
  if (!data || typeof data !== "object") return null;
  const { darkMode } = useDarkMode();

  const newsId = useMemo(() => {
    if (data.id) return data.id;
    if (data.title_index) return data.title_index;
    if (data.title) return data.title.toLowerCase().replace(/\s+/g, "-");
    return "";
  }, [data]);

  const imageUrl = data.image || "/placeholder-image.jpg";
  const cardClass = darkMode ? "border-none" : "bg-white border-none";

  return (
    <motion.div
    className="rounded-md"
      initial={{ opacity: 0, y: 20 }}           // animasi muncul
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{
        scale: 1.03,                             // animasi hover
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        transition: { duration: 0.3 },
      }}
    >
      <Link
        to={`/news/detail/${newsId}`}
        className={`w-full flex flex-col gap-3 justify-between rounded-md border overflow-hidden 
                    transition-colors duration-300 ${cardClass}`}
        onClick={(e) => {
          if (!newsId) {
            e.preventDefault();
            return;
          }
        }}
      >
        {/* Image Section */}
        <motion.img
          whileHover={{ scale: 1.05 }}           // gambar ikut zoom saat hover
          transition={{ duration: 0.3 }}
          className="rounded-sm
                     object-cover w-full h-48 sm:w-40 sm:h-32 md:w-48 md:h-36 lg:w-full lg:h-44"
          src={imageUrl}
          alt={data.title ? `${data.title} thumbnail` : "News thumbnail"}
          loading="lazy"
          onError={(e) => {
            e.target.src = "/placeholder-image.jpg";
            e.target.onerror = null;
          }}
        />

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between text-start w-full h-full p-2">
          <h1
            className="mb-1 sm:mb-2 text-lg sm:text-lg md:text-[14px] font-bold tracking-tight 
                       line-clamp-4 sm:line-clamp-1 md:line-clamp-4"
          >
            {data.title || "Untitled News"}
          </h1>
          <div className="flex items-center justify-start gap-[12px]">
            <div className="flex items-center">
              <Icon icon="mdi:clock-time-four-outline" className="inline-block mr-1" />
              <p className="text-[10px]">{time}</p>
            </div>
            <div className="flex items-center">
              <Icon icon="ph:calendar" className="inline-block mr-1" />
              <p className="text-[10px]">{`${day}, ${date}`}</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default RecentNews;
