import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = "md",
  color = "blue-600",
  text = "Loading...",
}) => {
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <div
          className={`${sizeMap[size]} border-4 border-t-${color} border-r-${color} border-b-${color} border-l-transparent rounded-full animate-spin`}
        ></div>
      </div>
      {text && <p className="mt-2 text-gray-600">{text}</p>}
    </div>
  );
};

export default Loader;
