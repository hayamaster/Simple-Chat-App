import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout, setUser } from "../redux/userSlice";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("redux user", user);

  const fetchUserDetails = useCallback(async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;
      const response = await axios.get(URL, { withCredentials: true });

      dispatch(setUser(response.data.data));

      if (response.data.logout) {
        dispatch(logout());
        navigate("/email");
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return (
    <div className="text-2xl">
      <h1>Home</h1>

      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default Home;
