import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface TabProps {
  text: string;
  image: string;
  link: string;
}

const Tab: FC<TabProps> = ({ text, image, link }) => {
  return (
    // <Link href={link}>
    <div className="p-5 border rounded-2xl active:scale-[0.9] transition-all duration-300">
      <div className="flex justify-around">
        <div>
          {/* <Image width={10} height={10} alt={'icon'} src={image} /> */}
        </div>
        <div>{text}</div>
      </div>
    </div>
    // </Link>
  );
};

export default Tab;
