import React, { useState } from "react";

const categories = [
  "Beachfront",
  "Cabins",
  "Trending",
  "Mountains",
  "Countryside",
  "Luxury",
  "Camping",
  "Urban",
];

const Horilist: React.FC = () => {
  // Add state for the active category
  const [activeCategory, setActiveCategory] = useState<string>("Trending"); // Default active category

  return (
    <div className="w-full overflow-x-auto mt-16">
      {/* Added mt-16 to push it below the navbar */}
      <div className="flex justify-center space-x-4 px-4 py-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)} // Set the clicked category as active
            className={`${
              activeCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-600 hover:text-white font-semibold py-2 px-4 rounded-full whitespace-nowrap transition-colors duration-200`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Horilist;
