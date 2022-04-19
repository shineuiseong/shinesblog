import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import postService from 'service/post_service'

/*

editor 상태를 관리하는 redux store 입니다.
title은 제목, content 내용

To-do
생성시 글 id 건내주기 api 적용
*/

//액션
const WritePostAction = createAction('write/writePost')
const modifyPostAction = createAction('write/modifyPost')

const writePost = createAsyncThunk(WritePostAction, async ({ title, content }, thunAPI) => {
  const response = await postService.register({
    title,
    content,
  })

  return response
})

const modifyPost = createAsyncThunk(modifyPostAction, async ({ postId, title, content }, thunAPI) => {
  const response = await postService.modify({
    postId,
    title,
    content,
  })

  return response
})

const initialState = {
  title: '',
  content: '',
  post: undefined,
  postError: undefined,
  postId: undefined,
}

const writeSlice = createSlice({
  name: 'write',
  initialState,
  reducers: {
    changeField: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),

    changeLanguage: (state, { payload: language }) => ({
      ...state,
      language,
    }),

    clearField: (state) => initialState,

    setPost: (state, { payload: post }) => ({
      ...state,
      title: post.title,
      content: post.content,
      language: post.language,
      postId: post.id,
    }),
  },
  extraReducers: {
    [writePost.pending]: (state, { payload }) => ({
      ...state,
      post: null,
      postError: null,
    }),
    [writePost.fulfilled]: (state, { payload }) => {
      // 수정 필요
      if (payload === 201) {
        state.post = 'success'
      }
      state.post = payload // post 정보 담음
    },
    [writePost.rejected]: (state, { payload }) => {
      if (payload === 401) {
        state.postError = 'failed' // post 정보 담음
      }
    },
    [modifyPost.fulfilled]: (state, { payload }) => {
      // 수정 필요
      if (payload === 200) {
        state = { ...state, post: 'success' }
        return state
      }
      state.post = payload // post 정보 담음
    },
    [modifyPost.rejected]: (state, { payload }) => {
      if (payload === 401) {
        state.postError = 'failed' // post 정보 담음
      }
    },
  },
})
export const { changeField, changeLanguage, clearField, setPost } = writeSlice.actions
export { writePost, modifyPost }
export default writeSlice.reducer
