import { useCallback, useState } from 'react';

import Theme from '@cobalt/theme-experimental';
import ThemeProvider from '@cobalt/react-theme-provider';
import ViewportProvider from '@cobalt/react-viewport-provider';
import PortalProvider from "@cobalt/react-portal-provider";
import useOutsideClick from '@cobalt/react-outside-click-hook';

import NavBar from './pages/nav-bar';
import AppletsModal from './pages/applets-modal';
import StoreModal from './pages/store-modal';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { changeCurPage } from './slices/global/globalSlice';

import styles from './variable-coverage';
import './global.scss';

function App() {
  const dispatch = useAppDispatch();
  const { curPage } = useAppSelector((state) => state.global);

  const [navBarNode, setNavBarNode] = useState<HTMLButtonElement | null>(null);
  const [appletsModalNode, setAppletsModalNode] = useState<HTMLDivElement | null>(null);
  const [storeModalNode, setStoreModalNode] = useState<HTMLDivElement | null>(null);

  const navBarRef = useCallback((n: HTMLButtonElement) => setNavBarNode(n), []);
  const appletsModalRef = useCallback((n: HTMLDivElement) => setAppletsModalNode(n), []);
  const storeModalRef = useCallback((n: HTMLDivElement) => setStoreModalNode(n), []);
  
  const outsideClickHandler = useCallback(() => {
    dispatch(changeCurPage('none'));
  }, [dispatch]);

  useOutsideClick({
    handler: outsideClickHandler,
    refs: [navBarNode, appletsModalNode, storeModalNode],
    shouldExecute: true,
  });
  
  return (
    <ThemeProvider style={styles} loader={() => Promise.resolve(Theme)}>
      <ViewportProvider>
        <PortalProvider>
          <NavBar forwardedRef={navBarRef} />

          {curPage === 'toolbox-modal' && <AppletsModal forwardedRef={appletsModalRef} />}

          {curPage === 'store-modal' && <StoreModal forwardedRef={storeModalRef} />}
        </PortalProvider>
      </ViewportProvider>
    </ThemeProvider>
  );
}

export default App;
