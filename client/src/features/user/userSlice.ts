import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User, UserAPIResponse } from '@/utils/types';

interface UserState {
    user: User | null;
    isAuth: boolean;
    userLoading: boolean;
}

const initialState: UserState = {
    user: null,
    isAuth: false,
    userLoading: true,
};

// Get user info and set it to state

const getUser = createAsyncThunk<UserAPIResponse>('user/getUser', async () => {
    const response = await fetch('/api/v1/users/me', {
        method: 'GET',
    });
    const data = response.json();
    return data;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(getUser.rejected, (state) => {
                state.userLoading = false;
            })
            .addCase(getUser.fulfilled, (state, action: PayloadAction<UserAPIResponse>) => {
                state.userLoading = false;
                state.user = action.payload.user;
                state.isAuth = action.payload.isAuth;
            });
    },
});

export { getUser };
export default userSlice.reducer;
