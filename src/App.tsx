import { useCallback, useState } from 'react';

import Theme from '@cobalt/theme-experimental';
import ThemeProvider from '@cobalt/react-theme-provider';
import ViewportProvider from '@cobalt/react-viewport-provider';
import PortalProvider from "@cobalt/react-portal-provider";
import useOutsideClick from '@cobalt/react-outside-click-hook';

import NavBar from './pages/nav-bar';
import AppletsModal from './pages/applets-modal';
import StoreModal from './pages/store-modal';
import PhoneModal from './pages/phone-modal';
import ChatModal from './pages/chat-modal';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { changeCurPage } from './slices/global/globalSlice';

import styles from './variable-coverage';
import './global.scss';

function App() {
  const dispatch = useAppDispatch();
  const { curPage } = useAppSelector((state) => state.global);
  

  const [appletsBtnNode, setAppletsBtnNode] = useState<HTMLButtonElement | null>(null);
  const [appletsModalNode, setAppletsModalNode] = useState<HTMLDivElement | null>(null);
  const [storeModalNode, setStoreModalNode] = useState<HTMLDivElement | null>(null);
  const [phoneModalNode, setPhoneModalNode] = useState<HTMLDivElement | null>(null);
  const [chatModalNode, setChatModalNode] = useState<HTMLDivElement | null>(null);

  const appletsBtnRef = useCallback((n: HTMLButtonElement) => setAppletsBtnNode(n), []);
  const appletsModalRef = useCallback((n: HTMLDivElement) => setAppletsModalNode(n), []);
  const storeModalRef = useCallback((n: HTMLDivElement) => setStoreModalNode(n), []);
  const phoneModalRef = useCallback((n: HTMLDivElement) => setPhoneModalNode(n), []);
  const chatModalRef = useCallback((n: HTMLDivElement) => setChatModalNode(n), []);
  
  const outsideClickHandler = useCallback(() => {
    dispatch(changeCurPage('none'));
  }, [dispatch]);

  useOutsideClick({
    handler: outsideClickHandler,
    refs: [appletsBtnNode, appletsModalNode, storeModalNode, phoneModalNode, chatModalNode],
    shouldExecute: true,
  });
  
  return (
    <ThemeProvider style={styles} loader={() => Promise.resolve(Theme)}>
      <ViewportProvider>
        <PortalProvider>
          <NavBar appletsBtnRef={appletsBtnRef} />

          {curPage === 'applets-modal' && <AppletsModal forwardedRef={appletsModalRef} />}

          {curPage === 'store-modal' && <StoreModal forwardedRef={storeModalRef} />}

          {curPage === 'call-modal' && <PhoneModal />}

          {curPage === 'chat-modal' && <ChatModal />}
        </PortalProvider>
      </ViewportProvider>
    </ThemeProvider>
  );
}

export default App;
