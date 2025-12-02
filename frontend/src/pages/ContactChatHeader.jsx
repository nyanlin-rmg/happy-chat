import { ArrowLeftCircle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ContactChatHeader = ({user}) => {
    const { isUserActive } = useAuthStore();
    const { setSelectedUser } = useChatStore();

    const handleClick = (event) => setSelectedUser(null);
    
    return (
        <div 
        className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow bg-gray-800">
                <div className="flex">
                    <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
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
                    <div className="text-sm">
                        <p className="font-bold">{user.name}</p>
                        <p>{isUserActive(user._id) ? 'Active Now' : 'Offline'}</p>
                    </div>
                </div>
                <div className="justify-end">
                    <ArrowLeftCircle
                        className="md:block sm:block lg:hidden cursor-pointer"
                        onClick={handleClick}
                    />
                </div>
            </div>
    )
}

export default ContactChatHeader;