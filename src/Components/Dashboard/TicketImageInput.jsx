"use client";

import { useState } from "react";
import { FiUpload } from "react-icons/fi";

export default function TicketImageInput({ imageUrl, onImageUrlChange, onError }) {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      onError?.("File size exceeds 5MB limit");
      e.target.value = "";
      return;
    }

    setUploading(true);
    onError?.("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        onImageUrlChange(data.data.url);
        onError?.("");
      } else {
        onError?.("Upload failed. Try again.");
      }
    } catch {
      onError?.("Network error during upload");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-semibold text-gray-700">Ticket Image</span>
      <div className="flex items-center gap-4">
        <label className="relative flex h-28 w-28 shrink-0 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-emerald-400 hover:bg-emerald-50/50">
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageUpload}
            className="hidden"
            disabled={uploading}
          />
          {imageUrl ? (
            <img src={imageUrl} alt="Ticket preview" className="h-full w-full object-cover" />
          ) : (
            <FiUpload className="text-2xl text-gray-400" />
          )}
        </label>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-700">
            {uploading ? "Uploading file..." : "Upload image"}
          </span>
          <span className="mt-0.5 text-xs text-gray-500">PNG, JPG up to 5MB</span>
        </div>
      </div>
    </div>
  );
}
