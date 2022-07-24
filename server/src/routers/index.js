import { lazy, Suspense } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import SuspenseFallback from '../components/SuspenseFallback';

import DefaultLayout from '../pages/layout/DefaultLayout';
import MainLayout from '../pages/layout/MainLayout';

const Loadable = (Component) => (props) => {

    return (
        <Suspense fallback={<SuspenseFallback />}>
            <Component {...props} />
        </Suspense>
    )
}
export default function Router(){
    return useRoutes([
        {
            path:'/auth',
            element:<MainLayout />,
            children:[
                {element:<Login />, index:true},
                {element:<Login />, path:'login'}, 
                {element:<Signup />, path:'signup'}, 
                {element:<EmailVerify />, path:'verify-email'}, 
                {element:<ForgotPassword />, path:'forgot-password'}, 
            ]
        },
        {
            path:'/shopping',
            element:<DefaultLayout />,
            children:[
                {element:<Shopping />, index:true},
                {element:<ShoppingBasket />, path:'basket'},
                {element:<ShoppingFavorite />, path:'favorite'},
                {element:<DeliveryOrders />, path:'orders'},
                {element:<TransactionHistory />, path:'transactions'},
            ]
        },
        {
            path:'/user',
            element:<DefaultLayout />,
            children:[
                
                {element:<BillingAddressManage />, path:'billing-address'},
                {element:<ShoppingFavorite />, path:'favorite'},
            ]
        },
        { 
            path:'/',
            element:<DefaultLayout />,
            children:[
                {element:<Home />, index:true},
                {element:<Shopping />, path:'/shopping'},
                {element:<ProductDetail />, path:'/product-detail/:productId'}
            ]
        }
    ])
}

// auth
const Login = Loadable(lazy(()=>import("../pages/auth/Login")));
const Signup = Loadable(lazy(()=>import("../pages/auth/Signup")));
const EmailVerify = Loadable(lazy(()=>import("../pages/auth/EmailVerify")));
const ForgotPassword = Loadable(lazy(()=>import("../pages/auth/ForgotPassword")));
// admin

// client
const ProductDetail = Loadable(lazy(()=>import('../pages/client/ProductDetail')));
const Home = Loadable(lazy(()=>import("../pages/Home")));
const BillingAddressManage =Loadable(lazy(()=>import("../pages/client/BillingAddressManage")));
// shopping
const Shopping = Loadable(lazy(()=>import("../pages/client/Shopping")));
const ShoppingBasket = Loadable(lazy(()=>import("../pages/client/ShoppingBasket")));
const ShoppingFavorite = Loadable(lazy(()=>import("../pages/client/ShoppingFavorites")));
const DeliveryOrders = Loadable(lazy(()=>import("../pages/client/DeliveryOrders")));
const TransactionHistory = Loadable(lazy(()=>import("../pages/client/TransactionHistory")));
