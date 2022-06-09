import Avatar from "@cobalt/react-avatar";
import Box from "@cobalt/react-box";
import Button from "@cobalt/react-button";
import Divider from "@cobalt/react-divider";
import Flex from "@cobalt/react-flex";
import Icon from "@cobalt/react-icon";
import { Text } from "@cobalt/react-typography";
import { useEffect, useRef, useState } from "react";

interface PhoneCallingProps {
  onEndCall: () => void;
}

function PhoneCalling({ onEndCall }: PhoneCallingProps) {
  const durationTimerId = useRef<NodeJS.Timer>();
  
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    durationTimerId.current = setInterval(() => {
      setDuration((duration) => duration + 1);
    }, 1000);
  }, []);
  
  return (
    <>
      <Divider />

      <Flex style={{ paddingTop: '62px', paddingBottom: '48px' }} direction="column" alignX="center" gap="3">
        <Avatar size="small" color="theme" status="green">
          AL
        </Avatar>

        <Text color="#202830" weight="medium">Alison</Text>

        <Text color="#3E048B">00:00:{duration < 10 ? `0${duration}` : duration}</Text>
      </Flex>

      <Flex alignX="space-between" alignY="center" paddingX="11">
        <Button shape="compact" variation="transparent">
          <Icon color="#3E048B" size="small" name="swap_horiz" />
        </Button>
        <Button shape="compact" variation="transparent">
          <Icon color="#3E048B" size="small" name="transfer_warm" />
        </Button>
        <Button shape="compact" variation="transparent">
          <Icon color="#3E048B" size="small" name="person_add" />
        </Button>
      </Flex>

      <Flex alignX="space-between" paddingX="11" paddingTop="5" paddingBottom="6">
        <Button shape="compact" variation="outline">
          <Icon color="#4b1697" size="small" name="mic_off" />
        </Button>
        <Button shape="compact" variation="outline">
          <Icon color="#4b1697" size="small" name="pause" />
        </Button>
        <Button shape="compact" variation="outline">
          <Icon color="#cb4332" size="small" name="recording_stop" />
        </Button>
        <Button shape="compact" variation="outline">
          <Icon color="#4b1697" size="small" name="dialpad" />
        </Button>
      </Flex>
    
      <Divider />

      <Box padding="6">
        <Button shape="full-width" type="danger" onClick={onEndCall}>
          <Flex alignY="center" gap="1">
            <Icon name="call_end" size="small" />
            <Text weight="medium">End call</Text>
          </Flex>
        </Button>
      </Box>
    </>
  );
}

export default PhoneCalling;
