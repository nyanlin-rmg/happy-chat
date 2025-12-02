import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import Loading from "./Loading";

const Layout = ({children}) => {
    const {isLoading} = useAuthStore();

    return (
        isLoading ? <Loading/> :
        <div
            className="min-h-screen flex items-center justify-center overflow-hidden bg-slate-700 text-[#d4d4d4]"
        >
            {children}
            <Toaster/>
        </div>
    )
};

export default Layout;