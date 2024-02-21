import { useState } from "react";
import bg from "./img/bg-image-random-quote.svg";
import { useEffect } from "react";
import { CiLink } from "react-icons/ci";
import { IoMdRefresh } from "react-icons/io";

const Six = () => {
  const [data, setData] = useState();
  const [item, setItem] = useState({ author: "Loading ...", text: "Loading ..." });
  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setData(data);
        setItem(data[0]);
      });
  }, []);
  const chngeData = () => {
    setItem(data[Math.floor(Math.random() * data.length)]);
  };
  console.log(data);

  return (
    <div className="bg-[#111629] h-[100vh] flex justify-center items-center text-white text-center flex-col gap-8 px-12">
      <div className=" py-8 h-auto w-auto lg:w-[550px] lg:h-56 bg-[#20293A] rounded-2xl relative flex items-center flex-col  sm:w-[40%] sm:h-72">
        <img src={bg} className="absolute right-0 bottom-0" />
        <h1 className=" font-bold text-lg pt-8 pb-2">
          {data ? item.author.split(",")[0] : null}
        </h1>
        <div className="flex gap-4 pb-8">
          <div className="border-[#6264E5] border-2 text-[#6264E5] rounded-full text-[10px] flex text-center justify-center items-center w-28 p-1">
            <p>Famous Quotes</p>
          </div>
          <div className="border-[#6264E5] border-2 text-[#6264E5] rounded-full text-[10px] flex text-center justify-center items-center w-16">
            <p>{data ? item.author.split(",")[1] : null}</p>
          </div>
        </div>
        <p className="text-gray-400 text-xl px-">''{data ? item.text : null}''</p>
      </div>
      <div className="border-2 rounded-xl border-gray-500 opacity-25 w-32 h-12 flex">
        <div
          className="border-2 rounded-l-xl border-gray-500 opacity-25 w-16 h-12 flex items-center justify-center cursor-pointer hover:bg-slate-400 transition-all"
          onClick={chngeData}
        >
          <IoMdRefresh size={30} />
        </div>
        <div
          className="border-2 rounded-r-xl border-gray-500 opacity-25 w-16 h-12 flex items-center justify-center cursor-pointer hover:bg-slate-400 transition-all "
          onClick={() => {
            navigator.clipboard.writeText(item.text);
          }}
        >
          <CiLink size={30} />
        </div>
      </div>
    </div>
  );
};
export default Six;
