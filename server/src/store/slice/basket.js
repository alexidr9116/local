import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    favorites:[],   // [productId]
    carts:[],       // [{id:1,amount:2}]
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
        clearBasket(state){
            state.carts = [];
        },
        clearFavorites(state){
            state.favorites = [];
        },
        pushToBasket(state,action){
            // update amount only
            for(const product of state.carts){
                if(product.id === action.payload.id){
                    product.amount = action.payload.amount;
                }
            }
            // if not exist, then push new
            if(state.carts.filter((product)=>(product.id === action.payload.id)).length === 0){
                state.carts.push(action.payload);    
            }
        },
        removeFromBasket(state,action){
            state.carts = state.carts.filter((p)=>p.id !== action.payload);
        },
        pushToFavorite(state,action){
            if(!state.favorites.includes(action.payload))
                state.favorites.push(action.payload);
        },
        removeFromFavorite(state,action){
            
            state.favorites = state.favorites.filter((p)=>p !== action.payload);
        },
        // HAS ERROR
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

    }
});
export default slice.reducer;
export const { pushToBasket, removeFromBasket,pushToFavorite, removeFromFavorite,clearBasket,clearFavorites } = slice.actions;
