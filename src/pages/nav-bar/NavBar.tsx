import Tooltip, { PositionCenterBottom } from "@cobalt-marketplace/react-tooltip";
import Flex from "@cobalt/react-flex";
import Box from "@cobalt/react-box";
import Button from "@cobalt/react-button";
import Icon from "@cobalt/react-icon";
import { Text } from "@cobalt/react-typography";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeCurPage, PageType, useInstalledAppList } from "@/slices/global/globalSlice";
import PhoneModal from "../phone-modal";
import ChatModal from "../chat-modal";

const appMap: { [key: string]: PageType } = {
  '3': 'phone-modal',
  '2': 'chat-modal',
};

interface ShortcurButtonsProps {
  forwardedRef: (n: HTMLButtonElement) => void;
}

function NavBar(props: ShortcurButtonsProps) {
  const { forwardedRef } = props;

  const dispatch = useAppDispatch();
  const { curPage } = useAppSelector((state) => state.global);
  const installedAppList = useInstalledAppList();

  const handleClickInstalledAppBtn = (page: PageType) => {
    if (curPage === page) {
      return dispatch(changeCurPage('none'));
    }
    dispatch(changeCurPage(page));
  };
  
  const handleClickAppletsBtn = () => {
    if (!['applets-modal', 'store-modal'].includes(curPage)) {
      return dispatch(changeCurPage('applets-modal'));
    }
    dispatch(changeCurPage('none'));
  };
  
  return (
    <Flex forwardedRef={forwardedRef} style={{ position: 'absolute', right: '68px', top: '4px' }} gap="2">
      <Flex gap="2">
        {installedAppList.map((app) => (
          <Box key={app.id} style={{ position: 'relative' }}>
            <Tooltip key={app.id} label={app.name} variation="dark" position={PositionCenterBottom}>
              <Button
                shape="compact"
                size="small"
                onClick={() => handleClickInstalledAppBtn(appMap[app.id] || 'none')}
              >
                <Icon name={app.icon} size="tiny" />
              </Button>
            </Tooltip>
            
            {curPage === 'phone-modal' && <PhoneModal app={app} />}

            {curPage === 'chat-modal' && <ChatModal app={app} />}
          </Box>
        ))}
      </Flex>
      
      <Button
        // forwardedRef={forwardedRef}
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
