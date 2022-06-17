import React from 'react';
import Flex from '@cobalt/react-flex';
import Popup from '@cobalt/react-popup';
import Image from "@cobalt/react-image";
import Button from '@cobalt/react-button';
import Icon from '@cobalt/react-icon';
import { AppType, changeCurPage } from '@/slices/global/globalSlice';
import { useAppDispatch } from '@/app/hooks';
import wordsFetchingImg from '../../assets/images/words_fetching.png';

interface ChatModalProps {
  app: AppType;
}

function WordsFetchingModal({ app }: ChatModalProps) {
  const dispatch = useAppDispatch();

  return (
    <Popup
      style={{
        position: 'absolute',
        top: '40px',
        right: 0,
        width: '344px'
      }}
      visible={app.id === '5'}
    >
      <Flex style={{ position: 'relative' }} paddingTop="3">
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
        <Image width="100%" height="100%" src={wordsFetchingImg} alt="" />
      </Flex>
    </Popup>
  )
}

export default WordsFetchingModal;