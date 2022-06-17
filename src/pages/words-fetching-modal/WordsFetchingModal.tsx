import React from 'react';
import Flex from '@cobalt/react-flex';
import Popup from '@cobalt/react-popup';
import { AppType } from '@/slices/global/globalSlice';

interface ChatModalProps {
  app: AppType;
}

function WordsFetchingModal({ app }: ChatModalProps) {
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
      <Flex style={{ position: 'relative' }} padding="3">
        TODO: setting config image for words fetching SDK
      </Flex>
    </Popup>
  )
}

export default WordsFetchingModal;