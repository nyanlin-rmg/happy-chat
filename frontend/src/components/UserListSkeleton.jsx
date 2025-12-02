const UserListSkeleton = () => (
    [1,2,3,4,5].map(mock => (
        <div
        key={mock}
        className="text-sm text-center mr-4">
            <div className="w-16 h-16 relative flex flex-shrink-0 cursor-pointer">
                <div className="skeleton bg-[#353535] shadow-md rounded-full w-full h-full object-cover"/>
            </div>
        </div>
    ))
)

export default UserListSkeleton;