'use client';

import { useState } from 'react';

interface TabProps {
  text: string;
  image: string;
  link: string;
}

import Tab from '@/entities/tab';

const mockData: TabProps[] = [
  {
    text: 'Google',
    image: 'Image',
    link: 'https//Google.com',
  },
  {
    text: 'Google',
    image: 'Image',
    link: 'https//Google.com',
  },
  //   {
  //     text: 'Google',
  //     image: 'Image',
  //     link: 'https//Google.com',
  //   },
  //   {
  //     text: 'Google',
  //     image: 'Image',
  //     link: 'https//Google.com',
  //   },
  //   {
  //     text: 'Google',
  //     image: 'Image',
  //     link: 'https//Google.com',
  //   },
  //   {
  //     text: 'Google',
  //     image: 'Image',
  //     link: 'https//Google.com',
  //   },
  //   {
  //     text: 'Google',
  //     image: 'Image',
  //     link: 'https//Google.com',
  //   },
  //   {
  //     text: 'Google',
  //     image: 'Image',
  //     link: 'https//Google.com',
  //   },
  //   {
  //     text: 'Google',
  //     image: 'Image',
  //     link: 'https//Google.com',
  //   },
  //   {
  //     text: 'Google',
  //     image: 'Image',
  //     link: 'https//Google.com',
  //   },
];

const Header = () => {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);

  if (!isShowMenu) {
    return (
      <header className="w-[90%] m-0 m-auto pt-10 text-[10px]">
        <div className="flex border p-5 justify-around">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
            {mockData.map((item, index) => (
              <div key={index}>
                <Tab {...item} />
              </div>
            ))}
          </div>
          <button
            onClick={() => setIsShowMenu(!isShowMenu)}
            className="border rounded-4xl p-3 bg-black text-white cursor-pointer active:scale-[0.9] transition-all duration-300"
          >
            All tabs
          </button>
        </div>
      </header>
    );
  }
  return (
    <div className="absolute left-0 bottom-0 h-[100vh] w-[100%] bg-black opacity-80 text-white">
      <div className="flex justify-around items-center">
        <div className="text-center text-[24px] pt-5 pb-5">All tabs</div>
        <div
          className="text-[36px] active:text-red-800 active:scale-[0.9] transition-all duration-300"
          onClick={() => setIsShowMenu(!isShowMenu)}
        >
          X
        </div>
      </div>
      <div className="w-[90%] m-0 m-auto grid grid-cols-1 gap-5">
        {mockData.map((item, index) => (
          <div key={index}>
            <Tab {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
