import { useEffect, useState } from "react";
import bg from "./img/bg-guess-the-word.png";
import logo from "./img/Word Scramblle.svg";
import { ToastContainer, toast } from "react-toastify";

const Eight = () => {
  const words = [
    "cat",
    "dog",
    "sun",
    "moon",
    "rain",
    "cake",
    "bird",
    "fish",
    "book",
    "tree",
    "rose",
    "blue",
    "play",
    "jump",
    "ball",
    "sing",
    "wind",
    "baby",
    "star",
    "home",
    "eleven",
    "guitar",
    "whisper",
    "ocean",
    "kindle",
    "laugh",
    "enjoy",
    "rabbit",
    "frozen",
    "jigsaw",
    "breeze",
    "jungle",
    "velvet",
    "harbor",
    "quartz",
    "orange",
    "cascade",
    "firefly",
    "diamond",
    "quasar",
    "glimmer",
    "fluffy",
    "nectar",
    "sphinx",
    "giddy",
    "sizzle",
    "whistle",
    "juggle",
    "floral",
    "hearty",
    "whirl",
    "jazz",
    "pickle",
    "quiver",
    "mystic",
    "gizmo",
    "jolt",
    "giddy",
    "muffin",
    "sprite",
    "glimmer",
    "bamboo",
    "merry",
    "waffle",
    "sunny",
    "mellow",
    "jazzy",
    "quack",
    "gazebo",
    "quilt",
    "whale",
    "whiff",
    "giddy",
    "jinx",
    "puppy",
    "zoom",
    "whiz",
    "whisk",
    "jazz",
    "whale",
    "sand",
    "bell",
    "pink",
  ];
  const style = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transition: "all ",
  };
  const randomWord = words[Math.floor(Math.random() * words.length)];
  const shuffle = (array) => {
    return array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  };
  const shuffled = shuffle(randomWord.toLocaleUpperCase().split(""));
  const [worL, setWOrL] = useState();
  useEffect(() => {
    shuffle(randomWord.toLocaleUpperCase().split(""));
  }, [worL === "W"]);

  if (worL === "W") toast("Great Job");
  if (worL === "L") toast("You Lost ! try again by clicking the 'Random' button");
  if (worL === "L")
    setInterval(() => {
      window.location.reload(false);
    }, 500);

  var allInputs = document.querySelectorAll("input");
  allInputs.forEach((singleInput) => (singleInput.value = ""));

  return (
    <div style={style}>
      <ToastContainer draggable />
      <Card data={shuffled} randomWord={randomWord} setWOrL={setWOrL} worL={worL} />
    </div>
  );
};

const Card = ({ data, randomWord, setWOrL, worL }) => {
  const [nop, setNop] = useState([]);
  const [right, setRight] = useState([]);
  const [tries, setTries] = useState(1);

  useEffect(() => {
    if (nop.length >= 5) {
      setTries(tries + 1);
      setNop([]);
    }
    if (tries === 5) setWOrL("L");
  }, [nop]);

  useEffect(() => {
    setTries(1);
    setNop([]);
  }, [worL === "W"]);

  const reset = () => {
    setRight([]);
    setTries(1);
    setNop([]);
    var allInputs = document.querySelectorAll("input");
    allInputs.forEach((singleInput) => (singleInput.value = ""));
  };

  const random = () => {
    window.location.reload(false);
  };
  return (
    <div className=" transition-all  bg-[#0F1626] rounded-2xl flex flex-col items-center lg:max-w-md lg:w-full lg:p-6 md:max-w-md md:w-full md:p-6 w-[84%] h-auto py-12  ">
      <img src={logo} className="pt-8 pb-7" />
      <div className="h-14 w-[80%]  px-20 bg-[#4A5567] rounded-lg flex gap-4 text-lg font-bold justify-center items-center text-[#96A3B4] ">
        {data.map((e, i) => {
          return <p key={i}>{e}</p>;
        })}
      </div>
      <div className="flex gap-2 pt-4 lg:gap-14">
        <div className="flex gap-1 items-center">
          <p className="text-[#394050] text-[12px]">{`Tries(${tries}/5): `}</p>
          <Dot tries={tries} />
        </div>
        <div className="flex gap-1 items-center">
          <p className="text-[#394050] text-[12px]">Mistakes: </p>
          <Alphabet nop={nop} />
        </div>
      </div>
      <InputField
        right={right}
        setRight={setRight}
        setNop={setNop}
        nop={nop}
        randomWord={randomWord.split("")}
        setWOrL={setWOrL}
        worL={worL}
      />
      <div className="flex text-white gap-8 pt-8">
        {/* ne9sa responsivness */}
        <button
          onClick={random}
          className="bg-[#C951E7] h-9 w-24 flex justify-center items-center rounded-lg shadow-[rgb(123,37,138)_0px_5px_1px_0px] hover:bg-[#6a2b7a] transition-all"
        >
          Random
        </button>
        <button
          onClick={reset}
          className=" bg-[#C951E7] h-9 w-20 flex justify-center items-center rounded-lg shadow-[rgb(123,37,138)_0px_5px_1px_0px] hover:bg-[#6a2b7a] transition-all"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
const Dot = ({ tries }) => {
  const elementsArray = new Array(tries).fill("test");
  return (
    <div className="flex gap-1  lg:gap-2 items-center">
      <div
        className={
          elementsArray[0] === "test"
            ? "w-2 h-2 bg-[#7329C6] rounded-full"
            : "w-1 h-1 bg-[#394050] rounded-full"
        }
      ></div>
      <div
        className={
          elementsArray[1] === "test"
            ? "w-2 h-2 bg-[#7329C6] rounded-full"
            : "w-1 h-1 bg-[#394050] rounded-full"
        }
      ></div>
      <div
        className={
          elementsArray[2] === "test"
            ? "w-2 h-2 bg-[#7329C6] rounded-full"
            : "w-1 h-1 bg-[#394050] rounded-full"
        }
      ></div>
      <div
        className={
          elementsArray[3] === "test"
            ? "w-2 h-2 bg-[#7329C6] rounded-full"
            : "w-1 h-1 bg-[#394050] rounded-full"
        }
      ></div>
      <div
        className={
          elementsArray[4] === "test"
            ? "w-2 h-2 bg-[#7329C6] rounded-full"
            : "w-1 h-1 bg-[#394050] rounded-full"
        }
      ></div>
    </div>
  );
};
const Alphabet = ({ nop }) => {
  return (
    <div className="flex text-[#94A1B3] text-sm gap-1  lg:gap-2">
      {nop.map((e, key) => {
        return <p key={key}>{e}</p>;
      })}
    </div>
  );
};
const InputField = ({ setNop, nop, randomWord, setWOrL, worL, right, setRight }) => {
  const length = randomWord.length;
  const [val, setVal] = useState([""]);
  const test = (e) => {
    const currentIndex = e.target.tabIndex;
    if (randomWord[e.target.tabIndex].toLowerCase() === e.target.value.toLowerCase()) {
      setRight((oldArray) => [
        ...right,
        {
          index: e.target.tabIndex,
          state: true,
        },
      ]);
      if (currentIndex < length - 1) {
        const nextIndex = currentIndex + 1;
        setVal(["_", nextIndex]);
        document.querySelector(`input[tabIndex="${nextIndex}"]`).focus();
      }
    } else if (e.target.value !== " " && e.target.value !== "")
      setNop(() => [...nop, e.target.value]);
  };

  if (right.length === randomWord.length) setWOrL("W");

  return (
    <div className="flex gap-2 pt-8 ">
      {randomWord.map((e, i) => {
        return (
          <input
            maxLength="1"
            type="text"
            onClick={() => {
              setVal(["_", i]);
            }}
            placeholder={i === val[1] ? val[0] : null}
            key={i}
            tabIndex={i}
            onChange={test}
            disabled={worL === "L"}
            className={`${
              length > 6 ? "w-5 lg:w-9" : "w-8 lg:w-12 "
            }pb-1 text-white flex text-center text-[15px] font-bold bg-transparent border-2 border-[#4A5567] h-8 lg:h-12 rounded-md  transition-all hover:border-[#C951E7] focus:outline-none focus:ring-2 focus:ring-[#C951E7] focus:border-transparent`}
          />
        );
      })}
    </div>
  );
};
export default Eight;
