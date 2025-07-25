import Image from "next/image";
import { useState } from "react";
import SearchIcon from "@/icons/chat/SearchIcons";

type SearchProps = {
  onSearchChange: (query: string) => void;
};

function Search({ onSearchChange }: SearchProps) {
  const [data, setData] = useState<string>("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setData(value);
    onSearchChange(value);
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center w-full bg-white rounded-[10px] border border-[#B6B6B6] px-[15px] py-[10px] mr-2">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search..." 
          className="flex-1 bg-transparent outline-none text-black placeholder-gray-400 text-inter font-normal ml-[12px]"
          onChange={handleChange}
          value={data}
        />
      </div>
    </div>
  );
}

export default Search;
