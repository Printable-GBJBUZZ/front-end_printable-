"use client";

import { useState, useRef, useEffect } from "react";
import NewUploadBox from "@/components/NewUploadBox/page";
import Categories from "@/components/NewHomePage/Categories";
import Activity from "@/components/NewHomePage/Activity";
import HelpSection from "@/components/NewHomePage/HelpSection";
import Footer from "@/components/Footer/page";
import PageCard from "@/components/NewHomePage/Shopcard";
import FileUploadPopUp from "@/components/FileUpload-PopUp/page";
import PrintOptionsPage from "./print-and-deliver/pdf/page";

export default function Page() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFromDeviceClick = () => {
    fileInputRef.current?.click();
    setDropdownOpen(false);
  };

  const handleFromDriveClick = () => {
    alert("Google Drive integration goes here");
    setDropdownOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setShowUploadPopup(true); // Show the popup when file is selected
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      {/* Page layout */}
      <div className="flex flex-col items-center bg-gray-100 min-h-screen lg:px-[200px] md:px-[100px] sm:px-[100px] px-4">
        <div className="flex lg:flex-nowrap flex-wrap w-full min-h-[400px] items-center gap-4 lg:py-16 md:py-16 sm:py-16 py-4">
          <div className="h-auto lg:w-1/2 md:w-1/2 w-full">
            <NewUploadBox
              dropdownOpen={dropdownOpen}
              setDropdownOpen={setDropdownOpen}
              dropdownMenuRef={dropdownMenuRef}
              fileInputRef={fileInputRef}
              handleFromDeviceClick={handleFromDeviceClick}
              handleFromDriveClick={handleFromDriveClick}
              handleFileChange={handleFileChange} // Handle file selection
            />
          </div>
        </div>
      </div>

      <Categories />
      <PageCard />
      <Activity />
      <HelpSection />
      <Footer />

      {/* File Upload Popup + Print Page */}
      {showUploadPopup && file && (
        <>
          <FileUploadPopUp onClose={() => setShowUploadPopup(false)} />
          {/* Passing the selected file to the PrintOptionsPage */}
          <PrintOptionsPage file={file} />
        </>
      )}
    </div>
  );
}
