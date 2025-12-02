import { useEffect, useCallback } from "react";
import { useAuthStore } from "../store/useAuthStore"
import { useChatStore } from "../store/useChatStore";
import ChattingList from "./ChattingList";
import ChattingListSkeleton from "./ChattingListSkeleton";

const ShowContacts = ({changeSelectUser}) => {
    const {
        isUsersLoading,
        chatContacts, contacts, activeTab, subscribeToMessages, unsubscribeToMessages,
        toUpdateChatList, closeToUpdateChatList
    } = useChatStore();

    const { authUser, selectedUser } = useAuthStore();

    useEffect(() => {
        toUpdateChatList();
        return () => closeToUpdateChatList();
    }, [toUpdateChatList, closeToUpdateChatList, chatContacts])
    
    return (
        <div className="contacts p-2 flex-1 overflow-y-scroll">
            {
                isUsersLoading ? <ChattingListSkeleton/> :
                activeTab === 'chats' ?
                chatContacts.length === 0 ? <p className="p-4">You haven't chat with any one yet!</p> : 
                chatContacts.map(contact => {
                    return (
                        <ChattingList
                            key={contact.user._id}
                            user={contact.user}
                            message={contact.message}
                            handleSetSelectedUser={changeSelectUser}
                        />
                    )
                }) : contacts.map(contact => {
                    return (
                        <ChattingList
                            key={contact._id}
                            user={contact}
                            handleSetSelectedUser={changeSelectUser}
                        />
                    )
                })
            }
        </div>
    )
}

export default ShowContacts;