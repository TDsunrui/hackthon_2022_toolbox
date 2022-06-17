import { useState } from "react";

import Popup from "@cobalt/react-popup";
import Flex from "@cobalt/react-flex";
import Button from "@cobalt/react-button";
import Box from "@cobalt/react-box";
import { Heading, Text } from "@cobalt/react-typography";
import Icon from "@cobalt/react-icon";
import Divider from "@cobalt/react-divider";
import Textarea from "@cobalt/react-textarea";

import RIcon from "../components";

import { useAppDispatch } from "@/app/hooks";
import { AppType, changeCurPage } from "@/slices/global/globalSlice";

interface GoogleTranslateModalProps {
  app: AppType;
}

function GoogleTranslateModal(props: GoogleTranslateModalProps) {
  const { app } = props;

  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState('');
  
  return (
    <Popup
      style={{
        position: 'absolute',
        top: '40px',
        right: 0,
        width: '344px',
        overflow: 'hidden',
      }}
      visible={app.id === '8'}
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

        <Flex paddingLeft="4" paddingRight="6" paddingTop="2" paddingBottom="3">
          <RIcon icon={app.icon} size="tiny"  />

          <Box paddingLeft="2" width="calc(100% - 20px)">
            <Text color="#202830">{app.name}</Text>
            <Text color="#6F767D" size="small" truncated title={app.description}>
              {app.description}
            </Text>
          </Box>
        </Flex>

        <Divider />
        
        <Flex paddingX="4" paddingY="2" gap="2">
          <Button type="feature" size="small">
            <Icon name="translate" size="tiny" />
            <Text>Text</Text>
          </Button>

          <Button type="feature" size="small" variation="outline">
            <Icon name="language" size="tiny" />
            <Text>Websites</Text>
          </Button>
        </Flex>

        <Divider />

        <Flex alignX="space-around" alignY="center" paddingX="4" paddingY="1">
          <Button size="small" variation="transparent">ENGLISH</Button>
          <Button size="small" variation="transparent" shape="compact">
            <Icon size="tiny" name="swap_horiz" color="#6F767D" />
          </Button>
          <Button size="small" variation="transparent">PORTUGUESE</Button>
        </Flex>

        <Divider />

        <Box padding="2">
          <Textarea
            style={{ height: '86px', fontSize: '16px', border: 'none' }}
            resizable={false}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Box>

        <Flex alignX="space-between" padding="4" paddingTop="2">
          <Icon size="tiny" name="mic" color="#5f6368" />
          <Text size="small" color="#6F767D">{inputValue.length} / 5,000</Text>
        </Flex>


        {inputValue === 'hello' && (
          <Flex
            direction="column"
            alignY="space-between"
            padding="4"
            backgroundColor="#4d27bf"
            height="133px"
          >
            <Flex alignX="space-between" width="100%">
              <Heading level="4" color="#fff">olá</Heading>
              <Icon size="tiny" color="#fff" name="star_border" />
            </Flex>

            <Flex alignX="space-between" width="100%">
              <Icon size="tiny" color="#fff" name="volume_up" />

              <Flex gap="3">
                <Icon size="tiny" color="#fff" name="search" />
                <Icon size="tiny" color="#fff" name="copy" />
                <Icon size="tiny" color="#fff" name="thumbs_up_down" />
                <Icon size="tiny" color="#fff" name="share" />
              </Flex>
            </Flex>
          </Flex>
        )}
      </Box>
    </Popup>
  );
}

export default GoogleTranslateModal;
