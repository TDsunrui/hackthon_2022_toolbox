import { useState } from "react";

import Box from "@cobalt/react-box";
import Button from "@cobalt/react-button";
import Flex from "@cobalt/react-flex";
import Icon from "@cobalt/react-icon";
import InputGroup, { Item } from "@cobalt/react-input-group";
import Input from "@cobalt/react-input";
import { Text } from "@cobalt/react-typography";
import Flag from "@cobalt/react-flag";

import { PhoneModelProps } from "./PhoneModal";

interface PhoneNumberProps extends PhoneModelProps {
  onCall: () => void;
}

function PhoneNumber({ app, onCall }: PhoneNumberProps) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const pressNumber = (number: string) => {
    setPhoneNumber((phoneNumber) => phoneNumber + number);
  };

  const delNumber = () => {
    setPhoneNumber((phoneNumber) => phoneNumber.slice(0, -1));
  };
  
  return (
    <>
      <Box padding="6" paddingTop="4">
        <InputGroup>
          <Item noHover width="min" backgroundColor="#f3f4f5">
            <Flex style={{ cursor: 'pointer' }} alignY="center" height="100%">
              <Flag code="us" />

              <Box paddingX="2">
                <Text size="small">+1</Text>
              </Box>

              <Icon size="small" name="expand_more" />
            </Flex>
          </Item>

          <Item>
            <Input
              style={{ fontSize: '16px' }}
              variation="unstyled"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Item>
        </InputGroup>

        <Flex paddingY="4" wrap>
          <div className="number-item" onClick={() => pressNumber('1')}>1</div>
          <div className="number-item" onClick={() => pressNumber('2')}>2</div>
          <div className="number-item" onClick={() => pressNumber('3')}>3</div>
          <div className="number-item" onClick={() => pressNumber('4')}>4</div>
          <div className="number-item" onClick={() => pressNumber('5')}>5</div>
          <div className="number-item" onClick={() => pressNumber('6')}>6</div>
          <div className="number-item" onClick={() => pressNumber('7')}>7</div>
          <div className="number-item" onClick={() => pressNumber('8')}>8</div>
          <div className="number-item" onClick={() => pressNumber('9')}>9</div>
          <div className="number-item" onClick={() => pressNumber('+')}>
            <Icon name="plus" size="small" />
          </div>
          <div className="number-item" onClick={() => pressNumber('0')}>0</div>
          <div className="number-item" onClick={() => delNumber()}>
            <Icon name="backspace" size="small" />
          </div>
        </Flex>

        <Button shape="full-width" disabled={phoneNumber.length < 10} onClick={onCall}>
          <Flex alignY="center" gap="1">
            <Icon name={app.icon} size="small" />
            <Text weight="medium">{app.name}</Text>
          </Flex>
        </Button>
      </Box>
    </>
  );
}

export default PhoneNumber;
