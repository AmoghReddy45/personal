import React, { useState, useEffect } from "react";
import { getImageUrl, SupabaseImageProps } from "@/lib/imageUtils";

const SupabaseImage: React.FC<SupabaseImageProps> = ({
  src,
  alt,
  className = "",
  width,
  height,
  style = {},
}) => {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    // Get the Supabase URL for this image
    const supabaseUrl = getImageUrl(src);
    setImageSrc(supabaseUrl);

    // Preload the image
    const img = new Image();
    img.src = supabaseUrl;

    img.onload = () => {
      setIsLoading(false);
    };

    img.onerror = () => {
      console.error(`Failed to load image: ${supabaseUrl}`);
      setError(true);
      setIsLoading(false);
      // Fall back to original src
      if (supabaseUrl !== src) {
        setImageSrc(src);
      }
    };
  }, [src]);

  if (isLoading) {
    return (
      <div
        className={`bg-gray-200 animate-pulse ${className}`}
        style={{
          width: width || "100%",
          height: height || "100%",
          ...style,
        }}
        aria-label={`Loading ${alt}`}
      />
    );
  }

  if (error && !imageSrc.startsWith("http")) {
    // Show a placeholder if both Supabase and original source fail
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center ${className}`}
        style={{
          width: width || "100%",
          height: height || "100%",
          ...style,
        }}
      >
        <span className="text-gray-400">{alt || "Image not found"}</span>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      style={style}
      loading="lazy"
    />
  );
};

export default SupabaseImage;
