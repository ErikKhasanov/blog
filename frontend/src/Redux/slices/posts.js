/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../api/axios';

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  const { data } = await Axios.get('/posts');
  return data;
});

export const getTags = createAsyncThunk('tags/getTags', async () => {
  const { data } = await Axios.get('/tags');
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.posts.status = 'loading';
    },
    [getPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [getPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    [getTags.pending]: (state) => {
      state.tags.status = 'loading';
    },
    [getTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [getTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },
  },
});

const postsReducer = postsSlice.reducer;

export default postsReducer;
