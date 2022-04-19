import { createSlice } from '@reduxjs/toolkit'

/* 

loginStep

login을 위한 modal visibility와 
loginStep(social login, signUp)을 관리하는 redux 입니다.

*/

const initialState = {
  modalVisible: false,
  currentStep: 1,
  nickName: undefined,
  id: undefined,
  likeLanguages: [],
}

const loginstepSlice = createSlice({
  name: 'loginStep',
  initialState,
  reducers: {
    // 로그인 다음단계
    nextStep: (state, action) => ({
      ...state,
      currentStep: state.currentStep + 1,
    }),
    // 로그인 이전단계
    previousStep: (state, action) => ({
      ...state,
      currentStep: state.currentStep - 1,
    }),
    // 로그인 초기화
    clearStep: () => initialState,
    //사용자 회원가입
    setSignUpUser: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    //모달
    setModalVisible: (state, action) => ({
      ...state,
      modalVisible: action.payload,
    }),
  },
})

export const { nextStep, previousStep, clearStep, setSignUpUser, setModalVisible } = loginstepSlice.actions
export default loginstepSlice.reducer
