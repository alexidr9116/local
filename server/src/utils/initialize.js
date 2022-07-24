import { API_CLIENT, SEND_GET_REQUEST } from "./API";

const { setCategoriesToStore,setHotProductsToStore,setCurrencyRatesToStore, setPairModelsToStore } = require("../store/action/shoppingAction")

export const loadPairModels = async()=>{
    const response = await SEND_GET_REQUEST(`${API_CLIENT.common.getPairs}`);
    if(response.status === 200 && response.data){
        setPairModelsToStore(response.data);       
        return true;
    }
    else{
        return false;
    }
}
export const loadLastCurrencyRate = async()=>{
    const response = await SEND_GET_REQUEST(`${API_CLIENT.common.getLastCurrencyRate}`);
    if(response.status === 200 && response.data){
        setCurrencyRatesToStore(response.data);       
        return true;
    }
    else{
        return false;
    }
}
export const loadHotProducts = async()=>{
    const response = await SEND_GET_REQUEST(`${API_CLIENT.product.getHot}`);
    if(response.status === 200 && response.data){
        setHotProductsToStore(response.data);       
        return true;
    }
    else{
        return false;
    }
}
export const loadShoppingCategories = async()=>{
    const response = await SEND_GET_REQUEST(`${API_CLIENT.category.getAll}`);
    
    if(response.status === 200 && response.data){
        setCategoriesToStore(response.data);       
        return true;
    }
    else{
        return false;
    }
    
     
}