import { useEffect, useState } from "react";
import ChatFooter from "../components/ChatFooter";
import ChattingList from "../components/ChattingList";
import ContactChatBody from "../components/ContactChatBody";
import ProfileHeader from "../components/ProfileHeader";
import SearchUser from "../components/SearchUser";
import UserList from "../components/UserList";
import { useAuthStore } from "../store/useAuthStore";
import ContactChatHeader from "./ContactChatHeader";
import { useChatStore } from "../store/useChatStore";
import { MessageCircle } from "lucide-react";
import ChattingListSkeleton from "../components/ChattingListSkeleton";
import UserListSkeleton from "../components/UserListSkeleton";
import Layout from "../components/Layout";
import TabSwitch from "../components/TabSwitch";
import ShowContacts from "../components/ShowContacts";

const ChatPageClone = () => {

    const { authUser } = useAuthStore();
    const { 
        selectedUser,
        setSelectedUser, getMessageByUserId,
        getAllContacts, getMyChatPartners
    } = useChatStore();
        
    useEffect(() =>{
        setSelectedUser(null);
        getMyChatPartners();
        getAllContacts();
    }, [getMyChatPartners, getAllContacts]);

    const handleSetSelectedUser = user  => {
        getMessageByUserId(user._id);
        setSelectedUser(user);
    }

    return (
        <Layout>
            <div className="h-screen w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden">
                <div className="flex-1 flex flex-col">
                    {
                        <main className="flex-grow flex flex-row min-h-0">
                            <section
                            className={`w-screen h-screen flex flex-col flex-none overflow-auto md:block lg:max-w-sm md:w-auto ${selectedUser ? 'hidden' : ''}`}>
                                <ProfileHeader user={authUser}/>
                                <TabSwitch/>
                                {/* <div className="active-users flex flex-row p-2 overflow-auto w-0 min-w-full">
                                    {
                                        isUsersLoading ? <UserListSkeleton/> :
                                        contacts.map(contact => {
                                            return (
                                                <UserList user={contact} key={contact._id}
                                                handleSetSelectedUser={handleSetSelectedUser}
                                                />
                                            )
                                        })
                                    }
                                </div> */}
                                <ShowContacts
                                    changeSelectUser={handleSetSelectedUser}
                                />
                            </section>
                            <section className="flex flex-col flex-auto border-l border-gray-800">
                                {
                                    selectedUser === null ?
                                    <>
                                        <div className="min-h-screen flex flex-col h-full items-center justify-center p-4">
                                            <div className="items-center flex justify-center text-center">
                                                <MessageCircle/>
                                            </div>
                                            <div className="mt-4 items-center flex justify-center text-center">
                                                Select a conversation to chat!
                                            </div>
                                        </div>
                                    </>: 
                                    <>
                                        <ContactChatHeader
                                            user={selectedUser}
                                        />

                                        <ContactChatBody
                                            user={selectedUser}
                                        />
                                        <ChatFooter/>
                                    </>
                                }
                            </section>
                        </main>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default ChatPageClone;