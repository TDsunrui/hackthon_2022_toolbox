import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppType = {
  id: string;
}

interface GlobalState {
  curApp: AppType;
}

const initialState: GlobalState = {
  curApp: {
    id: '',
  },
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    openAppModal: (state, action: PayloadAction<GlobalState['curApp']>) => {
      state.curApp = action.payload || initialState.curApp;
    },
    closeAppModal: (state) => {
      state.curApp = initialState.curApp;
    },
  }
});

export const { openAppModal, closeAppModal } = globalSlice.actions;

export default globalSlice.reducer;
