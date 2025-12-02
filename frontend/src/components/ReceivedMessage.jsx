import { getTime } from "../lib/utils";
import { useState } from "react";

const ReceivedMessage = ({message}) => {
    const [showTime, setShowTime] = useState('');
        const handleClick = event => {
            showTime ? setShowTime('') : setShowTime(getTime(message.createdAt));
        }
    return (
        // <div className="flex flex-row justify-start">
        //     <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
        //         <div className="flex items-center group">
        //             <p className="px-6 py-3 rounded-t-full mb-2 rounded-r-full bg-[#315e5f] max-w-xs lg:max-w-md text-[#ececec]">
        //                 {message.text}
        //                 <p className="text-xs mt-1 opacity-50">Hit</p>
        //             </p>
        //         </div>
        //     </div>
        // </div>
        <>
            {
                <div className="chat chat-start">                    
                    {
                        message.text && <div className={`chat-bubble bg-[#315e5f] text-[#c2c0c0] ${showTime ? 'bg-[#1e3b3b]' : ''} transition-all duration-75`}
                                            onClick={handleClick}
                                        >
                                            {message.text}
                                        </div>
                    }
                    <span className="chat-footer">
                        <time className="text-xs opacity-50">
                            <span className="transition-all duration-500">{showTime}</span>
                        </time>
                    </span>
                </div>
            }
            {
                message.image ? <div className="chat chat-start">
                                    <img src={message.imageLink} alt=""
                                            className="rounded-lg width w-[200px] h-auto"
                                    />
                                </div> : ''
            }
        </>
    )
}

export default ReceivedMessage;