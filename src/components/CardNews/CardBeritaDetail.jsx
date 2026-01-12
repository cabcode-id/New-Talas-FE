import React, { useState, useEffect, useCallback, memo } from "react";
import { X } from "lucide-react";
import AlignmentBar from "./AlignmentBar";

const ComparisonModal = memo(({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            Perbandingan Berita
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-100 hover:text-gray-900 rounded-full p-1.5 inline-flex items-center justify-center transition-colors duration-200"
            aria-label="Tutup modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-4 md:p-5 space-y-4 overflow-y-auto">
          <p className="text-base leading-relaxed text-gray-500">
            Bagian ini akan menampilkan perbandingan antara berbagai sumber
            berita yang meliput topik yang sama.
          </p>
          <p className="text-base leading-relaxed text-gray-500">
            Anda dapat melihat bagaimana media yang berbeda meliput berita yang
            sama dengan perspektif yang berbeda.
          </p>
        </div>

        {/* Modal footer */}
        <div className="flex justify-end items-center gap-3 p-4 md:p-5 border-t border-gray-200">
          <button
            onClick={onClose}
            type="button"
            className="px-5 py-2.5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
          >
            Tutup
          </button>
          <button
            onClick={onClose}
            type="button"
            className="px-5 py-2.5 text-sm font-medium text-white bg-[var(--brand-navy)] rounded-lg hover:bg-[var(--brand-navy-light)] transition-colors duration-200 shadow-sm"
          >
            Lihat Laporan Lengkap
          </button>
        </div>
      </div>
    </div>
  );
});

const ContentSection = memo(({ title, content }) => (
  <div className="px-3 rounded-xl mb-5">
    <div className="">
      <div className="flex items-center gap-2 h-8 mb-4 sm:mb-5 ">
        <div className="w-[6px] h-full bg-[var(--brand-navy)] rounded-full" />
        <h1 className={`font-bold text-xl sm:text-2xl  ${title.toLowerCase() == 'analysis' ? "text-gray-700" : "text-gray-500"}`}>{title}</h1>
      </div>

      <p className={`text-base leading-relaxed text-justify ${title.toLowerCase() == 'analysis' ? "text-gray-700" : "text-gray-500"}`}>
        {content}
      </p>
    </div>
  </div>
));

// Main component
function CardBeritaDetail({ data, rates, hideHeader = false }) {
  if (!data || typeof data !== "object") return null;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formattedDate = data.date ? formatDate(data.date) : "";

  return (
    <div className="w-full max-w-4xl mx-auto ">
      <div className="card-berita-detail">
        {!hideHeader && data.title && (
          <div className="text-start mb-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-gray-900">
              {data.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-gray-500 text-sm">
              {formattedDate && <span>{formattedDate}</span>}
              {data.time && <span>• {data.time}</span>}
            </div>
          </div>
        )}

        {/* Image section */}
        <div className="relative w-full h-48 sm:h-64 md:h-96 mb-5 overflow-hidden rounded-lg shadow-md">
          <img
            src={data.image || "/placeholder-image.jpg"}
            alt={data.title || "Berita Image"}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col sm:flex-row mb-6 items-end">
          <div className="w-full sm:w-3/4 mb-4 sm:mb-0">
            {rates && <AlignmentBar data={rates} />}
          </div>
          <div className="w-full sm:w-1/4 flex justify-center sm:justify-end">
            <button
              onClick={toggleModal}
              type="button"
              className="px-5 py-2 text-sm font-medium rounded-md bg-[var(--brand-navy)] hover:bg-[var(--brand-navy-light)] text-white shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-navy)]/50"
              aria-label="Buka perbandingan berita"
            >
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 20V10" />
                  <path d="M12 20V4" />
                  <path d="M6 20v-6" />
                </svg>
                Comparison
              </span>
            </button>
          </div>
        </div>

        <ContentSection title="Description" content={data.description} />
        <ContentSection title="Analysis" content={data.analysis} />
      </div>

      <ComparisonModal isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
}

ComparisonModal.displayName = "ComparisonModal";
ContentSection.displayName = "ContentSection";

export default CardBeritaDetail;
