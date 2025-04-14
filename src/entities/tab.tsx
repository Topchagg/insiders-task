import { FC, useState, MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TabProps } from '@/types/tabInterface';

interface TabComponentProps extends TabProps {
  onPin: (text: string) => void;
}

const Tab: FC<TabComponentProps> = ({
  text,
  image,
  link,
  isPinned,
  onPin,
  currentPath,
}) => {
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

  const isActive = currentPath === link;

  const containerClasses = `
    w-[100%] h-[50px] flex items-center gap-2 px-3 py-2 hover:bg-gray-300 color-gray
    transition-all duration-300 cursor-pointer active:bg-[#7F858D] overflow-hidden
    ${isActive ? 'bg-blue-50 border-t-blue-400 border-t-2' : 'bg-white'}
  `;

  const imageClasses = isPinned ? 'w-[32px] h-[32px] m-auto' : '';

  return (
    <div
      onContextMenu={handleContextMenu}
      className="relative"
      onMouseEnter={() => setShowText(true)}
      onMouseLeave={() => setShowText(false)}
    >
      <Link href={link}>
        <div className={`${containerClasses} `}>
          <Image
            className={imageClasses}
            width={isPinned ? 40 : 24}
            height={isPinned ? 40 : 24}
            alt="icon"
            src={image}
          />

          {!isPinned && <span className="text-xs sm:text-sm">{text}</span>}
        </div>
      </Link>

      {showContextMenu && (
        <div
          className="absolute top-full left-0 mt-1 w-[100px] bg-white border shadow-md rounded px-3 py-1 text-sm z-50 cursor-pointer"
          onClick={handlePinClick}
        >
          <div className="flex justify-around items-center text-[#7F858D]">
            <div>
              <Image width={15} height={15} alt="" src={'/icons/pin.svg'} />
            </div>
            <div>{isPinned ? 'Unpin' : 'Pin'}</div>
          </div>
        </div>
      )}

      {showText && isPinned && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-black text-white text-xs rounded px-2 py-1">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tab;
