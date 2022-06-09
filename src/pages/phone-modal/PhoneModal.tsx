import { useState } from "react";

import Popup from "@cobalt/react-popup";
import Flex from "@cobalt/react-flex";
import Box from "@cobalt/react-box";
import Icon from "@cobalt/react-icon";
import { Text } from "@cobalt/react-typography";
import Button from "@cobalt/react-button";

import PhoneNumber from "./PhoneNumber";
import PhoneCalling from "./PhoneCalling";

import { useAppDispatch } from "@/app/hooks";
import { AppType, changeCurPage } from "@/slices/global/globalSlice";

import './style.scss';

export interface PhoneModelProps {
  app: AppType;
}

function PhoneModal({ app }: PhoneModelProps) {
  const dispatch = useAppDispatch();

  const [curPage, setCurPage] = useState<'phoneNumber' | 'phoneCalling'>('phoneNumber');

  const handleCall = () => setCurPage('phoneCalling');

  const handleEndCall = () => setCurPage('phoneNumber');
  
  return (
    <Popup
      style={{
        position: 'absolute',
        top: '40px',
        right: 0,
        width: '344px',
      }}
      visible={app.id === '3'}
    >
      <Box style={{ position: 'relative' }} paddingTop="3">
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

        <Flex paddingX="4" paddingTop="2" paddingBottom="3" gap="2">
          <Icon name={app.icon} size="tiny" color={app.iconColor} />

          <Box>
            <Text color="#202830">{app.name}</Text>
            <Text color="#6F767D" size="small">{app.description}</Text>
          </Box>
        </Flex>

        {curPage === 'phoneNumber' && <PhoneNumber app={app} onCall={handleCall} />}

        {curPage === 'phoneCalling' && <PhoneCalling onEndCall={handleEndCall} />}
      </Box>
    </Popup>
  );
}

export default PhoneModal;
