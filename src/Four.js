import blue from "./img/blur-radial.svg";
import blur from "./img/blur-radial-bottom.png";
import { useEffect, useState } from "react";

const Four = () => {
  const [data, setData] = useState({ source: [] });
  const [myArray, setMyArray] = useState([]);
  const [show, setShow] = useState("one");

  return (
    <div className="bg-[#131929] h-screen relative w-screen text-white justify-center items-center flex flex-col	">
      <img src={blue} className="absolute top-[-300px] left-[-300px]" />
      <img src={blur} className="absolute bottom-0 right-0  " />
      <Register setMyArray={setMyArray} show={show} setShow={setShow} />
      <Topic data={data} setData={setData} show={show} setShow={setShow} />
      <Summary name={myArray[0]} email={myArray[1]} topcis={data.source} show={show} />
      <Slider show={show} />
    </div>
  );
};
const Register = ({ setMyArray, show, setShow }) => {
  const [formData, setFormData] = useState({ input1: "", input2: "" });
  const { input1, input2 } = formData;
  const [isEnabled, setIsEnabled] = useState(false);
  const [testOne, setTestOne] = useState(false);
  const [testTwo, setTestTwo] = useState(false);
  const styleMin =
    "text-[11px] h-10 w-full border-2 rounded-lg border-gray-500 bg-transparent px-4 py-1 focus:outline-none focus:border-[#7F5CE5]";
  const styleError =
    "text-[11px] h-10 w-full border-2 rounded-lg border-red-400 bg-transparent px-4 py-1 focus:outline-none focus:border-[#7F5CE5]";

  const [inputStyle, setInputStyle] = useState(styleMin);

  const handleInputChange = (e) => {
    if (e.target.name === "input2" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
      setTestOne(true);
      setInputStyle(styleMin);
    }
    if (e.target.name === "input1" && e.target.value !== "") {
      setTestTwo(true);
      setInputStyle(styleMin);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
    testOne && testTwo ? setIsEnabled(true) : setIsEnabled(false);
  };

  const addData = () => {
    setMyArray((prevArray) => [...prevArray, input1, input2]);
    setFormData({ input1: "", input2: "" });
    // lena khedmet el next
    input1 && input2 ? setShow("two") : setInputStyle(styleError);
  };

  const pDesign = "text-[11px] text-gray-400 pt-5 pb-1";
  return (
    <div
      className={
        show === "one"
          ? "bg-[#212936]  lg:h-80 lg:w-96 w-auto h-auto z-0 border border-gray-500 rounded-lg p-12"
          : "hidden"
      }
    >
      <h1 className="font-bold">Register</h1>
      <p className={pDesign}>Name</p>
      <input
        type="text"
        className={inputStyle}
        name="input1"
        value={input1}
        onChange={handleInputChange}
      />
      <p className={pDesign}>Email</p>
      <input
        type="email"
        placeholder="example@gmail.com"
        className={inputStyle}
        name="input2"
        value={input2}
        onChange={handleInputChange}
      />
      <div className="h-[80px] flex items-center justify-center">
        <button
          disabled={!isEnabled}
          onClick={addData}
          className={
            isEnabled
              ? "bg-[#7749E0] w-32 h-9 rounded-3xl text-sm hover:bg-[#5d489c] transition-all"
              : "bg-[#2f1d59] w-32 h-9 rounded-3xl text-sm text-gray-700"
          }
        >
          Continue
        </button>
      </div>
    </div>
  );
};
const Topic = ({ data, setData, show, setShow }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
    data.source.length === 0 ? setIsEnabled(false) : setIsEnabled(true);
  }, [data]);
  const clicked =
    "bg-purple-800 border-white text-white text-[11px] mt-2 text-left text-gray-500 h-10 w-full border-2 rounded-lg border-gray-500 bg-transparent px-4 py-1";
  const nonClicked =
    "text-[11px] mt-2 text-left text-gray-500 h-10 w-full border-2 rounded-lg border-gray-500 bg-transparent px-4 py-1";
  return (
    <div
      className={
        show === "two"
          ? "bg-[#212936] lg:h-80 lg:w-96 w-[90%] md:w-auto h-auto z-0 border border-gray-500 rounded-lg p-12"
          : "hidden"
      }
    >
      <h1 className="font-bold text-sm pb-4 ">Which topic you are interested in ?</h1>

      <button
        className={data.source.includes("one") ? clicked : nonClicked}
        onClick={() => {
          data.source.includes("one")
            ? setData({ source: data.source.filter((str) => str !== "one") })
            : setData({ source: [...data.source, "one"] });
        }}
      >
        Software Development
      </button>
      <button
        className={data.source.includes("two") ? clicked : nonClicked}
        onClick={() => {
          data.source.includes("two")
            ? setData({ source: data.source.filter((str) => str !== "two") })
            : setData({ source: [...data.source, "two"] });
        }}
      >
        User Experience
      </button>
      <button
        className={data.source.includes("three") ? clicked : nonClicked}
        onClick={() => {
          data.source.includes("three")
            ? setData({ source: data.source.filter((str) => str !== "three") })
            : setData({ source: [...data.source, "three"] });
        }}
      >
        Graphic Design
      </button>

      <div className="h-[80px] flex items-center justify-center">
        <button
          disabled={!isEnabled}
          className={
            isEnabled
              ? "bg-[#7749E0] w-32 h-9 rounded-3xl text-sm hover:bg-[#5d489c] transition-all"
              : "bg-[#2f1d59] w-32 h-9 rounded-3xl text-sm text-gray-700"
          }
          onClick={() => {
            setShow("three");
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};
const Summary = ({ name, email, topcis, show }) => {
  const pDesign = "text-[11px] text-gray-400 pb-1";
  return (
    <div
      className={
        show === "three"
          ? "bg-[#212936] lg:h-80 lg:w-96 w-auto h-auto z-0 border border-gray-500 rounded-lg p-12"
          : "hidden"
      }
    >
      <h1 className="font-bold pb-8">Summary</h1>
      <div className="flex">
        <p className={pDesign}>Name:</p>
        <p className={pDesign} style={{ color: "white", paddingLeft: "5px" }}>
          {name}
        </p>
      </div>
      <div className="flex">
        <p className={pDesign}>Email:</p>
        <p className={pDesign} style={{ color: "white", paddingLeft: "5px" }}>
          {email}
        </p>
      </div>
      <div className="pt-4">
        <p className={pDesign}>Topics:</p>
        {/* add map */}
        <ul>
          {topcis.map((e) => {
            return (
              <li className={pDesign} style={{ color: "white", paddingLeft: "10px" }}>
                {e === "one" ? (
                  <p>- Software Development</p>
                ) : e === "two" ? (
                  <p>- User Experience</p>
                ) : e === "three" ? (
                  <p>- Graphic Design</p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
const Slider = ({ show }) => {
  const selectedOne =
    "h-5 w-5 bg-[#342D62] rounded-full flex justify-center items-center";
  const selectedTwo = "h-3 w-3 bg-[#753EE4] rounded-full";
  const notSelectedOne =
    "h-5 w-5 bg-transparent rounded-full flex justify-center items-center ";
  const notSelectedTwo = "h-2 w-2 bg-gray-500 rounded-full";
  return (
    <div className="flex gap-4 pt-4">
      <p className="text-gray-500 text-sm flex gap-1">
        step{" "}
        {show === "one" ? (
          <p>1</p>
        ) : show === "two" ? (
          <p>2</p>
        ) : show === "three" ? (
          <p>3</p>
        ) : (
          <p>1</p>
        )}{" "}
        of 3
      </p>
      <div className={show === "one" ? selectedOne : notSelectedOne}>
        <div className={show === "one" ? selectedTwo : notSelectedTwo}></div>
      </div>
      <div className={show === "two" ? selectedOne : notSelectedOne}>
        <div className={show === "two" ? selectedTwo : notSelectedTwo}></div>
      </div>
      <div className={show === "three" ? selectedOne : notSelectedOne}>
        <div className={show === "three" ? selectedTwo : notSelectedTwo}></div>
      </div>
    </div>
  );
};

export default Four;
