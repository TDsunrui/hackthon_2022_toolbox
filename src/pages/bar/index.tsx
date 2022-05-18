import { useEffect, useMemo, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import BarAppList from './bar-app-list';
import BarLeftBtn from './bar-btn-left';
import BarBtnRight from './bar-btn-right';
import OperationModal from '../operation-modal';

import { useAppSelector } from '@/app/hooks';
import { AppType } from '@/slices/global/globalSlice';

import './index.scss';

const appList: AppType[] = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
  { id: '5' },
  { id: '6' },
];

function Bar() {
  const { curApp } = useAppSelector((state) => state.global);
  
  const [isFold, setIsFold] = useState(true);
  const [position, setPosition] = useState({ top: 10, right: 10 });

  const [{ isDragging }, drag] = useDrag({
    type: 'barButtom',
    item: {
      name: 'Bar Buttom',
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'barButtom',
    drop: (item, monitor) => {
      const differenceFromInitialOffset = monitor.getDifferenceFromInitialOffset()!;
      setPosition(({ top, right }) => ({
        top: top + differenceFromInitialOffset?.y,
        right: right - differenceFromInitialOffset?.x,
      }));
    },
    collect: (monitor) => monitor,
  });

  const barAppListWidth = useMemo(() => {
    const barAppListWidth = 5 + (5 + 30) * appList.slice(0, isFold ? 3 : 6).length;
    return barAppListWidth;
  }, [isFold]);

  useEffect(() => {
    drop(document.body);
  }, [drop]);

  if (isDragging) return <div ref={drag} />;
  
  return (
    <>
      <div
        ref={drag}
        className="bar-container"
        style={{ top: position.top, right: position.right }}
      >
        <BarLeftBtn isFold={isFold} onClick={() => setIsFold((isFold) => !isFold)} />

        <BarAppList width={barAppListWidth} data={appList} />

        <BarBtnRight />
      </div>

      {curApp.id && <OperationModal style={{ top: position.top + 44, right: position.right }} />}
    </>
  );
}

export default Bar;
