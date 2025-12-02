const MessageSkeleton = () => (
    <div className="chat-body p-4 flex-1 overflow-y-scroll">
        {
            [1,2].map(item => (
                <div className="" key={item}>
                    <div className="chat chat-start">
                        <div className="chat-bubble skeleton h-4 w-40 bg-[#646464]">
                        </div>
                    </div>
                    <div className="chat chat-start">
                        <div className="chat-bubble skeleton h-4 w-40 bg-[#646464]">
                        </div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-bubble skeleton h-4 w-40 bg-[#646464]">
                        </div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-bubble skeleton h-4 w-40 bg-[#646464]">
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
)

export default MessageSkeleton;