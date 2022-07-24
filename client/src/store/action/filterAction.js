
import {setCategories,setFilterKeyword,setMemories,setPrices,setRating} from "../slice/filter";
import { dispatch } from "../store";

export const setRatingToStore = async(data)=>{
    dispatch(setRating(data));
    return true;
}
export const setPricesToStore = async(data)=>{
    dispatch(setPrices(data));
    return true;
}

export const setFilterCategoriesToStore = async(data)=>{
    dispatch(setCategories(data));
    return true;
}
export const setMemoriesToStore = async(data)=>{
    dispatch(setMemories(data));
    return true;
}
export const setFilterKeywordToStore = async(data)=>{
    dispatch(setFilterKeyword(data));
    return true;
}

 