import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showSignupModal: false,
  showLoginModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleSignupModal: (state) => {
      state.showSignupModal = !state.showSignupModal;
    },
    toggleLoginModal: (state) => {
      state.showLoginModal = !state.showLoginModal;
    },
  },
});

export const { toggleSignupModal, toggleLoginModal } = modalSlice.actions;

export const { reducer: modalReducer} = modalSlice
