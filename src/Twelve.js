import bg from "./img/hero-image-wr1.jpg";
import logo from "./img/Logo1.svg";
import search from "./img/Search.svg";
import { useEffect, useState } from "react";

const Twelve = () => {
  const [countries, setCountries] = useState();
  const [selectedData, setSelectedData] = useState();
  const [selectedOption, setSelectedOption] = useState("Population");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        if (selectedOption === "Population")
          setCountries([...data].sort((a, b) => b.population - a.population));
        if (selectedOption === "Alphabetical")
          setCountries(
            data.sort((a, b) => {
              const nameA = a.name.common.toLowerCase();
              const nameB = b.name.common.toLowerCase();

              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }

              return 0;
            })
          );
        if (selectedOption === "Area")
          setCountries([...data].sort((a, b) => b.area - a.area));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedOption.length]);
  return (
    <div>
      {!selectedData ? (
        <PageOne
          countries={countries}
          setSelectedData={setSelectedData}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      ) : (
        <PageTwo
          selectedData={selectedData}
          countries={countries}
          setSelectedData={setSelectedData}
        />
      )}
    </div>
  );
};
const bar = <div className="w-full h-[1px] bg-gray-500 bg-opacity-35 "></div>;
const PageOne = ({ countries, setSelectedData, selectedOption, setSelectedOption }) => {
  const [region, setRegion] = useState([]);
  const [filtredData, setFiltredData] = useState();
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [isMember, setMember] = useState({ val: "member", checked: false });
  const [inputData, setInputData] = useState("");
  useEffect(() => {
    setFiltredData(countries);
  }, [countries]);
  let arr = countries;
  let byName = [];
  let byRegion = [];
  const searchByInput = () => {
    if (countries) {
      byName = countries.filter((e) =>
        e.name.common.toLowerCase().includes(inputData.toLowerCase())
      );
      if (byName.length > 0) return byName;
      return [];
    }
  };
  const filterMember = () => {
    if (countries) {
      if (isMember.val === "member" && isMember.checked === true) {
        arr = countries.filter((item) => item.unMember === true);
      }
      if (isMember.val === "independent" && isMember.checked === true) {
        arr = countries.filter((item) => item.unMember === false);
      } else return arr;
    }
    return arr;
  };
  const filterRegion = () => {
    if (countries) {
      if (selectedRegions.length > 0)
        arr = countries.filter((item) => selectedRegions.includes(item.region));
      return arr;
    }
    return arr;
  };
  useEffect(() => {
    setFiltredData(filterRegion());
  }, [selectedRegions.length]);
  useEffect(() => {
    setFiltredData(filterMember());
  }, [isMember.checked, selectedOption, countries]);
  useEffect(() => {
    setFiltredData(searchByInput());
  }, [inputData]);
  return (
    <div className="md:relative">
      <div
        className="bg-cover bg-center h-full min-h-[200px] w-full flex justify-center py-8 px-8 relative md:min-h-[300px] md:absolute md:h-[300px] md:top-0"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <img className="md:w-52" src={logo} />
      </div>

      <div className="bg-[#191A1C] min-h-screen md:h-[110vh] lg:h-[165vh] text-white md:p-8  md:w-full md:pt-60 ">
        <div className="md:bg-[#1C1D1F] md:absolute w-[94%] md:rounded-xl md:shadow-2xl p-4 md:p-8">
          <div className=" flex items-center w-full gap-8 md:gap-[420px]">
            <p className="text-gray-500 font-bold text-sm md:text-lg md:w-full">{`Found ${
              filtredData ? filtredData.length : null
            } countries `}</p>
            <div className="relative md:w-[160%] w-[50%] flex gap-4 transition-all">
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
                onChange={(e) => {
                  setInputData(e.target.value);
                }}
                className="h-12 w-full  rounded-xl bg-[#282B30] px-4 pl-12 placeholder:opacity-20 text-white"
                placeholder="Search by Name"
              />
            </div>
          </div>
          <div className=" md:flex">
            <Controlers
              countries={countries}
              setRegion={setRegion}
              region={region}
              setSelectedRegions={setSelectedRegions}
              selectedRegions={selectedRegions}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              setMember={setMember}
            />
            <Table
              countries={countries}
              data={filtredData}
              setData={setFiltredData}
              setSelectedData={setSelectedData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const Controlers = ({
  countries,
  setRegion,
  region,
  setSelectedRegions,
  selectedRegions,
  selectedOption,
  setSelectedOption,
  setMember,
}) => {
  return (
    <div className="flex flex-col items-center  md:items-start">
      {/* Line Two */}
      <div className="w-full flex items-center justify-center flex-col  md:items-start md:w-56 ">
        <div className="w-full pt-8 md:w-56">
          <DropDownMenu
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
          />
        </div>
        {/* End Line two */}
        {/* Line Three */}
        <div className="w-full">
          <Region
            countries={countries}
            setRegion={setRegion}
            region={region}
            setSelectedRegions={setSelectedRegions}
            selectedRegions={selectedRegions}
          />
        </div>
        {/* End Line Three */}
        {/* line Four */}
        <div className="w-full">
          <p className="text-sm text-stone-500 pb-2">Status</p>
          <div className="w-full flex flex-col gap-4 pl-5">
            <div className="flex items-center gap-4 ">
              <input
                type="checkbox"
                className="w-8 h-8 border-2 rounded-lg box-border"
                onChange={(e) => {
                  setMember({ val: e.target.value, checked: e.target.checked });
                }}
                value="member"
              />
              <p className="text-sm text-gray-400 font-bold">
                Memeber of the United Nations
              </p>
            </div>
            <div className="flex items-center gap-4 ">
              <input
                type="checkbox"
                className="w-8 h-8 border-2 rounded-lg box-border md:w-7 md:h-7"
                onChange={(e) => {
                  setMember({ val: e.target.value, checked: e.target.checked });
                }}
                value="independent"
              />
              <p className="text-sm text-gray-400 font-bold">Independent</p>
            </div>
          </div>
        </div>
      </div>
      {/* End Line Four */}
    </div>
  );
};
const DropDownMenu = ({ setSelectedOption, selectedOption }) => {
  const options = ["Population", "Alphabetical", "Area"];
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
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
        <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-gray-800  ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionChange(option)}
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-100 hover:text-gray-900 transition-all w-full text-left"
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
const Region = ({ setRegion, setSelectedRegions, selectedRegions }) => {
  const regions = ["Americas", "Antarctic", "Africa", "Asia", "Europe", "Oceania"];

  const toggleRegion = (region) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions((prevSelected) =>
        prevSelected.filter((selectedRegion) => selectedRegion !== region)
      );
    } else {
      setSelectedRegions((prevSelected) => [...prevSelected, region]);
    }
  };

  return (
    <div className="w-full h-auto pb-8 flex flex-col">
      <p className="text-sm text-stone-500 pt-8">Region</p>
      <div className="w-full h-auto pt-2 grid grid-cols-2">
        {regions.map((e, key) => (
          <div
            onClick={() => {
              toggleRegion(e);
              setRegion((current) =>
                selectedRegions.includes(e) ? current : [...current, e]
              );
            }}
            key={key}
            className={`h-10 w-${e.length * 4} ${
              selectedRegions.includes(e) ? "bg-gray-600" : ""
            } text-gray-300 font-bold text-sm bg-opacity-35 m-1 flex items-center pl-4 gap-2 rounded-lg cursor-pointer hover:bg-slate-100 hover:bg-opacity-20 transition-all`}
          >
            {e}
          </div>
        ))}
      </div>
    </div>
  );
};
const Table = ({ data, setSelectedData }) => {
  const [activePage, setActivePage] = useState(1);
  const [currentCountries, setCurrentCountries] = useState([]);
  const countriesPerPage = 10;
  let totalPages = 0;

  if (data) {
    totalPages = Math.round(data.length / countriesPerPage);
  }
  const startIndex = (activePage - 1) * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  useEffect(() => {
    if (data) {
      setCurrentCountries(data.slice(startIndex, endIndex));
    }
  }, [data, activePage]);

  return (
    <div className="flex flex-col w-[90vw] md:px-4">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Flag
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Population
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Area
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentCountries.map((e, key) => (
                  <tr
                    onClick={() => {
                      setSelectedData(e);
                    }}
                    key={key}
                    className=" cursor-pointer transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                  >
                    <td>
                      <div className="flex py-3">
                        <div
                          className="bg-cover bg-center flex justify-center h-10 w-14 rounded-md "
                          style={{ backgroundImage: `url(${e.flags.png})` }}
                        ></div>
                      </div>
                    </td>
                    <td>{e.name.common}</td>
                    <td>{e.population}</td>
                    <td>{e.area}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center pt-4 gap-4">
        <button
          className={`flex justify-center items-center text-lg border-2 border-gray-600 rounded-lg text-gray-300 p-4 w-8 h-8 flexcenter  ${
            activePage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={activePage === 1}
          onClick={() => setActivePage(activePage - 1)}
        >
          {"<"}
        </button>
        <div className="flex gap-4 items-center">
          <p className="text-gray-300">
            {activePage} / {totalPages}
          </p>
        </div>
        <button
          className={` flex justify-center items-center text-lg  border-2 border-gray-600 rounded-lg text-gray-300 p-4 w-8 h-8 flexcenter  ${
            activePage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={activePage === totalPages}
          onClick={() => setActivePage(activePage + 1)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};
const PageTwo = ({ selectedData, countries, setSelectedData }) => {
  function getNeighbours() {
    if (selectedData.borders) {
      if (selectedData.borders.length > 0) {
        return selectedData.borders.map((border) => {
          return countries.filter((country) => country.cca3 === border)[0];
        });
      }
    }
    return [];
  }
  return (
    <div>
      <div className="relative h-[138vh] bg-[#161719] text-gray-300 flex flex-col items-center md:h-[140vh]">
        <div
          className="bg-cover bg-center h-[200px] w-full flex justify-center py-8 px-8 relative "
          style={{ backgroundImage: `url(${bg})` }}
        >
          <img className="absolute top-10" src={logo} />
          <p
            onClick={() => setSelectedData()}
            className="w-full text-gray-500 text-[4rem] cursor-pointer hover:text-opacity-40 transition-all"
          >
            {"<"}
          </p>
        </div>
        <div className="bg-[#1C1D1F] w-96 h-auto absolute rounded-lg shadow-2xl top-[15%] flex flex-col items-center gap-6 lg:w-[70%] md:top-[11%] ">
          <div className="flex py-3 top-[-5%] absolute lg:top-[-8%]">
            <div
              className="bg-cover bg-center flex justify-center h-36 w-48 rounded-lg "
              style={{ backgroundImage: `url(${selectedData.flags.png})` }}
            ></div>
          </div>

          <div className="w-full flex flex-col items-center pt-32">
            <h1 className="font-bold text-2xl">{selectedData.name.common}</h1>
            <p>{selectedData.name.official}</p>
          </div>
          <div className="flex items-center justify-center w-full h-10 gap-4 ">
            <div className="bg-[#282B30] w-48 h-full rounded-lg flex justify-center items-center py-1 gap-2">
              <p className="text-gray-500 text-sm">Population</p>
              <div className="w-[1.5px] h-full bg-gray-900 bg-opacity-35"></div>
              <p className="text-sm">4.654.456.654</p>
            </div>
            <div className="bg-[#282B30] w-32 h-full rounded-lg flex justify-center items-center py-1 gap-2">
              <p className="text-gray-500 text-sm">Area</p>
              <div className="w-[1.5px] h-full bg-gray-900 bg-opacity-35"></div>
              <p className="text-sm">4.654.456</p>
            </div>
          </div>
          <div className="flex flex-col w-full gap-4">
            <Element a={"Capital"} b={selectedData.capital[0]} />
            <Element a={"Subregion"} b={selectedData.subregion} />
            <Element a={"Language"} b={Object.values(selectedData.languages)[0]} />
            <Element
              a={"Currencies"}
              b={
                (Object.values(selectedData.currencies)[0].name,
                Object.values(selectedData.currencies)[0].name)
              }
            />
            <Element a={"continents"} b={selectedData.continents[0]} />
            {bar}
            <div className="flex flex-col gap-4 px-8">
              <p className="text-gray-500">Neighbouring Countries</p>
              <div className="grid pb-4 grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4">
                {getNeighbours().map((e, key) => {
                  return (
                    <div
                      onClick={() => {
                        setSelectedData(e);
                      }}
                      className="flex flex-col justify-center gap-2 cursor-pointer"
                      key={key}
                    >
                      <img className="w-20 h-12 rounded-lg" src={e.flags.png} />
                      <p className="text-sm">{e.name.common}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Element = ({ a, b }) => {
  return (
    <>
      {bar}
      <div className="flex px-8 w-full">
        <p className="text-gray-500 w-[50%] ">{a}</p>
        <p className="text-right w-[50%]">{b}</p>
      </div>
    </>
  );
};
export default Twelve;
