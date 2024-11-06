import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {
  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;
      const response = await axios.get(URL, { withCredentials: true });

      console.log(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

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
