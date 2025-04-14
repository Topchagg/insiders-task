'use client';

import { Dispatch, FC, SetStateAction } from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { TabProps } from '@/types/tabInterface';
import Tab from '@/entities/tab';

interface HiddenTabsProps {
  setFunction: Dispatch<SetStateAction<boolean>>;
  tabs: TabProps[];
  itemsAmount: number;
  onPin: (text: string) => void;
  currentPathname?: string;
}

const HiddenTabs: FC<HiddenTabsProps> = ({
  setFunction,
  itemsAmount,
  tabs,
  onPin,
  currentPathname,
}) => {
  return (
    <div className="absolute right-10 mt-2 bg-white rounded-lg shadow-lg z-50 w-[250px] max-h-[400px] overflow-y-auto p-2">
      <div className="font-semibold text-gray-700 text-center py-2"></div>
      <Droppable droppableId="tabs-hidden" direction="vertical">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col gap-2 w-[100%]"
          >
            {tabs.slice(itemsAmount).map((item, index) => {
              if (item.isPinned) {
                return (
                  <div
                    key={item.text}
                    className="m-0 m-auto opacity-70 pb-8 cursor-default w-[100%]"
                  >
                    <Tab
                      currentPath={currentPathname}
                      {...item}
                      onPin={onPin}
                    />
                  </div>
                );
              }

              return (
                <Draggable
                  key={item.text}
                  draggableId={item.text + '-hidden'}
                  index={index + itemsAmount}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="m-0 m-auto w-[100%] "
                    >
                      <Tab
                        currentPath={currentPathname}
                        {...item}
                        onPin={onPin}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button
        onClick={() => setFunction(false)}
        className="w-full mt-2 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
      >
        Close
      </button>
    </div>
  );
};

export default HiddenTabs;
