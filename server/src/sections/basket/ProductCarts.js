import { Icon } from "@iconify/react";
import {useNavigate} from "react-router-dom";
import PropTypes from 'prop-types';
import { LazyLoadImage } from "react-lazy-load-image-component";
import AmountInput from "../../components/AmountInput";
import Rating from "../../components/Ratings";
import BasketTableSkeleton from "../../components/skeleton/BasketSkeleton";
import TextMaxLine from "../../components/TextMaxLine";
import useCurrencyRate from "../../hook/useCurrencyRate";
import { getProductImageUrl, getProductRating } from "../../utils/productParser";
import { strPrice } from "../../utils/uFormatter";

ProductCarts.propTypes = {
    carts: PropTypes.array,
    loading: PropTypes.bool,
    t: PropTypes.func,
    baskets: PropTypes.array,
    handleChangeAmount: PropTypes.func,
    removeFromBasket:PropTypes.func,
    removeAllFromBasket:PropTypes.func,
}
export default function ProductCarts({ carts, loading, t, baskets, handleChangeAmount,removeFromBasket,removeAllFromBasket }) {
    const { currency, time } = useCurrencyRate();
    const navigate = useNavigate();
    return (
        <div className="flex flex-col w-full p-4 gap-4 items-center">
            <label className="font-bold">
                {t('shopping.basket')}({carts?.reduce((prev, current) => (prev + current.amount), 0)} {t('words.items')})
            </label>
            {carts.length === 0 &&
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
            {!loading && carts.length > 0 &&
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
                                    {t('shopping.total')}
                                </td>
                                <td>

                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                baskets.map((product, index) => (
                                    <tr key={index}>
                                        <td className = 'cursor-pointer' >
                                            <div className="flex gap-2 w-56" onClick = {()=>{
                                               
                                                navigate(`/product-detail/${product.id}`,{replace:true});}}>
                                                <LazyLoadImage
                                                    src={`${getProductImageUrl(product?.image)}`}
                                                    wrapperClassName="w-20"
                                                    effect="blur"
                                                    alt={`${index}`}
                                                >
                                                </LazyLoadImage>
                                                <div className="flex flex-col w-36">
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
                                            <AmountInput
                                                defaultValue={product.basketAmount}
                                                maxValue={Math.max(0, product.quantity)}
                                                onChangeValue={(amount) => handleChangeAmount(amount, product)}
                                            />
                                            <label className="text-xs">
                                                available:{product.quantity}
                                            </label>
                                        </td>
                                        <td className="">
                                            {strPrice(product?.price * time * product?.basketAmount, currency)}
                                        </td>
                                        <td>
                                            <button className="btn btn-ghost p-0 btn-circle" onClick={()=>removeFromBasket(product)}>
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
                                        strPrice(baskets.reduce((prev, product) => (prev + product.price * time * product.basketAmount), 0), currency)
                                    }
                                </td>
                                <td>
                                    <button className="btn btn-ghost p-0 btn-circle" onClick={removeAllFromBasket}>
                                        <Icon icon="akar-icons:trash-can" width={20}></Icon>
                                    </button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            }
            
        </div>
    )
}