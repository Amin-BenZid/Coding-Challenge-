import bg from "./img/hero_img.jpg";
import logo from "./img/logo.svg";
import copy from "./img/Copy.svg";
import horizotal from "./img/Horizontal_top_left_main.svg";
import sort from "./img/Sort_alfa.svg";
import sound from "./img/sound_max_fill.svg";
import { useEffect, useState } from "react";
import axios from "axios";

const Eleven = () => {
  const [text, setText] = useState("hello friend");
  const [res, setRes] = useState("");
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("fr");
  const languages = [
    { name: "Spanish", code: "es" },
    { name: "Arabic", code: "ar" },
    { name: "German", code: "de" },
    { name: "Italian", code: "it" },
    { name: "Portuguese", code: "pt" },
    { name: "Chinese", code: "zh-CN" },
    { name: "Japanese", code: "ja" },
    { name: "Hindi", code: "hi" },
    { name: "Korean", code: "ko" },
    { name: "Turkish", code: "tr" },
  ];
  console.log(from, to);
  useEffect(() => {
    axios
      .get(`https://api.mymemory.translated.net/get?q=${text}!&langpair=${from}|${to}`)
      .then((ress) => {
        setRes(ress.data.responseData.translatedText.split("").slice(0, -1).join(""));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [text, to, from]);

  return (
    <div
      className="bg-cover bg-center h-screen w-screen flex flex-col items-center p-4 gap-4 md:py-16 md:px-20 "
      style={{ backgroundImage: `url("${bg}")` }}
    >
      <img className="pb-8 pt-8 md:pb-16 w-" src={logo} />
      <div className="w-full h-full flex flex-col gap-3 p-4 px-6 lg:flex-row">
        <div className="h-[30%] md:h-[35%] lg:h-[80%] lg:p-10 w-full bg-[#272B37] opacity-80 rounded-3xl border border-gray-400 flex flex-col p-4 px-6 ">
          <div className=" w-full h-14 flex flex-col justify-center">
            <ul className="flex gap-3 pb-3 pl-1 text-gray-500 text-sm md:text-xl items-center">
              <li
                className={
                  from === "en"
                    ? "bg-gray-500 text-white p-1 rounded-lg md:px-4 cursor-pointer hover:opacity-75"
                    : "p-1 rounded-lg md:px-4 cursor-pointer hover:opacity-75"
                }
                onClick={() => {
                  setFrom("en");
                }}
              >
                English
              </li>
              <li
                className={
                  from === "fr"
                    ? "bg-gray-500 text-white p-1 rounded-lg md:px-4 cursor-pointer hover:opacity-75"
                    : "p-1 rounded-lg md:px-4 cursor-pointer hover:opacity-75"
                }
                onClick={() => {
                  setFrom("fr");
                }}
              >
                Frensh
              </li>
              <li>
                <select
                  className={`${
                    from !== "en" && from !== "fr" ? "bg-gray-500 text-white" : ""
                  } p-1 rounded-lg md:px-4 hover:opacity-75 w-12 md:w-full cursor-pointer bg-transparent`}
                  onChange={(event) => {
                    let selectedLanguageCode = event.target.value;
                    setFrom(selectedLanguageCode);
                  }}
                  value={from}
                >
                  {languages.map((language, key) => (
                    <option className=" text-gray-500" key={key} value={language.code}>
                      {language.name}
                    </option>
                  ))}
                </select>
              </li>
            </ul>
            <div className="w-full h-[1px] bg-gray-500 "></div>
          </div>
          <textarea
            className="w-full h-full text-[12px] bg-transparent pt-4 resize-none text-white focus:outline-none md:text-lg md:h-[56%] lg:h-full "
            maxlength="500"
            value={text || ""}
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></textarea>
          {/* max length counter */}
          <p className="w-full text-right text-gray-500 text-sm py-2 md:pb-4 md:text-lg">
            19/500
          </p>
          {/* max length counter */}

          <div className=" w-full h-9 flex gap-2 items-center relative">
            <img
              className="border-2 rounded-xl border-gray-600 p-1 flex items-center justify-center hover:opacity-50 cursor-pointer transition-all md:p-4 md:w-16"
              src={sound}
            />
            <img
              className="border-2 rounded-xl border-gray-600 p-1 flex items-center justify-center hover:opacity-50 cursor-pointer transition-all md:p-4 md:w-16"
              src={copy}
            />
            <button className="flex text-white justify-center items-center border-[1px] border-white px-4 py-1 rounded-lg bg-[#3762E4] text-sm md:p-4 md:text-lg hover:opacity-80 transition-all absolute right-0">
              <img src={sort} />
              Translate
            </button>
          </div>
        </div>
        {/* :::::::::::::::::::: */}
        <div className="h-[30%] md:h-[35%] lg:h-[80%] lg:p-10  w-full bg-[#0F1523] opacity-90 rounded-3xl border border-gray-400 flex flex-col p-4 px-6 ">
          <div className=" w-full h-14 flex flex-col justify-center">
            <ul className="flex gap-3 pb-3 pl-1 text-gray-500 text-sm md:text-xl items-center relative">
              <li
                className={
                  to === "en"
                    ? "bg-gray-500 text-white p-1 rounded-lg md:px-4 cursor-pointer hover:opacity-75"
                    : "p-1 rounded-lg md:px-4 cursor-pointer hover:opacity-75"
                }
                onClick={() => {
                  setTo("en");
                }}
              >
                English
              </li>
              <li
                className={
                  to === "fr"
                    ? "bg-gray-500 text-white p-1 rounded-lg md:px-4 cursor-pointer hover:opacity-75"
                    : "p-1 rounded-lg md:px-4 cursor-pointer hover:opacity-75"
                }
                onClick={() => {
                  setTo("fr");
                }}
              >
                Frensh
              </li>
              <li>
                <select
                  className={`${
                    to !== "en" && to !== "fr" ? "bg-gray-500 text-white" : ""
                  } p-1 rounded-lg md:px-4 hover:opacity-75 w-12 md:w-full cursor-pointer bg-transparent`}
                  onChange={(event) => {
                    let selectedLanguageCode = event.target.value;
                    setTo(selectedLanguageCode);
                  }}
                  value={to}
                >
                  {languages.map((language, key) => (
                    <option key={key} value={language.code}>
                      {language.name}
                    </option>
                  ))}
                </select>
              </li>
              <img
                src={horizotal}
                className="w-9 absolute right-0 cursor-pointer hover:opacity-60 transition-all"
                onClick={() => {
                  setText(res);
                  setTo(from);
                  setFrom(to);
                }}
              />
            </ul>
            <div className="w-full h-[1px] bg-gray-500 "></div>
          </div>
          <textarea
            className="w-full text-[12px] h-full bg-transparent pt-4 resize-none	text-white focus:outline-none md:text-lg md:h-[70%] lg:h-full"
            maxlength="500"
            value={res || ""}
          ></textarea>

          <div className=" w-full h-9 flex gap-2 items-center relative">
            <img
              className="border-2 rounded-xl border-gray-600 p-1 flex items-center justify-center hover:opacity-50 cursor-pointer transition-all md:p-4 md:w-16"
              src={sound}
            />
            <img
              className="border-2 rounded-xl border-gray-600 p-1 flex items-center justify-center hover:opacity-50 cursor-pointer transition-all md:p-4 md:w-16"
              src={copy}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eleven;
