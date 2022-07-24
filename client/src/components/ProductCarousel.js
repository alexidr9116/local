import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import { ASSETS_URL } from '../utils/API';
import { fOffCostPercent } from '../utils/uFormatter';

ProductCarousel.propTypes = {
    product: PropTypes.object,
}

export default function ProductCarousel({ product }) {
    
    const images = ((product!==null && product && product.image) ? JSON.parse(product?.image) : [{"name":""}]);

    const { themeMode } = useSelector((state) => state.setting);
    const borderColor = ((themeMode === 'light') ? 'border-stone-300' : 'border-gray-800');
    return (
        <div className="flex flex-col w-full overflow-x-hidden relative">
            {
                (product?.price > 0 && product?.discount > 0) &&
                <label className='badge text-white badge-error badge-lg absolute top-4 left-4 z-10'>
                    {fOffCostPercent(product?.price + product?.discount, product?.price)}
                </label>
            }
            <div className={`rounded-lg  carousel w-full border ${borderColor} `}>
                {images.map((image, index) => (
                    <div key={index} id={`product-item-${index}`} className={`carousel-item w-full py-4 md:py-12 flex`}>
                        <div className="grid justify-center w-full h-full items-center  overflow-hidden">
                            <LazyLoadImage
                                src={`${ASSETS_URL.ezo}${image.name.replace('products/','')}`}
                                // src={`${image}`}
                                alt={`${product.title}`}
                                wrapperClassName={`w-full h-full hover:scale-125 duration-300`}
                            >
                            </LazyLoadImage>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-start w-full py-2 gap-2 overflow-x-auto lg:overflow-x-hidden lg:flex-wrap">
                {images.map((image, index) => (
                    <a
                        key={index} href={`#product-item-${index}`}
                        className={`overflow-hidden border bg-transparent p-2 rounded-md active:border-accent focus:border-accent hover:border-accent  ${borderColor}`} >
                        <div className={`w-[80px] flex justify-center`}>
                            <img
                                src={`${ASSETS_URL.ezo}${image.name.replace('products/','')}`}
                                alt={`${product.title}`}
                                className={'h-[40px]'}
                            >
                            </img>
                        </div>

                    </a>
                ))}
            </div>
        </div>
    )
}