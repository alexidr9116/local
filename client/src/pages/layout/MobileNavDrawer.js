import { Icon } from "@iconify/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Drawer from "../../components/Drawer";
import { SUPPORT_LOCALES } from "../../config";
import { setFilterCategoriesToStore } from '../../store/action/filterAction';
import { setLanguageToStore } from "../../store/action/settingAction";

export default function MobileNavDrawer({ open, onClose, routers = [], categories = [] }) {
    const [currentTab, setCurrentTab] = useState(0);
    const { t } = useTranslation();
    const { language, themeMode } = useSelector((state) => state.setting);
    const handleChangeLocale = async(locale)=>{
        setLanguageToStore(locale);
    }
    return (
        <Drawer className="min-w-[320px]" open={open} onClose={onClose} children={<>
            <div className="grid grid-cols-2">
                <div className={` py-4 text-center w-full ${currentTab === 0 ? 'border-b-2  border-red-500' : 'border-b'}`} onClick={() => setCurrentTab(0)}>{t('words.main-menu')}</div>
                <div className={` w-full py-4 text-center ${currentTab === 1 ? 'border-b-2  border-red-500' : 'border-b'}`} onClick={() => setCurrentTab(1)}>{t('words.shop-by-categories')}</div>
            </div>

            <div className="flex flex-col w-full px-2  mb-12">
                {/* shop by categories */}
                {
                    currentTab === 1 && categories.map((category, index) => (
                        <Link key={index} className={`border-b ${themeMode === 'light' ? 'border-stone-300' : 'border-gray-800'} p-3`} to={`/shopping`} onClick = {()=>{   setFilterCategoriesToStore([category.id]);}}>
                            {category.slug}
                        </Link>
                    ))
                }
                {/* main menu */}
                {currentTab === 0 && routers.map((router, index) => (

                    <div tabIndex={0} className={`collapse collapse-arrow  border-b  ${themeMode === 'light' ? 'border-stone-300' : 'border-gray-800'}`} key={index}>
                        <div className="collapse-title min-h-[2.75rem] py-2 "  >
                            {/* {t('words.shopping')} */}
                            <Link to={`${router.path}`}>{router.title}</Link>
                        </div>
                        {router.elements &&
                            <div className="collapse-content flex-col flex">
                                {router.elements.map((element, i) => (
                                    <Link key={`${element.path}`} className={`border-t ${themeMode === 'light' ? 'border-stone-300' : 'border-gray-800'} p-2`} to={`${element.path}`}>
                                        {element.title}
                                    </Link>
                                ))}
                            </div>
                        }
                    </div>
                ))}
            </div>
            <div className={`absolute bg-base-300 w-full max-w-[320px] justify-end gap-2 flex bottom-0 border-t ${themeMode === 'light' ? 'border-stone-300' : 'border-gray-800'} p-2`}>
                {SUPPORT_LOCALES.map((locale, index) => (
                    <button 
                    onClick={()=>handleChangeLocale(locale)}
                    className={`btn btn-sm border-0 bg-none p-0  btn-ghost justify-start ${language.key === locale.key ? 'btn-active':''}`} key={locale.key}>
                        <Icon icon={locale?.flag} width={20} className="mx-2"></Icon >
                    </button>
                ))
                }
            </div>

        </>
        }>
        </Drawer>
    )
}