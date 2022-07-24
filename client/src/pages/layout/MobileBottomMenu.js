import { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Icon} from '@iconify/react';
import { t } from "i18next";
import { strNumber } from "../../utils/uFormatter";
export default function MobileBottomMenu() {
    const [currentTab,setCurrentTab] = useState(0);
    // const {pathname} = useLocation();
    const pathname = window.location.pathname;
    const navigate = useNavigate();
    const { carts, favorites } = useSelector((state) => state.basket);
    useEffect(()=>{
        if(pathname === "/shopping/favorite"){
            setCurrentTab(3)
        }
        if(pathname === "/shopping/basket"){
            setCurrentTab(4);
        }
        if(pathname === "/shopping"){
            setCurrentTab(0);
        }
    },[pathname]);

    return (
        <div className="w-full grid grid-cols-5 bg-white fixed bottom-0 left-0 border-t items-center text-xs">
            <div className={` flex flex-col w-full py-1 text-center ${currentTab === 0 ? 'border-b-2  border-red-500' : 'border-b'}`} onClick={() => setCurrentTab(0)}>
                <div className="flex justify-center"><Icon icon ='bi:shop' width = {20}/></div>
                <label >{t('words.shop')}</label>

            </div>
            <div className={` flex flex-col w-full py-1 text-center ${currentTab === 1 ? 'border-b-2  border-red-500' : 'border-b'}`} onClick={() => setCurrentTab(1)}>
                <div className="flex justify-center"><Icon icon ='bx:user-circle' width = {20}/></div>
                <label>{t('words.account')}</label>
            </div>
            <div className={` flex flex-col w-full py-1 text-center ${currentTab === 2 ? 'border-b-2  border-red-500' : 'border-b'}`} onClick={() => setCurrentTab(2)}>
                <div className="flex justify-center"><Icon icon ='bx:search' width = {20}/></div>
                <label>{t('words.search')}</label>
            </div>
            <div className={`relative flex flex-col w-full py-1 text-center ${currentTab === 3 ? 'border-b-2  border-red-500' : 'border-b'}`} onClick={() => {setCurrentTab(3); navigate('/shopping/favorite')}}>
                <div className="flex justify-center"><Icon icon ='ic:sharp-favorite-border' width = {20}/></div>
                <label>{t('words.favorite')}</label>
                {favorites?.length>0 &&
                <span className = "badge badge-error absolute right-2 -top-2">{favorites?.length}</span>
                }
            </div>
            <div className={` flex flex-col w-full py-1 text-center ${currentTab === 4 ? 'border-b-2  border-red-500' : 'border-b'}`} onClick={() => {setCurrentTab(4); navigate('/shopping/basket')}}>
                <div className="flex justify-center"><Icon icon ='bi:cart-check' width = {20}/></div>
                <label>{t('words.cart')}</label>
                {carts?.length>0 &&
                <span className = "badge badge-error absolute right-2 -top-2">{strNumber(carts?.reduce((value,cart)=>(value+cart.amount),0))}</span>
                }
            </div>
    
        </div>
    )
}