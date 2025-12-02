import { useEffect, useRef, useState } from "react";
import { LogOut, Volume1, VolumeOff } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ConfirmModal from "./ConfirmModal";

const ProfileHeader = ({user}) => {
    const { logout, updateProfile } = useAuthStore();
    const [showModal, setShowModal] = useState(false);
    const fileInputRef = useRef(null);
    const [imageLink, setImageLink] = useState('/avata.png');
    const { authUser } = useAuthStore();

    useEffect(() => {
        const img = authUser.profilePic ? authUser.imageLink : '/avata.png';
        setImageLink(img);
    }, [authUser]);



    const handleImageUpload = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if (!file) return;
        updateProfile(file).then(data => console.log(data));
        // const reader = new FileReader();
        // reader.readAsDataURL(file);

        // reader.onloadend = async () => {
        // const base64Image = reader.result;
        // setSelectedImg(base64Image);
        // };
    }


    const handleConfirmLogout = (event) => {
        document.getElementById('my_modal_5').showModal();
        setShowModal(true);
    }

    const closeModal = (event) => {
        event.preventDefault();
        setShowModal(false);
    }

    return (
        <>
            <ConfirmModal
                title={"Confirm Logout"}
                description={"Are you sure do you want to log out?"}
                confirm={logout}
                cancel={closeModal}
            />
            <div className="header p-4 flex flex-row justify-center items-center flex-none">
                <div className="w-16 h-16 relative flex flex-shrink-0 mr-5">
                    <button
                    className="size-16 rounded-full overflow-hidden relative group"
                    onClick={() => fileInputRef.current.click()}
                    >
                        <img className="shadow-md rounded-full w-full h-full object-cover"
                            src={imageLink}
                            alt=""
                        />
                    </button>
                </div>
                <p className="text-md font-bold">{user.name}</p>
                <LogOut
                onClick={handleConfirmLogout}
                className="flex flex-shrink-0 focus:outline-none mx-4 text-[#85911c] hover:text-[#f2ff3d] w-6 h-6 cursor-pointer"
                />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
        </>
    )
}

export default ProfileHeader;