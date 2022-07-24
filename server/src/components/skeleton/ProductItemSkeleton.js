export default function ProductItemSkeleton({ layout = 'grid', borderColor = 'border-gray-300' }) {
    return (
        <div className={`animate-pulse border ${borderColor} rounded-lg w-full hover:border-accent flex   ${layout === 'grid' ? 'flex-col max-w-sm' : 'flex-col sm:flex-row'}  p-2 relative cursor-pointer `}>
            <div className={`flex gap-2 justify-center`}>

                <div className={` bg-base-300 ${layout === 'list' ? 'w-[150px] h-[150px] lg:w-[250px] lg:h-[250px]' : 'w-[300px] h-[300px]'} h-32`} ></div>
            </div>
            <div className={`flex flex-col justify-center p-2 ${layout === 'grid' ? 'p-2' : 'p-4'}`}>
                <div className="bg-base-300 h-6 mb-2" />

                {(layout === 'list') && <div className="bg-base-300 h-16 mb-2 md:w-72 w-52"></div>
                }
                <div className='mb-2'>
                    <div className="bg-base-300 h-6 w-32" />
                </div>
                <div className='flex gap-2 items-center mb-2'>
                    <div className="bg-base-300 h-6 w-20" />
                    <div className="bg-base-300 h-6 w-20" />
                </div>
                {(layout === 'list') && <div className='flex mt-2 gap-2 bg-base-300 h-10 w-32'>

                </div>}

            </div>
        </div>

    )
}