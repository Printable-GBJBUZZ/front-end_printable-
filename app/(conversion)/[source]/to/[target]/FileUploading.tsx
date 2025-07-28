"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { GoArrowBoth } from "react-icons/go";

type Props = {
	progress: number;
	fileName: string;
};

export default function FileUploading({ progress, fileName }: Props) {
	const { source, target } = useParams<{ source: string; target: string }>();

	return (
		<>
			<h1 className="flex items-center justify-center gap-2 bg-[#FFFFFF] font-bold text-[24px] px-2 h-[40px]">
				<span className="uppercase">{source}</span>
				<GoArrowBoth />
				<span className="uppercase">{target}</span>
			</h1>
			<main className="min-h-screen flex flex-col items-center justify-center bg-[#E6E6ED] p-4">
				<div className="text-center flex flex-col items-center justify-center">
					<Image alt="image" src="/pdfformat.png" width={229} height={275} />
					{fileName && <p className="text-[#555555] text-[14px] mb-2">{fileName}</p>}
					<div className="text-[24px]">Uploading ...</div>
					<div className="w-[450px] h-[15px] bg-gray-300 rounded-full overflow-hidden">
						<div
							className="h-full bg-gradient-to-r from-[#06044B] to-[#61E987] transition-all duration-200"
							style={{ width: `${progress}%` }}></div>
					</div>

					<div className="text-sm text-gray-600 mt-2">{progress}%</div>
				</div>
			</main>
		</>
	);
}
