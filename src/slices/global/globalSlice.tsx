import { CSSProperties, useMemo } from 'react';

import { Name } from '@cobalt/react-icon';

import { useAppSelector } from '@/app/hooks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PageType = 'none' | 'toolbox-modal' | 'store-modal' | 'phone-modal' | 'chat-modal' | 'words-fetching-modal' | 'google-translation' | 'email-modal' | 'case-creator-modal';

export type AppType = {
  id: string;
  icon: Name;
  iconColor: CSSProperties['color'];
  name: string;
  description: string;
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

export enum AppIdEnum {
  GOOGLE_TRANSLATION = '1',
  TIKTOK = '2',
  WHATSAPP = '3',
  WHISPER = '4',
  CALLBAR = '5',
  CASE_CREATOR = '6',
  EMAIL = '7',
  REMIND_ME = '8',
  WORDS_FETCHING = '9',
}

const initialState: GlobalState = {
  curPage: 'none',
  appList: [
    // {
    //   id: AppIdEnum.GOOGLE_TRANSLATION,
    //   icon: 'account_box',
    //   iconColor: '',
    //   name: 'Google Translation',
    //   description: 'A multilingual neural machine translation service to translate from one language into another.',
    //   status: AppStatusEnum.UNINSTALLED,
    // },
    // {
    //   id: AppIdEnum.TIKTOK,
    //   icon: 'account_balance_wallet',
    //   iconColor: '',
    //   name: 'TikTok',
    //   description: 'A short-form video hosting service hosts a variety of short-form user videos.',
    //   status: AppStatusEnum.UNINSTALLED,
    // },
    // {
    //   id: AppIdEnum.WHATSAPP,
    //   icon: 'calendar_medical',
    //   iconColor: '',
    //   name: 'WhatsApp',
    //   description: 'An internationally available freeware, cross-platform centralized IM and VoIP service.',
    //   status: AppStatusEnum.UNINSTALLED,
    // },
    {
      id: AppIdEnum.WHISPER,
      icon: 'question_answer',
      iconColor: '#3b8553',
      name: 'Whisper',
      description: 'Sending messages and mutual support between agents.',
      status: AppStatusEnum.INSTALLED,
    },
    // {
    //   id: AppIdEnum.CALLBAR,
    //   icon: 'call',
    //   iconColor: '#e3ab3d',
    //   name: 'Callbar',
    //   description: 'The applet allows agents to make and receive calls.',
    //   status: AppStatusEnum.INSTALLED,
    // },
    {
      id: AppIdEnum.CASE_CREATOR,
      icon: 'work',
      iconColor: '#3E048B',
      name: 'Case Creator',
      description: 'Agent can create case anytime to track something.',
      status: AppStatusEnum.INSTALLED,
    },
    // {
    //   id: AppIdEnum.EMAIL,
    //   icon: 'email',
    //   iconColor: '#3E048B',
    //   name: 'Email',
    //   description: 'The applet allows agents to make and receive emails.',
    //   status: AppStatusEnum.INSTALLED,
    // },
    {
      id: AppIdEnum.REMIND_ME,
      icon: 'insert_drive_file',
      iconColor: '#215dd7',
      name: 'Remind Me',
      description: 'Reminds agents himself something important need to track.',
      status: AppStatusEnum.UNINSTALLED,
    },
    {
      id: AppIdEnum.WORDS_FETCHING,
      icon: 'assignment',
      iconColor: '#bed0ef',
      name: 'Words Fetching',
      description: 'Integrated with different applications and provide users with quick access.',
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
