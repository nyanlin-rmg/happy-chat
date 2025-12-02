const ChattingListSkeleton = () => (
    [1,2,3].map(testVar => (
        <div
        key={testVar}
        className="cursor-pointer flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative"
        >
            <div className="w-16 h-16 relative flex flex-shrink-0">
                <div className="skeleton bg-[#646464] shadow-md rounded-full w-full h-full object-cover"/>
            </div>
            <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                <p className="skeleton h-4 w-20 bg-[#646464]"></p>
                <div className="flex items-center text-sm">
                    <div className="min-w-0 mt-3">
                        <p className="skeleton bg-[#646464] h-4 w-28"></p>
                    </div>
                </div>
            </div>
        </div>
    ))
)

export default ChattingListSkeleton;