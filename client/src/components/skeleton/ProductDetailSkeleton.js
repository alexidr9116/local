export function CarouselSkeleton() {
    return (
        <div className="flex flex-col gap-2 p-2">
            <div className="animate-pulse bg-base-300 w-full h-48 md:h-[300px] rounded-lg">
            </div>
            <div className="flex gap-2">
                <div className="animate-pulse bg-base-300 w-[80px] h-20 rounded-md">
                </div>
                <div className="animate-pulse bg-base-300 w-[80px] h-20 rounded-md">
                </div>
                <div className="animate-pulse bg-base-300 w-[80px] h-20 rounded-md">
                </div>
            </div>
        </div>
    )
}
export function ProductInformationSkeleton() {
    return (

        <div className="flex flex-col gap-2 p-2 w-full h-full">
            <div className="animate-pulse bg-base-300 w-5/6 h-10 rounded-lg mb-4">
            </div>
            <div className="animate-pulse bg-base-300 w-full h-6 rounded-lg mb-4">
            </div>
            <div className="animate-pulse bg-base-300 w-1/3 h-6 rounded-lg mb-4">
            </div>
            <div className="animate-pulse bg-base-300 w-full h-16 rounded-lg mb-4">
            </div>
            <div className="animate-pulse bg-base-300 w-1/3 h-6 rounded-lg mb-4">
            </div>
            <div className="animate-pulse bg-base-300 w-1/3 h-6 rounded-lg mb-4">
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="animate-pulse bg-base-300 w-full h-12 rounded-lg mb-4">
                </div>
                <div className="animate-pulse bg-base-300 w-full h-12 rounded-lg mb-4">
                </div>
            </div>

        </div>
    )
}