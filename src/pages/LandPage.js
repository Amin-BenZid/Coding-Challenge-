import React, { useState, useEffect } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import { FaCaretLeft } from "react-icons/fa";

const LandPage = () => {
  const [text, setText] = useState("");
  const [showComponent, setShowComponent] = useState(false);
  const fullText = "hey user , welcome to my portfolio .";
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowComponent(true);
    }, 4500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    let index = 0;

    const typingInterval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(typingInterval);
      }
    }, 120);

    return () => {
      clearInterval(typingInterval);
    };
  }, [fullText]);

  const [clicked, setClicked] = useState(false);

  return (
    <div>
      <div className=" w-full h-14 flex relative ">
        <div className={clicked ? "hidden" : "flex"}>
          <div className=" absolute left-28 text-lg">Hello World!</div>
          <div className=" absolute right-28">
            <HiBars3BottomRight
              size={40}
              className="cursor-pointer hover:text-white transition-all duration-300"
              onClick={() => setClicked(true)}
            />
          </div>
        </div>
      </div>
      {clicked ? <SideBar setClicked={setClicked} /> : null}
      <div
        className={
          clicked
            ? "blur-sm w-full flex justify-center pt-20"
            : "w-full flex justify-center pt-20"
        }
      >
        <div className=" w-[50%] h-56 bg-black flex justify-center items-center ">
          <div className="inline-block">
            <p className="text-lg transition-all duration-300 pb-4">{text}</p>
            <div className="mb-[-50px]">{showComponent && <DelayedComponent />}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
const DelayedComponent = () => {
  return (
    <div>
      <button class="transition-all duration-300 flex  bg-transparent hover:bg-[#00ff00] text-[#00ff00] font-semibold hover:text-white py-2 px-4 border border-[#00ff00] hover:border-transparent rounded">
        Advance
      </button>
    </div>
  );
};
const SideBar = ({ setClicked }) => {
  const navData = ["_home/", ".contact_me\\", "__resume\\n"];
  return (
    <div className=" z-50 side bg-black w-[25%] left-0 absolute top-0 h-full flex animate__animated animate__fadeInUp">
      <ul className=" w-[90%] text-2xl p-10 ">
        {navData.map((e, key) => {
          return (
            <div key={key} className="pb-4">
              <li className="relative group cursor-pointer overflow-hidden ">
                <span className="cursor-pointer hover:text-gray-600 transition-all duration-300">
                  {e}
                </span>
                <span className="absolute inset-x-0 bottom-0 left-0 h-0.5 bg-[#00ff00] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform w-[50%] duration-700 "></span>
              </li>
            </div>
          );
        })}
      </ul>
      <div className="w-[10%] h-full flex items-center justify-center hover:text-[#202124] cursor-pointer transition-all duration-300">
        <FaCaretLeft
          size={40}
          onClick={() => {
            setClicked(false);
          }}
        />
      </div>
    </div>
  );
};
export default LandPage;
