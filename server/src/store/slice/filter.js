import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    isLoading: false,
    filterKeyword:'',
    filterCategories:[],
    filterPrices:{min:0,max:0},
    filterMemories:[],
    filterRating:0,
    error: null,
}
const slice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        // START LOADING
        startLoading(state) {
            state.isLoading = true;
        },
        setFilterKeyword(state, action){
            state.filterKeyword = action.payload;
        },
        setCategories(state,action){
            state.filterCategories = action.payload;
        },
        setPrices(state,action){
            state.filterPrices = action.payload;
        },
        setMemories(state,action){
            state.filterMemories = action.payload;
        },
        setRating(state,action){
            state.filterRating = action.payload;
        },
        // HAS ERROR
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});
export default slice.reducer;
export const { setPrices, setCategories,setMemories,setRating,setFilterKeyword } = slice.actions;
