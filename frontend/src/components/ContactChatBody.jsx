import { useEffect, useRef } from "react";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";
import { useChatStore } from "../store/useChatStore";
import MessageSkeleton from "./MessageSkeleton";

const ContactChatBody = ({user}) => {
    const { subscribeToMessages, unsubscribeToMessages, messages,
        isMessageLoading
     } = useChatStore();
    const messageEndRef = useRef(null);

    useEffect(() => {
        subscribeToMessages(user);
        if (messageEndRef.current) {
            setTimeout(() => {
                messageEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 100);
        }
        return () => unsubscribeToMessages();
    }, [subscribeToMessages, unsubscribeToMessages, messages])

    return (
        isMessageLoading ? <MessageSkeleton/> : (
            messages.length === 0 ? (
                <div
                    className="h-screen flex items-center justify-center p-4 overflow-hidden"
                >
                    You have not start a conversation with {user.name} yet!
                </div>
            ) : (
                <div className="chat-body p-4 flex-1 overflow-y-scroll">
                    {
                        messages.map(messageGroup => {
                            return (
                                <div key={messageGroup._id}>
                                    <div
                                        className="flex justify-center text-xs mt-3 mb-3 text-[#777777]"
                                    >
                                        {messageGroup._id}
                                    </div>
                                    {
                                        messageGroup.messages.map(message => message.senderId === user._id ? <ReceivedMessage key={message._id} message={message}/> : <SentMessage key={message._id} message={message}/>)
                                    }
                                </div>
                            )
                        })
                    }
                    <div ref={messageEndRef}/>
                </div>
            )
        )
    )
}

export default ContactChatBody;