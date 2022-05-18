import { useAppSelector } from '@/app/hooks';
import './index.scss';

interface OperationModalProps {
  style: React.CSSProperties;
}

function OperationModal({ style }: OperationModalProps) {
  const { curApp } = useAppSelector((state) => state.global);
  
  return (
    <div className="operation-modal-container" style={style}>
      {curApp.id}
    </div>
  );
}

export default OperationModal;
