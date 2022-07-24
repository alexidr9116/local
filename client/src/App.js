import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import Router from './routers';
import { useTranslation } from 'react-i18next';
import { SUPPORT_THEME } from './config';
import { loadShoppingCategories,loadHotProducts,loadLastCurrencyRate, loadPairModels } from './utils/initialize';
import toast from 'react-hot-toast';
import { t } from 'i18next';

function App() {
  const { i18n } = useTranslation();
  const {language, themeMode} = useSelector((state)=>state.setting);


  useEffect(()=>{
    if(themeMode && SUPPORT_THEME.includes(themeMode)){
      const root = window.document.documentElement;
      root.setAttribute('data-theme',themeMode);
    }
  },[themeMode]);


  useEffect(() => {
    i18n.changeLanguage(language?.key);
  }, [language, i18n]);

  useEffect(()=>{
    const initialize = async()=>{
      if(!await(loadShoppingCategories())){
        toast.error(t('messages.not-load-category'));
      }
      if(!await(loadHotProducts())){
        toast.error(t('messages.not-load-hot-product'));
      }
      if(!await(loadLastCurrencyRate())){
        toast.error(t('messages.not-load-currency-rate'));
      }
      if(!await(loadPairModels())){
        toast.error(t('messages.not-load-pair-model'));
      }
    }
    initialize();
  },[])

  return (
    <Router />
  );
}
export default App;
