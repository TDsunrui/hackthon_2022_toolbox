import Tooltip, { PositionCenterBottom } from "@cobalt-marketplace/react-tooltip";
import Flex from "@cobalt/react-flex";
import Box from "@cobalt/react-box";
import Button from "@cobalt/react-button";
import Icon from "@cobalt/react-icon";
import { Text } from "@cobalt/react-typography";

import ChatModal from "../chat-modal";
import PhoneModal from "../phone-modal";
import EmailModal from "../email-modal";
import WordsFetchingModal from '../words-fetching-modal';
import GoogleTranslateModal from "../google-translate-modal";
import CaseCreatorModal from "../case-creator-modal";
import RIcon from "../components";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { AppIdEnum, changeCurPage, PageType, useInstalledAppList } from "@/slices/global/globalSlice";

const appMap: { [key: string]: PageType } = {
  [AppIdEnum.GOOGLE_TRANSLATION]: 'google-translation',
  [AppIdEnum.WHISPER]: 'chat-modal',
  [AppIdEnum.CALLBAR]: 'phone-modal',
  [AppIdEnum.EMAIL]: 'email-modal',
  [AppIdEnum.WORDS_FETCHING]: 'words-fetching-modal',
  [AppIdEnum.CASE_CREATOR]: 'case-creator-modal',
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
    if (!['toolbox-modal', 'store-modal'].includes(curPage)) {
      return dispatch(changeCurPage('toolbox-modal'));
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
                <RIcon icon={app.icon} size="tiny" />
              </Button>
            </Tooltip>

            {curPage === 'chat-modal' && <ChatModal app={app} />}
            
            {curPage === 'phone-modal' && <PhoneModal app={app} />}

            {curPage === 'email-modal' && <EmailModal app={app} />}

            {<CaseCreatorModal app={app} />}

            {curPage === 'words-fetching-modal' && <WordsFetchingModal app={app} />}

            {curPage === 'google-translation' && <GoogleTranslateModal app={app} />}
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
          <Text>Toolbox</Text>
        </Flex>
      </Button>
    </Flex>
  );
}

export default NavBar;
