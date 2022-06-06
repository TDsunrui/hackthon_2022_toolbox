import { useState } from "react";

import Popup from "@cobalt/react-popup";
import Flex from "@cobalt/react-flex";
import Box from "@cobalt/react-box";
import Icon from "@cobalt/react-icon";
import { Text } from "@cobalt/react-typography";
import Divider from "@cobalt/react-divider";
import Input from "@cobalt/react-input";
import Button from "@cobalt/react-button";

import { useAppDispatch } from "@/app/hooks";
import { AppType, changeCurPage } from "@/slices/global/globalSlice";

import './style.scss';

interface PhoneModelType {
  app: AppType;
}

function PhoneModal({ app }: PhoneModelType) {
  const dispatch = useAppDispatch();
  
  const [phoneNumber, setPhoneNumber] = useState('');

  const pressNumber = (number: string) => {
    setPhoneNumber((phoneNumber) => phoneNumber + number);
  };

  const delNumber = () => {
    setPhoneNumber((phoneNumber) => phoneNumber.slice(0, -1));
  };
  
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
      <Box style={{ position: 'relative' }} paddingTop="4">
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

        <Divider />

        <Box padding="6" paddingTop="4">
          <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

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

          <Button shape="full-width" type="success" onClick={() => alert('罗哥大帅比')}>
            <Flex alignY="center" gap="1">
              <Icon name={app.icon} size="small" />
              <Text weight="medium">{app.name}</Text>
            </Flex>
          </Button>
        </Box>
      </Box>
    </Popup>
  );
}

export default PhoneModal;
