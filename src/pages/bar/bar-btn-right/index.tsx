import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { closeAppModal, openAppModal } from '@/slices/global/globalSlice';

import './index.scss';

const storeApp = {
  id: 'store',
};

function BarBtnRight() {
  const dispatch = useAppDispatch();
  const { curApp } = useAppSelector((state) => state.global);
  
  const handleOpenStore = () => {
    if (curApp.id === storeApp.id) {
      dispatch(closeAppModal());
    } else {
      dispatch(openAppModal(storeApp));
    }
  };
  
  return (
    <div
      className="bar-btn-right"
      onClick={handleOpenStore}
    >
      ···
    </div>
  );
}

export default BarBtnRight;
