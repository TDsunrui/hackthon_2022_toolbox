import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { AppType, closeAppModal, openAppModal } from '@/slices/global/globalSlice';

import './index.scss';

interface BarAppListProps {
  width: number;
  data: AppType[];
}

function BarAppList (props: BarAppListProps) {
  const { width, data } = props;

  const dispatch = useAppDispatch();
  const { curApp } = useAppSelector((state) => state.global);

  const handleOpenModal = (app: AppType) => {
    if (app.id === curApp.id) {
      dispatch(closeAppModal());
    } else {
      dispatch(openAppModal(app));
    }
  };
  
  return (
    <div className="bar-app-list-container" style={{ width }}>
      <div className="bar-app-list">
        {data.map((app, index) => (
          <div className="bar-app-item" key={index} onClick={() => handleOpenModal(app)}>
            {app.id}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BarAppList;
