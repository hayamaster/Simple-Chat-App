import { useState, useRef } from "react";
import Avatar from "./Avatar";
import uploadFile from "../utils/uploadFile";
import Divider from "./Divider";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const EditUserDetails = ({ onClose, user }) => {
  const [data, setData] = useState({
    name: user?.name,
    profile_pic: user?.profile_pic,
  });
  const uploadPhotoRef = useRef();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];

    const uploadPhoto = await uploadFile(file);

    setData((prev) => {
      return {
        ...prev,
        profile_pic: uploadPhoto?.url,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`;
      const res = await axios.post(URL, data, { withCredentials: true });

      toast.success(res?.data?.message);

      if (res.data.success) {
        dispatch(setUser(res.data.data));
        onClose();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-4 py-6 m-1 rounded w-full max-w-sm">
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm">Edit user details</p>

        <form className="grid gap-3 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={handleOnChange}
              className="w-full border border-gray-300 rounded py-1 px-2 focus:outline-secondary"
            />
          </div>

          <div>
            <p>Photo: </p>
            <div className="my-1 flex items-center gap-3">
              <Avatar
                w={40}
                h={40}
                imageUrl={data?.profile_pic}
                name={data?.name}
              />
              <label htmlFor="profile_pic">
                <button
                  className="font-semibold"
                  type="button"
                  onClick={() => uploadPhotoRef.current.click()}
                >
                  Change Photo
                </button>
                <input
                  id="profile_pic"
                  type="file"
                  className="hidden"
                  onChange={handleUploadPhoto}
                  ref={uploadPhotoRef}
                />
              </label>
            </div>
          </div>

          <Divider />
          <div className="flex gap-2 w-fit ml-auto">
            <button
              onClick={onClose}
              className="border border-secondary text-secondary px-4 py-1 rounded hover:bg-secondary hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="border border-secondary bg-secondary text-white px-4 py-1 rounded hover:bg-primary"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserDetails;
