import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import parser from 'html-react-parser';
import Rating from '../../components/Ratings';
import { fSimpleDate, strNumber, strPercent } from '../../utils/uFormatter';
import { t } from "i18next";
import { API_CLIENT, ASSETS_URL, SEND_PUT_REQUEST } from "../../utils/API";
import toast from "react-hot-toast";
import useAuth from "../../hook/useAuth";


export function ProductReviews({ product }) {
    const {user,isAuthenticated}= useAuth();
    const rating = (product?.reviews?.reduce((prev,current)=>(prev + current.rating),0)/product?.reviews?.length);
    const [customerRate,setCustomerRate] = useState(0);
    const [customerReview,setCustomerReview] = useState('');
    const hadleWriteReview = ()=>{
        if(!isAuthenticated){
            toast.error('You can use this feature after login..');
            return;
        }
        if(user&& !user.active){
            toast.error('You can use this feature after email verification..');
            return;
        }
        SEND_PUT_REQUEST(API_CLIENT.product.putReview,{productId:product.id, rating:customerRate,comment:customerReview,status:1 }).then(res=>{
            if(res.status!==200){
                toast.err(res.message)
            }
        }).catch(err=>{
            console.log(err);
            toast.error("Whoops! Fatal error");
        })
    }
    return (
        <div className="flex flex-col gap-4">
            {/* rating */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                <Rating readOnly={true} name="product-rating" value={rating}></Rating>
                <div className="hidden md:divider md:divider-horizontal"></div>
                <div className="flex flex-col gap-2 items-center justify-center mb-4">
                    {[5, 4, 3, 2, 1].map((value, index) => (
                        <div className="flex gap-2 items-center" key={index}>
                            <Rating readOnly={true} name={`star-rating-${value}`} value={value}></Rating>
                            <progress max={product?.reviews?.length}  className="progress progress-accent w-32 h-4 rounded-none"
                                value={product?.reviews?.filter((review) => (Math.round(review?.rating) === value)).length}
                            />
                            <label className="text-accent w-10">
                                {strPercent(product?.reviews?.filter((review) => (Math.round(review?.rating) === value)).length, product?.reviews.length)}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="hidden md:divider md:divider-horizontal"></div>
                <button className="btn btn-outline btn-xl btn-accent">{t('words.write-review')}</button>
            </div>
            {/* reviews */}
            <div className="grid md:grid-cols-2 gap-2">
                {/* list */}
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-bold border-b border-0 border-base-300 mb-4">
                        {product?.reviews?.length} {t('words.reviews')}
                    </label>
                    {/* review details */}
                    {product?.reviews?.map((review, index) => (
                        <div className="flex flex-col gap-2  mb-2" key = {index}>
                            <div className="flex gap-2">
                                <div className="avatar placeholder">
                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                                        <img src = {`${ASSETS_URL.image}${review?.t_client?.image}`} alt = 'AV'></img>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2">
                                            <span className="">{`${review?.t_client?.firstname} ${review?.t_client?.lastname}`}</span>
                                            <span className="text-stone-400">{fSimpleDate(review?.createdAt)}</span>
                                        </div>
                                        <Rating value={review?.rating} readOnly={true} name="customer-review"></Rating>
                                    </div>
                                </div>
                            </div>
                            <div className=" w-full px-4">
                                <p className="bg-base-200 rounded-lg w-full p-4">
                                    {review?.comment}
                                </p>
                            </div>
                        </div>
                    ))}


                </div>
                {/* write */}
                <div className="flex flex-col p-6 gap-4 bg-base-200 rounded-2xl">
                    <label className="text-lg font-bold">{t('reviews.add-review')}</label>
                    <label className="">{t('reviews.add-review-validation-description')}
                    </label>
                    <label className="text-lg font-bold">{t('reviews.your-rating')}</label>
                    <Rating value={customerRate} name="your-review" onChanged={(value)=>setCustomerRate(value)}></Rating>
                    <label className="text-lg font-bold">{t('reviews.customer-review')}</label>
                    <textarea onChange={(e)=>setCustomerReview(e.target.value)} value={customerReview}  className="textarea textarea-bordered " rows={10}></textarea>
                    <button className="btn btn-accent" onClick={hadleWriteReview}>{t('reviews.add-review')}</button>
                </div>
            </div>
        </div>
    )
}

export function ProductAddition({ product }) { 
    return (
        <div className="flex w-full overflow-x-hidden">
            {/* <table className="table border border-base-300 table-compact">
                <tbody>
                    {JSON.parse(product?.technical).map((category, index) => (
                        category.key!=='' && <React.Fragment key={index}>
                            <tr className="hidden sm:table-row">
                                <td className="bg-base-200">{category.key}</td>
                                <td>{category.value}</td>
                            </tr>
                            <tr className="sm:hidden">
                                <td className="bg-base-200 text-accent">
                                    {category.key}
                                </td>
                            </tr>
                            <tr className="sm:hidden">
                                <td>
                                    {category.value}
                                </td>
                            </tr>

                        </React.Fragment>
                    ))}
                </tbody>
            </table> */}
        </div >
    )
}


export function ProductNote({ product }) {
    return (
        <div className="flex flex-col gap-2 w-full overflow-x-auto mb-4">
            {product?.description && product?.description!=='' && parser(product?.description)}
            {/* {



                JSON.parse(product?.description).map((note, index) => (
                    <React.Fragment key={index}>
                        {(note?.type === 'html') &&

                            <div className="flex flex-col gap-2" >
                                <label className="font-bold uppercase">{note.key}</label>
                                {note.value && note.value!=="" && parser(note.value)}
                            </div>
                        }
                        {
                            (note?.type === 'image') &&
                            <div className="flex w-full h-full p-2">
                                <LazyLoadImage
                                    src={`${note.value}`}
                                    wrapperClassName="h-full w-full"
                                    alt={`${product.title}`}
                                    effect="blur"
                                >
                                </LazyLoadImage>
                            </div>
                        }
                    </React.Fragment>
                ))
            } */}
        </div>
    )
}