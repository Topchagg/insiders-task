'use client';

import { useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';

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

    const updatedTabs = [...tabs];
    const [movedTab] = updatedTabs.splice(result.source.index, 1);
    updatedTabs.splice(result.destination.index, 0, movedTab);

    setTabs(updatedTabs);
    localStorage.setItem('tabs', JSON.stringify(updatedTabs));
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
      <header className="w-[95%] m-auto pt-10 overflow-hidden h-[200px]">
        <div className="flex border p-1 md:p-5 justify-around bg-blue-50">
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
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Tab {...tab} onPin={handlePinToggle} />
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
              onClick={() => setIsShowMenu(true)}
              className="text-[10px] md:text-[16px] border rounded-4xl p-1 md:p-2 bg-black text-white cursor-pointer active:scale-[0.9] transition-all duration-300"
            >
              Hidden tabs
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
