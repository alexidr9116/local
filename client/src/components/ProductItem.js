
import PropTypes from 'prop-types';
import { t } from 'i18next';
import { Icon } from '@iconify/react';
import { ASSETS_URL } from '../utils/API';
import { fOffCostPercent, strPrice } from '../utils/uFormatter';
import Rating from './Ratings';
import TextMaxLine from './TextMaxLine';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { pushToBasketToStore, pushToFavoriteToStore } from '../store/action/basketAction';
import { getProductImageUrl } from '../utils/productParser';

ProductItem.propTypes = {
    product: PropTypes.object,
    layout: PropTypes.string,
    currencyRate: PropTypes.object,
    borderColor: PropTypes.string,
}

// product model {
//     _id,
//     modelId,    
//     title,
//     description,
//     rating,
//     price,
//     usdHigh,
//     color,
//     price,
//     currency,
//     tags,
//     stockAmount,   
//     image,
//     images,
// }

export default function ProductItem({ borderColor = 'border-gray-300', product, layout = 'grid', currencyRate, index = 1, favorites = [] }) {

    const rating = (product?.reviews?.reduce((prev, current) => (prev + current.rating), 0) / product?.reviews?.length);
    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault();
        navigate(`/product-detail/${product.id}`);
        // navigate(`/product-detail/123456`);
    }
    return (
        <div className={`border ${borderColor} rounded-lg hover:border-accent flex   ${layout === 'grid' ? 'flex-col' : 'flex-col sm:flex-row'} w-full  p-2 relative cursor-pointer `} >
            <div className={`flex gap-2 justify-center`}>

                {/* <Image src = {`${ASSETS_URL.products}${product.image}`} ></Image> */}
                <LazyLoadImage alt={`lazy-image`}
                    onClick={handleClick}
                    effect={`blur`}
                    // src={`${product.image}`}
                    src={`${getProductImageUrl(product?.image)}`}
                    wrapperClassName={`overflow-hidden ${layout === 'list' ? 'w-[150px] lg:w-[250px] h-auto' : 'w-[300px] h-[300px]'}  ${product.quantity <= 0 ? 'opacity-40' : ''}`}
                    placeholder={<div className={`animate-pulse bg-base-300 ${layout === 'list' ? 'w-[150px] h-[150px] lg:w-[250px] lg:h-[250px]' : 'w-[300px] h-[300px]'} h-32`} ></div>}
                >

                </LazyLoadImage>
                {
                    (product.price > 0 && product.discount > 0) &&
                    <label className='badge text-white badge-error absolute top-4 left-4 '>
                        {fOffCostPercent(product.price + product.discount, product.price)}
                    </label>
                }
                {
                    (product.quantity <= 0) &&
                    <label className={`badge text-white  absolute  ${layout === 'grid' ? 'top-1/2 left-1/3' : 'top-[75px] lg:top-[125px] left-4 '} `}>
                        {t('shopping.out-stock')}
                    </label>
                }
            </div>
            <div className={`flex w-full flex-col justify-center p-2 ${layout === 'grid' ? 'p-2' : 'p-4'}`}>
                <TextMaxLine maxLine={1} text={product.name} className='font-bold uppercase' onClick={handleClick} ></TextMaxLine>
                {(layout === 'list') && <TextMaxLine text={`CODE-${product?.code}`} className='hidden md:flex-1 md:mt-2' />
                }
                <div className='mt-1'>
                    <Rating value={rating} readOnly={true} name={`product-rating-${index}`} />
                </div>
                {(layout === 'list') && <div className="flex gap-2 items-center w-full">
                    <Icon icon="bi:tag" width={20}></Icon>{t('words.keywords')}:

                    <label className=""  >{product?.keywords}</label>

                </div>
                }
                <div className='flex gap-2 items-center'>
                    {(product.price > 0 && product.discount > 0) &&
                        <label className='line-through '>{strPrice((product.price + product.discount) * currencyRate.time, currencyRate.currency)}</label>
                    }
                    <label className='text-accent font-bold text-lg'>{strPrice(product.price * currencyRate.time, currencyRate.currency)}</label>
                </div>
                {(layout === 'list') && <div className='flex mt-2 gap-2'>
                    <button className='btn btn-accent text-white' onClick={() => {
                        pushToBasketToStore({ amount: 1, id: product.id });
                    }} disabled={product.quantity <= 0}><Icon icon='carbon:shopping-cart-arrow-down' width={20}></Icon>{t('shopping.add-cart')}</button>
                    <button className={`btn btn-ghost rounded-full h-12 w-12 px-0 ${favorites?.includes(product.id) ? 'text-accent' : ''}`} onClick={() => {
                        pushToFavoriteToStore(product.id)
                    }} ><Icon icon='akar-icons:heart' width={20}></Icon></button>
                    <button className='btn btn-ghost rounded-full h-12 w-12 px-0'><Icon icon='akar-icons:eye' width={20} onClick={() => { navigate(`/product-detail/${product.id}`) }}></Icon></button>

                </div>}
            </div>
        </div>

    )
}