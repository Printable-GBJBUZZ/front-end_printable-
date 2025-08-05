"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { GoArrowBoth, GoArrowRight } from "react-icons/go";

type Props = {
	fileName: string;
};

export default function FileConverting({ fileName }: Props) {
	const { source, target } = useParams<{ source: string; target: string }>();
	return (
		<>
			<h1 className="flex items-center gap-2 bg-[#FFFFFF] font-bold text-[24px] px-2 h-[40px] uppercase">
				{source} <GoArrowBoth />
				<span className="uppercase">{target}</span>
			</h1>
			<main className="min-h-screen flex flex-col items-center justify-center bg-[#E6E6ED] p-4">
				<div className="text-center flex flex-col items-center justify-center">
					<div className="flex items-center gap-4 mb-2">
						{source === "pdf" && <Image alt="image" src="/pdfformat.png" width={229} height={275} />}
						{source === "word" && <Image alt="image" src="/Worddoc.png" width={229} height={275} />}
						{source === "ppt" && <Image alt="image" src="/pptformat.png" width={229} height={275} />}
						{source === "excel" && <Image alt="image" src="/xmlformat.png" width={229} height={275} />}
						{source === "image" && <Image alt="image" src="/jpgformat.png" width={229} height={275} />}
						<div className="bg-[#2B3F6C] rounded-full p-4">
							<GoArrowRight className="text-white text-[14px]" />
						</div>
						{target === "pdf" && <Image alt="image" src="/pdfformat.png" width={229} height={275} />}
						{target === "word" && <Image alt="image" src="/Worddoc.png" width={229} height={275} />}
						{target === "ppt" && <Image alt="image" src="/pptformat.png" width={229} height={275} />}
						{target === "excel" && <Image alt="image" src="/xmlformat.png" width={229} height={275} />}
						{target === "image" && <Image alt="image" src="/jpgformat.png" width={229} height={275} />}
					</div>
					{fileName && <p className="text-[#555555] text-[14px] mb-2">{fileName}</p>}
					<div className="text-[24px] mb-2">
						<span>Converting to </span>
						<span>
							{target.substring(0, 1).toUpperCase()}
							{target.substring(1).toLowerCase()}
						</span>
					</div>
					<div className="flex flex-col items-center justify-center">
						<div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
						<p className="text-gray-700">Converting the file...</p>
					</div>
				</div>
			</main>
		</>
	);
}
