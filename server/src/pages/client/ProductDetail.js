
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';

import Page from "../../components/Page";
import ProductCarousel from "../../components/ProductCarousel";

import { CarouselSkeleton } from "../../components/skeleton/ProductDetailSkeleton";
import useCurrencyRate from "../../hook/useCurrencyRate";
import { ProductAddition, ProductNote, ProductReviews } from "../../sections/products/ProductDetailing";

import ProductInformation from "../../sections/products/ProductInformation";
import { setFilterCategoriesToStore } from "../../store/action/filterAction";
import { API_CLIENT, SEND_GET_REQUEST } from "../../utils/API";

export default function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const {favorites} = useSelector((state)=>state.basket);
    const [loading, setLoading] = useState({
        fetching: false,
        saving: false,
    })
    const currencyRate = useCurrencyRate();
    const [currentTab, setCurrentTab] = useState(3);
    
    useEffect(() => {
        setLoading((prev) => { prev.fetching = true; return prev });
        SEND_GET_REQUEST(`${API_CLIENT.product.getDetail}${productId}` ).then(res => {
            setLoading((prev) => { prev.fetching = false; return prev });
            if (res.status === 200 && res.data) {
                setProduct(res.data);
            }
            else
                toast.error(res?.message);
        }).catch(err => {
            console.log(err);
            toast.error('Fatal Error');
            setLoading((prev) => { prev.fetching = false; return prev });
        })
    }, [productId])
    return (
        <Page title={`${product?.name || productId}`} className='flex flex-col gap-2 mt-24 w-full'>
            {/* breadcrumbs */}
            <div className="breadcrumbs  bg-base-300 absolute w-full left-0 px-6 overflow-x-hidden">
                <ul>
                    <li>
                        <Link to="/" >{t('words.home')}</Link>
                    </li>
                    <li>
                        <Link to="/shopping">{t('words.shopping')}</Link>
                    </li>
                    <li>
                        <Link to="/shopping" onClick={()=>(setFilterCategoriesToStore([product?.maincategory_id]))}>{product?.t_category?.slug}</Link>
                    </li>
                    <li>
                        <label>{product?.title}</label>
                    </li>
                </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-2 mt-12 p-2">
                {/* carousel */}
                {
                    loading.fetching &&
                    <CarouselSkeleton />
                }
                {
                    !loading.fetching && product!==null &&
                    <ProductCarousel product={product} />
                }

                {/* product information */}
                <ProductInformation fetching={loading.fetching} product={product} favorites = {favorites} currencyRate = {currencyRate}/>

            </div>
            {/* tab  */}
            <div className="grid gap-2 p-2">
                <div className="tabs flex w-full mb-2">
                    <label className={`tab tab-bordered ${currentTab === 1 ? 'tab-active' : ''}`} onClick={() => setCurrentTab(1)}>{t('product.note')}</label>
                    {/* <label className={`tab tab-bordered ${currentTab === 2 ? 'tab-active' : ''}`} onClick={() => setCurrentTab(2)}>{t('product.addition')}</label> */}
                    <label className={`tab tab-bordered ${currentTab === 3 ? 'tab-active' : ''}`} onClick={() => setCurrentTab(3)}>{t('words.reviews')}</label>
                    <label className="tab tab-bordered flex-1">&nbsp;</label>
                </div>
                {currentTab === 1 && product!==null &&
                    <ProductNote product={product} />
                }
                {currentTab === 2 && product!==null &&
                    <ProductAddition product={product} />
                }
                {currentTab === 3 && product!==null &&
                    <ProductReviews product={product} />
                }
            </div>
        </Page>
    )
}