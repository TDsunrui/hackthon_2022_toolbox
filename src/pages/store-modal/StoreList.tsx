import Flex from "@cobalt/react-flex";
import Icon from "@cobalt/react-icon";
import Box from "@cobalt/react-box";
import { Text } from "@cobalt/react-typography";
import Spinner from "@cobalt/react-spinner";
import Image from "@cobalt/react-image";
import Popup from "@cobalt/react-popup";

import RIcon from "../components";

import { useAppDispatch } from "@/app/hooks";
import { changeAppStatus, AppStatusEnum, AppType } from "@/slices/global/globalSlice";

import './style.scss';

interface StoreListProps {
  appList: AppType[];
}

function StoreList({ appList } : StoreListProps) {
  const dispatch = useAppDispatch();
  
  const handleClickOperation = (id: string) => {
    const curAppStatus = appList.find((app) => app.id === id)?.status;
    
    switch (curAppStatus) {
      case AppStatusEnum.UNINSTALLED:
        dispatch(changeAppStatus({ id, status: AppStatusEnum.UNINSTALLED_LOADING }));
        setTimeout(() => {
          dispatch(changeAppStatus({ id, status: AppStatusEnum.UNINSTALLED_OK }));
          setTimeout(() => {
            dispatch(changeAppStatus({ id, status: AppStatusEnum.INSTALLED }));
          }, 2000);
        }, 1000);
        break;
      case AppStatusEnum.INSTALLED:
        dispatch(changeAppStatus({ id, status: AppStatusEnum.INSTALLED_LOADING }));
        setTimeout(() => {
          dispatch(changeAppStatus({ id, status: AppStatusEnum.INSTALLED_OK }));
          setTimeout(() => {
            dispatch(changeAppStatus({ id, status: AppStatusEnum.UNINSTALLED }));
          }, 2000);
        }, 1000);
        break;
      default:
        break;
    }
  }
  
  return (
    <>
      {appList.map(({ id, icon, iconColor, name, description, imgSrc, status }) => (
        <Flex key={id} alignY="center" height="60px">
          <Flex className="store-item-left" alignY="center" paddingLeft="6" height="100%">
            <RIcon icon={icon} iconColor={iconColor} size="medium" />

            <Box paddingLeft="4" width="calc(100% - 32px)">
              <Text color="#202830">{name}</Text>
              <Text color="#6F767D" size="small" truncated title={description}>{description}</Text>
            </Box>

            <Popup className="store-item-left-popup" visible>
              <Image style={{ cursor: 'auto' }} src={imgSrc} alt={name} height="100%" />
            </Popup>
          </Flex>

          <Flex
            className={`store-item-right-btn ${status}`}
            alignX="center"
            alignY="center"
            width="90px"
            height="100%"
            onClick={() => handleClickOperation(id)}
          >
            {status === AppStatusEnum.UNINSTALLED && 'Install'}
            {status === AppStatusEnum.INSTALLED && 'Uninstall'}
            {[AppStatusEnum.INSTALLED_LOADING, AppStatusEnum.UNINSTALLED_LOADING].includes(status) && <Spinner />}
            {[AppStatusEnum.INSTALLED_OK, AppStatusEnum.UNINSTALLED_OK].includes(status) && <Icon name="check_circle" size="small" />}
          </Flex>
        </Flex>
      ))}
    </>
  );
}

export default StoreList;
