import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import DropdownMenu from '../../components/DropdownMenu';
import Logo from "../../components/Logo";

import { MAIN_MENU_ROUTERS } from "../../routers/MenuRouters";
import MainMenu from "./MainMenu";
import MobileNavDrawer from './MobileNavDrawer';
import useAuth from '../../hook/useAuth';
import { ASSETS_URL } from '../../utils/API';
import AccountMenu from './AccountMenu';
import { SUPPORT_LOCALES } from '../../config';

export default function Header() {
    const [dropdownClose, setDropdownClose] = useState(false);
    const { carts, favorites } = useSelector((state) => state.basket);
    const { user, isAuthenticated, logout } = useAuth();

    const { themeMode } = useSelector((state) => state.setting);
    const { mainCategories } = useSelector((state) => state.shopping);
    const [navbar, setNavbar] = useState(false);
    return (
        <div className={`flex w-full justify-between p-2 border-b items-center ${themeMode === 'light' ? 'border-stone-300' : 'border-gray-800'}`} >
            <Link className='cursor-pointer' to = '/'>
                <Logo mode={themeMode} />
            </Link>
            <div className="hidden md:flex">
                <MainMenu routers={MAIN_MENU_ROUTERS} />
            </div>
            <div className="flex sm:hidden">
                <button className="btn btn-sm btn-ghost rounded-full h-8 w-8  p-0" onClick={() => (setNavbar(true))}><Icon icon={'dashicons:menu-alt'} /></button>
            </div>
            <div className='hidden sm:flex gap-2'>
                {/* avatar  */}
                <DropdownMenu
                    header={
                        <button className='avatar ' onClick={()=>{setDropdownClose(!setDropdownClose)}}>
                            <div className='w-10 rounded-full'>
                                {isAuthenticated && user && user?.image &&
                                    <img src={`${ASSETS_URL.image}${user.image}`} alt='avatar' />
                                }
                                {!isAuthenticated &&
                                    <img src='/assets/avatar.jpg' alt='avatar' />
                                }
                            </div>
                        </button>
                    }
                    contentClass='-ml-10'
                    close={dropdownClose}
                    content={
                        isAuthenticated &&
                        <AccountMenu user={user} isAuthenticated={isAuthenticated} logout={logout} onClose={() => { setDropdownClose(true) }} />

                    }
                ></DropdownMenu>
                {/* favorite */}

                <div className='relative'>
                    <Link className='btn btn-sm p-1 h-10 w-10 rounded-full btn-ghost' to="/shopping/favorite"><Icon icon="ic:twotone-favorite-border" width={28}></Icon></Link>
                    {favorites?.length > 0 &&
                        <span className='badge badge-error badge-sm absolute -ml-4'>{favorites.length}</span>
                    }
                </div>
                {/* shopping cart */}
                <div className='relative'>
                    <Link className='btn btn-sm p-1 h-10 w-10 rounded-full btn-ghost' to="/shopping/basket"><Icon icon="carbon:shopping-cart-plus" width={24}></Icon></Link>
                    {carts?.length > 0 &&
                        <span className='badge badge-error badge-sm absolute -ml-4'>
                            {carts?.reduce((prev, current) => (prev + current.amount), 0)}
                        </span>
                    }
                </div>

            </div>
            {/* mobile nav bar */}
            {navbar &&
                <MobileNavDrawer onClose={() => setNavbar(false)} open={navbar} routers={MAIN_MENU_ROUTERS} categories={mainCategories}></MobileNavDrawer>
            }
        </div>
    )
}