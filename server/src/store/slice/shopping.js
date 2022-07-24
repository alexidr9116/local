import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    isLoading: false,
    currencyRates:{
        usd:1, mnt:3130, rmb:6.7
    },
    hotProducts:[

    ],
    mainCategories:[

    ],
    categories:[
        
    ],
    favorites:[
        
    ],
    pairModels:[

    ],
    error: null,
}
const slice = createSlice({
    name: 'shopping',
    initialState,
    reducers: {
        // START LOADING
        startLoading(state) {
            state.isLoading = true;
        },
        setCurrencyRates(state,action){
            state.currencyRates =action.payload;
        },
        setPairModels(state,action){
            state.pairModels = action.payload;
        },
        setHotProducts(state, action){
            state.hotProducts = action.payload;
        },
        setCategories(state, action) {
            state.categories = action.payload
            state.mainCategories = action.payload.filter((category)=>(category.parent_id === 0));
        },
        setFavorites(state, action) {
            state.favorites = action.payload;
        },
        // HAS ERROR
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});
export default slice.reducer;
export const { setFavorites, setCategories,setHotProducts,setCurrencyRates,setPairModels } = slice.actions;
