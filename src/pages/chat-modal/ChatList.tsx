import Flex from "@cobalt/react-flex";
import Box from "@cobalt/react-box";
import Tag from "@cobalt/react-tag";
import Avatar from "@cobalt/react-avatar";
import Divider from "@cobalt/react-divider";

import { AgentType } from "./ChatModal";
import { Text } from "@cobalt/react-typography";
import List, { ClickableItem } from "@cobalt/react-list";

interface ChatListProps {
  agentList: AgentType[];
  onChooseAgent: (id: string) => void;
}

function ChatList(props: ChatListProps) {
  const { agentList, onChooseAgent } = props;
  
  return (
    <List>
      {agentList.map((agent) => (
        <ClickableItem onClick={() => onChooseAgent(agent.id)}>
          <Divider />

          <Flex
            key={agent.id}
            alignX="space-between"
            alignY="center"
            paddingX="6"
            paddingY="3"
          >
            <Flex alignY="center" gap="4">
              <Box>
                <Avatar size="small" status={agent.status}>{agent.avatar}</Avatar>
              </Box>

              <Box>
                <Text color="#202830">{agent.name}</Text>
                <Text color="#6F767D" size="small">{agent.lastTime}</Text>
              </Box>
            </Flex>

            {agent.unreadCount > 0 && <Tag color="light-red" size="small">{agent.unreadCount}</Tag>}
          </Flex>
        </ClickableItem>
      ))}
    </List>
  );
}

export default ChatList;
