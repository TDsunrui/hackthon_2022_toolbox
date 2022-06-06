import Popup from "@cobalt/react-popup";
import Box from '@cobalt/react-box';
import { Heading } from "@cobalt/react-typography";
import Icon from "@cobalt/react-icon";
import Flex from "@cobalt/react-flex";
import Divider from "@cobalt/react-divider";
import List from "@cobalt/react-list";
import Button from "@cobalt/react-button";

import AppletItem from "./AppletItem";

import { useAppDispatch } from "@/app/hooks";
import { AppType, AppStatusEnum, changeCurPage, useInstalledAppList } from "@/slices/global/globalSlice";

interface AppletsModalProps {
  forwardedRef: (n: HTMLDivElement) => void;
}

function AppletsModal({ forwardedRef }: AppletsModalProps) {
  const dispatch = useAppDispatch();
  const installedAppList = useInstalledAppList();

  const addAppletItem: AppType = {
    id: '999',
    icon: 'plus',
    iconColor: 'var(--primary-700)',
    name: 'Applets Store',
    description: 'Manage applets from the store',
    imgSrc: '',
    status: AppStatusEnum.NULL,
    onClick: () => dispatch(changeCurPage('store-modal')),
  };
  
  return (
    <Popup
      forwardedRef={forwardedRef}
      style={{
        position: 'absolute',
        top: '40px',
        right: '68px',
      }}
      visible
      size="large"
    >
      <Box style={{ position: 'relative' }}>
        {/* Close button */}
        <Button
          style={{ position: 'absolute', top: '4px', right: '4px' }}
          shape="compact"
          variation="transparent"
          size="small"
          onClick={() => dispatch(changeCurPage('none'))}
        >
          <Icon name="close" size="small" />
        </Button>

        {/* Title */}
        <Heading
          style={{
            paddingLeft: '12px',
            fontSize: '16px',
            lineHeight: '56px',
          }}
          level="4"
          color="#202830"
        >
          Applets
        </Heading>

        <List>
          {/* App list */}
          <Flex direction="column" alignX="stretch" paddingX="2" paddingBottom="1">
            {installedAppList.map((app) => <AppletItem key={app.id} data={app} />)}
          </Flex>

          <Divider />

          {/* Add applets button */}
          <Box paddingX="2" paddingY="1">
            <AppletItem data={addAppletItem} />
          </Box>
        </List>
      </Box>
    </Popup>
  );
}

export default AppletsModal;
