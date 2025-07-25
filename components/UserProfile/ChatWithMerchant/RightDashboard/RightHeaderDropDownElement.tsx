function RightHeaderDropDownElement({text}: {text: string}) {
  return (
    <span className="text-[#555555] font-inter text-base w-full px-2 py-1 rounded-md hover:font-medium hover:bg-[#CDCDDB] transition-all duration-200 cursor-pointer">
      {text}
    </span>
  );
}
export default RightHeaderDropDownElement;