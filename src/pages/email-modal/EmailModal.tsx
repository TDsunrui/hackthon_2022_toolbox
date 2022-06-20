import Popup from "@cobalt/react-popup";
import Box from "@cobalt/react-box";

import { AppIdEnum, AppType, changeCurPage } from "@/slices/global/globalSlice";
import Button from "@cobalt/react-button";
import Icon from "@cobalt/react-icon";
import Flex from "@cobalt/react-flex";
import RIcon from "../components";
import { Heading, Text } from "@cobalt/react-typography";
import Divider from "@cobalt/react-divider";
import { useAppDispatch } from "@/app/hooks";
import Input from "@cobalt/react-input";
import { useRef, useState } from "react";
import Textarea from "@cobalt/react-textarea";
import Spinner from "@cobalt/react-spinner";

interface EmailModalProps {
  app: AppType;
}

function EmailModal(props: EmailModalProps) {
  const { app } = props;

  const dispatch = useAppDispatch();

  const timerId = useRef<NodeJS.Timeout>();

  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [to, setTo] = useState('jessicalovelygirl@163.com');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleSend = () => {
    timerId.current && clearTimeout(timerId.current);
    setLoading(true);
    timerId.current = setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
    }, 1000);
  };
  
  return (
    <Popup
      style={{
        position: 'absolute',
        top: '40px',
        right: 0,
        width: '344px',
        overflow: 'hidden',
      }}
      visible={app.id === AppIdEnum.EMAIL}
    >
      {isSuccess && (
        <Flex alignX="center" alignY="center" height="405px" gap="1">
          <Flex
            style={{ borderRadius: '50%' }}
            alignX="center"
            alignY="center"
            width="30px"
            height="30px"
            backgroundColor="#469c36"
          >
            <Icon size="small" name="done" color="#fff" />
          </Flex>
          <Heading level="2">Successfully send</Heading>
        </Flex>
      )}

      {!isSuccess && (
        <Flex style={{ position: 'relative' }} direction="column" alignX="stretch" scrollable>
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

          <Flex paddingLeft="4" paddingRight="6" paddingTop="5" paddingBottom="3">
            <Icon name={app.icon} size="tiny" color={app.iconColor} />

            <Box paddingLeft="2" width="calc(100% - 20px)">
              <Text color="#202830">{app.name}</Text>
              <Text color="#6F767D" size="small" truncated title={app.description}>
                {app.description}
              </Text>
            </Box>
          </Flex>

          <Divider />

          <Box paddingX="3" paddingY="1" height="40px">
            <Input
              variation="unstyled"
              value={to}
              placeholder="To"
              onChange={(e) => setTo(e.target.value)}
            />
          </Box>

          <Divider />

          <Box paddingX="3" paddingY="1" height="40px">
            <Input
              variation="unstyled"
              value={subject}
              placeholder="Subject"
              onChange={(e) => setSubject(e.target.value)}
            />
          </Box>

          <Divider />

          <Box paddingX="1">
            <Textarea
              style={{ height: '214px', border: 'none' }}
              resizable={false}
              placeholder="Type something..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Box>
          
          <Flex alignX="space-between" paddingX="2" paddingBottom="2">
            <Box>
              <Button size="small" shape="compact" variation="transparent" type="secondary" disabled>
                <Icon size="tiny" name="quick_reply" />
              </Button>

              <Button size="small" shape="compact" variation="transparent" type="secondary">
                <Icon size="tiny" name="attach_file" />
              </Button>

              <Button size="small" shape="compact" variation="transparent" type="secondary">
                <Icon size="tiny" name="format_color_text" />
              </Button>

              <Button size="small" shape="compact" variation="transparent" type="secondary">
                <Icon size="tiny" name="link" />
              </Button>
            </Box>

            <Button
              size="small"
              variation="transparent"
              type="secondary"
              disabled={loading || content.length === 0}
              onClick={handleSend}
            >
              <Flex alignY="center" gap="2">
                {loading && <Spinner />}
                <Text>Send</Text>
                <Icon size="tiny" name="send" />
              </Flex>
            </Button>
          </Flex>
        </Flex>
      )}
    </Popup>
  );
}

export default EmailModal;
