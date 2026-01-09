import React, { useState, useCallback, memo } from "react";

const AlignmentBar = memo(({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) return null;

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleMouseEnter = useCallback((index) => {
    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  const handleClick = useCallback(
    (index) => {
      setSelectedIndex(index === selectedIndex ? null : index);
    },
    [selectedIndex]
  );

  const getBarColor = (rate) => {
    if (rate < 0.25) return "bg-yellow-500";
    if (rate > 0.75) return "bg-green-500";
    return "bg-gray-400";
  };

  const Tooltip = ({ rate }) => (
    <div
      className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-md z-50 whitespace-nowrap"
      role="tooltip"
    >
      {`Rate: ${Number(rate ?? 0).toFixed(2)}`}
    </div>
  );

  // Bar component
  const Bar = ({ rate, index }) => {
    const isHovered = hoveredIndex === index;
    const isSelected = selectedIndex === index;
    const isActive = isHovered || isSelected;
    const barColor = getBarColor(rate);

    const position = `${rate * 100}%`;

    let barWidth;
    if (rate < 0.25) {
      barWidth = `${Math.max(4, (0.25 - rate) * 40)}px`;
    } else if (rate > 0.75) {
      barWidth = `${Math.max(4, (rate - 0.75) * 40)}px`;
    } else {
      barWidth = "6px";
    }

    return (
      <div
        className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 ${barColor} cursor-pointer transition-all duration-200 rounded-sm ${
          isActive ? "z-10" : "z-0"
        }`}
        style={{
          left: position,
          width: isActive ? `calc(${barWidth} + 2px)` : barWidth,
          opacity: isActive ? 1 : 0.8,
          transform: `translate(-50%, -50%) ${
            isActive ? "scale(1.1)" : "scale(1)"
          }`,
          boxShadow: isActive
            ? "0 0 0 2px rgba(255,255,255,0.8), 0 0 0 4px rgba(0,0,0,0.1)"
            : "none",
        }}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(index)}
        aria-label={`Alignment rate: ${Number(rate ?? 0).toFixed(2)}`}
        role="button"
      >
        {isActive && <Tooltip rate={rate} />}
      </div>
    );
  };

  // Solid background sections
  const BackgroundSections = () => (
    <>
      <div className="absolute inset-y-0 left-0 w-1/4 bg-yellow-100"></div>
      <div className="absolute inset-y-0 left-1/4 w-1/2 bg-gray-100"></div>
      <div className="absolute inset-y-0 left-3/4 w-1/4 bg-green-100"></div>
    </>
  );

  return (
    <div className="w-full mt-2">
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>Oposisi</span>
        <span>Netral</span>
        <span>Koalisi</span>
      </div>

      <div className="relative h-8 w-full rounded-md overflow-hidden border border-gray-200 shadow-sm">
        <BackgroundSections />

        <div className="absolute inset-y-0 left-1/4 border-l border-gray-200"></div>
        <div className="absolute inset-y-0 left-3/4 border-l border-gray-200"></div>

        {data.map((item, index) => (
          <Bar key={index} rate={item} index={index} />
        ))}
      </div>

      {/* Display selected value below the bar */}
      {selectedIndex !== null && (
        <div className="mt-2 text-center text-sm font-medium">
          Selected alignment: {Number(data[selectedIndex]).toFixed(2)}
        </div>
      )}
    </div>
  );
});

AlignmentBar.displayName = "AlignmentBar";

export default AlignmentBar;