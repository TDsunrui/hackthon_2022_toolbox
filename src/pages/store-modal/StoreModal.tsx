import Box from "@cobalt/react-box";
import Button from "@cobalt/react-button";
import Icon from "@cobalt/react-icon";
import Popup from "@cobalt/react-popup";
import { Heading } from "@cobalt/react-typography";
import { Text } from '@cobalt/react-typography';
import Tab from "@cobalt/react-tab";
import Flex from "@cobalt/react-flex";
import Divider from "@cobalt/react-divider";
import Input from "@cobalt/react-input";
import List from "@cobalt/react-list";

import StoreList from "./StoreList";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { AppType, changeCurPage, useInstalledAppList } from "@/slices/global/globalSlice";
import { useCallback, useMemo, useState } from "react";

type TabKey = 'store' | 'myApplets';

interface StoreModalProps {
  forwardedRef: (n: HTMLDivElement) => void;
}

function StoreModal({ forwardedRef }: StoreModalProps) {
  const dispatch = useAppDispatch();
  const { appList } = useAppSelector((state) => state.global);
  const installedAppList = useInstalledAppList();

  const [curTab, setCurTab] = useState<TabKey>('store');
  const [searchValue, setSearchValue] = useState('');

  const filterAppList = useCallback((appList: AppType[]) => {
    return appList.filter((app) => app.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }, [searchValue]);
  
  const curAppList = useMemo(() => {
    if (curTab === 'store') return filterAppList(appList);
    return filterAppList(installedAppList);
  }, [appList, curTab, filterAppList, installedAppList]);

  const handleChangeTab = (tab: TabKey) => {
    if (tab === curTab) return;
    setCurTab(tab);
  };
  
  return (
    <Popup
      forwardedRef={forwardedRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '40px',
        right: '68px',
        height: '606px',
      }}
      visible
      size="large"
    >
      {/* Header */}
      <Flex alignY="center" paddingTop="5" paddingBottom="3">
        {/* Back button */}
        <Box paddingX="2">
          <Button
            shape="compact"
            variation="transparent"
            size="small"
            onClick={() => dispatch(changeCurPage('applets-modal'))}
          >
            <Icon name="chevron_left" size="small" />
          </Button>
        </Box>
        
        {/* Title and Description */}
        <Box>
          <Heading level="4" color="#202830">
            Applets Management
          </Heading>

          <Text style={{ paddingTop: '4px' }} color="#6F767D">
            Add and manage applets
          </Text>
        </Box>
      </Flex>

      {/* Tabs */}
      <Flex paddingX="6" gap="2">
        <Tab
          active={curTab === 'store'}
          size="small"
          onClick={() => handleChangeTab('store')}
        >
          Store
        </Tab>

        <Tab
          active={curTab === 'myApplets'}
          size="small"
          onClick={() => handleChangeTab('myApplets')}
        >
          My Applets
        </Tab>
      </Flex>

      <Divider />

      {/* Search input */}
      <Box style={{ position: 'relative' }} paddingX="6" paddingY="3">
        <Icon
          style={{
            position: 'absolute',
            top: '50%',
            left: '38px',
            transform: 'translateY(-50%)',
          }}
          name="search"
          size="tiny"
        />
        <Input
          style={{ paddingLeft: '40px' }}
          value={searchValue}
          placeholder="Search for applets"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Box>

      <Divider />

      {/* Store list */}
      <List style={{ flex: 1 }}>
        <StoreList appList={curAppList} />
      </List>
    </Popup>
  );
}

export default StoreModal;
