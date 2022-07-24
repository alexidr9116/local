
import { Icon } from "@iconify/react";
import { t } from "i18next";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux"
import { Link,useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Rating from "../../components/Ratings";
import BasketTableSkeleton from "../../components/skeleton/BasketSkeleton";
import TextMaxLine from "../../components/TextMaxLine";

import { getProductImageUrl, getProductRating } from "../../utils/productParser";
import { strPrice, strNumber } from "../../utils/uFormatter";
import Page from "../../components/Page";
import useCurrencyRate from "../../hook/useCurrencyRate";

import { removeFromFavoriteFromStore,clearFavoritesFromStore } from "../../store/action/basketAction";
import { API_CLIENT, SEND_POST_REQUEST } from "../../utils/API";

export default function ShoppingFavorites() {
    const { currency, time } = useCurrencyRate();

    const { favorites } = useSelector((state) => state.basket);
    const [baskets, setBaskets] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const handleRemoveAll = async () => {
        setBaskets([]);
        await clearFavoritesFromStore();

    }

    const handelRemoveOne = async (product) => {
        setBaskets(baskets.filter((p) => p.id !== product.id));
        await removeFromFavoriteFromStore(product.id);

    }
    useEffect(() => {
        const ids = [];

        for (const favorite of favorites)
            ids.push(favorite);
        if (ids.length > 0) {
            setLoading(true);
            SEND_POST_REQUEST(API_CLIENT.product.getProductsByIds, { ids }).then(res => {
                setLoading(false);
                if (res.status === 200 && res.data) {
                    setBaskets(res.data);
                }
            }).catch(err => {
                setLoading(false);
            })
        }

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
                        <label >{t('shopping.favorite')}</label>
                    </li>
                </ul>
            </div>
            <div className="mt-40 w-full"></div>
            <div className="flex flex-col w-full p-4 gap-4 items-center">
            <label className="font-bold">
                {t('shopping.favorites')}&nbsp;({favorites?.length} {t('words.items')})
            </label>
            {favorites.length === 0 &&
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
            {!loading && favorites?.length > 0 &&
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

                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                baskets.map((product, index) => (
                                    <tr key={index}>
                                        <td className = 'cursor-pointer' onClick = {()=>navigate(`/product-detail/${product.id}`,{replace:true})}>
                                            
                                            <div className="flex gap-2 w-72 items-center">
                                                <LazyLoadImage
                                                    src={`${getProductImageUrl(product?.image)}`}
                                                    wrapperClassName="w-24"
                                                    effect="blur"
                                                    alt={`${index}`}
                                                >
                                                </LazyLoadImage>
                                                <div className="flex flex-col w-48">
                                                    <TextMaxLine
                                                        maxLine={1}
                                                        text={product?.title}>

                                                    </TextMaxLine>
                                                    <Rating
                                                        size="sm"
                                                        readOnly={true}
                                                        value={getProductRating(product?.reviews)}>
                                                    </Rating>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {strPrice(product?.price * time, currency)}
                                        </td>
                                        <td>
                                            {strNumber(product.quantity)}
                                            
                                        </td>
                                        <td>
                                            <button className="btn btn-ghost p-0 btn-circle" onClick={()=>handelRemoveOne(product)}>
                                                <Icon icon="akar-icons:trash-can" width={20}></Icon>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={2}>

                                </td>
                                <td className='text-lg font-bold text-accent '>
                                    {
                                        strNumber(favorites?.length)
                                    }
                                </td>
                                <td>
                                    <button className="btn btn-ghost p-0 btn-circle" onClick={handleRemoveAll}>
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