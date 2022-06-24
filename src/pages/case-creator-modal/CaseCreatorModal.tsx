
import { useRef, useState } from "react";

import Popup from "@cobalt/react-popup";
import Box from "@cobalt/react-box";
import Button from "@cobalt/react-button";
import Icon from "@cobalt/react-icon";
import Flex from "@cobalt/react-flex";
import { Heading, Text } from "@cobalt/react-typography";
import Divider from "@cobalt/react-divider";
import { useAppDispatch } from "@/app/hooks";
import Input from "@cobalt/react-input";
import Label from "@cobalt/react-label";
import Required from "@cobalt/react-required";

import { AppIdEnum, AppType, changeCurPage } from "@/slices/global/globalSlice";
import Spinner from "@cobalt/react-spinner";
import Textarea from "@cobalt/react-textarea";

interface CaseCreatorModalProps {
  app: AppType;
}

function CaseCreatorModal(props: CaseCreatorModalProps) {
  const { app } = props;

  const dispatch = useAppDispatch();

  const timerId = useRef<NodeJS.Timeout>();

  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('+1 989-768-9709');
  const [subject, setSubject] = useState('Gray successfully bought a phone number');
  const [description, setDescription] = useState('Gray successfully bought a phone number, the number is +1 989-768-9709');
  const [country, setCountry] = useState('US');
  const [areaCode, setAreaCode] = useState('');
  const [pattern, setPattern] = useState('');

  const handleCreate = () => {
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
      visible={app.id === AppIdEnum.CASE_CREATOR}
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
          <Heading level="2">Successfully create</Heading>
        </Flex>
      )}

      {!isSuccess && (
        <Flex style={{ position: 'relative' }} direction="column" alignX="stretch">
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

          <Box padding="4" height="314px" scrollable>
            <Flex direction="column" gap="1">
              <Flex alignY="center" width="100%">
                <Flex grow gap="1">
                  <Label htmlFor="">Phone</Label>
                  <Required title="required" />
                </Flex>
              </Flex>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Flex>

            <Flex paddingTop="2" direction="column" gap="1">
              <Flex alignY="center" width="100%">
                <Flex grow gap="1">
                  <Label htmlFor="">Subject</Label>
                  <Required title="required" />
                </Flex>
              </Flex>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
            </Flex>

            <Flex paddingTop="2" direction="column" gap="1">
              <Flex alignY="center" width="100%">
                <Flex grow gap="1">
                  <Label htmlFor="">Description</Label>
                  <Required title="required" />
                </Flex>
              </Flex>
              <Textarea
                value={description}
                resizable={false}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Flex>

            <Flex paddingTop="2" direction="column" gap="1">
              <Flex alignY="center" width="100%">
                <Flex grow gap="1">
                  <Label htmlFor="">Country</Label>
                  <Required title="required" />
                </Flex>
              </Flex>
              <Input value={country} onChange={(e) => setCountry(e.target.value)} />
            </Flex>

            <Flex paddingTop="2" direction="column" gap="1">
              <Flex alignY="center" width="100%">
                <Flex grow gap="1">
                  <Label htmlFor="">Area Code or Prefix</Label>
                </Flex>
              </Flex>
              <Input value={areaCode} onChange={(e) => setAreaCode(e.target.value)} />
            </Flex>

            <Flex paddingTop="2" direction="column" gap="1">
              <Flex alignY="center" width="100%">
                <Flex grow gap="1">
                  <Label htmlFor="">Pattern</Label>
                </Flex>
              </Flex>
              <Input value={pattern} onChange={(e) => setPattern(e.target.value)} />
            </Flex>
          </Box>
          
          <Box padding="4">
            <Button
              shape="full-width"
              disabled={loading}
              onClick={handleCreate}
            >
              <Flex alignY="center" gap="2">
                {loading && <Spinner />}
                <Text>Create</Text>
              </Flex>
            </Button>
          </Box>
        </Flex>
      )}
    </Popup>
  );
}

export default CaseCreatorModal;
