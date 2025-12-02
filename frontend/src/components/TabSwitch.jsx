import { useChatStore } from "../store/useChatStore";

const TabSwitch = () => {
    const {setActiveTab, activeTab} = useChatStore();
    const handleClick = (value) => setActiveTab(value);
    return (
        <div role="tablist" className="tabs tabs-boxed mt-5 mb-5 ml-2 mr-2">
            <a role="tab"
                onClick={() => handleClick('chats')}
                className={`tab ${activeTab === 'chats' ? 'tab tab-active' : 'tab'}`}>Chats</a>
            
            <a role="tab"
                onClick={() => handleClick('contacts')}
                className={`${activeTab === 'contacts' ? 'tab tab-active' : 'tab'}`}>Contacts</a>
        </div>
    );
}

export default TabSwitch;