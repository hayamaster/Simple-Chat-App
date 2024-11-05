import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import uploadFile from "../utils/uploadFile";

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });
  const [uploadPhoto, setUploadPhoto] = useState("");

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
    console.log(uploadPhoto);

    setUploadPhoto(file);

    setData((prev) => {
      return { ...prev, profile_pic: uploadPhoto?.url };
    });
  };

  const handleClearUploadPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadPhoto("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`;
    console.log(data);
  };

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto">
        <h3>Welcome to Chat App!</h3>

        <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="enter your name"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="enter your email"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="enter your password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">
              Photo :
              <div className="h-14 bg-slate-200 flex items-center justify-center border rounded hover:border-primary cursor-pointer">
                <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                  {uploadPhoto?.name || "Upload profile photo"}
                </p>
                {uploadPhoto?.name && (
                  <button
                    className="text-lg ml-2 hover:text-red-600"
                    onClick={handleClearUploadPhoto}
                  >
                    <IoClose />
                  </button>
                )}
              </div>
            </label>
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="bg-slate-100 px-2 py-1 focus:outline-primary hidden"
              onChange={handleUploadPhoto}
            />
          </div>

          <button className="bg-secondary text-lg px-4 py-1 hover:bg-[#37898c] rounded mt-2 font-bold text-white leading-relaxed tracking-wide">
            Register
          </button>
        </form>

        <p className="my-3 text-center">
          Already have account ?{" "}
          <Link
            to={"/email"}
            className="hover:text-secondary hover:underline font-semibold"
          >
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
