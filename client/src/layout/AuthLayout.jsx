import logo from "../assets/chat_app_logo.png";

const AuthLayout = ({ children }) => {
  return (
    <>
      <header className="flex items-center justify-center py-3 h-20 shadow-md">
        <img src={logo} alt="logo" className="w-20 h-20" />
      </header>
      {children}
    </>
  );
};

export default AuthLayout;
