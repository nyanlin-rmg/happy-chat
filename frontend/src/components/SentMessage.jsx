import { useState } from "react";
import {FILE_URL} from "../lib/envVariables";
import { getTime } from "../lib/utils";
const SentMessage = ({message}) => {

    const [showTime, setShowTime] = useState('');
    const handleClick = event => {
        showTime ? setShowTime('') : setShowTime(getTime(message.createdAt));
    }

    return (
        // <div className="flex flex-row justify-end">
        //     <div className="messages text-sm text-white grid grid-flow-row gap-2">
        //         <div className="flex items-center flex-row-reverse group">
        //             <p className="px-6 py-3 mb-2 chat chat-end bg-[#2b684b] lg:max-w-md text-[#e4e4e4]">
        //                 {message.text}
        //                 <p className="text-xs mt-1 opacity-50">Hit</p>
        //             </p>
        //         </div>
        //     </div>
        // </div>
        <>
            {
                <div className="chat chat-end">
                    {
                        message.text && <div className={`chat-bubble bg-[#2b684b] text-[#c2c0c0] ${showTime ? 'bg-[#1b412e]' : ''} transition-all duration-75`}
                                        onClick={handleClick}
                                    >
                                        {message.text}
                                    </div>
                    }
                    <span className="chat-footer">
                        <time className="text-xs opacity-50">
                            {message.status ? message.status : ''}
                            <span className="transition-all duration-500">{showTime}</span>
                        </time>
                    </span>
                </div>
            }
            {
                message.image ? <div className="chat chat-end">
                                    <img src={message.imageLink} alt=""
                                            className="rounded-lg width w-[200px] h-auto"
                                    />
                                </div> : ''
            }
        </>
    )
}

export default SentMessage;