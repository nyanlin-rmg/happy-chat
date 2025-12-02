import { Send, Image, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";

const ChatFooter = () => {

    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState('');
    const imageInputRef = useRef(null);

    const {sendMessage, selectedUser} = useChatStore();

    const handleTextChange = event => {
        setText(event.target.value);
    }

    const handleImageClick = event => {
        const imageFile = event.target.files[0];
        if (!imageFile.type.startsWith("image/")) {
            toast.error("Please choose image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(imageFile);
        setImageFile(imageFile);
    };

    const handleRemoveImage = event => {
        setImagePreview(null);
        setImageFile('');
        if (imageInputRef.current) imageInputRef.current.value = "";
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (text === "" && imagePreview === null) return;
        sendMessage({text: text, imagePreview: imagePreview, imageFile: imageFile}, selectedUser);
        setText("");
        handleRemoveImage();
    }
    return (
        <div className="chat-footer flex-none">
            {
                imagePreview && (
                    <div className="flex flex-row items-center p-4">
                        <div className="relative">
                            <img
                                src={imagePreview}
                                className="w-20 h-20 object-cover rounded-lg border border-slate-700"
                            />
                            <button
                                onClick={handleRemoveImage}
                                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700"
                                type="button"
                            >
                                <XIcon className="w-4 h-4"/>
                            </button>
                        </div>                        
                    </div>
                )
            }
            <div className="">
                <form className="flex flex-row items-center p-4"
                    onSubmit={handleSubmit}
                >
                    <input
                    type="file"
                    accept="image/*"
                    ref={imageInputRef}
                    onChange={handleImageClick}
                    className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => imageInputRef.current?.click()}
                    >
                        <Image
                            className="flex flex-shrink-0 focus:outline-none mx-2 text-blue-600 hover:text-blue-700 w-6 h-6"
                        />
                    </button>
                    <div className="relative flex-grow">
                        <label>
                            <input
                            autoComplete="off"
                            type="text" id="message-text" name="message-text"
                            value={text}
                            onChange={handleTextChange}
                            className="rounded-full py-2 pl-3 pr-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                            placeholder="Aa"/>
                        </label>
                    </div>
                    <button type="submit"
                        className={`${text === "" && imagePreview===null ? 'btn-disabled' : ''}`}
                    >
                        <Send
                            className={`flex flex-shrink-0 focus:outline-none mx-2 w-6 h-6 ${text === "" && imagePreview === null ? 'text-[#6b6b6b] btn-disabled' : 'text-[#319750] hover:text-[#4ae979]'}`}
                        />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatFooter;