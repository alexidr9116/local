import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DropdownMenu from '../../components/DropdownMenu';
import { SUPPORT_LOCALES } from '../../config';
import useAuth from '../../hook/useAuth';
import { setLanguageToStore, setThemeModeToStore } from '../../store/action/settingAction'

export default function TopHeader() {
    const { t } = useTranslation();
    const [dropdownClose, setDropdownClose] = useState(false);
    const {isAuthenticated} = useAuth();
    const { language, themeMode } = useSelector((state) => state.setting);
    const handleThemeMode = async()=>{
     
        if(themeMode === 'light'){
            await setThemeModeToStore('night')
        }
        else{
            await setThemeModeToStore('light')
        }
    }
    const handleChangeLocale = async(locale)=>{
        setDropdownClose(true)
        setLanguageToStore(locale);
    }
    useEffect(() => {

    }, []);
    return (
        <div className={`flex justify-between px-2 items-center border-b ${themeMode==='light'?'border-stone-300':'border-gray-800'}`}>
            <div className="flex gap-4">
                <Link to='/service'>{t('menu.service')}</Link>
                <Link to='/shopping'>{t('menu.shop')}</Link>
                <Link to='/FAQ'>{t('words.faq')}</Link>
                {!isAuthenticated && <Link to='/auth'>{t('menu.login')}</Link>}
            </div>
            <div className='flex items-center'>
                <div className='flex gap-2'>
                    <button className='rounded-full btn-sm btn-ghost btn p-2 ' onClick={handleThemeMode}>
                        {themeMode === "light" &&
                            <Icon icon = {'ic:baseline-mode-night'} width={14}></Icon>
                        }
                        {themeMode === 'night' && 
                            <Icon icon = {'icomoon-free:sun'}  width={14}></Icon>
                        }
                    </button>
                </div>
                <div className='hidden sm:flex'>
                    <DropdownMenu
                        close = {dropdownClose}
                        contentClass='w-32'
                        direction='dropdown-end'
                        header={
                            <button onClick={()=>(setDropdownClose(false))} className='btn btn-sm border-0 bg-none px-2 btn-ghost'>
                                <Icon icon={language?.flag} width={20} className="mr-2"></Icon >{language.value}
                            </button>
                        }
                        items={
                            SUPPORT_LOCALES.map((locale, index) => (
                                <button className='btn btn-sm border-0 bg-none p-0  btn-ghost justify-start ' key={locale.key} onClick={()=>handleChangeLocale(locale)} >
                                    <Icon icon={locale?.flag} width={20} className="mx-2"></Icon >{locale.value}
                                </button>
                            ))
                        }
                    />
                </div>
            </div>

        </div>
    )
}