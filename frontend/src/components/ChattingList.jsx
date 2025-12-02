import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const ChattingList = ({user, message=null, handleSetSelectedUser}) => {
    const { isUserActive, authUser } = useAuthStore();
    return (
        <div
        onClick={() => handleSetSelectedUser(user)}
        className="cursor-pointer flex justify-between items-center p-4 hover:bg-gray-800 rounded-lg relative"
        >
            <div className="w-16 h-16 relative flex flex-shrink-0">
                <img className="shadow-md rounded-full w-full h-full object-cover"
                    src={user.profilePic ? user.imageLink : '/avata.png'}
                    alt=""
                />
                {
                    isUserActive(user._id) && <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                                        <div className="bg-green-500 rounded-full w-3 h-3"></div>
                                    </div>
                }
            </div>
            <div className="flex-auto min-w-0 ml-4 mr-6">
                <p>{user.name}</p>
                <div className="flex items-center text-sm text-gray-600">
                    <div className="min-w-0">
                        <p className="truncate">
                            {message && authUser._id.toString() !== message.receiverId.toString() ? 'You:' : ''}{message && message.text ? message.text : (message && message.image ? '<<Photo>>' : '') }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChattingList;