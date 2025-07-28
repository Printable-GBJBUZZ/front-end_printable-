"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { CiShare2 } from "react-icons/ci";
import { GoArrowBoth } from "react-icons/go";
import { MdOutlineFileDownload, MdOutlineFileUpload } from "react-icons/md";
import { PiPrinterBold } from "react-icons/pi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { SlArrowDown } from "react-icons/sl";

const dropdownOptionsDownload = [
	{ label: "Compress (.pdf)", ext: ".pdf" },
	{ label: "Word (.docx)", ext: ".docx" },
	{ label: "Excel (.xlsx)", ext: ".xlsx" },
	{ label: "PowerPoint (.pptx)", ext: ".pptx" },
	{ label: "Image (.jpg)", ext: ".jpg" },
];

const dropdownOptionsExport = [
	{ label: "Compress (.pdf)" },
	{ label: "Save to Printable" },
	{ label: "Save to Dropbox" },
	{ label: "Save to Google Drive" },
];

type Props = {
	fileName: string;
	onDownload: () => void;
};

export default function FileConverted({ fileName, onDownload }: Props) {
	const { source, target } = useParams<{ source: string; target: string }>();
	const [downloadOpen, setDownloadOpen] = useState(false);
	const [exportOpen, setExportOpen] = useState(false);

	const downloadRef = useRef(null);
	const exportRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (downloadRef.current && !(downloadRef.current as any).contains(event.target)) {
				setDownloadOpen(false);
			}
			if (exportRef.current && !(exportRef.current as any).contains(event.target)) {
				setExportOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<>
			<h1 className="flex items-center justify-center gap-2 bg-[#FFFFFF] font-bold text-[24px] px-2 h-[40px]">
				<span className="uppercase">{source}</span>
				<GoArrowBoth />
				<span className="uppercase">{target}</span>
			</h1>

			<div className="flex flex-row bg-[#E6E6ED] relative">
				<div className="flex flex-col items-center w-full mt-[130px]">
					{target === "word" && <Image alt="image" src="/Worddoc.png" width={229} height={275} />}
					{target === "ppt" && <Image alt="image" src="/pptformat.png" width={229} height={275} />}
					{target === "excel" && <Image alt="image" src="/xmlformat.png" width={229} height={275} />}
					{target === "image" && <Image alt="image" src="/jpgformat.png" width={229} height={275} />}
					<p className="text-[14px]">{fileName}</p>
				</div>

				<div className="flex flex-col gap-2 p-4 w-[480px] h-[930px] bg-[#DFFBE7] pt-24">
					<p>
						<span className="font-bold border-b-2 border-dashed">{fileName}</span>
					</p>

					{/* DOWNLOAD BUTTON + DROPDOWN */}
					<div className="relative" ref={downloadRef}>
						<div className="flex mt-4">
							<button
								onClick={onDownload}
								className="cursor-pointer flex gap-2 items-center justify-center bg-[#06044B] text-white border-r-2 border-white rounded-l-lg text-[14px] w-[287px] h-[45px]">
								<MdOutlineFileDownload />
								Download
							</button>
							<button
								onClick={() => setDownloadOpen(!downloadOpen)}
								className="w-[50px] h-[45px] bg-[#06044B] text-white rounded-r-lg flex justify-center items-center">
								<SlArrowDown className="hover:rotate-180 transition-transform duration-300" />
							</button>
						</div>
						{downloadOpen && (
							<div className="absolute bg-white shadow-lg border rounded-lg mt-2 w-[337px] z-50">
								{dropdownOptionsDownload.map((item, idx) => (
									<div key={item.label}>
										<button className="w-full text-left px-4 py-2 hover:bg-[#06044B] hover:text-white text-sm">
											{item.label}
										</button>
										{idx < dropdownOptionsDownload.length - 1 && <hr className="border-gray-200" />}
									</div>
								))}
							</div>
						)}
					</div>

					<p className="text-center">or</p>

					{/* PRINT */}
					<button className="flex gap-2 items-center justify-center bg-[#06044B] text-white border-r-2 border-white rounded-lg text-[14px] w-[338px] h-[45px]">
						<PiPrinterBold />
						Print
					</button>

					{/* EXPORT BUTTON + DROPDOWN */}
					<div className="relative" ref={exportRef}>
						<button
							onClick={() => setExportOpen(!exportOpen)}
							className="group flex gap-2 items-center justify-center hover:bg-[#06044B] hover:text-white border-2 border-[#06044B] rounded-lg text-[14px] w-[338px] h-[45px]">
							<MdOutlineFileUpload />
							Export
							<SlArrowDown />
						</button>
						{exportOpen && (
							<div className="absolute bg-white shadow-lg border rounded-lg mt-2 w-[338px] z-50">
								{dropdownOptionsExport.map((item, idx) => (
									<div key={item.label}>
										<button className="w-full text-left px-4 py-2 hover:bg-[#06044B] hover:text-white text-sm">
											{item.label}
										</button>
										{idx < dropdownOptionsExport.length - 1 && <hr className="border-gray-200" />}
									</div>
								))}
							</div>
						)}
					</div>

					{/* SHARE + DELETE */}
					<div className="flex gap-2 w-[338px]">
						<button className="border-2 w-1/2 h-[45px] rounded-lg border-[#06044B] hover:bg-[#06044B] flex justify-center items-center text-[#06044B] hover:text-white">
							<CiShare2 />
						</button>
						<button className="border-2 w-1/2 h-[45px] rounded-lg border-[#06044B] hover:bg-[#06044B] text-[#06044B] hover:text-white flex justify-center items-center">
							<RiDeleteBin5Line />
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
