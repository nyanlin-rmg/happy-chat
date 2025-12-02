import { useAuthStore } from "../store/useAuthStore";

const UserList = ({user, handleSetSelectedUser}) => {
    const {isUserActive} = useAuthStore();
    return (
        <div
        onClick={() => handleSetSelectedUser(user)}
        className="text-sm text-center mr-4">
            <div className="w-16 h-16 relative flex flex-shrink-0 cursor-pointer">
                <img className="shadow-md rounded-full w-full h-full object-cover"
                    src={user.profilePic ? user.imageLink : '/avata.png'}
                    alt=""
                />
                {
                    isUserActive(user._id) && <div class="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                                        <div class="bg-green-500 rounded-full w-3 h-3"></div>
                                    </div>
                }
            </div>
            <p>{user.name}</p>
        </div>
    )
}

export default UserList;