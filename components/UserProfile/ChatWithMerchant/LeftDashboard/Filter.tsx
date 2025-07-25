import Image from "next/image";
function Filter() {
  return (
    <button
      type="button"
      className="flex items-center justify-center bg-white rounded-[10px] border border-[#B6B6B6] px-4 py-2 gap-2 text-inter font-normal"
    >
      <span className="text-black">Filter</span>
      <Image
        src="/MerchantChatPage/Tune.png"
        alt="Filter Icon"
        width={20}
        height={20}
      />
    </button>
  );
}
export default Filter;
