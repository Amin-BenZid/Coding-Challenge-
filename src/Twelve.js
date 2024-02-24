import bg from "./img/hero-image-wr1.jpg";
import logo from "./img/Logo1.svg";
import done from "./img/Done_round1.svg";
import expand from "./img/Expand_down.svg";
import search from "./img/Search.svg";
import { useState } from "react";

const Twelve = () => {
  return (
    <div>
      <PageOne />
    </div>
  );
};
// ::::::::::::::::::::::::::::PAGE ONE:::::::::::::::::::::::::::::: //
const PageOne = () => {
  return (
    <div className="">
      <div
        className="bg-cover bg-center h-full min-h-[200px] w-full flex justify-center py-8 px-8 relative md:min-h-[300px]"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <img src={logo} />
      </div>
      <div className="bg-[#1C1D1F] min-h-screen max-h- text-white p-4">
        <Controlers />
      </div>
    </div>
  );
};
// ::::::::::::::::::::::::::::END PAGE ONE::::::::::::::::::::::::::: //
const Controlers = () => {
  let countriesFound = 234;
  const [selectedOption, setSelectedOption] = useState("Option 1");
  return (
    <div className="flex flex-col items-center">
      {/* line One */}
      <div className=" flex items-center w-full gap-8">
        <p className="text-gray-500 font-bold text-sm">{`Found ${countriesFound} countries `}</p>
        <div className="relative w-[50%] flex gap-4 transition-all">
          <div
            type="button"
            className="absolute inset-y-0 left-0 h-12 w-14 flex items-center justify-center "
          >
            <img
              className="opacity-20 cursor-pointer hover:opacity-75 transition-all"
              src={search}
            />
          </div>
          <input
            className="h-12 w-full rounded-xl bg-[#282B30] px-4 pl-12 placeholder:opacity-20 text-white"
            placeholder="Search by Name, Region, Subregion"
          />
        </div>
      </div>
      {/* End line One */}
      {/* Line Two */}
      <div className="w-full pt-8">
        <DropDownMenu
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
        />
      </div>
      {/* End Line two */}
      {/* Line Three */}
      <div className="w-full">
        <Region />
      </div>
      {/* End Line Three */}
      {/* line Four */}
      <div className="w-full">
        <p className="text-sm text-stone-500 pb-2">Status</p>
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center gap-4 ">
            <CheckBox />
            <p className="text-sm text-gray-400 font-bold">
              Memeber of the United Nations
            </p>
          </div>
          <div className="flex items-center gap-4 ">
            <CheckBox /> <p className="text-sm text-gray-400 font-bold">Independent</p>
          </div>
        </div>
      </div>
      {/* End Line Four */}
    </div>
  );
};
const DropDownMenu = ({ setSelectedOption, selectedOption }) => {
  const options = ["Option 1", "Option 2", "Option 3"];
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the dropdown when an option is selected
  };

  return (
    <div className="relative inline-block text-left w-full">
      <p className="text-sm text-stone-500 pb-2">Sort by</p>
      <div className="relative">
        <button
          type="button"
          onClick={handleToggleDropdown}
          className="inline-flex  w-full rounded-md border-2 border-[#282B30]  shadow-sm px-4 py-2 bg-transparent text-sm font-medium text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        >
          {selectedOption}
          <svg
            className={`-mr-1 absolute right-5 h-5 w-5 ${
              isOpen ? "transform rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 01-.7-.3l-4-4a1 1 0 111.4-1.4L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-.7.3z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-transparent  ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionChange(option)}
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-100 hover:text-gray-900"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
const Region = () => {
  const regions = ["Americas", "Antarctic", "Africa", "Asia", "Europe", "Oceania"];
  const data = "dd";
  return (
    <div className="w-full h-auto pb-8 flex flex-col">
      <p className="text-sm text-stone-500 pt-8">Region</p>
      <div className="w-full h-auto pt-2 grid grid-cols-2">
        {regions.map((e, key) => {
          return (
            <div
              key={key}
              className={`h-10 w-${
                e.length * 4
              } bg-gray-600 text-gray-300 font-bold text-sm bg-opacity-35 m-1 flex items-center justify-center gap-2 rounded-lg `}
            >
              {e}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CheckBox = () => {
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  return (
    <div
      className={`w-9 h-9 ${
        isChecked ? "bg-blue-500" : "bg-transparent"
      } border-2 border-gray-500 rounded-lg cursor-pointer`}
      onClick={handleCheckboxChange}
    >
      {isChecked && (
        <div className="w-full h-full flex items-center justify-center text-white">✔</div>
      )}
    </div>
  );
};
export default Twelve;
