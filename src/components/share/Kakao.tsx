import React from "react";
import { Button } from "../ui/button";

// 카카오 아이콘 SVG
const KakaoIcon = () => (
  <svg
    width="18"
    height="18"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M11.9.1C5.3.1.1 4.5.1 9.8c0 3.1 1.7 5.8 4.2 7.5-.2.8-.7 2.9-.8 3.3-.2.3 0 .5.2.5.2 0 .4-.1.6-.2 2.8-1.5 5-3.6 5.6-4.2.6-.1 1.1-.1 1.7-.1 6.6 0 11.8-4.4 11.8-9.7C23.7 4.5 18.5.1 11.9.1Z" />
  </svg>
);

const KakaoShareButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      size={"icon"}
      onClick={onClick}
      className="size-5 cursor-pointer bg-[#d6b585] p-3 bg-[#FEE500]
text-black
hover:bg-[#FADA0A]
transition-colors
duration-300
ease-in-out"
    >
      <KakaoIcon />
    </Button>
  );
};

export default KakaoShareButton;
