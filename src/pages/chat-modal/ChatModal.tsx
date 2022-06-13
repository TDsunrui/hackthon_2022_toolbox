import { useState } from "react";

import Popup from "@cobalt/react-popup";
import Flex from "@cobalt/react-flex";
import Box from "@cobalt/react-box";
import Button from "@cobalt/react-button";
import Icon from "@cobalt/react-icon";
import { Text } from "@cobalt/react-typography";

import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";

import { useAppDispatch } from "@/app/hooks";
import { AppType, changeCurPage } from "@/slices/global/globalSlice";

export type AgentType = {
  id: string;
  name: string;
  avatar: string;
  lastTime: string;
  unreadCount: number;
  status: 'gray' | 'green' | 'yellow' | 'red';
}

interface ChatModalProps {
  app: AppType;
}

function ChatModal({ app }: ChatModalProps) {
  const dispatch = useAppDispatch();

  const [curPage, setCurPage] = useState<'chatList' | 'chatRoom'>('chatList');
  const [agentList, setAgentList] = useState<AgentType[]>([
    {
      id: '1',
      name: 'Alison',
      avatar: 'AL',
      lastTime: '14:18, Today',
      unreadCount: 4,
      status: 'green',
    },
    {
      id: '2',
      name: 'Abel',
      avatar: 'AB',
      lastTime: '13:44, Today',
      unreadCount: 2,
      status: 'green',
    },
    {
      id: '3',
      name: 'Mikkel',
      avatar: 'MI',
      lastTime: '10:29, Today',
      unreadCount: 1,
      status: 'yellow',
    },
    {
      id: '4',
      name: 'Symone',
      avatar: 'SY',
      lastTime: '9:07, Today',
      unreadCount: 3,
      status: 'yellow',
    },
    {
      id: '5',
      name: 'Brayden',
      avatar: 'BR',
      lastTime: '13:24, Today',
      unreadCount: 3,
      status: 'green',
    },
    {
      id: '6',
      name: 'Siana',
      avatar: 'SI',
      lastTime: '12:17, Yesterday',
      unreadCount: 1,
      status: 'gray',
    },
    {
      id: '7',
      name: 'Dwain',
      avatar: 'DW',
      lastTime: '11:38, Yesterday',
      unreadCount: 0,
      status: 'gray',
    },
    {
      id: '8',
      name: 'Lorrin',
      avatar: 'LO',
      lastTime: '10:13, Yesterday',
      unreadCount: 0,
      status: 'gray',
    },
  ]);
  const [curAgent, setCurAgent] = useState<AgentType>();

  const handleChooseAgent = (id: string) => {
    setCurPage('chatRoom');
    setAgentList((agentList) => {
      return agentList.map((agent) => {
        if (agent.id !== id) return agent;
        const curAgent = agentList.find((agent) => agent.id === id)!;
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        curAgent.lastTime = `${hours}:${minutes}, Today`;
        curAgent.unreadCount = 0;

        setCurAgent(curAgent);
        
        return curAgent;
      });
    });
  };

  const handleBack = () => {
    setCurPage('chatList');
  };
  
  return (
    <Popup
      style={{
        position: 'absolute',
        top: '40px',
        right: 0,
        width: '344px',
      }}
      visible={app.id === '2'}
    >
      <Flex style={{ position: 'relative' }} direction="column" alignX="stretch" height="572px" scrollable>
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

        <Flex paddingX="4" paddingTop="5" paddingBottom="3" gap="2">
          <Icon name={app.icon} size="tiny" color={app.iconColor} />

          <Box>
            <Text color="#202830">{app.name}</Text>
            <Text color="#6F767D" size="small">{app.description}</Text>
          </Box>
        </Flex>

        {curPage === 'chatList' && (
          <ChatList agentList={agentList} onChooseAgent={handleChooseAgent} />
        )}
        
        {curPage === 'chatRoom' && (
          <ChatRoom agent={curAgent!} onBack={handleBack} />
        )}
      </Flex>
    </Popup>
  );
}

export default ChatModal;
