import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DefaultAPIResponse, User, UserAPIResponse } from '@/utils/types';

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

const getUser = createAsyncThunk<UserAPIResponse>('user/getUser', async (_, thunkAPI) => {
    try {
        const response = await fetch('/api/v1/users/me', {
            method: 'GET',
        });
        const data = response.json();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// Remove user from state, delete user from database and reset token

const deleteUser = createAsyncThunk<DefaultAPIResponse>('user/deleteUser', async (_, thunkAPI) => {
    try {
        const response = await fetch('/api/v1/users/me', {
            method: 'DELETE',
            headers: {
                'Clear-Site-Data': '"cache", "cookies", "storage", "executionContexts"',
            },
        });
        const data = response.json();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// Remove user from state and reset token

const logoutUser = createAsyncThunk<DefaultAPIResponse>('user/logoutUser', async (_, thunkAPI) => {
    try {
        const response = await fetch('/api/v1/auth/logout', {
            method: 'POST',
            headers: {
                'Clear-Site-Data': '"cache", "cookies", "storage", "executionContexts"',
            },
        });
        const data = response.json();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            if (action.payload !== null) {
                state.user = action.payload;
            } else {
                state.user = null;
            }
        },
    },
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

export { deleteUser, getUser, logoutUser };
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
