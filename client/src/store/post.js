import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: '-createdAt',
  sortByViews: [],
  sortByRecent: [],
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    update: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    clear: () => ({}),
  },
})
export const { update, clear } = postSlice.actions
export default postSlice.reducer
