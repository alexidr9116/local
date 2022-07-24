
import {setFavorites, setCategories,setHotProducts, setCurrencyRates, setPairModels } from "../slice/shopping";
import { dispatch } from "../store";

export const setPairModelsToStore = async(data)=>{
    dispatch(setPairModels(data));
    return true;
}
export const setCurrencyRatesToStore = async(data)=>{
    dispatch(setCurrencyRates(data));
    return true;
}
export const setCategoriesToStore = async(data)=>{
    dispatch(setCategories(data));
 
    return true;
}
export const setHotProductsToStore = async(data)=>{
    dispatch(setHotProducts(data));
    return true;
}
export const setFavoritesToStore = async(data)=>{
    
    dispatch(setFavorites(data));
    return true;
}

 