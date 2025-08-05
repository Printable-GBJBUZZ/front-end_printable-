"use client";

import converterConfig from "@/app/(conversion)/config";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UploadFileForConversion from "./UploadFileForConversion";
import FileUploading from "./FileUploading";
import FileConverting from "./FileConverting";
import FileConverted from "./FileConverted";
import axios from "axios";

export default function Converter() {
	const { source, target } = useParams<{ source: string; target: string }>();
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isConverting, setIsConverting] = useState(false);
	const [conversionDone, setConversionDone] = useState(false);
	const [convertedFileName, setConvertedFileName] = useState("");
	const [convertedFileBlob, setConvertedFileBlob] = useState<Blob | null>(null);

	const router = useRouter();

	const key = source + "-" + target;
	const config = converterConfig[key];

	if (!config) {
		router.replace("/");
		return null;
	}

	const handleMediaDownload = () => {
		if (!convertedFileBlob) return;

		const url = window.URL.createObjectURL(convertedFileBlob);
		const a = document.createElement("a");
		a.href = url;
		a.download = convertedFileName;
		document.body.appendChild(a);
		a.click();
		a.remove();
		window.URL.revokeObjectURL(url);
	};

	useEffect(() => {
		if (!uploadedFile) return;

		setIsUploading(true);
		let progress = 0;

		const interval = setInterval(() => {
			if (progress < 100) {
				progress += 10;
				setUploadProgress(progress);
			}

			if (progress >= 100) {
				setTimeout(() => {
					clearInterval(interval);
					setIsUploading(false);
					setIsConverting(true);
				}, 1000);
			}
		}, 200);

		return () => clearInterval(interval);
	}, [uploadedFile]);

	useEffect(() => {
		// Run the code only when uploaded file exists and is converting is true.
		// Is converting becomes true after uploading state. See the above useEffect
		// If a file is not uploaded so this function will not be called
		if (!isConverting || !uploadedFile) return;

		const convertFile = async () => {
			const formData = new FormData();
			formData.append("fileInput", uploadedFile);
			formData.append("outputFormat", config.outputExtension);

			try {
				const response = await axios.post(`/api/${source}/to/${target}`, formData, {
					responseType: "blob",
					headers: { "Content-Type": "multipart/form-data" },
				});

				const contentDisposition = response.headers["content-disposition"];
				let filename = "converted-file";
				if (contentDisposition) {
					const match = contentDisposition.match(/filename\*?=(?:UTF-8'')?["']?([^"';\n]+)["']?/i);
					if (match && match[1]) {
						filename = decodeURIComponent(match[1]);
					}
				}

				setConvertedFileBlob(new Blob([response.data]));
				setConvertedFileName(filename);
				setConversionDone(true);
				setIsConverting(false);
			} catch (err) {
				console.error("Conversion failed:", err);
				alert("Conversion failed.");
				setIsConverting(false);
			}
		};

		convertFile();
	}, [isConverting, uploadedFile]);

	if (!uploadedFile) {
		return <UploadFileForConversion onFileSelected={(file) => setUploadedFile(file)} />;
	}

	if (isUploading) {
		return <FileUploading progress={uploadProgress} fileName={uploadedFile.name} />;
	}

	if (isConverting) {
		return <FileConverting fileName={uploadedFile.name} />;
	}

	if (conversionDone && uploadedFile) {
		return <FileConverted fileName={convertedFileName} onDownload={handleMediaDownload} />;
	}

	return null;
}
