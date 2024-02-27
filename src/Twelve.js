import bg from "./img/hero-image-wr1.jpg";
import logo from "./img/Logo1.svg";
import done from "./img/Done_round1.svg";
import expand from "./img/Expand_down.svg";
import search from "./img/Search.svg";
import { useEffect, useState } from "react";

const Twelve = () => {
  const [countries, setCountries] = useState();
  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,area,region,unMember,independent"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <PageOne countries={countries} />
    </div>
  );
};
// ::::::::::::::::::::::::::::PAGE ONE:::::::::::::::::::::::::::::: //
const PageOne = ({ countries }) => {
  const [region, setRegion] = useState([]);
  const [data, setData] = useState();
  const [filtredData, setFiltredData] = useState();
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Population");

  useEffect(() => {
    setFiltredData(data);
  }, [data]);

  var array = data;

  const population = () => {
    const sorted = [...data].sort((a, b) => b.population - a.population);
    return sorted;
  };
  const area = () => {
    const sorted = [...data].sort((a, b) => b.area - a.area);
    return sorted;
  };
  const search = () => {
    if (data && selectedRegions.length > 0) {
      const uniqueArray = [...new Set(selectedRegions)];
      setSelectedRegions(uniqueArray);
      array = data.filter((item) => selectedRegions.includes(item.region));
      return array;
    } else return array;
  };
  useEffect(() => {
    setFiltredData(search());
  }, [selectedRegions.length]);

  useEffect(() => {
    if (data) {
      if (selectedOption === "Population") setFiltredData(population());
      if (selectedOption === "Alphabetical") setFiltredData(data.sort());
      if (selectedOption === "Area") setFiltredData(area());
    }
  }, [data, selectedOption]);

  return (
    <div className="">
      <div
        className="bg-cover bg-center h-full min-h-[200px] w-full flex justify-center py-8 px-8 relative md:min-h-[300px]"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <img src={logo} />
      </div>
      <div className="bg-[#1C1D1F] min-h-screen  text-white p-4 ">
        <Controlers
          countries={countries}
          setRegion={setRegion}
          region={region}
          setSelectedRegions={setSelectedRegions}
          selectedRegions={selectedRegions}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <Table countries={countries} data={filtredData} setData={setData} />
      </div>
    </div>
  );
};
// ::::::::::::::::::::::::::::END PAGE ONE::::::::::::::::::::::::::: //
const Controlers = ({
  countries,
  setRegion,
  region,
  setSelectedRegions,
  selectedRegions,
  selectedOption,
  setSelectedOption,
}) => {
  let countriesFound = 250;
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
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center gap-4 ">
            <input type="checkbox" />
            <p className="text-sm text-gray-400 font-bold">
              Memeber of the United Nations
            </p>
          </div>
          <div className="flex items-center gap-4 ">
            <input type="checkbox" />
            <p className="text-sm text-gray-400 font-bold">Independent</p>
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
const Region = ({ setRegion, setProp, setSelectedRegions, selectedRegions }) => {
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
const Table = ({ countries, data, setData }) => {
  const [active, setActive] = useState(1);
  useEffect(() => {
    if (countries) {
      if (active == 1) {
        setData(countries.slice(0, 10));
      }
    }
  }, []);

  const next = () => {
    if (active === 25) return;
    const startIndex = (active - 1) * 10 + 10;
    const endIndex = startIndex + 10;
    setActive(active + 1);
    setData(countries.slice(startIndex, endIndex));
  };

  const prev = () => {
    if (active === 1) return;

    const startIndex = (active - 2) * 10;
    const endIndex = startIndex + 10;
    setActive(active - 1);
    setData(countries.slice(startIndex, endIndex));
  };

  return (
    <div className="flex flex-col w-[90vw]">
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
                    Are
                  </th>
                </tr>
              </thead>
              <tbody>
                {data ? (
                  data.map((e, key) => {
                    return (
                      <tr
                        key={key}
                        className="transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
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
                    );
                  })
                ) : (
                  <tr>
                    <td>Loading...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center pt-4 justify-center">
        <button
          onClick={prev}
          className="border-2 border-gray-600 rounded-lg text-gray-300 p-4 w-8 h-8 flex justify-center items-center"
        >
          {"<"}
        </button>
        <p>
          Page <strong>{active}</strong> of <strong>25</strong>
        </p>
        <button
          onClick={next}
          className="border-2 border-gray-600 rounded-lg text-gray-300 p-4 w-8 h-8 flex justify-center items-center"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};
export default Twelve;
