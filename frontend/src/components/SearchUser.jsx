import { Search } from "lucide-react";
import { useState } from "react";

const SearchUser = () => {
    const [searchUser, setSearchUser] = useState('');

    const handleChange = (event) => {
        setSearchUser(event.target.value);
    }

    return (
        <div className="search-box p-4 flex-none">
            <div className="relative">
                <label>
                    <input className="rounded-full py-2 pr-6 pl-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                        type="text" value={searchUser}
                        onChange={handleChange}
                        placeholder="Search Contacts"/>
                    <Search
                    className="absolute top-0 left-0 mt-2 ml-3 inline-block"
                    />
                </label>
            </div>
        </div>
    )
}

export default SearchUser;