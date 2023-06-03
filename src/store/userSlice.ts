import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { UserState, User } from '../interfaces/interfaces';

const initialState: UserState = {
    token: null,
    users: []
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        clearToken: (state) => {
            state.token = null;
        },
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        clearUsers: (state, action: PayloadAction<User[]>) => {
            state.users = [];
        },
    },
});

export const { setToken, clearToken } = userSlice.actions;

export const { setUsers, clearUsers } = userSlice.actions;

export const selectToken = (state: RootState) => state.user.token;

export const selectUsers = (state: RootState) => state.user.users;

export default userSlice.reducer;
