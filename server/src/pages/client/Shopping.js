import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import Page from '../../components/Page';

import { SUPPORT_MEMORY_SIZE } from '../../config';
import ProductFilter from '../../sections/products/ProductFilter';
import useResponsive from '../../hook/useResponsive';
import Drawer from '../../components/Drawer';
import { ALL_PRODUCTS } from '../_mocks/Product';
import ProductItem from '../../components/ProductItem';
import ProductItemSkeleton from '../../components/skeleton/ProductItemSkeleton';
import { API_CLIENT, SEND_GET_REQUEST } from '../../utils/API';
import { setFilterCategoriesToStore } from '../../store/action/filterAction';
import useCurrencyRate from '../../hook/useCurrencyRate';
import { strNumber } from '../../utils/uFormatter';


export default function Shopping() {
    const { isMobile } = useResponsive();
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [pagedProducts, setPagedProducts] = useState([]);
    const [viewIndex, setViewIndex] = useState(0);
    const [sorting, setSorting] = useState('');
    const { favorites } = useSelector((state) => state.basket);

    const { t } = useTranslation();

    const { themeMode } = useSelector((state) => state.setting);

    const currencyRate = useCurrencyRate();

    const { filterKeyword, filterCategories, filterMemories, filterRating, filterPrices } = useSelector((state) => state.filter);
    const [loading, setLoading] = useState(false);
    const borderColor = ((themeMode === 'light') ? 'border-stone-300' : 'border-gray-800');

    const { mainCategories } = useSelector((state) => state.shopping);
    const [viewMode, setViewMode] = useState('grid');
    const [showFilter, setShowFilter] = useState(false);
    const [changedFilter, setChangedFilter] = useState(false);

    const handleSorting = (e) => {

        setSorting(e.target.value);
        e.preventDefault();
    }
    const handleViwMode = () => {
        setViewMode((viewMode === 'grid' ? 'list' : 'grid'));
    }

    const handleLoadMore = () => {
        setViewIndex(viewIndex + 12);
        // window.scrollTo({
        //     top: document.body.clientHeight,
        //     behavior: 'smooth'
        // });
    }
    // apply filter when changed 
    useEffect(() => {
        const applyFilter = async (_filtered) => {
            try {

                if (filterKeyword !== "")
                    _filtered = _filtered.filter((product) => (product?.keywords?.toLowerCase().includes(filterKeyword) || product?.name.toLowerCase().includes(filterKeyword)))
                if (filterCategories.length > 0)
                    _filtered = _filtered.filter((product) => (
                        (filterCategories.includes(product.maincategory_id) || filterCategories.includes(product.category_id))
                    ));
                // if (filterMemories.length > 0)
                //     _filtered = _filtered.filter((product) => {
                //         const rs = (filterMemories.filter(m => {
                //             const _rs = ((m.size === (JSON.parse(product.memory).size)) && (m.unit.toLowerCase() === (JSON.parse(product.memory).unit).toLowerCase()));
                //             return _rs;
                //         }).length > 0);
                //         return rs;
                //     });
                if (filterPrices.min >= 0 && filterPrices.max > 0 && filterPrices.max >= filterPrices.min)
                    _filtered = _filtered.filter((product) => (
                        (product.price * currencyRate.time >= filterPrices.min && product.price * currencyRate.time <= filterPrices.max)
                    ));
                if (filterRating > 0)
                    _filtered = _filtered.filter((product) => (
                        ((product.reviews.reduce((prev, current) => (prev + current.rating), 0) / product.reviews.length) >= filterRating)
                    ));
            }
            catch (err) {
                console.log(err);
            }
            return _filtered;
        }
        const sort = async (_filtered) => {
            if (sorting === "popular") {

            }
            if (sorting === "latest") {
                _filtered.sort((a, b) => (b.created_at > a.created_at ? 1 : -1))
            }
            if (sorting === "asc") {
                _filtered.sort((a, b) => (a.price > b.price ? 1 : -1))
            }
            if (sorting === "desc") {
                _filtered.sort((a, b) => (b.price > a.price ? 1 : -1))
            }
            return _filtered;
        }
        const filter = async () => {

            setLoading(true);
            let _filtered = allProducts.slice(0, allProducts.length);
            _filtered = await applyFilter(_filtered);
            _filtered = await sort(_filtered);
            setFilteredProducts(_filtered);
            setViewIndex(1);

            setLoading(false);
            
            
        }
        if (changedFilter) {
            filter();
        }
    }, [changedFilter, allProducts, filterCategories, filterMemories, filterPrices, filterRating, currencyRate, filterKeyword, sorting])
    // set page product
    useEffect(() => {
        if (viewIndex > 0) {
            let _products = pagedProducts.slice(0, pagedProducts.length);

            if (viewIndex === 1) {
                _products.splice(0, _products.length);

            }
            let _filtered = filteredProducts.slice((viewIndex - 1), viewIndex + (Math.min(11, filteredProducts.length - viewIndex)));
            for (const _product of _filtered) {
                _products.push(_product);
            }
            setPagedProducts(_products);
            
        }
    }, [viewIndex, filteredProducts]);
    // get all prouct
    useEffect(() => {
        const load = async () => {
            setLoading(true)
            SEND_GET_REQUEST(API_CLIENT.product.getAll).then(response => {
                setLoading(false)
                if (response.status === 200 && response.data) {
                    const data = response.data;
                    setAllProducts(data);
                    setChangedFilter(true);
                }
            }).catch(err => {
                setLoading(false)
            });
        }
        load();

    }, []);

    return (
        <Page title="Products" className="flex flex-col mt-24 w-full">
            {/* breadcrumbs */}
            <div className="breadcrumbs  bg-base-300 absolute w-full left-0 px-6 ">
                <ul>
                    <li>
                        <Link to="/" >{t('words.home')}</Link>
                    </li>
                    <li>
                        <label>{t('words.shopping')}</label>
                    </li>
                </ul>
            </div>
            <div className='flex w-full p-4 gap-4 mt-12'>
                {/* filter  */}
                <div className='hidden md:flex md:flex-col '>
                    <ProductFilter mobile={isMobile} categories={mainCategories} memories={SUPPORT_MEMORY_SIZE} />
                </div>
                {/* product contents */}
                <div className='flex-1'>
                    <div className='flex flex-col w-full h-full'>
                        {/* filter, sort, layout */}
                        <div className={`flex justify-between items-center gap-2 p-2 border ${borderColor} bg-base-200 w-full rounded-lg  `}>
                            <button className='btn btn-active btn-sm px-6 md:hidden' onClick={() => (setShowFilter(true))}>Filter</button>

                            <select className='select select-bordered select-sm' onChange={handleSorting} value={sorting}>
                                <option value={""}>{t('sort.default-setting')}</option>
                                <option value={"popular"}>{t('sort.popular')}</option>
                                <option value={"latest"}>{t('sort.latest')}</option>
                                <option value={"asc"}>{t('sort.asc')}</option>
                                <option value={"desc"}>{t('sort.desc')}</option>
                            </select>
                            <div className='hidden sm:flex '>
                                <button className={`btn btn-ghost rounded-r-none btn-sm ${viewMode === 'grid' ? 'btn-active' : ''}`} onClick={handleViwMode} >
                                    <Icon icon="bi:grid" width={20} ></Icon>
                                </button>
                                <button className={`btn btn-ghost rounded-l-none btn-sm ${viewMode !== 'grid' ? 'btn-active' : ''}`} onClick={handleViwMode}>
                                    <Icon icon="bi:grid-1x2" width={20}></Icon>
                                </button>
                            </div>
                        </div>
                        <div className='flex justify-end items-end py-2'>
                            <h3 className=''>{t('shopping.search-result')}:</h3>
                            <h3 className='text-accent cursor-pointer' onClick={handleLoadMore}>{strNumber(filteredProducts.length)}</h3>
                        </div>
                        {/* product list */}
                        <div className={`py-2 w-full mb-4 grid gap-2 md:gap-4 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3 ' : ''}`}>
                            {loading &&
                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value, index) => (
                                    <ProductItemSkeleton
                                        key={index}
                                        layout={viewMode}
                                        borderColor={borderColor}
                                    />
                                ))
                            }
                            {!loading && pagedProducts.map((item, index) => (
                                <ProductItem
                                    product={item}
                                    favorites={favorites}
                                    currencyRate={currencyRate}
                                    key={index}
                                    index={index}
                                    layout={viewMode}
                                    borderColor={borderColor}
                                />
                            ))}

                        </div>
                        {!loading && <div className={`flex justify-center ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3 ' : ''}`}>
                            <button onClick={handleLoadMore}
                                disabled={viewIndex >= filteredProducts.length || pagedProducts.length === filteredProducts.length}
                                className={`btn btn-accent btn-sm w-64`}>{t('words.load-more')}({(filteredProducts.length - pagedProducts.length) >= 100 ? '99+' : (filteredProducts.length - pagedProducts.length)})</button>
                        </div>
                        }
                    </div>
                </div>
                {
                    showFilter &&
                    <Drawer
                        open={showFilter}
                        onClose={() => setShowFilter(false)}
                        className='min-w-[320px]'
                        children={<ProductFilter mobile={isMobile} categories={mainCategories} memories={SUPPORT_MEMORY_SIZE} />}
                    >

                    </Drawer>
                }
            </div>
        </Page >
    )
}