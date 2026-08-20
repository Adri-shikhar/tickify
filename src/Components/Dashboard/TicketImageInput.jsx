"use client";

import { useState } from "react";
import { FiUpload, FiLink } from "react-icons/fi";

export default function TicketImageInput({ imageUrl, onImageUrlChange, onError, inputClass }) {
  const [mode, setMode] = useState(imageUrl && !imageUrl.includes("ibb.co") ? "url" : "upload");
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

  const tabClass = (active) =>
    `flex flex-1 items-center justify-center gap-2 rounded-control border px-3 py-2 text-sm font-semibold transition ${
      active
        ? "border-success bg-success-soft text-success-soft-fg"
        : "border-default bg-surface text-body hover:border-strong"
    }`;

  const defaultInputClass = inputClass || "input-field h-10 w-full px-3 text-sm";

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-semibold text-label">Ticket Image</span>

      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={() => setMode("upload")} className={tabClass(mode === "upload")}>
          <FiUpload className="text-base" />
          Upload
        </button>
        <button type="button" onClick={() => setMode("url")} className={tabClass(mode === "url")}>
          <FiLink className="text-base" />
          Image URL
        </button>
      </div>

      {mode === "upload" ? (
        <div className="flex items-center gap-4">
          <label className="relative flex h-28 w-28 shrink-0 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-card border-2 border-dashed border-strong bg-canvas transition hover:border-success hover:bg-success-soft">
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
              <FiUpload className="text-2xl text-muted" />
            )}
          </label>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-label">
              {uploading ? "Uploading file..." : "Upload image"}
            </span>
            <span className="mt-0.5 text-xs text-body">PNG, JPG up to 5MB</span>
          </div>
        </div>
      ) : (
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => {
            onImageUrlChange(e.target.value);
            onError?.("");
          }}
          placeholder="https://example.com/image.jpg"
          className={defaultInputClass}
        />
      )}

      {imageUrl && mode === "url" && (
        <div className="h-36 w-full overflow-hidden rounded-card border border-default bg-sunken">
          <img src={imageUrl} alt="Ticket preview" className="h-full w-full object-cover" />
        </div>
      )}
    </div>
  );
}
