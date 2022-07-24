
import { Icon } from "@iconify/react";
import { t } from "i18next";
import { useEffect, useState } from "react";

import { Link,useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Rating from "../../components/Ratings";
import BasketTableSkeleton from "../../components/skeleton/BasketSkeleton";
import TextMaxLine from "../../components/TextMaxLine";

import { getProductImageUrl, getProductRating } from "../../utils/productParser";
import { strPrice, strNumber } from "../../utils/uFormatter";
import Page from "../../components/Page";

import { API_CLIENT, SEND_POST_REQUEST } from "../../utils/API";

export default function DeliveryOrders() {
 
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
     
    useEffect(() => {
        setLoading(true)
            SEND_POST_REQUEST(API_CLIENT.product.getDeliveryOrders).then(res => {
                setLoading(false);
                if (res.status === 200 && res.data) {
                    setOrders(res.data);
                }
            }).catch(err => {
                setLoading(false);
            })
       
    }, []);

    return (
        <Page title="Favorites" className="flex flex-col w-full gap-2 sm:gap-4 ">
            <div className="breadcrumbs  bg-base-300 absolute w-full left-0 px-6 overflow-x-hidden mt-24">
                <ul>
                    <li>
                        <Link to='/'>{t('words.home')}</Link>
                    </li>
                    <li>
                        <Link to='/shopping'>{t('words.shopping')}</Link>
                    </li>
                    <li>
                        <label >{t('menu.my-orders')}</label>
                    </li>
                </ul>
            </div>
            <div className="mt-40 w-full"></div>
            <div className="flex flex-col w-full p-4 gap-4 items-center">
            <label className="font-bold">
                {t('shopping.delivery-orders')}&nbsp;({orders?.length} {t('words.items')})
            </label>
            {orders.length === 0 &&
                <div className="w-full sm:w-3/4 flex flex-col gap-4 items-center">
                    <img className="w-full max-w-sm h-full" alt='empty' src='/assets/empty_cart.svg'>

                    </img>
                    <label className="text-lg">No Product yet</label>
                </div>
            }
            {
                loading && <BasketTableSkeleton></BasketTableSkeleton>
            }
            {/* product list */}
            {!loading && orders?.length > 0 &&
                <div className="w-full overflow-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <td>
                                    {t('shopping.product')}
                                </td>
                                <td>
                                    {t('shopping.price')}
                                </td>
                                <td>
                                    {t('shopping.amount')}
                                </td>
                                <td>
                                    {t('shopping.delivery-status')}
                                </td>
                                <td>

                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order, index) => (
                                    <tr key={index}>
                                        <td className = 'cursor-pointer' onClick = {()=>navigate(`/product-detail/${order?.product?.id}`,{replace:true})}>
                                            
                                            <div className="flex gap-2 w-72 items-center">
                                                <LazyLoadImage
                                                    src={`${getProductImageUrl(order?.product?.image)}`}
                                                    wrapperClassName="w-24"
                                                    effect="blur"
                                                    alt={`${index}`}
                                                >
                                                </LazyLoadImage>
                                                <div className="flex flex-col w-48">
                                                    <TextMaxLine
                                                        maxLine={1}
                                                        text={order?.product?.title}>

                                                    </TextMaxLine>
                                                    <Rating
                                                        size="sm"
                                                        readOnly={true}
                                                        value={getProductRating(order?.product?.reviews)}>
                                                    </Rating>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {strPrice(order?.cost*order?.amount, order?.currency)}
                                        </td>
                                        <td>
                                            {strNumber(order?.amount)}
                                        </td>
                                        <td>
                                            {order?.status === ''?"Waiting":orders?.status}
                                        </td>
                                        <td>
                                            <button className="btn btn-ghost p-0 btn-circle" >
                                                <Icon icon="akar-icons:trash-can" width={20}></Icon>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3}>

                                </td>
                                <td className='text-lg font-bold text-accent '>
                                    {
                                        strPrice(orders.reduce((value,order)=>(value+order.cost*order.amount),0),"USD")
                                    }
                                </td>
                                <td>
                                    <button className="btn btn-ghost p-0 btn-circle">
                                        <Icon icon="akar-icons:trash-can" width={20}></Icon>
                                    </button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            }
            
        </div>
        </Page>
    )
}