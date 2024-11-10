import { IoSearchOutline, IoClose } from "react-icons/io5";
import { useEffect, useState, useCallback } from "react";
import Loading from "./Loading";
import UserSearchCard from "./UserSearchCard";
import toast from "react-hot-toast";
import axios from "axios";

const SearchUser = ({ onClose }) => {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchUser = useCallback(async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/search-user`;

    try {
      setLoading(true);
      const response = await axios.post(URL, {
        search,
      });

      setSearchUser(response.data.data);
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || error);
    }
  }, [search]);

  useEffect(() => {
    handleSearchUser();
  }, [handleSearchUser]);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2">
      <div className="w-full max-w-lg mx-auto mt-10">
        {/** input search user */}
        <div className="bg-white h-14 flex rounded overflow-hidden">
          <input
            type="text"
            placeholder="Search user by name, email..."
            className="w-full outline-none py-1 h-full px-4"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="h-14 w-14 flex justify-center items-center">
            <IoSearchOutline size={25} />
          </div>
        </div>

        {/** search user */}
        <div className="bg-white mt-2 w-full p-4 rounded">
          {searchUser.length === 0 && !loading && (
            <p className="text-center text-slate-500">no user found!</p>
          )}
          {loading && (
            <div>
              <Loading />
            </div>
          )}
          {searchUser.length !== 0 &&
            !loading &&
            searchUser.map((user) => {
              return (
                <div onClick={onClose} key={user._id}>
                  <UserSearchCard user={user} />
                </div>
              );
            })}
        </div>
      </div>

      <button
        className="absolute top-0 right-0 text-2xl p-2 lg:text-4xl hover:text-white"
        onClick={onClose}
      >
        <IoClose size={25} />
      </button>
    </div>
  );
};

export default SearchUser;
