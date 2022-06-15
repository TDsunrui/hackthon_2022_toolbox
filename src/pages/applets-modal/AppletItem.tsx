import { ClickableItem } from "@cobalt/react-list";
import Box from "@cobalt/react-box";
import Flex from "@cobalt/react-flex";
import Icon from "@cobalt/react-icon";
import { Text } from "@cobalt/react-typography";
  
import { AppType } from "@/slices/global/globalSlice";

interface AppletItemProps {
  data: AppType;
}

function AppletItem(props: AppletItemProps) {
  const { data } = props;
  const { icon, iconColor, name, description, onClick } = data;
  
  return (
    <ClickableItem style={{ width: '100%' }} onClick={onClick}>
      <Flex paddingX="2" paddingTop="2" paddingBottom="1">
        <Icon name={icon} size="tiny" color={iconColor} />

        <Box paddingLeft="2" width="calc(100% - 20px)">
          <Text color="#202830">{name}</Text>
          <Text color="#6F767D" size="small" truncated title={description}>
            {description}
          </Text>
        </Box>
      </Flex>
    </ClickableItem>
  );
}

export default AppletItem;
