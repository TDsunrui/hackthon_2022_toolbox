import './index.scss';

interface BarBtnLeftProps {
  isFold: boolean;
  onClick: () => void;
}

function BarLeftBtn(props: BarBtnLeftProps) {
  const { isFold, onClick } = props;
  
  return (
    <div className="bar-btn-left" onClick={onClick}>
      {isFold ? '<' : '>'}
    </div>
  );
}

export default BarLeftBtn;
