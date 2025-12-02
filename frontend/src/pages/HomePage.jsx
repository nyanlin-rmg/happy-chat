import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Layout from "../components/Layout";
import ConfirmModal from "../components/ConfirmModal";

const HomePage = () => {
    const {authUser, logout} = useAuthStore();

    const handleConfirmLogout = (event) => {
        document.getElementById('my_modal_5').showModal();
        setShowModal(true);
    }

    return (
        <Layout>
            <ConfirmModal
                title={"Confirm Logout"}
                description={"Are you sure do you want to log out?"}
                confirm={logout}
            />            
            <div className="min-h-screen flex flex-col h-full items-center justify-center p">
                <div className="w-40 h-40 hover:w-48 hover:h-48 relative flex flex-shrink-0 mr-5 items-center justify-center text-center">
                    <img className="shadow-md rounded-full w-full h-full object-cover cursor-pointer"
                        src={authUser.profilePic ? authUser.imageLink : '/avata.png'}
                        alt=""
                    />
                </div>
                <h1
                    className="items-center flex justify-center text-center mt-5"
                >Welcome! {authUser.name}</h1>
                <div className="mt-4 items-center flex w-full justify-center text-center">
                    <Link to={'/chat'}
                    className="mr-3 flex w-full justify-center rounded-md bg-[#127e48] px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-[#0b492a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                        Chat
                    </Link>
                    <button type="button"
                    onClick={handleConfirmLogout}
                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Log Out</button>
                </div>
            </div>
        </Layout>
    )
}

export default HomePage;