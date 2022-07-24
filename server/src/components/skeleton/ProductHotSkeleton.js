import React from "react";

export default function ProductHotSkeleton() {
    return (
        <div className='grid grid-cols-3'>
            <div className="flex flex-col gap-2 p-2 justify-start">
                {[2, 4, 3, 3, 2, 4].map((value, index) => (
                    <label className={`w-${value*12} h-6 bg-base-300`} key = {index}></label>
                ))}
            </div>
            
            <div className="col-span-2">
                {[1, 2, 3, 4].map((value, index) => (
                    <React.Fragment key={index}>
                        <div className='w-80 flex p-2 gap-2 border border-base-300 rounded-lg items-center justify-between cursor-pointer  animate-pulse'
                            
                        >
                            <div className='overflow-hidden w-24 h-24'>
                                <div className=' h-24 w-24 rounded-lg bg-base-300'></div>
                            </div>
                            <div className='flex flex-col gap-2 w-56'>
                                <label className='w-48 h-6 bg-base-300 mb-1'></label>
                                <label className='w-36 h-6 bg-base-300 mb-1' ></label>
                                <div className="flex gap-2">
                                    <span className='w-20 text-sm h-6 bg-base-300'>
                                    </span>
                                    <span className='text-accent ml-2 w-20 h-6 bg-base-300'></span>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                ))
                }
            </div>
        </div>
    )
}