import { Outlet } from "react-router-dom";

const Home = () => {
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
