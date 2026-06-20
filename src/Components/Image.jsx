"use client";

// Wrapper around next/image that shows a fallback when the src is missing or broken
import { useState } from "react";
import NextImage from "next/image";

function isValidSrc(src) {
  if (!src || typeof src !== "string") return false;
  return src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/");
}

export default function Image({ src, alt = "", className = "", fill = false, width, height, sizes, fallback, fallbackClassName = "" }) {
  const [error, setError] = useState(false);

  if (!isValidSrc(src) || error) {
    if (fallback) return fallback;
    return (
      <div className={`flex items-center justify-center bg-gray-200 text-sm text-gray-400 ${fallbackClassName || className}`}>
        No Image
      </div>
    );
  }

  if (fill) {
    return (
      <NextImage
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
        className={className}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width ?? 400}
      height={height ?? 176}
      className={className}
      onError={() => setError(true)}
    />
  );
}
