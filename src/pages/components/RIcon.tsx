import Icon, { Name } from "@cobalt/react-icon";
import Image from "@cobalt/react-image";

import whatsAppSrc from '../../assets/images/whatsapp.png';
import tikTokSrc from '../../assets/images/tiktok.png';
import baiduSrc from '../../assets/images/baidu.png';

interface RIconProps {
  icon: Name;
  iconColor?: React.CSSProperties['color'];
  size: "micro" | "tiny" | "small" | "medium" | "large" | "xlarge";
}

function RIcon(props: RIconProps) {
  const { icon, iconColor, size } = props;

  let width = '';
  if (size === 'tiny') width = '20px';
  if (size === 'medium') width = '32px';
  
  let pngSrc = '';
  if (icon === 'calendar_medical') pngSrc = whatsAppSrc;
  if (icon === 'account_balance_wallet') pngSrc = tikTokSrc;
  if (icon === 'account_box') pngSrc = baiduSrc;
  
  return pngSrc ? (
    <Image src={pngSrc} alt={icon} width={width} height={width} />
  ) : (
    <Icon name={icon} size={size} color={iconColor} />
  );
}

export default RIcon;
