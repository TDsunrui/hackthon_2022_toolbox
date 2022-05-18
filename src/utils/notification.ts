import { notification as _notification } from 'antd';

export default function notification(message: string) {
  return _notification.success({
    message,
    placement: 'bottomRight',
    duration: 2.5,
  });
}
