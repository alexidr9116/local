import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    isLoading: false,
    themeMode: "light",
    language: { key: "en", value: "English", flag:'twemoji:flag-for-flag-united-kingdom', currency:'$' },
    error: null,
}
const slice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        // START LOADING
        startLoading(state) {
            state.isLoading = true;
        },
        setLanguage(state, action) {
            state.language = action.payload
        },
        setThemeMode(state, action) {
            state.themeMode = action.payload;
        },
        // HAS ERROR
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

    }
});
export default slice.reducer;
export const { setThemeMode, setLanguage } = slice.actions;
