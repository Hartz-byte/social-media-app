import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

import Logo from "../assets/logo/Buzzz.jpg";

const NavigationSection = () => {
  const navigate = useNavigate();

  // function to handle log out
  const handleLogout = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        navigate("/login");

        console.log("User signed out.");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="h-[80px] flex items-center justify-between px-4">
      {/* Logo on the left */}
      <img src={Logo} alt="Buzzz Logo" className="h-full object-contain" />

      {/* Centered Navigation Icons */}
      <div className="flex gap-8">
        <button className="text-white hover:text-[#B39757]">
          <span className="material-icons text-3xl">home</span>
        </button>
        <button className="text-white hover:text-[#B39757]">
          <span className="material-icons text-3xl">explore</span>
        </button>
        <button className="text-white hover:text-[#B39757]">
          <span className="material-icons text-3xl">notifications</span>
        </button>
        <button className="text-white hover:text-[#B39757]">
          <span className="material-icons text-3xl">account_circle</span>
        </button>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-500 transition"
      >
        Log Out
      </button>
    </div>
  );
};

export default NavigationSection;
