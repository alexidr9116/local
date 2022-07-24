
import {setThemeMode, setLanguage } from "../slice/setting";
import { dispatch } from "../store";
export const setThemeModeToStore = async(data)=>{
    dispatch(setThemeMode(data));
    return true;
}
export const setLanguageToStore = async(data)=>{
    // handle change language mode .
    dispatch(setLanguage(data));
    return true;
}

 