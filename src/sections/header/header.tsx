'use client';

import { useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';

import { usePathname } from 'next/navigation';
import Image from 'next/image';

import Tab from '@/entities/tab';
import HiddenTabs from './components/hiddenTabs';

import useScreenSize from '@/customHooks/useGetWidth';
import mockTabs from './mockData/mockTabs';
import { TabProps } from '@/types/tabInterface';

const Header = () => {
  const [tabs, setTabs] = useState<TabProps[]>(mockTabs);
  const [itemsAmount, setItemsAmount] = useState(2);
  const [isShowMenu, setIsShowMenu] = useState(false);

  const width = useScreenSize();
  const pathname = usePathname();

  useEffect(() => {
    const getAmountByWidth = () => {
      if (width < 768) return 2;
      if (width < 1024) return 4;
      if (width < 1280) return 6;
      return 10;
    };

    const newAmount = getAmountByWidth();
    setItemsAmount(newAmount);

    if (newAmount >= tabs.length) setIsShowMenu(false);
  }, [width, tabs.length]);

  useEffect(() => {
    const savedTabs = localStorage.getItem('tabs');
    if (savedTabs) {
      setTabs(JSON.parse(savedTabs));
    }
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = [...tabs];
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    const pinned = items.filter((tab) => tab.isPinned);
    const unpinned = items.filter((tab) => !tab.isPinned);
    const reordered = [...pinned, ...unpinned];

    setTabs(reordered);
    localStorage.setItem('tabs', JSON.stringify(reordered));
  };

  const handlePinToggle = (text: string) => {
    const updatedTabs = tabs.map((tab) =>
      tab.text === text ? { ...tab, isPinned: !tab.isPinned } : tab
    );

    const reordered = [
      ...updatedTabs.filter((tab) => tab.isPinned),
      ...updatedTabs.filter((tab) => !tab.isPinned),
    ];

    setTabs(reordered);
    localStorage.setItem('tabs', JSON.stringify(reordered));
  };

  const visibleTabs = tabs.slice(0, itemsAmount);
  const hasHiddenTabs = itemsAmount < tabs.length;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <header className="w-[95%] m-auto pt-10 h-[200px] text-black">
        <div className="flex p-1 md:p-5 justify-center items-center bg-blue-50">
          <Droppable droppableId="tabs" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex"
              >
                {visibleTabs.map((tab, index) =>
                  tab.isPinned ? (
                    <div key={tab.text}>
                      <Tab {...tab} onPin={handlePinToggle} />
                    </div>
                  ) : (
                    <Draggable
                      key={tab.text}
                      draggableId={tab.text}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="w-[125px]"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Tab
                            {...tab}
                            onPin={handlePinToggle}
                            currentPath={pathname}
                          />
                        </div>
                      )}
                    </Draggable>
                  )
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {hasHiddenTabs && (
            <button
              onClick={() => setIsShowMenu(!isShowMenu)}
              className="text-sm w-[50px] h-[50px] flex justify-center items-center p-2 cursor-pointer active:scale-95 transition-all duration-300"
            >
              <Image
                className="w-[30px] h-[30px] bg-[#4690E2]"
                height={30}
                width={30}
                src={'/icons/up-arrow.svg'}
                alt="up arrow"
              />
            </button>
          )}
        </div>

        {isShowMenu && (
          <HiddenTabs
            onPin={handlePinToggle}
            itemsAmount={itemsAmount}
            tabs={tabs}
            setFunction={setIsShowMenu}
          />
        )}
      </header>
    </DragDropContext>
  );
};

export default Header;
