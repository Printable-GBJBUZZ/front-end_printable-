"use client";

import Link from "next/link";
import {
  BsFiletypeDoc
} from "react-icons/bs";
import {
  PiFileXls,
  PiFilePpt
} from "react-icons/pi";
import {
  FaImage
} from "react-icons/fa";
import {
  MdOutlineDocumentScanner
} from "react-icons/md";
import React from "react";

const convertFromPDF = [
  { icon: <BsFiletypeDoc size={16} />, label: "PDF To Word", link: "/pdftoword" },
  { icon: <PiFileXls size={16} />, label: "PDF To Excel", link: "/pdf/to/excel" },
  { icon: <PiFilePpt size={16} />, label: "PDF To PPT", link: "/pdf/to/ppt" },
  { icon: <FaImage size={16} />, label: "PDF To JPG", link: "/pdf/to/image" },
];

const convertToPDF = [
  { icon: <BsFiletypeDoc size={16} />, label: "Word to PDF", link: "/word/to/pdf" },
  { icon: <PiFileXls size={16} />, label: "Excel to PDF", link: "/excel/to/pdf" },
  { icon: <PiFilePpt size={16} />, label: "PPT to PDF", link: "/ppt/to/pdf" },
  { icon: <FaImage size={16} />, label: "JPG to PDF", link: "/image/to/pdf" },
  { icon: <MdOutlineDocumentScanner  size={16}/>, label: "PDF to OCR", link: "/tools/pdf-to-ocr" },
];

const ConvertTools = () => {
  return (
    <div className="flex justify-start gap-20 text-sm lg:px-[200px] md:px-[100px] sm:px-[100px] px-4 py-6 bg-white min-h-[450px] shadow-2xl">
      {/* Convert from PDF */}
      <div>
        <h2 className="text-gray-500 font-semibold mb-4">Convert from PDF</h2>
        <ul className="space-y-3">
          {convertFromPDF.map((item, idx) => (
            <li key={idx}>
              <Link href={item.link}>
                <div className="flex items-center gap-2 text-[12px] text-black hover:text-white hover:bg-[#06044B] px-2 py-1 rounded-md transition-all duration-200">
                  <div className="bg-[#06044B] text-white p-1.5 rounded-md text-[12px]">
                    {item.icon}
                  </div>
                  {item.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Convert to PDF */}
      <div>
        <h2 className="text-gray-500 font-semibold mb-4">Convert to PDF</h2>
        <ul className="space-y-3">
          {convertToPDF.map((item, idx) => (
            <li key={idx}>
              <Link href={item.link}>
                <div className="flex items-center gap-2 text-[12px] text-black hover:text-white hover:bg-[#06044B] px-2 py-1 rounded-md transition-all duration-200">
                  <div className="bg-[#06044B] text-white p-1.5 rounded-md text-[12px]">
                    {item.icon}
                  </div>
                  {item.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConvertTools;
