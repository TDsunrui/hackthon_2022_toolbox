import Tooltip, { PositionCenterBottom } from "@cobalt-marketplace/react-tooltip";
import Flex from "@cobalt/react-flex";
import Button from "@cobalt/react-button";
import Icon from "@cobalt/react-icon";
import { Text } from "@cobalt/react-typography";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeCurPage, PageType, useInstalledAppList } from "@/slices/global/globalSlice";

const appMap: { [key: string]: PageType } = {
  'Phone': 'call-modal',
  'Chat': 'chat-modal',
};

interface ShortcurButtonsProps {
  appletsBtnRef: (n: HTMLButtonElement) => void;
  phoneBtnRef?: (n: HTMLDivElement) => void;
  chatBtnRef?: (n: HTMLDivElement) => void;
}

function NavBar(props: ShortcurButtonsProps) {
  const { appletsBtnRef, phoneBtnRef, chatBtnRef } = props;

  const dispatch = useAppDispatch();
  const { curPage } = useAppSelector((state) => state.global);
  const installedAppList = useInstalledAppList();

  const handleClickInstalledAppBtn = (page: PageType) => {
    dispatch(changeCurPage(page));
  };
  
  const handleClickAppletsBtn = () => {
    if (!['applets-modal', 'store-modal'].includes(curPage)) {
      return dispatch(changeCurPage('applets-modal'));
    }
    dispatch(changeCurPage('none'));
  };
  
  return (
    <Flex style={{ position: 'absolute', right: '68px', top: '4px' }} gap="2">
      <Flex gap="2">
        {installedAppList.map((app) => (
          <Tooltip key={app.id} label={app.name} variation="dark" position={PositionCenterBottom}>
            <Button
              shape="compact"
              size="small"
              onClick={() => handleClickInstalledAppBtn(appMap[app.name] || 'none')}
            >
              <Icon name={app.icon} size="tiny" />
            </Button>
          </Tooltip>
        ))}
      </Flex>
      
      <Button
        forwardedRef={appletsBtnRef}
        size="small"
        onClick={handleClickAppletsBtn}
      >
        <Flex alignY="center" gap="1">
          <Icon name="extension" size="tiny" />
          <Text>Applets</Text>
        </Flex>
      </Button>
    </Flex>
  );
}

export default NavBar;
