"use client"
import React, { useRef } from 'react';
import { HiMiniCamera } from "react-icons/hi2";
export default function FileUpload() {
     const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name);
      // File processing logic would go here
    }
  }

  function handleContainerClick() {
    // Trigger click on the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
  return (
    <div className="flex flex-col w-full max-w-md">
  <label
    htmlFor="image"
    className="mb-1 font-semibold text-primary-dark_gray "
  >
    Upload Product Photo
  </label>
  <div
    onClick={handleContainerClick}
    className="w-full border border-dashed border-gray-300 rounded-md py-2.5 pe-3 flex items-center justify-center gap-2  cursor-pointer hover:border-gray-400 transition-colors"
  >
   <div className="flex border border-[#5B5B5B66] gap-2 p-1 rounded-md">
     <input
      type="file"
      id="image"
      name="image"
      className="hidden"
      onChange={handleFileUpload}
      ref={fileInputRef}
    />
    <HiMiniCamera className="h-4 w-4 text-primary-dark_gray" />
    <span className="text-primary-dark_gray text-xs">add image here</span>
   </div>
  </div>
</div>

  );
};
