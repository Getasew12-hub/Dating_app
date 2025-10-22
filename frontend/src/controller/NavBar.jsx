import React, { use, useEffect, useRef, useState } from "react";
import { LogOut, MessageCircle, PersonStanding, User } from "lucide-react";
import { Link } from "react-router-dom";
import userStore from "../store/user";

function NavBar({setShowbar,inprofile}) {
  const { user,Logout } = userStore();
   const movileclick=useRef()
  const dropdown = useRef();
  const mobilemenu=useRef()
  const [open, setOpen] = useState(false);


  useEffect(() => {
    function handleClickoutside(e) {
      
      if (dropdown.current && !dropdown.current.contains(e.target) && !mobilemenu?.current.contains(e.target) && !movileclick?.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickoutside);

    return () => document.removeEventListener("mousedown", handleClickoutside);
  }, []);
  function OpenCahng() {
 

    setOpen(!open);
 
  }

  return (
    <div className="w-full bg-gradient-to-r from-red-500 to-pink-500 p-2.5 md:px-5 text-white flex justify-between items-center ">
    
       <Link to={inprofile ? "/" : "#"}><div className="flex gap-2 font-bold sm:text-2xl items-center relative z-50 cursor-pointer" onClick={setShowbar}>
          <MessageCircle />
          <p>Swipe</p>
        </div></Link> 
    

      <div className="relative z-50 md:hidden">
        {/* menu */}
        <div
          className=" relative h-4 w-5 sm:h-5 cursor-pointer"
          onClick={ OpenCahng}  ref={mobilemenu}>
          <span
            className={`absolute ${
              open ? "top-1/2 rotate-45" : "top-0"
            } left-0 h-[3px] rounded w-full bg-white sm:h-1 transition-all  duration-500`}
          ></span>
          <span
            className={`absolute top-1/2 -translate-y-1/2 ${
              open && "hidden"
            }  rounded left-0 h-[3px] w-full bg-white sm:h-1 transition-all duration-500`}
          ></span>
          <span
            className={`absolute  ${
              open ? "bottom-1/2  -rotate-45 translate-y-[3px]" : "bottom-0"
            } left-0 h-[3px] w-full rounded bg-white sm:h-1 transition-all duration-500`}
          ></span>
        </div>
      </div>
      {/* desktop show menu*/}

      <div className="hidden relative md:block " ref={dropdown}>
        <div
          className="flex justify-center items-center gap-1 cursor-pointer relative z-50"
          onClick={OpenCahng} 
        >
          <div className="h-9 w-9 bg-gray-400 flex justify-center items-center rounded-full overflow-hidden">
            {user?.img ? (
              <img
                src={user.img}
                alt={user.name}
                className="h-full w-full object-cover "
                loading="lazy"
              />
            ) :  (
              user?.name.charAt().toUpperCase()
            )}
          </div>
          <p className="font-semibold">{ user?.name.length > 20 ? user?.name.slice(0, 15) + "..": user?.name}</p>
        </div>

        <div className={`${!open && "hidden"}`} >
          <div
            className={`absolute bg-white text-black shadow-lg shadow-gray-500 rounded  p-3 top-[120%] min-w-64  flex flex-col  gap-5 right-1/3`}
          >
            <Link
              to={"/profile"}
              className="flex items-center"
              onClick={OpenCahng}
            >
              <User /> profile
            </Link>
            <p className="flex items-center cursor-pointer" onClick={Logout}>
              <LogOut /> Logout
            </p>
          </div>
        </div>
      </div>

      {/* desktop bisiblity */}

      {/* mobile show  */}

      <div
        className={`absolute  sm:-bottom-[160%] -bottom-[190%] bg-pink-600 w-full left-0  ${
       (open ? "translate-y-0 " : " -translate-y-full  -z-50  ") 
        }  p-2.5 space-y-4 transition-all duration-500  md:hidden`}  ref={movileclick}
      >
        <Link
          to={"/profile"}
          className="font-bold tracking-wider w-full block hover:bg-pink-700 roudned"
          onClick={() => setOpen(false)}
        >
          Profile
        </Link>
        <p className="font-bold tracking-wider cursor-pointer w-full  hover:bg-pink-700 roudned" onClick={Logout}>
          Logout
        </p>
      </div>
    </div>
  );
}

export default NavBar;
