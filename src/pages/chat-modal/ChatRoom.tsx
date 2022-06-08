import { useRef, useState } from "react";

import Box from "@cobalt/react-box";
import Divider from "@cobalt/react-divider";
import Flex from "@cobalt/react-flex";
import Icon from "@cobalt/react-icon";
import List, { ClickableItem } from "@cobalt/react-list";
import { Text } from "@cobalt/react-typography";
import Textarea from "@cobalt/react-textarea";

import { AgentType } from "./ChatModal";
import Button from "@cobalt/react-button";
import Avatar from "@cobalt/react-avatar";

type MessageType = {
  position: 'left' | 'right';
  name: string;
  avatar: string;
  status: 'gray' | 'green' | 'yellow' | 'red';
  time: string;
  message: string;
}

interface ChatRoomProps {
  agent: AgentType;
  onBack: () => void;
}

function ChatRoom(props: ChatRoomProps) {
  const { agent, onBack } = props;

  const scrollBoxRef = useRef<HTMLDivElement>(null);
  
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);

  const genDate = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `Today, ${hours}:${minutes}`;
  };

  const sendMessage = (position: MessageType['position']) => {
    if (inputValue.trim().length === 0) return;
    
    const newMessage: MessageType = {
      position,
      name: agent.name,
      avatar: agent.avatar,
      status: agent.status,
      time: genDate(),
      message: inputValue,
    };
    setMessages((messages) => ([
      ...messages,
      newMessage,
    ]));
    setInputValue('');
    setTimeout(() => {
      scrollBoxRef.current?.scrollTo(0, 99999);
    });
  };
  
  return (
    <Flex style={{ flex: 1 }} direction="column" alignX="stretch">
      <Divider />

      {/* Back button */}
      <List>
        <ClickableItem onClick={onBack}>
          <Flex alignY="center" paddingX="3" paddingY="3" gap="2">
            <Icon name="chevron_left" size="tiny" />
            <Text>Back to chat list</Text>
          </Flex>
        </ClickableItem>
      </List>

      <Divider />

      {/* Message list */}
      <Box
        style={{ flex: 1, scrollBehavior: 'smooth' }}
        forwardedRef={scrollBoxRef}
        paddingX="3"
        scrollable
      >
        {messages.map(({ position, name, avatar, status, time, message }, index) => {
          const isSent = position === 'right';
          const alignX = isSent ? 'end' : 'start';
          const borderColor = isSent ? '#BDCFEF' : '#E8EAEB';
          const backgroundColor = isSent ? '#E5EDF9' : '#F2F4F5';
          
          return (
            <Flex key={index} alignX={alignX} paddingTop="3">
              {!isSent && (
                <Avatar
                  style={{ marginRight: '8px' }}
                  size="tiny"
                  color="theme"
                  status={status}
                >
                  {avatar}
                </Avatar>
              )}

              <Box>
                <Flex alignX={alignX}>
                  <Text size="small" color="#6F767D">
                    {isSent ? 'Me' : name} • {time}
                  </Text>
                </Flex>

                <Box height="4px"></Box>

                <Box
                  style={{
                    maxWidth: '272px',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '4px',
                  }}
                  paddingX="3"
                  paddingY="2"
                  backgroundColor={backgroundColor}
                >
                  <Text style={{ wordBreak: 'break-word' }} color="#202830">{message}</Text>
                </Box>
              </Box>

              {isSent && (
                <Avatar
                  style={{ marginLeft: '8px' }}
                  size="tiny"
                  color="theme"
                >
                  Me
                </Avatar>
              )}
            </Flex>
          )
        })}
      </Box>


      {/* Input */}
      <Box style={{ position: 'relative' }} padding="3">
        <Textarea
          style={{ marginBottom: '4px', height: '120px' }}
          value={inputValue}
          resizable={false}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') sendMessage('right');
            if (e.key === 'Control') sendMessage('left');
          }}
        />
        
        <Flex
          style={{ position: 'absolute', bottom: '38px', left: '20px', right: '20px' }}
          alignX="space-between"
          gap="1"
        >
          <Box>
            <Button shape="compact" variation="transparent" size="small">
              <Icon size="tiny" name="sentiment_satisfied" />
            </Button>
            <Button shape="compact" variation="transparent" size="small">
              <Icon size="tiny" name="quick_reply" />
            </Button>
            <Button shape="compact" variation="transparent" size="small">
              <Icon size="tiny" name="attach_file" />
            </Button>
          </Box>

          <Button variation="transparent" size="small" onClick={() => sendMessage('right')}>
            <Text size="small" color="#202830">Send</Text>
            <Box width="8px"></Box>
            <Icon size="tiny" name="send" />
          </Button>
        </Flex>

        <Text size="small" color="#6F767D">Enter to send | Shift + Enter to add a new line</Text>
      </Box>
    </Flex>
  );
}

export default ChatRoom;
