import { useEffect, useState } from "react";
import logo from "../assets/olx_logo.svg";
import { PlusIcon, Search, LucideHeart, Bell } from "lucide-react";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [mainSearch, setMainSearch] = useState("");
  const { user,logout } = UserAuth();

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);



  const categories = [
    "Cars",
    "Motorcycles",
    "Mobile Phones",
    "For sale: Houses & Apartments",
    "Scooter",
    "Commercial & Other Vehicles",
    "For rent: Houses & Apartments",
  ];

  return (
    <div>
      <nav className="fixed z-50 w-full overflow-auto p-2 pl-3 pr-3 shadow-md bg-slate-100 border-b-4 border-solid border-b-white flex items-center max-sm:justify-between">
        <img src={logo} alt="OLX Logo" className="w-12 flex-shrink-0" />

        <div className="relative ml-5 hidden md:block">
          <svg
            className="absolute top-4 left-2 w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>

          <input
            placeholder="Search city, area, or locality..."
            className="w-12 sm:w-36 md:w-60 lg:w-64 p-3 pl-8 pr-8 border-black border-solid border-2 rounded-md text-ellipsis focus:outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-300/20 transition-all duration-200"
            type="text"
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
          />
          <svg
            className="absolute top-4 right-3 w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>

        <div className="ml-5 mr-2 relative w-full hidden min-[459px]:block">
          <input
            placeholder="Find Cars, Mobile Phones, and More..."
            className="w-full p-3 border-black border-solid border-2 rounded-md text-ellipsis focus:outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-300/20 transition-all duration-200"
            type="text"
            value={mainSearch}
            onChange={(e) => setMainSearch(e.target.value)}
          />
          <div
            className="flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12 cursor-pointer bg-black hover:bg-gray-800 transition-colors duration-200"
            onClick={() => console.log("Search:", mainSearch)}
          >
            <div className="w-5 h-5 text-white">
              <Search />
            </div>
          </div>
        </div>

        <div className="mx-1 sm:ml-5 sm:mr-5 relative flex items-center flex-shrink-0">
          <p className="font-bold mr-3 text-sm">English</p>
          <svg
            className="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
        <div className="flex space-x-4">
          <div>
            <LucideHeart />
          </div>

          <svg
            width="24px"
            height="24px"
            viewBox="0 0 1024 1024"
            data-aut-id="icon"
            className="ml-2"
          >
            <path
              className="rui-w4DG7"
              d="M469.333 171.119c-164.693 0-298.667 134.684-298.667 300.25v359.529l108.907-54.753 19.093-4.525h256c164.693 0 298.667-134.684 298.667-300.25s-133.973-300.25-298.667-300.25h-85.333zM147.093 938.667l-61.76-38.368v-428.929c0-212.856 172.267-386.036 384-386.036h85.333c211.733 0 384 173.18 384 386.036s-172.267 386.036-384 386.036h-245.931l-161.643 81.261z"
            ></path>
          </svg>

          <div>
            <Bell />
          </div>
        </div>

        <div id="authSection" className="flex-shrink-0">
          <p
            className="font-bold underline ml-5 cursor-pointer hover:no-underline transition-all duration-200"
           
          >
            <span
              onClick={() => {
              if (isLoggedIn) {
                logout()
                window.location.href = "/login";
              } else {
                window.location.href = "/login";
              }
              }}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </span>
          </p>
        </div>

        <div className="flex-shrink-0">
          <Link to={'/post'}> <button
            className="bg-yellow-400 flex hover:to-yellow-600 text-black font-bold py-2 px-4 mx-1 sm:ml-5 sm:mr-5 shadow-xl rounded-full cursor-pointer border-2 border-yellow-600 text-md hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            <PlusIcon /> SELL
          </button></Link>
         
        </div>
      </nav>

      {/* Categories Section */}
      <div className="w-full relative z-0 flex shadow-md p-2 pt-20 pl-10 pr-10 sm:pl-44 md:pr-44 overflow-auto overflow-y-hidden">
        <ul className="list-none flex items-center justify-between w-full min-w-max">
          <div className="flex flex-shrink-0 items-center cursor-pointer">
            <p className="font-semibold uppercase text-sm">All categories</p>
            <svg
              className="w-4 h-4 ml-2 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>

          {categories.map((category, index) => (
            <li
              key={index}
              className="text-sm px-2.5 flex-shrink-0 cursor-pointer hover:text-gray-800 hover:font-semibold transition-all duration-200"
              onClick={() => console.log("Category selected:", category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
