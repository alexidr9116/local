
import {clearBasket, clearFavorites, pushToBasket,pushToFavorite,removeFromBasket,removeFromFavorite } from "../slice/basket";
import { dispatch } from "../store";

export const clearFavoritesFromStore = async()=>{
    dispatch(clearFavorites());
}
export const clearBasketFromStore = async()=>{
    dispatch(clearBasket());
}
export const pushToBasketToStore = async(data)=>{
    dispatch(pushToBasket(data));
    return true;
}
export const pushToFavoriteToStore = async(data)=>{
    dispatch(pushToFavorite(data));
    return true;
}
export const removeFromBasketFromStore = async(data)=>{
    dispatch(removeFromBasket(data));
    return true;
}
export const removeFromFavoriteFromStore = async(data)=>{
    dispatch(removeFromFavorite(data));
    return true;
}

 