"use client";

import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { PDFDocument } from "pdf-lib";
import { getPdfPageCount } from "@/app/esign/components/utils/pdfUtils";
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Bell,
  MessageSquare,
  User,
  X,
  Plus,
  FileText,
} from "lucide-react";
import { useOrder, type DocumentItem } from "@/context/orderContext";
import UseStorage from "@/hooks/useStorage";
import { useRouter } from "next/navigation";

export default function Component() {
  const { order, dispatch } = useOrder();
  const router = useRouter();
  const { deleteFile } = UseStorage();
  const { uploadFile } = UseStorage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [applyToAll, setApplyToAll] = useState(false);
  const [advancedExpanded, setAdvancedExpanded] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    isError?: boolean;
  } | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedDocumentIndex, setSelectedDocumentIndex] = useState<number>(0);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [confidentialPrintingChecked, setConfidentialPrintingChecked] =
    useState(false);
  const [fileReviewChecked, setFileReviewChecked] = useState(false);
  const [rushOrderChecked, setRushOrderChecked] = useState(false);
  const [paperSettingOpen, setPaperSettingOpen] = useState(false);
  const [finishingOptionsOpen, setFinishingOptionsOpen] = useState(false);
  const [selectedPaperSize, setSelectedPaperSize] = useState("A4");
  const [selectedPaperType, setSelectedPaperType] = useState("Standard Paper");
  const [activePaperTab, setActivePaperTab] = useState("size");
  const [activeFinishingTab, setActiveFinishingTab] = useState("Binding");
  const [selectedBinding, setSelectedBinding] = useState("No Binding");
  const [selectedLamination, setSelectedLamination] =
    useState("No Laminations");
  const [selectedCover, setSelectedCover] = useState("No Cover");

  // Global settings for "apply to all"
  const [globalSettings, setGlobalSettings] = useState({
    copies: 1,
    colorType: "black and white" as "black and white" | "color",
    pageDirection: "vertical" as "vertical" | "horizontal",
    paperSize: "A4 (8.27 x 11.69 inches)" as DocumentItem["paperSize"],
    printType: "front" as "front" | "front and back",
    pagesToPrint: "All",
    pagesPerSheet: "1",
    paperMargin: "Normal",
  });

  const handleFileUpload = useCallback(
    async (files: FileList) => {
      setUploadingFiles(true);
      try {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          let pageCount = 1;
          if (file.type === "application/pdf") {
            try {
              const arrayBuffer = await file.arrayBuffer();
              const pdfDoc = await PDFDocument.load(arrayBuffer);
              pageCount = pdfDoc.getPageCount();
            } catch (err) {
              console.error("Failed to read PDF page count:", err);
            }
          }

          const fileWithMeta = {
            id: uuidv4(),
            name: file.name,
            size: file.size,
            type: file.type,
            pages: pageCount,
          };

          await uploadFile(file, fileWithMeta); // Ensure uploadFile supports 2 args
        }
      } finally {
        setUploadingFiles(false);
      }
    },
    [uploadFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      if (e.dataTransfer.files) {
        handleFileUpload(e.dataTransfer.files);
      }
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const updateDocument = (index: number, updates: Partial<DocumentItem>) => {
    const updatedDoc = { ...order.documents[index], ...updates };
    dispatch({ type: "UPDATE_DOCUMENT", index, payload: updatedDoc });
  };

  const updateGlobalSetting = (
    key: keyof typeof globalSettings,
    value: any
  ) => {
    setGlobalSettings((prev) => ({ ...prev, [key]: value }));

    if (applyToAll) {
      order.documents.forEach((_, index) => {
        updateDocument(index, { [key]: value });
      });
    }
  };

  const handleApplyToAllToggle = (checked: boolean) => {
    setApplyToAll(checked);
    if (checked) {
      // Apply current global settings to all documents
      order.documents.forEach((_, index) => {
        updateDocument(index, {
          copies: globalSettings.copies,
          colorType: globalSettings.colorType,
          pageDirection: globalSettings.pageDirection,
          paperSize: globalSettings.paperSize,
          printType: globalSettings.printType,
          pagesToPrint: globalSettings.pagesToPrint,
        });
      });
    } else {
      // When turning off "apply to all", sync global settings with the first document
      if (order.documents.length > 0) {
        const firstDoc = order.documents[0];
        setGlobalSettings({
          copies: firstDoc.copies,
          colorType: firstDoc.colorType,
          pageDirection: firstDoc.pageDirection,
          paperSize: firstDoc.paperSize,
          printType: firstDoc.printType,
          pagesToPrint: firstDoc.pagesToPrint,
          pagesPerSheet: globalSettings.pagesPerSheet,
          paperMargin: globalSettings.paperMargin,
        });
        setSelectedDocumentIndex(0);
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const getTotalPages = () => {
    return order.documents.reduce((total, doc) => {
      const copies = doc.copies || 1;
      const pages = doc.pages || 1;
      return total + copies * pages;
    }, 0);
  };

  useEffect(() => {
    if (
      selectedDocumentIndex >= order.documents.length &&
      order.documents.length > 0
    ) {
      setSelectedDocumentIndex(0);
    }
  }, [order.documents.length, selectedDocumentIndex]);

  return (
    <div className="min-h-screen bg-[#f4f7fa]">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-[#000000] mb-8">
          Print Options
        </h1>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`mb-4 p-3 rounded-lg ${
              statusMessage.isError
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        {/* File Preview Section */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          {order.documents.map((doc, index) => (
            <Card
              key={doc.id}
              className={`relative w-64 h-80 bg-white border-2 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer transition-all ${
                !applyToAll && selectedDocumentIndex === index
                  ? "border-[#3ae180] shadow-lg ring-2 ring-[#3ae180]/20"
                  : "border-[#e6e6ed] hover:border-[#c9c9c9]"
              }`}
              onClick={() => {
                if (!applyToAll) {
                  setSelectedDocumentIndex(index);
                }
              }}
            >
              {/* Selection indicator */}
              {!applyToAll && selectedDocumentIndex === index && (
                <div className="absolute top-2 left-2 z-10 w-6 h-6 bg-[#3ae180] rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFile(doc.id, doc.fileName, index, setStatusMessage);
                }}
                className="absolute top-2 right-2 z-10 w-6 h-6 bg-[#555555] rounded-full flex items-center justify-center hover:bg-gray-600"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <div className="p-4 h-full">
                <div className="w-full h-48 bg-[#f2f2f2] rounded mb-3 flex items-center justify-center border-2 border-dashed border-[#c9c9c9]">
                  {doc.uploading ? (
                    <div className="text-center">
                      <div className="animate-spin w-8 h-8 border-2 border-[#3ae180] border-t-transparent rounded-full mx-auto mb-2" />
                      <span className="text-xs text-[#555555]">
                        Uploading...
                      </span>
                    </div>
                  ) : doc.error ? (
                    <div className="text-center text-red-500">
                      <X className="w-8 h-8 mx-auto mb-2" />
                      <span className="text-xs">Upload Failed</span>
                    </div>
                  ) : (
                    <div className="text-center">
                      <FileText className="w-8 h-8 text-[#3ae180] mx-auto mb-2" />
                      <span className="text-xs text-[#555555]">
                        PDF Document
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-sm">
                  <p
                    className="font-medium text-[#000000] truncate"
                    title={doc.fileName}
                  >
                    {doc.fileName}
                  </p>
                  <p className="text-[#555555]">{formatFileSize(doc.size)}</p>
                  {!applyToAll && (
                    <p className="text-xs text-[#3ae180] mt-1">
                      {selectedDocumentIndex === index
                        ? "Currently selected"
                        : "Click to configure"}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}

          {/* Add Files */}
          <Card
            className={`w-64 h-80 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors flex-shrink-0 ${
              uploadingFiles
                ? "bg-[#dffbe7] border-[#3ae180] cursor-not-allowed"
                : dragActive
                ? "bg-[#dffbe7] border-[#3ae180]"
                : "bg-[#effdf3] border-[#61e987] hover:bg-[#dffbe7]"
            }`}
            onDrop={uploadingFiles ? undefined : handleDrop}
            onDragOver={uploadingFiles ? undefined : handleDragOver}
            onDragLeave={uploadingFiles ? undefined : handleDragLeave}
            onClick={
              uploadingFiles ? undefined : () => fileInputRef.current?.click()
            }
          >
            <div className="text-center">
              {uploadingFiles ? (
                <>
                  <div className="animate-spin w-12 h-12 border-3 border-[#3ae180] border-t-transparent rounded-full mx-auto mb-3" />
                  <p className="text-[#000000] font-medium mb-1">
                    Uploading Files...
                  </p>
                  <p className="text-xs text-[#555555]">Please wait</p>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 bg-[#3ae180] rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-[#000000] font-medium mb-1">Add Files</p>
                  <p className="text-xs text-[#555555]">
                    Drag & drop or click to upload
                  </p>
                </>
              )}
            </div>
          </Card>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,image/*"
            className="hidden"
            disabled={uploadingFiles}
            onChange={(e) =>
              e.target.files &&
              !uploadingFiles &&
              handleFileUpload(e.target.files)
            }
          />
        </div>

        {/* Print Options Form */}
        <Card className="bg-[#F4F7FA] border border-[#e6e6ed] rounded-4xl p-0 shadow-2xl mb-6">
          <div className="bg-white w-full p-6 pb-3 rounded-3xl mb-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-[#000000] mb-1">
                  Print Options
                </h2>
                <p className="text-sm text-[#555555]">
                  {applyToAll
                    ? "Customize your print job settings"
                    : order.documents.length > 0
                    ? `Configuring: ${
                        order.documents[selectedDocumentIndex]?.fileName ||
                        "No document selected"
                      }`
                    : "Add documents to configure print settings"}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-[#555555]">
                  Apply same setting to all files
                </span>
                <Switch
                  checked={applyToAll}
                  onCheckedChange={handleApplyToAllToggle}
                  className="data-[state=checked]:bg-[#06044B]"
                />
              </div>
            </div>
          </div>

          {!applyToAll && order.documents.length > 0 && (
            <div className="mb-4 p-3 bg-[#effdf3] border border-[#61e987] rounded-lg">
              <p className="text-sm text-[#555555]">
                💡 Click on a document card above to configure its individual
                print settings
              </p>
            </div>
          )}

          <div className="space-y-6 px-6">
            {/* Number of Copies */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[#000000]">
                Enter number of copies
              </label>
              <div className="relative">
                <Input
                  type="number"
                  min="1"
                  value={
                    applyToAll
                      ? globalSettings.copies
                      : order.documents[selectedDocumentIndex]?.copies || 1
                  }
                  onChange={(e) => {
                    const value = Number.parseInt(e.target.value) || 1;
                    if (applyToAll) {
                      updateGlobalSetting("copies", value);
                    } else if (order.documents[selectedDocumentIndex]) {
                      updateDocument(selectedDocumentIndex, { copies: value });
                    }
                  }}
                  className="w-24 text-center bg-[#effdf3] border-[#61e987] text-[#000000]"
                />
              </div>
            </div>
            <hr
              className="border-0 border-t my-4 mx-6"
              style={{ borderColor: "#C9C9C9" }}
            />

            <div className="flex justify-between items-start w-full">
              {/* Print Color Option */}
              <div>
                <label className="text-sm font-medium text-[#000000]">
                  Choose print color
                </label>
                <div className="flex space-x-4 mt-2">
                  {/* Black & White Card */}
                  <button
                    onClick={() =>
                      applyToAll
                        ? updateGlobalSetting("colorType", "black and white")
                        : order.documents[selectedDocumentIndex] &&
                          updateDocument(selectedDocumentIndex, {
                            colorType: "black and white",
                          })
                    }
                    className={`flex items-center w-64 p-4 rounded-lg border transition-colors
          ${
            (applyToAll
              ? globalSettings.colorType
              : order.documents[selectedDocumentIndex]?.colorType) ===
            "black and white"
              ? "border-[#3ae180] bg-[#effdf3]"
              : "border-[#e6e6ed] bg-white hover:border-[#c9c9c9]"
          }`}
                  >
                    <div>
                      <div className="w-9 h-9 bg-black rounded flex items-center justify-center mr-3">
                        <div className="w-4 h-4 bg-white rounded-sm" />
                      </div>
                    </div>
                    <div>
                      <div className="text-base font-semibold text-[#000000]">
                        Black & White
                      </div>
                      <div className="text-xs text-[#555555]">
                        Monochrome printing for Text
                      </div>
                    </div>
                  </button>

                  {/* Color Printing Card */}
                  <button
                    onClick={() =>
                      applyToAll
                        ? updateGlobalSetting("colorType", "color")
                        : order.documents[selectedDocumentIndex] &&
                          updateDocument(selectedDocumentIndex, {
                            colorType: "color",
                          })
                    }
                    className={`flex items-center w-64 p-4 rounded-lg border transition-colors
          ${
            (applyToAll
              ? globalSettings.colorType
              : order.documents[selectedDocumentIndex]?.colorType) === "color"
              ? "border-[#3ae180] bg-[#effdf3]"
              : "border-[#e6e6ed] bg-white hover:border-[#c9c9c9]"
          }`}
                  >
                    <div>
                      <div
                        className="w-9 h-9 rounded flex items-center justify-center mr-3"
                        style={{
                          background:
                            "linear-gradient(135deg,#c53232,#ccc514,#3ae180)",
                        }}
                      >
                        <div className="w-4 h-4 bg-white rounded-sm" />
                      </div>
                    </div>
                    <div>
                      <div className="text-base font-semibold text-[#000000]">
                        Color Printing
                      </div>
                      <div className="text-xs text-[#555555]">
                        Full color with vibrant output
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Print Orientation Option */}
              <div>
                <label className="text-sm font-medium text-[#000000] mb-2 block">
                  Choose print orientation
                </label>
                <div className="flex space-x-3">
                  {/* Landscape Button */}
                  <button
                    onClick={() => {
                      if (applyToAll) {
                        updateGlobalSetting("pageDirection", "horizontal");
                      } else if (order.documents[selectedDocumentIndex]) {
                        updateDocument(selectedDocumentIndex, {
                          pageDirection: "horizontal",
                        });
                      }
                    }}
                    className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                      (
                        applyToAll
                          ? globalSettings.pageDirection === "horizontal"
                          : order.documents[selectedDocumentIndex]
                              ?.pageDirection === "horizontal"
                      )
                        ? "border-[#3ae180] bg-[#dffbe7]"
                        : "border-[#c9c9c9] bg-white"
                    }`}
                  >
                    <div className="w-8 h-6 bg-[#f2f2f2] border border-[#c9c9c9] rounded mb-2" />
                    <span className="text-xs text-[#555555]">Landscape</span>
                  </button>
                  {/* Portrait Button */}
                  <button
                    onClick={() => {
                      if (applyToAll) {
                        updateGlobalSetting("pageDirection", "vertical");
                      } else if (order.documents[selectedDocumentIndex]) {
                        updateDocument(selectedDocumentIndex, {
                          pageDirection: "vertical",
                        });
                      }
                    }}
                    className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                      (
                        applyToAll
                          ? globalSettings.pageDirection === "vertical"
                          : order.documents[selectedDocumentIndex]
                              ?.pageDirection === "vertical"
                      )
                        ? "border-[#3ae180] bg-[#dffbe7]"
                        : "border-[#c9c9c9] bg-white"
                    }`}
                  >
                    <div className="w-6 h-8 bg-[#f2f2f2] border border-[#c9c9c9] rounded mb-2" />
                    <span className="text-xs text-[#555555]">Portrait</span>
                  </button>
                </div>
              </div>
            </div>
            <hr
              className="border-0 border-t my-4 mx-6"
              style={{ borderColor: "#C9C9C9" }}
            />

            <div className="mt-2">
              <label className="text-sm font-medium text-[#000000]">
                Additional Options
              </label>
              <div className="flex gap-6 mt-2">
                {/* Confidential Printing */}
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={confidentialPrintingChecked}
                    onChange={() =>
                      setConfidentialPrintingChecked(
                        !confidentialPrintingChecked
                      )
                    }
                    className="w-5 h-5 accent-[#06044B] border-2 border-[#C9C9C9] rounded-md mr-4 transition-colors
        group-hover:border-[#06044B] group-checked:border-[#06044B]"
                  />
                  <div
                    className={`p-4 w-72 rounded-xl transition-all
        `}
                  >
                    <div className="text-base font-medium text-[#06044B] mb-0.5">
                      Confidential Printing
                    </div>
                    <div className="text-sm text-[#A0A0AF]">
                      Auto-delete files after printing for security
                    </div>
                  </div>
                </label>

                {/* File Review Service */}
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={fileReviewChecked}
                    onChange={() => setFileReviewChecked(!fileReviewChecked)}
                    className="w-5 h-5 accent-[#06044B] border-2 border-[#C9C9C9] rounded-md mr-4 transition-colors"
                  />
                  <div
                    className={`p-4 w-72 rounded-xl transition-all
            `}
                  >
                    <div className="text-base font-medium text-[#06044B] mb-0.5">
                      File Review Service
                    </div>
                    <div className="text-sm text-[#A0A0AF]">
                      Professional review before printing (+$2.00)
                    </div>
                  </div>
                </label>

                {/* Rush Order */}
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rushOrderChecked}
                    onChange={() => setRushOrderChecked(!rushOrderChecked)}
                    className="w-5 h-5 accent-[#06044B] border-2 border-[#C9C9C9] rounded-md mr-4 transition-colors"
                  />
                  <div
                    className={`p-4 w-72 rounded-xl  transition-all
            `}
                  >
                    <div className="text-base font-medium text-[#06044B] mb-0.5">
                      Rush Order
                    </div>
                    <div className="text-sm text-[#A0A0AF]">
                      Priority processing (+50% cost)
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <hr
              className="border-0 border-t my-4 mx-6"
              style={{ borderColor: "#C9C9C9" }}
            />

            <div className="mt-6 mb-6">
              {/* Options Row */}
              <div className="flex gap-6">
                {/* ... Your three option cards as before ... */}
              </div>

              {/* Dropdown options BELOW options row */}
              <div className="flex flex-col gap-4">
                {/* Paper Setting Accordion */}
                <button
                  onClick={() => setPaperSettingOpen(!paperSettingOpen)}
                  className="w-full flex items-center justify-between px-4 py-5 bg-white rounded-2xl border border-[#e6e6ed] shadow-sm transition-colors"
                  type="button"
                >
                  <span className="text-lg font-semibold text-[#22223B]">
                    Paper Setting
                  </span>
                  {paperSettingOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#555555]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#555555]" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {paperSettingOpen && (
                    <motion.div
                      key="paper-setting-content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="bg-white p-6 rounded-b-lg border border-t-0 border-[#e6e6ed] mt-[-4px] shadow-sm overflow-hidden"
                      style={{ willChange: "opacity, height" }}
                    >
                      {/* Paper Setting Dropdown (Expanded Content) */}
                      {paperSettingOpen && (
                        <div className="bg-white p-6 rounded-b-lg border border-t-0 border-[#e6e6ed] mt-[-4px] shadow-sm">
                          {/* Tab Pills */}
                          <div className="flex w-full mb-6">
                            <button
                              className={`flex-1 py-2 rounded-l-full text-center text-base font-medium transition-all
          ${
            activePaperTab === "size"
              ? "bg-[#e7faef] text-[#06044B]"
              : "bg-[#f4f7fa] text-[#22223b] hover:bg-[#e6e6ed]"
          }`}
                              onClick={() => setActivePaperTab("size")}
                              type="button"
                            >
                              Paper Size
                            </button>
                            <button
                              className={`flex-1 py-2 rounded-r-full text-center text-base font-medium transition-all
          ${
            activePaperTab === "type"
              ? "bg-[#e7faef] text-[#06044B]"
              : "bg-[#f4f7fa] text-[#22223b] hover:bg-[#e6e6ed]"
          }`}
                              onClick={() => setActivePaperTab("type")}
                              type="button"
                            >
                              Paper Type
                            </button>
                          </div>
                          {/* Panels */}
                          {activePaperTab === "size" && (
                            <div>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {[
                                  { label: "A4", sub: "8.27 x 11.69 in" },
                                  { label: "Letter", sub: "8.5 x 11 in" },
                                  { label: "Legal", sub: "8.5 x 14 in" },
                                  { label: "A3", sub: "11.69 x 16.53 in" },
                                  { label: "Tabloid", sub: "11 x 17 in" },
                                  { label: "Statement", sub: "5.5 x 8.7 in" },
                                  { label: "A5", sub: "5.83 x 8.27 in" },
                                ].map((option) => {
                                  const isSelected =
                                    selectedPaperSize === option.label;
                                  return (
                                    <button
                                      key={option.label}
                                      type="button"
                                      onClick={() =>
                                        setSelectedPaperSize(option.label)
                                      }
                                      className={`
          w-full flex items-center
          p-4
          rounded-xl
          transition-colors
          border-2
          ${
            isSelected
              ? "border-[#3ae180] bg-[#effdf3]"
              : "border-[#E6E6ED] bg-[#F4F7FA] hover:border-[#3ae180]"
          }
        `}
                                    >
                                      <div className="flex-shrink-0 h-8 w-5 rounded bg-white border border-[black] mr-3" />
                                      <div>
                                        <div className="font-semibold text-[#06044B] text-base mb-1">
                                          {option.label}
                                        </div>
                                        <div className="text-xs text-[#A0A0AF]">
                                          {option.sub}
                                        </div>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                          {activePaperTab === "type" && (
                            <div>
                              <div className="grid grid-cols-3 gap-4">
                                {/* Standard Paper */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedPaperType("Standard Paper")
                                  }
                                  className={`
      flex flex-col justify-between h-full p-4 rounded-xl border-2 transition-colors
      shadow-sm text-left
      ${
        selectedPaperType === "Standard Paper"
          ? "border-[#3ae180] bg-[#effdf3]"
          : "border-[#E6E6ED] bg-[#F4F7FA] hover:border-[#3ae180]"
      }
    `}
                                >
                                  <span className="font-semibold text-[#06044B] mb-1">
                                    Standard Paper (80 GSM)
                                  </span>
                                  <span className="text-xs text-[#A0A0AF]">
                                    Regular office paper
                                  </span>
                                </button>

                                {/* Premium Paper */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedPaperType("Premium Paper")
                                  }
                                  className={`
      flex flex-col justify-between h-full p-4 rounded-xl border-2 transition-colors
      shadow-sm text-left
      ${
        selectedPaperType === "Premium Paper"
          ? "border-[#3ae180] bg-[#effdf3]"
          : "border-[#E6E6ED] bg-[#F4F7FA] hover:border-[#3ae180]"
      }
    `}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-semibold text-[#06044B] mb-1">
                                      Premium Paper (100 GSM)
                                    </span>
                                    <span className="text-xs text-[#EE943A] font-semibold ml-3">
                                      + ₹5
                                    </span>
                                  </div>
                                  <span className="text-xs text-[#A0A0AF]">
                                    High-quality white paper
                                  </span>
                                </button>

                                {/* Photo Paper */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedPaperType("Photo Paper")
                                  }
                                  className={`
      flex flex-col justify-between h-full p-4 rounded-xl border-2 transition-colors
      shadow-sm text-left
      ${
        selectedPaperType === "Photo Paper"
          ? "border-[#3ae180] bg-[#effdf3]"
          : "border-[#E6E6ED] bg-[#F4F7FA] hover:border-[#3ae180]"
      }
    `}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-semibold text-[#06044B] mb-1">
                                      Photo Paper (200 GSM)
                                    </span>
                                    <span className="text-xs text-[#EE943A] font-semibold ml-3">
                                      + ₹10
                                    </span>
                                  </div>
                                  <span className="text-xs text-[#A0A0AF]">
                                    Glossy photo paper
                                  </span>
                                </button>

                                {/* Card Stock */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedPaperType("Card Stock")
                                  }
                                  className={`
      flex flex-col justify-between h-full p-4 rounded-xl border-2 transition-colors
      shadow-sm text-left
      ${
        selectedPaperType === "Card Stock"
          ? "border-[#3ae180] bg-[#effdf3]"
          : "border-[#E6E6ED] bg-[#F4F7FA] hover:border-[#3ae180]"
      }
    `}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-semibold text-[#06044B] mb-1">
                                      Card Stock (250 GSM)
                                    </span>
                                    <span className="text-xs text-[#EE943A] font-semibold ml-3">
                                      + ₹22
                                    </span>
                                  </div>
                                  <span className="text-xs text-[#A0A0AF]">
                                    Thick card paper
                                  </span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Finishing Options Accordion */}
                <button
                  onClick={() => setFinishingOptionsOpen(!finishingOptionsOpen)}
                  className="w-full flex items-center justify-between px-4 py-5 bg-white rounded-2xl border border-[#e6e6ed] shadow-sm transition-colors"
                  type="button"
                >
                  <span className="text-lg font-semibold text-[#22223B]">
                    Finishing Options
                  </span>
                  {finishingOptionsOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#555555]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#555555]" />
                  )}
                </button>
                {/* Finishing Options Dropdown (Expanded Content) */}
                <AnimatePresence initial={false}>
                  {finishingOptionsOpen && (
                    <motion.div
                      key="finishing-options-content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="bg-white p-6 rounded-b-lg border border-t-0 border-[#e6e6ed] mt-[-4px] shadow-sm overflow-hidden"
                    >
                      {/* Section Tabs */}
                      <div className="flex w-full mb-6">
                        <button
                          className={`flex-1 py-2 rounded-l-full text-center text-base font-medium transition-all
            ${
              activeFinishingTab === "Binding"
                ? "bg-[#e7faef] text-[#06044B]"
                : "bg-[#f4f7fa] text-[#22223b] hover:bg-[#e6e6ed]"
            }
          `}
                          onClick={() => setActiveFinishingTab("Binding")}
                          type="button"
                        >
                          Binding
                        </button>
                        <button
                          className={`flex-1 py-2 text-center text-base font-medium transition-all
            ${
              activeFinishingTab === "Lamination"
                ? "bg-[#e7faef] text-[#06044B]"
                : "bg-[#f4f7fa] text-[#22223b] hover:bg-[#e6e6ed]"
            }
          `}
                          onClick={() => setActiveFinishingTab("Lamination")}
                          type="button"
                        >
                          Lamination
                        </button>
                        <button
                          className={`flex-1 py-2 rounded-r-full text-center text-base font-medium transition-all
            ${
              activeFinishingTab === "Covers"
                ? "bg-[#e7faef] text-[#06044B]"
                : "bg-[#f4f7fa] text-[#22223b] hover:bg-[#e6e6ed]"
            }
          `}
                          onClick={() => setActiveFinishingTab("Covers")}
                          type="button"
                        >
                          Covers
                        </button>
                      </div>

                      {/* Tab Panels */}
                      {activeFinishingTab === "Binding" && (
                        <div className="grid grid-cols-3 gap-4">
                          {/* No Binding */}
                          <button
                            className={`flex flex-col border rounded-xl p-4 text-left transition-colors
              ${
                selectedBinding === "No Binding"
                  ? "border-[#3ae180] bg-[#effdf3]"
                  : "border-[#e6e6ed] bg-[#F4F7FA] hover:border-[#3ae180]"
              }
            `}
                            onClick={() => setSelectedBinding("No Binding")}
                          >
                            <span className="font-medium text-[#06044B] mb-1">
                              No Binding
                            </span>
                            <span className="text-sm text-[#A0A0AF] mb-2">
                              Loose pages
                            </span>
                            <span className="text-xs text-[#A0A0AF]">
                              &nbsp;
                            </span>
                          </button>
                          {/* Staple Binding */}
                          <button
                            className={`flex flex-col border rounded-xl p-4 text-left transition-colors
              ${
                selectedBinding === "Staple Binding"
                  ? "border-[#3ae180] bg-[#effdf3]"
                  : "border-[#e6e6ed] bg-[#F4F7FA] hover:border-[#3ae180]"
              }
            `}
                            onClick={() => setSelectedBinding("Staple Binding")}
                          >
                            <span className="font-medium text-[#06044B] mb-1">
                              Staple Binding
                            </span>
                            <span className="text-sm text-[#A0A0AF] mb-2">
                              Corner or edge stapling
                            </span>
                            <span className="text-xs text-[#EE943A] font-semibold">
                              + ₹1
                            </span>
                          </button>
                          {/* Spiral Binding */}
                          <button
                            className={`flex flex-col border rounded-xl p-4 text-left transition-colors
              ${
                selectedBinding === "Spiral Binding"
                  ? "border-[#3ae180] bg-[#effdf3]"
                  : "border-[#e6e6ed] bg-[#F4F7FA] hover:border-[#3ae180]"
              }
            `}
                            onClick={() => setSelectedBinding("Spiral Binding")}
                          >
                            <span className="font-medium text-[#06044B] mb-1">
                              Spiral Binding
                            </span>
                            <span className="text-sm text-[#A0A0AF] mb-2">
                              Plastic Spiral Coil
                            </span>
                            <span className="text-xs text-[#EE943A] font-semibold">
                              + ₹25
                            </span>
                          </button>
                          {/* Comb Binding */}
                          <button
                            className={`flex flex-col border rounded-xl p-4 text-left transition-colors
              ${
                selectedBinding === "Comb Binding"
                  ? "border-[#3ae180] bg-[#effdf3]"
                  : "border-[#e6e6ed] bg-[#F4F7FA] hover:border-[#3ae180]"
              }
            `}
                            onClick={() => setSelectedBinding("Comb Binding")}
                          >
                            <span className="font-medium text-[#06044B] mb-1">
                              Comb Binding
                            </span>
                            <span className="text-sm text-[#A0A0AF] mb-2">
                              Plastic comb binding
                            </span>
                            <span className="text-xs text-[#EE943A] font-semibold">
                              + ₹10
                            </span>
                          </button>
                          {/* Perfect Binding */}
                          <button
                            className={`flex flex-col border rounded-xl p-4 text-left transition-colors
              ${
                selectedBinding === "Perfect Binding"
                  ? "border-[#3ae180] bg-[#effdf3]"
                  : "border-[#e6e6ed] bg-[#F4F7FA] hover:border-[#3ae180]"
              }
            `}
                            onClick={() =>
                              setSelectedBinding("Perfect Binding")
                            }
                          >
                            <span className="font-medium text-[#06044B] mb-1">
                              Perfect Binding
                            </span>
                            <span className="text-sm text-[#A0A0AF] mb-2">
                              Professional book binding
                            </span>
                            <span className="text-xs text-[#EE943A] font-semibold">
                              + ₹10
                            </span>
                          </button>
                        </div>
                      )}

                      {activeFinishingTab === "Lamination" && (
                        <div className="grid grid-cols-3 gap-4">
                          {/* No Lamination */}
                          <button
                            className={`flex flex-col border rounded-xl p-4 text-left transition-colors
              ${
                selectedLamination === "No Laminations"
                  ? "border-[#3ae180] bg-[#effdf3]"
                  : "border-[#e6e6ed] bg-[#F4F7FA] hover:border-[#3ae180]"
              }
            `}
                            onClick={() =>
                              setSelectedLamination("No Laminations")
                            }
                          >
                            <span className="font-medium text-[#06044B] mb-1">
                              No Laminations
                            </span>
                            <span className="text-sm text-[#A0A0AF] mb-2">
                              Standard Finish
                            </span>
                            <span className="text-xs text-[#A0A0AF]">
                              &nbsp;
                            </span>
                          </button>
                          {/* Matte Lamination */}
                          <button
                            className={`flex flex-col border rounded-xl p-4 text-left transition-colors
              ${
                selectedLamination === "Matte Lamination"
                  ? "border-[#3ae180] bg-[#effdf3]"
                  : "border-[#e6e6ed] bg-[#F4F7FA] hover:border-[#3ae180]"
              }
            `}
                            onClick={() =>
                              setSelectedLamination("Matte Lamination")
                            }
                          >
                            <span className="font-medium text-[#06044B] mb-1">
                              Matte Lamination
                            </span>
                            <span className="text-sm text-[#A0A0AF] mb-2">
                              Non-reflective finish
                            </span>
                            <span className="text-xs text-[#EE943A] font-semibold">
                              + ₹15
                            </span>
                          </button>
                          {/* Gloss Lamination */}
                          <button
                            className={`flex flex-col border rounded-xl p-4 text-left transition-colors
              ${
                selectedLamination === "Gloss Lamination"
                  ? "border-[#3ae180] bg-[#effdf3]"
                  : "border-[#e6e6ed] bg-[#F4F7FA] hover:border-[#3ae180]"
              }
            `}
                            onClick={() =>
                              setSelectedLamination("Gloss Lamination")
                            }
                          >
                            <span className="font-medium text-[#06044B] mb-1">
                              Gloss Lamination
                            </span>
                            <span className="text-sm text-[#A0A0AF] mb-2">
                              Shiny protective coating
                            </span>
                            <span className="text-xs text-[#EE943A] font-semibold">
                              + ₹20
                            </span>
                          </button>
                        </div>
                      )}

                      {activeFinishingTab === "Covers" && (
                        <div className="grid grid-cols-2 gap-4">
                          {/* No Cover */}
                          <button
                            className={`flex flex-col border rounded-xl p-4 text-left transition-colors
              ${
                selectedCover === "No Cover"
                  ? "border-[#3ae180] bg-[#effdf3]"
                  : "border-[#e6e6ed] bg-[#F4F7FA] hover:border-[#3ae180]"
              }
            `}
                            onClick={() => setSelectedCover("No Cover")}
                          >
                            <span className="font-medium text-[#06044B] mb-1">
                              No Cover
                            </span>
                            <span className="text-sm text-[#A0A0AF] mb-2">
                              Document only
                            </span>
                            <span className="text-xs text-[#A0A0AF]">
                              &nbsp;
                            </span>
                          </button>
                          {/* Clear Front Cover */}
                          <button
                            className={`flex flex-col border rounded-xl p-4 text-left transition-colors
              ${
                selectedCover === "Clear Front Cover"
                  ? "border-[#3ae180] bg-[#effdf3]"
                  : "border-[#e6e6ed] bg-[#F4F7FA] hover:border-[#3ae180]"
              }
            `}
                            onClick={() =>
                              setSelectedCover("Clear Front Cover")
                            }
                          >
                            <span className="font-medium text-[#06044B] mb-1">
                              Clear Front Cover
                            </span>
                            <span className="text-sm text-[#A0A0AF] mb-2">
                              Transparent protection
                            </span>
                            <span className="text-xs text-[#EE943A] font-semibold">
                              + ₹5
                            </span>
                          </button>
                          {/* Colored Back Cover */}
                          <button
                            className={`flex flex-col border rounded-xl p-4 text-left transition-colors
              ${
                selectedCover === "Colored Back Cover"
                  ? "border-[#3ae180] bg-[#effdf3]"
                  : "border-[#e6e6ed] bg-[#F4F7FA] hover:border-[#3ae180]"
              }
            `}
                            onClick={() =>
                              setSelectedCover("Colored Back Cover")
                            }
                          >
                            <span className="font-medium text-[#06044B] mb-1">
                              Colored Back Cover
                            </span>
                            <span className="text-sm text-[#A0A0AF] mb-2">
                              Cardstock backing
                            </span>
                            <span className="text-xs text-[#EE943A] font-semibold">
                              + ₹7
                            </span>
                          </button>
                          {/* Front & Back Covers */}
                          <button
                            className={`flex flex-col border rounded-xl p-4 text-left transition-colors
              ${
                selectedCover === "Front & Back Covers"
                  ? "border-[#3ae180] bg-[#effdf3]"
                  : "border-[#e6e6ed] bg-[#F4F7FA] hover:border-[#3ae180]"
              }
            `}
                            onClick={() =>
                              setSelectedCover("Front & Back Covers")
                            }
                          >
                            <span className="font-medium text-[#06044B] mb-1">
                              Front & Back Covers
                            </span>
                            <span className="text-sm text-[#A0A0AF] mb-2">
                              Complete protection
                            </span>
                            <span className="text-xs text-[#EE943A] font-semibold">
                              + ₹15
                            </span>
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Card>

        {/* Bottom Section */}
        <Card className="bg-[#effdf3] border border-[#61e987] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#dffbe7] rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#3ae180]" />
              </div>
              <span className="text-sm font-medium text-[#000000]">
                Total documents: {order.documents.length} &nbsp; | &nbsp; Pages
                count: {getTotalPages()}
              </span>
            </div>
            <Button
              className="bg-[#06044b] hover:bg-[#3822b8] text-white px-6 py-2 rounded-lg"
              disabled={order.documents.length === 0}
              onClick={() =>
                router.push("/print-and-deliver/print/location-selection")
              }
            >
              Select Print Store
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
