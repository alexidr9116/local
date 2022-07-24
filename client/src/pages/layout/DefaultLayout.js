import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import TopHeader from "./TopHeader";
import SearchHeader from "./SearchHeader";
import MobileBottomMenu from './MobileBottomMenu';

export default function DefaultLayout() {
    
    return (
        <main className='px-auto container'>
            <TopHeader />
            <Header />
            <SearchHeader />
            <Outlet />
            <div className = "w-full flex md:hidden  text-black">
                <MobileBottomMenu />
            </div>
            <div className = "w-full hidden md:flex">
                <Footer />
            </div>
        </main>
    );
}