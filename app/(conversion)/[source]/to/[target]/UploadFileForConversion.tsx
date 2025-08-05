"use client";

import converterConfig from "@/app/(conversion)/config";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";
import { FaChevronDown, FaFileAlt } from "react-icons/fa";

type TProps = {
	onFileSelected: (file: File) => void;
};

const UploadFileForConversion = ({ onFileSelected }: TProps) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const { source, target } = useParams<{ source: string; target: string }>();
	const [dragOver, setDragOver] = useState(false);

	const config = converterConfig[`${source}-${target}`] || {
		heading: "Unknown Converter",
		supportedFormats: "",
		description: "Unsupported conversion type.",
		allowedExtensions: "",
		outputExtension: "",
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			onFileSelected(file);
		}
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragOver(false);
		const file = e.dataTransfer.files?.[0];
		if (file) {
			onFileSelected(file);
		}
	};

	const handleFromDeviceClick = () => {
		fileInputRef.current?.click();
	};

	const handleFromDriveClick = () => {
		alert("Google Drive upload not implemented.");
	};

	return (
		<div
			className="w-full min-h-screen bg-white flex flex-col items-center py-6 px-4 font-[Poppins]"
			onDragOver={(e) => {
				e.preventDefault();
				setDragOver(true);
			}}
			onDragLeave={() => setDragOver(false)}
			onDrop={handleDrop}>
			<h1 className="text-2xl md:text-3xl font-bold text-[#06044B] mb-6 mt-4">{config.heading}</h1>

			<label
				htmlFor="file-upload"
				className={`cursor-pointer relative z-20 w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 border border-gray-200 transition-colors ${
					dragOver ? "bg-gray-100 border-[#06044B]" : ""
				}`}>
				<div className="bg-[#F3F3F3] border-[3px] border-dashed border-[#06044B] rounded-2xl p-10 text-center hover:bg-[#e6e6e6] transition-all">
					<p className="text-gray-700 font-medium mb-6 text-base">Drag & Drop your file here</p>

					<div className="flex items-center justify-center w-full mb-5">
						<div className="border-t border-gray-300 flex-grow mr-2" />
						<span className="text-gray-500 text-sm">or</span>
						<div className="border-t border-gray-300 flex-grow ml-2" />
					</div>

					<div className="group relative inline-block">
						<div className="bg-[#06044B] text-white px-6 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
							<FaFileAlt />
							Choose Files
							<div className="h-6 border-l border-white mx-2 self-stretch" />
							<FaChevronDown className="text-lg transition-transform duration-300 group-hover:rotate-180" />
						</div>

						<div className="absolute left-0 top-full mt-2 w-48 bg-white border shadow-lg rounded-lg z-50 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity duration-300">
							<button
								className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#06044B] hover:text-white transition-all duration-500"
								onClick={(e) => {
									e.preventDefault();
									handleFromDeviceClick();
								}}>
								From Device
							</button>
							<button
								className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#06044B] hover:text-white transition-all duration-500"
								onClick={(e) => {
									e.preventDefault();
									handleFromDriveClick();
								}}>
								From Google Drive
							</button>
						</div>
					</div>

					<p className="mt-4 text-xs text-gray-500">
						Supported formats: {config.supportedFormats}
						<br />
						Max file size: 50MB
					</p>
				</div>
			</label>

			<input
				type="file"
				id="file-upload"
				ref={fileInputRef}
				className="hidden"
				accept={config.allowedExtensions}
				onChange={handleFileChange}
			/>

			<p className="mt-6 text-left max-w-2xl text-gray-600 text-sm md:text-base">{config.description}</p>
		</div>
	);
};

export default UploadFileForConversion;
