import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Avatar from "../components/Avatar";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/userSlice";

const CheckPasswordPage = () => {
  const [data, setData] = useState({
    password: "",
    userId: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location?.state?.name) {
      navigate("/email");
    }
  }, [navigate, location]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`;

    try {
      const res = await axios({
        method: "POST",
        url: URL,
        data: {
          userId: location?.state?._id,
          password: data.password,
        },
        withCredentials: true,
      });

      toast.success(res.data.message);

      if (res.data.success) {
        setData({
          password: "",
        });
        dispatch(setToken(res.data.token));
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto">
        <div className="w-fit mx-auto mb-2 flex flex-col justify-center items-center">
          <Avatar
            name={location?.state?.name}
            imageUrl={location?.state?.profile_pic}
            w={80}
            h={80}
          />
          <h2 className="font-semibold text-lg mt-1">
            {location?.state?.name}
          </h2>
        </div>
        <h3>Welcome to Chat App!</h3>

        <form className="grid gap-4 mt-3" onSubmit={handleSubmit}>
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

          <button className="bg-secondary text-lg px-4 py-1 hover:bg-[#37898c] rounded mt-2 font-bold text-white leading-relaxed tracking-wide">
            Let's Go
          </button>
        </form>

        <p className="my-3 text-center">
          <Link
            to={"/forgot-password"}
            className="hover:text-secondary hover:underline font-semibold"
          >
            Forgot Password ?
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default CheckPasswordPage;
