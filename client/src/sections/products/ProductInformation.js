import { Icon } from '@iconify/react';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AmountInput from '../../components/AmountInput';
import Rating from '../../components/Ratings';
import { ProductInformationSkeleton } from '../../components/skeleton/ProductDetailSkeleton';
import TextMaxLine from '../../components/TextMaxLine';
import { pushToBasketToStore, pushToFavoriteToStore } from '../../store/action/basketAction';
import { strNumber, strPrice } from '../../utils/uFormatter';

ProductInformation.propTypes = {
    product: PropTypes.object,
    currencyRate: PropTypes.object,
    fetching: PropTypes.bool,
    favorites: PropTypes.array
}

export default function ProductInformation({ product, fetching, currencyRate, favorites = [] }) {

    const rating = (product?.reviews?.reduce((prev, current) => (prev + current.rating), 0) / product?.reviews?.length);
    const [basketAmount, setBasketAmount] = useState(0);
    const navigate = useNavigate();

    const onChangeValue = (value) => {

        setBasketAmount(value)
    }
    const handleCart = () => {
        pushToBasketToStore({ amount: basketAmount, id: product.id });
    }
    return (
        <>
            {

                fetching &&
                <ProductInformationSkeleton />
            }
            {
                !fetching && product !== null && product &&
                <div className="flex flex-col px-2 justify-center">
                    <label className="text-2xl font-bold mb-4 uppercase">{product?.name}</label>
                    <label className="mb-4">
                        <span className="text-stone-400 font-bold">{t('words.category')}: </span>
                        {product?.t_category?.slug} |
                        <span className="text-stone-400 font-bold ml-2">{t('words.sku')}: </span>
                        {product?.code}
                    </label>
                    <div className="flex w-full mb-4 gap-2">
                        <Rating name="product-detail-rating" value={rating} readOnly={true} />
                        {product?.reviews?.length > 0 &&
                            <label className="text-stone-400 ">({strNumber(product?.reviews?.length)} {t('words.reviews')})</label>
                        }
                    </div>
                    {/* <TextMaxLine maxLine={5} text={product?.description} className='mb-4' /> */}
                    <div className='flex gap-2 items-center mb-4'>
                        {(product.price > 0 && product.discount > 0) &&
                            <label className='line-through '>{strPrice((product.discount + product.price) * currencyRate.time, currencyRate.currency)}</label>
                        }
                        <label className='text-accent font-bold text-lg'>{strPrice(product.price * currencyRate.time, currencyRate.currency)}</label>
                    </div>
                    {product?.memory?.size > 0 &&
                        <label className="mb-4">
                            <span className="text-stone-400">{t('words.memory')}: </span>
                            {product?.memory?.size}
                            {product?.memory?.unit}
                        </label>
                    }
                    <div className="divider"></div>
                    {/* tags */}
                    <div className="flex gap-2 items-center w-full mb-8">
                        <Icon icon="bi:tag" width={20}></Icon>{t('words.keywords')}:

                        <label className=""  >{product?.keywords}</label>

                    </div>

                    {/* cart button */}
                    <div className="grid gap-2 grid-cols-2 justify-center mb-4">
                        <div className='flex flex-col'>

                            <AmountInput maxValue={Math.max(0, product?.quantity)} onChangeValue={onChangeValue} />
                            <label className='text-sm'>Available:{strNumber(Math.max(0, product?.quantity))}</label>
                        </div>
                        <div className="flex gap-1">
                            <button className='btn btn-accent text-white btn-sm md:btn-md'
                                onClick={handleCart} disabled={product.quantity <= 0}
                            >
                                <Icon icon='carbon:shopping-cart-arrow-down' width={16}></Icon>
                                <span className="hidden md:flex">{t('shopping.add-cart')}</span>
                            </button>
                            <button className={`btn btn-sm btn-ghost btn-circle p-0 h-8 w-8 md:btn-md md:h-12 md:w-12 md:p-0 ${favorites?.includes(product.id) ? 'text-accent' : ''}`} onClick={() => { pushToFavoriteToStore(product.id) }}><Icon icon='akar-icons:heart' width={20}></Icon></button>
                            <button className='btn btn-sm btn-ghost btn-circle h-8 w-8 p-0   md:btn-md md:h-12 md:w-12 md:p-0' onClick={() => navigate(`/product-detail/${product.id}`, { replace: true })}><Icon icon='bx:refresh' width={20}></Icon></button>
                        </div>
                    </div>

                </div>
            }
        </>
    )
}