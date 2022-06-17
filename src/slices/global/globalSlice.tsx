import { CSSProperties, useMemo } from 'react';

import { Name } from '@cobalt/react-icon';

import { useAppSelector } from '@/app/hooks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import imgSrc1 from '../../assets/images/popup_1.png';
import imgSrc2 from '../../assets/images/popup_2.png';
import imgSrc3 from '../../assets/images/popup_3.png';
import imgSrc4 from '../../assets/images/popup_4.png';
import imgSrc5 from '../../assets/images/popup_5.png';

export type PageType = 'none' | 'applets-modal' | 'store-modal' | 'phone-modal' | 'chat-modal' | 'words-fetching-modal' | 'google-translation';

export type AppType = {
  id: string;
  icon: Name;
  iconColor: CSSProperties['color'];
  name: string;
  description: string;
  imgSrc: string;
  status: AppStatusEnum;
  onClick?: () => void;
}

export enum AppStatusEnum {
  UNINSTALLED = 'uninstalled',
  UNINSTALLED_LOADING = 'uninstalled_loading',
  UNINSTALLED_OK = 'uninstalled_ok',
  INSTALLED = 'installed',
  INSTALLED_LOADING = 'installed_loading',
  INSTALLED_OK = 'installed_ok',
  NULL = 'null',
}

interface GlobalState {
  curPage: PageType;
  appList: AppType[];
}

const initialState: GlobalState = {
  curPage: 'none',
  appList: [
    {
      id: '1',
      icon: 'question_answer',
      iconColor: '#3b8553',
      name: 'Whisper',
      description: 'Sending messages and mutual support between agents.',
      imgSrc: imgSrc1,
      status: AppStatusEnum.INSTALLED,
    },
    {
      id: '2',
      icon: 'call',
      iconColor: '#e3ab3d',
      name: 'Callbar',
      description: 'The applet allows agents to make and receive calls.',
      imgSrc: imgSrc2,
      status: AppStatusEnum.INSTALLED,
    },
    // {
    //   id: '3',
    //   icon: 'insert_drive_file',
    //   iconColor: '#215dd7',
    //   name: 'Remind Me',
    //   description: 'Reminds agents himself something important need to track.',
    //   imgSrc: imgSrc3,
    //   status: AppStatusEnum.UNINSTALLED,
    // },
    // {
    //   id: '4',
    //   icon: 'work',
    //   iconColor: '#3E048B',
    //   name: 'Case Creator',
    //   description: 'Agent can create case anytime to track something.',
    //   imgSrc: imgSrc4,
    //   status: AppStatusEnum.UNINSTALLED,
    // },
    {
      id: '5',
      icon: 'assignment',
      iconColor: '#bed0ef',
      name: 'Words Fetching',
      description: 'Integrated with different applications and provide users with quick access.',
      imgSrc: imgSrc5,
      status: AppStatusEnum.UNINSTALLED,
    },
    {
      id: '6',
      icon: 'calendar_medical',
      iconColor: '',
      name: 'WhatsApp',
      description: 'An internationally available freeware, cross-platform centralized IM and VoIP service.',
      imgSrc: imgSrc5,
      status: AppStatusEnum.UNINSTALLED,
    },
    {
      id: '7',
      icon: 'account_balance_wallet',
      iconColor: '',
      name: 'TikTok',
      description: 'A short-form video hosting service hosts a variety of short-form user videos.',
      imgSrc: imgSrc5,
      status: AppStatusEnum.UNINSTALLED,
    },
    {
      id: '8',
      icon: 'account_box',
      iconColor: '',
      name: 'Google Translation',
      description: 'A multilingual neural machine translation service to translate from one language into another.',
      imgSrc: imgSrc5,
      status: AppStatusEnum.UNINSTALLED,
    },
  ],
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    changeCurPage: (state, action: PayloadAction<GlobalState['curPage']>) => {
      state.curPage = action.payload;
    },
    changeAppStatus: (state, action: PayloadAction<Pick<AppType, 'id' | 'status'>>) => {
      const { id, status } = action.payload;
      state.appList = state.appList.map((app) => {
        if (app.id !== id) return app;
        return { ...app, status };
      });
    },
  }
});

export const { changeCurPage, changeAppStatus } = globalSlice.actions;

export default globalSlice.reducer;

export const useInstalledAppList = () => {
  const { appList } = useAppSelector((state) => state.global);
  
  return useMemo(() => {
    const validStatusList = [
      AppStatusEnum.UNINSTALLED_OK,
      AppStatusEnum.INSTALLED,
      AppStatusEnum.INSTALLED_LOADING,
    ];
    return appList.filter((app) => validStatusList.includes(app.status));
  }, [appList]);
};

export const useUninstalledAppList = () => {
  const { appList } = useAppSelector((state) => state.global);
  
  return useMemo(() => {
    const validStatusList = [
      AppStatusEnum.INSTALLED_OK,
      AppStatusEnum.UNINSTALLED,
      AppStatusEnum.UNINSTALLED_LOADING,
    ];
    return appList.filter((app) => validStatusList.includes(app.status));
  }, [appList]);
};
