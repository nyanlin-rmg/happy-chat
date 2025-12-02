import Layout from "../components/Layout";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import TabSwitch from "../components/TabSwitch";
import ProfileHeader from "../components/ProfileHeader";
import UserList from "../components/UserList";

const ChatPage = () => {

    const { authUser } = useAuthStore();
    const { activeTab } = useChatStore();
    return (
        <Layout>
            <nav
                className="bg-slate-800 shadow-lg h-screen fixed top-0 left-0 min-w-[270px] py-6 px-4 flex flex-col overflow-auto max-w-32">
            
                <ProfileHeader user={authUser}/>
                <hr className="border-gray-500 mt-8" />
                <TabSwitch/>
                
                <div className="my-8 flex-1">
                    <ul className="mt-6 space-y-4">
                        <UserList user={authUser}/>
                        <UserList user={authUser}/>
                    </ul>
                </div>
            </nav>
            <h1>Hello WOrld</h1>
        </Layout>
    )
}

export default ChatPage;