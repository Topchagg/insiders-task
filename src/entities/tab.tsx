'use client';

import { FC, useState, MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TabProps } from '@/types/tabInterface';

interface TabComponentProps extends TabProps {
  onPin: (text: string) => void;
}

const Tab: FC<TabComponentProps> = ({ text, image, link, isPinned, onPin }) => {
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
  const [showText, setShowText] = useState<boolean>(false);

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setShowContextMenu(!showContextMenu);
  };

  const handlePinClick = () => {
    onPin(text);
    setShowContextMenu(false);
  };

  const containerClasses = `
    w-[100px] sm:w-[160px] md:w-[120px] h-[50px]
    border rounded-md flex items-center gap-2 px-3 py-2
    transition-all duration-300 cursor-pointer hover:scale-95 active:bg-gray-300 overflow-hidden
    ${isPinned ? 'bg-gray-200 border-red-400' : 'bg-white border-gray-300'}
  `;

  const imageClasses = isPinned ? 'w-[50px] h-[50px] m-auto' : '';

  return (
    <div
      onContextMenu={handleContextMenu}
      className="relative"
      onMouseEnter={() => setShowText(true)}
      onMouseLeave={() => setShowText(false)}
    >
      <Link href={link}>
        <div className={containerClasses}>
          <Image
            className={imageClasses}
            width={24}
            height={24}
            alt="icon"
            src={image}
          />
          {!isPinned && <span className="text-xs sm:text-sm">{text}</span>}
        </div>
      </Link>

      {showContextMenu && (
        <div
          className="absolute top-full left-0 mt-1 bg-white border shadow-md rounded px-3 py-1 text-sm z-50 cursor-pointer"
          onClick={handlePinClick}
        >
          {isPinned ? 'Unpin' : 'Pin'}
        </div>
      )}

      {showText && isPinned && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-black text-white text-xs rounded px-2 py-1 ">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tab;
