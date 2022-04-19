import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import authService from 'service/auth_service'
import userService from 'service/user_service'
import httpClient from 'service/http_client'

/* 
user 관련 store를 다루는 redux store 입니다.
createSlice를 통해 전역 user state를 생성하고,
createAsyncThunk를 통해 user 상태를 update 합니다.
*/

// action 정의
const fetchUserByIdAction = createAction('user/fetchByIdStatus')
const fetchUserByRefreshTokenAction = createAction('user/fetchUserByRefreshToken')
const addUserNickNameAction = createAction('user/addUserNickName')
const modifyUserInfoAction = createAction('user/modifyUserInfo')

// 최초 회원 가입 시 user nickname을 설정하고 access token을 set합니다.
const addUserNickName = createAsyncThunk(addUserNickNameAction, async (userInfo, thunkAPI) => {
  console.log('userinfo!!!', userInfo)
  const response = await authService.signUp(userInfo)
  const accessToken = response.data.accessToken
  httpClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
  return userInfo
})

// Userid로 Social Login 후, access token을 설정합니다.
const fetchUserById = createAsyncThunk(fetchUserByIdAction, async (userData, thunkAPI) => {
  const response = await authService.login(userData.social, userData.code)
  const accessToken = response.data.accessToken
  // header에 access token 설정
  httpClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
  return response.data
})

/* page refresh시 cookie에 남아있는 http-only refresh token을 이용해
   유저 정보를 얻어 옵니다. */
const fetchUserByRefreshToken = createAsyncThunk(fetchUserByRefreshTokenAction, async (thunkAPI) => {
  // 생각해볼 것. 성공했을때만 이 data 넣어야 하나?
  const response = await authService.getUserInfo()
  const accessToken = response.data.accessToken
  const userInfo = {
    nickName: response.data.nickName,
    id: response.data._id,
  }
  // header에 access token 설정
  httpClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

  return userInfo
})

// 사용자 정보를 수정하고 access token을 설정합니다.
const modifyUserInfo = createAsyncThunk(modifyUserInfoAction, async (userData, { rejectWithValue }) => {
  const res = await userService.modifyUserInfo(userData.id, userData)
  if (res.modifySuccess) {
    const accessToken = res.user.data.accessToken
    // header에 access token 설정
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
  } else {
    return rejectWithValue(res.modifySuccess)
  }
  return res.user.data
})

const initialState = {
  nickName: undefined,
  id: undefined,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    clearUser: (state) => initialState,
  },
  extraReducers: {
    [fetchUserById.fulfilled]: (state, { payload }) => ({
      ...state,
      nickName: payload.nickName,
      id: payload._id,
    }),

    [fetchUserByRefreshToken.fulfilled]: (state, { payload }) => ({
      ...state,
      nickName: payload.nickName,
      id: payload.id,
    }),

    [addUserNickName.fulfilled]: (state, { payload }) => ({
      ...state,
      nickName: payload.nickName,
      id: payload._id,
    }),

    [modifyUserInfo.fulfilled]: (state, { payload }) => ({
      ...state,
      nickName: payload.nickName,
      id: payload._id,
    }),

    [modifyUserInfo.rejected]: (state, { payload }) => {
      if (payload === 401) {
        state.postError = 'failed' // post 정보 담음
      }
    },
  },
})
export const { setUser, clearUser } = userSlice.actions
export { fetchUserById, fetchUserByRefreshToken, addUserNickName, modifyUserInfo }
export default userSlice.reducer
