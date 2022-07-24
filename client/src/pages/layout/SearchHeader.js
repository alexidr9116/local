import React, { useMemo, useState } from 'react';
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CategorySearchInput from "../../components/CategorySearchInput";
import DropdownMenu from "../../components/DropdownMenu";
import ExtendedDropdown from "../../components/ExtendedDropdown";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ASSETS_URL } from '../../utils/API';
import TextMaxLine from '../../components/TextMaxLine';
import Rating from '../../components/Ratings';
import { strPrice } from '../../utils/uFormatter';
import ProductHotSkeleton from '../../components/skeleton/ProductHotSkeleton';
import { setFilterCategoriesToStore, setFilterKeywordToStore } from '../../store/action/filterAction';
import { setFilterKeyword } from '../../store/slice/filter';

function getSubContent(subItems, hotProducts, currencyRate, handleClick, categoryId) {

    return (
        <div className='flex gap-2 w-full h-full'>
            <div className='w-96 flex flex-col h-full border-r border-base-300 px-2'>
                {subItems.map((item, index) => (
                    <button onClick = {()=>handleClick(item.id)}  key={index} className={`btn break-all btn-ghost px-1 items-center justify-start flex`} >{item.slug}</button>
                ))}
            </div>
            <div className='w-full h-full overflow-y-auto flex flex-col gap-2'>
                
                {hotProducts && hotProducts.map((hot, index) => (
                    <React.Fragment key={index}>
                        <Link to={`/product-detail/${hot.id}`} className='w-80 flex p-2 gap-2 border border-base-300 rounded-lg items-center justify-between cursor-pointer hover:border-accent'
                            replace={true}
                            
                        >
                            <div className='overflow-hidden w-24 h-24' onClick={()=>handleClick()}>
                                <LazyLoadImage
                                    src={`${ASSETS_URL.ezo}${JSON.parse(hot.image)[0].name.replace('products/', '')}`}
                                    alt={`${hot.title}`}
                                    width={96}
                                    height={96}
                                    effect='blur'
                                    placeholder={<div className='animate-pulse h-24 w-24 rounded-lg bg-base-300'></div>}
                                    wrapperClassName={`w-24 h-24`}
                                >
                                </LazyLoadImage>
                            </div>
                            <div className='flex flex-col gap-2 w-56' onClick={()=>handleClick()}>
                                <TextMaxLine maxLine={1} text={hot.title} className='font-bold'></TextMaxLine>
                                <Rating name={`hot-rating-${index}`}
                                    value={(hot?.reviews?.reduce((prev, current) => (prev + current.rating), 0)) / Math.max(1, hot?.reviews?.length)}></Rating>
                                <label>
                                    {hot?.discount>0 &&
                                        <span className='line-through text-sm'>
                                            {strPrice(hot?.price * currencyRate.time, currencyRate.currency)}
                                        </span>
                                    }
                                    <span className='text-accent ml-2'> {strPrice(hot?.price * currencyRate.time, currencyRate.currency)}</span>
                                </label>
                            </div>
                        </Link>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default function SearchHeader() {
    const [close,setClose] = useState(false);
    const navigate = useNavigate();
    const { language } = useSelector((state) => state.setting);
    const { mainCategories, categories, hotProducts, currencyRates } = useSelector((state) => state.shopping);
    const [subContent, setSubContent] = useState(null);
    const {pathname} = useLocation();
    const currencyRate = useMemo(() => ({
        currency: language?.currency || '$',
        time: (language?.key === "en" ? 1 : (language?.key === 'ch' ? currencyRates?.rmb : currencyRates?.mnt)),
    }), [language, currencyRates]);

    const handleClick = (categoryId)=>{
        setClose(true);
        if(categoryId){
            setFilterCategoriesToStore([categoryId]);
            if(pathname!=='/shopping')
                navigate('/shopping',{replace:true});
        }
    }
    const onChangeSearchKey = (key)=>{
        setFilterKeywordToStore(key);
        
        if(pathname!=='/shopping')
            navigate('/shopping',{replace:true});
    }
    const onChangedCategory = (categoryId)=>
    {
        
        if(categoryId!=='all' && !isNaN(parseInt(categoryId))){
            setFilterCategoriesToStore([parseInt(categoryId)]);
        }
        else{
            setFilterCategoriesToStore([]);
        }
    }
    const handleExtendMenu = (category) => {
        const subItems = categories.filter((c) => (c.parent_id === category.id && c.id !== category.id));

        if (subItems && subItems.length > 0) {

            setSubContent(getSubContent(subItems, hotProducts, currencyRate, handleClick, category.id))
        }
        else {
            setSubContent(null)
        }
    }
    return (
        <div className="p-4 bg-rose-500 absolute w-full left-0">
            <div className="container flex w-full justify-center lg:justify-between items-center">
                <div className="hidden lg:flex">
                    <ExtendedDropdown
                        close ={close}
                        contentClass="w-[1200px] mt-1"
                        header={
                            <button className="flex text-white gap-2 p-4 rounded-lg items-center bg-white/10 cursor-pointer" onClick={()=>setClose(false)}>
                                <Icon width={20} className="flex-none" icon={"dashicons:menu-alt"}></Icon>
                                <label className="flex-1">Shop By Categories</label>
                                <Icon width={20} className="flex-none" icon={"akar-icons:chevron-down"}></Icon>
                            </button>
                        }
                        items={
                            mainCategories.map((category, index) => (
                                <div className="border-b  border-base-100 last:border-0 hover:text-accent w-full flex gap-4 p-2 justify-between items-center cursor-pointer" key={index}
                                    onMouseOver={() => handleExtendMenu(category)}
                                >

                                    <button onClick = {()=>handleClick(category.id)}  >{category.slug}</button>
                                    {
                                        categories.filter((c) => (c.parent_id === category.id && c.id !== category.id)).length > 0 &&
                                        <span className="" ><Icon icon='akar-icons:chevron-right' width={16}></Icon>
                                        </span>
                                    }
                                </div>
                            ))
                        }
                        subContent={subContent}
                        skeleton ={<ProductHotSkeleton />}
                    >
                    </ExtendedDropdown>
                </div>
                <div className="flex">
                    <CategorySearchInput categories={mainCategories} onChangeSearchKey={onChangeSearchKey}onChangedCategory = {onChangedCategory}></CategorySearchInput>
                </div>
            </div>
        </div>
    )
}