"use client";
import Link from "next/link";
import {
  FaCommentDots,
  FaFileAlt,
  FaLanguage,
  FaQuestionCircle,
  FaChalkboardTeacher,
  FaEdit,
  FaPencilAlt,
  FaBookOpen,
  FaHashtag,
  FaCrop,
  FaEraser,
  FaTint,
  FaObjectGroup,
  FaCodeBranch,
  FaRedo,
  FaTrash,
  FaFileExport,
  FaTh,
  FaUnlock,
  FaLock,
  FaFileDownload,
  FaSignature,
  FaCompress,
} from "react-icons/fa";
import { LuFileScan } from "react-icons/lu";
import { PiChatsBold } from "react-icons/pi";
import { MdOutlineTranslate, MdOutlineTitle } from "react-icons/md";
import { GoQuestion } from "react-icons/go";
import { TbDeviceTv } from "react-icons/tb";
import { FaReadme } from "react-icons/fa";

const tools = [
  {
    sections: [
      {
        title: "AI PDF",
        items: [
          { icon: <PiChatsBold  size={16}/>, label: "Chat With PDF", link: "/tools/chat-with-pdf" },
          { icon: <FaFileAlt  size={16}/>, label: "AI PDF Summarizer", link: "/tools/ai-pdf-summarizer" },
          { icon: <MdOutlineTranslate size={16} />, label: "Translate PDF", link: "/tools/translate-pdf" },
          { icon: <GoQuestion size={16} />, label: "AI Question Generator", link: "/tools/question-generator" },
        ],
      },
      {
        title: "AI presentation maker",
        items: [
          { icon: <TbDeviceTv size={16} />, label: "Generate PPT", link: "/tools/generate-ppt" },
          { icon: <FaEdit  size={16}/>, label: "Edit PPT", link: "/tools/edit-ppt" },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: "View & Edit",
        items: [
          { icon: <FaPencilAlt size={16} />, label: "Edit PDF", link: "/tools/edit-pdf" },
          { icon: <FaEdit size={16} />, label: "Annote PDF", link: "/tools/annotate-pdf" },
          { icon: <FaBookOpen  size={16}/>, label: "PDF Reader", link: "/tools/pdf-reader" },
          { icon: <FaHashtag size={16} />, label: "Number Pages", link: "/tools/number-pages" },
          { icon: <FaCrop size={16} />, label: "Crop PDF", link: "/tools/crop-pdf" },
          { icon: <FaEraser size={16} />, label: "Redact PDF", link: "/tools/redact-pdf" },
          { icon: <FaTint  size={16}/>, label: "Watermark PDF", link: "/tools/watermark-pdf" },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: "Organize",
        items: [
          { icon: <FaObjectGroup size={16} />, label: "Merge PDF", link: "/tools/merge-pdf" },
          { icon: <FaCodeBranch  size={16}/>, label: "Split PDF", link: "/tools/split-pdf" },
          { icon: <FaRedo  size={16}/>, label: "Rotate PDF", link: "/tools/rotate-pdf" },
          { icon: <FaTrash size={16} />, label: "Delete PDF", link: "/tools/delete-pdf" },
          { icon: <FaFileExport size={16}/>, label: "Extract PDF", link: "/tools/extract-pdf" },
          { icon: <FaTh  size={16}/>, label: "Organize PDF", link: "/tools/organize-pdf" },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: "PDF Security",
        items: [
          { icon: <FaUnlock size={16} />, label: "Unlock PDF", link: "/tools/unlock-pdf" },
          { icon: <FaLock size={16} />, label: "Lock PDF", link: "/tools/lock-pdf" },
          { icon: <FaFileDownload  size={16}/>, label: "Flat PDF", link: "/tools/flat-pdf" },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: "Sign",
        items: [{ icon: <FaSignature size={16}/>, label: "Sign PDF", link: "/tools/sign-pdf" }],
      },
      {
        title: "Compress",
        items: [{ icon: <FaCompress size={16}/>, label: "Compress PDF", link: "/tools/compress-pdf" }],
      },
      {
        title: "Scan",
        items: [{ icon: <LuFileScan size={16}/>, label: "PDF Scanner", link: "/tools/pdf-scanner" }],
      },
    ],
  },
];

export default function PdfToolsSection() {
  return (
    <div className="bg-white px-4 lg:px-[200px] md:px-[100px] sm:px-[100px] py-16 lg:h-[450px] h-auto w-full shadow-2xl overflow-x-hidden lg:overflow-y-hidden z-100">
      <div className="flex flex-wrap  gap-14 items-start">
        {tools.map((group, index) => (
          <div
            key={index}
            className="flex flex-col gap-4"
            style={{ height: "400px" }}
          >
            {group.sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="text-gray-500 font-medium mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i}>
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
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
