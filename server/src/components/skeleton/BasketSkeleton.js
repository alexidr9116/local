export default function BasketTableSkeleton() {
    return (
        <div className="animate-pulse grid w-full">
            <div className="grid gap-2">
                {
                    [1, 2, 3].map((value, index) => (
                        <div className="flex gap-2 w-full items-center" key={index}>
                            <div className="flex gap-2 w-40" >
                                <div className="w-16 h-16 bg-base-300">
                                </div>
                                <div className="flex flex-col w-24 justify-center">
                                    <label className="w-24 h-6 bg-base-300 mb-2"></label>
                                    <label className="w-18 h-6 bg-base-300"></label>
                                </div>
                            </div>
                            <label className="bg-base-300 w-1/4 h-6">
                            </label>
                            <div className="flex flex-col w-24 justify-center">
                                <label className="w-24 h-6 bg-base-300 mb-2"></label>
                                <label className="w-18 h-6 bg-base-300"></label>
                            </div>
                            <label className="bg-base-300 w-1/4 h-6">
                            </label>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}