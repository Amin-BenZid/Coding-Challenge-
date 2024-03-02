import bg from "./img/bgQ.jpg";
import congrats from "./img/congratsQ.svg";
import check from "./img/Check_round_fillQ.svg";
import close from "./img/Close_round_fillQ.svg";
import { useEffect, useState } from "react";
import { click } from "@testing-library/user-event/dist/click";

const shuffledArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Thirteen = () => {
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [levelData, setLevelData] = useState([]);
  const [level, setLevel] = useState();
  const [responses, setResponses] = useState([]);
  const [listOfKeys, setListOfKeys] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [keyy, setKey] = useState();

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(data);

  var choices = [];
  const generateChoices = (elem) => {
    // this is the question ths(elem)
    if (elem) {
      let arr = countries.filter((e) => e !== elem).slice(0, 3);
      if (elem) {
        elem.res = true;
      }
      choices = [elem, ...arr];
    }
    return shuffledArray(choices);
  };
  var question;
  const generateQuestion = (capital, flag) => {
    let n = Math.floor(Math.random() * (2 - 1 + 1) + 1);
    if (capital) {
      if (n === 1) {
        question = { capital: capital[0], flag: null };
      } else question = { capital: null, flag: flag };
    }
    return question;
  };
  useEffect(() => {
    setCountries(
      data.map((country) => ({ ...country, res: false, done: false, right: false }))
    );
  }, [data]);

  const newGame = () => {
    let n = Math.floor(Math.random() * 241);
    if (countries) {
      setLevelData(shuffledArray(countries).slice(n, n + 10));
    }
  };

  const generateLevel = (e, key) => {
    setLevel({
      res: e,
      question: generateQuestion(e.capital, e.flags.png),
      choices: generateChoices(e),
      done: false,
      right: null,
      key: key,
    });
  };

  const rightAnsw = () => {
    setLevel((prevLevel) => {
      return {
        ...prevLevel,
        done: true,
        right: true,
      };
    });
    setResponses((res) => [...res, true]);
    setListOfKeys((e) => [...e, level.key]);
  };
  const wrongAnsw = () => {
    setLevel((prevLevel) => {
      return {
        ...prevLevel,
        done: true,
        right: false,
      };
    });
    setResponses((res) => [...res, false]);
    setListOfKeys((e) => [...e, level.key]);
  };
  useEffect(() => {
    newGame();
  }, [countries.length]);

  return (
    <div
      className="bg-cover bg-center h-screen w-screen text-[#E2E4F3] p-8 flex items-center justify-center"
      style={{ backgroundImage: `url(${bg})`, fontFamily: "Be Vietnam Pro" }}
    >
      {responses ? (
        responses.length === 10 ? (
          <div className="bg-[#343963] h-96 w-96 flex flex-col items-center p-4 gap-8 text-center rounded-lg shadow-xl">
            <img src={congrats} />
            <p className="text-2xl ">Congrats! You completed the quiz.</p>
            <p className="text-sm text-gray-400">
              You answered {responses.filter((e) => e === true).length} / 10 correctly
            </p>

            <div className="w-full flex items-center justify-center">
              <button
                className=" bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 h-12 w-[70%] rounded-lg"
                onClick={() => {
                  window.location.reload(false);
                }}
              >
                Play again
              </button>
            </div>
          </div>
        ) : (
          <div className=" flex flex-col gap-8 bg-[#343964] shadow-xl rounded-xl p-8 lg:w-[60%] lg:h-[65vh]  lg:pt-20 lg:pb-auto lg:items-center">
            <div className="items-center justify-center grid grid-cols-7 lg:flex lg:gap-2 ">
              {levelData.map((e, key) => {
                return (
                  <button
                    key={key}
                    onClick={() => {
                      generateLevel(e, key);
                      setClicked(false);
                    }}
                    disabled={
                      level ? level.key === key || listOfKeys.includes(key) : false
                    }
                    className="p-1"
                  >
                    <p
                      className={`${
                        level && level.key === key
                          ? " bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 "
                          : "bg-[#393F6E]"
                      } ${
                        listOfKeys && listOfKeys.includes(key)
                          ? "bg-gray-950"
                          : "bg-gray-950"
                      } h-10 w-10 rounded-full flex justify-center items-center`}
                    >
                      {key + 1}
                    </p>
                  </button>
                );
              })}
            </div>
            <div className="w-full h-auto text-center">
              {level ? (
                level.question.capital ? (
                  <p>Which country is {level.question.capital} the capital ?</p>
                ) : (
                  <div className="flex items-center gap-4 flex-col">
                    <img className="w-12 h-7 rounded-md" src={level.question.flag} />
                    Which country dose this flag belong to ?
                  </div>
                )
              ) : null}
            </div>
            <div className="grid grid-cols-2 h-auto gap-4 ">
              {level ? (
                level.choices[0] !== undefined ? (
                  level.choices.map((e, key) => {
                    return (
                      <button
                        className={
                          clicked && key === keyy
                            ? "h-14 w-26 bg-opacity-70 rounded-lg text-white bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 transition-all lg:w-64 "
                            : "h-14 w-26 bg-opacity-70 rounded-lg text-white bg-[#393F6F]  hover:bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 lg:w-64 transition-all"
                        }
                        disabled={level.done}
                        onClick={() => {
                          e.name.common === level.res.name.common
                            ? rightAnsw()
                            : wrongAnsw();
                          setClicked(true);
                          setKey(key);
                        }}
                        key={key}
                      >
                        {clicked ? (
                          e.res ? (
                            <div className="flex items-center justify-center gap-2">
                              {e.name.common} <img src={check} />
                            </div>
                          ) : keyy === key ? (
                            <div className="flex items-center justify-center gap-2">
                              {e.name.common} <img src={close} />
                            </div>
                          ) : (
                            e.name.common
                          )
                        ) : (
                          e.name.common
                        )}
                      </button>
                    );
                  })
                ) : (
                  <p>waiting...</p>
                )
              ) : null}
            </div>

            <div className="flex w-full  justify-center items-center text-gray-500 lg:pt-40">
              {level ? null : <p>Press the level number to get the question</p>}
            </div>
          </div>
        )
      ) : (
        <p>Waiting</p>
      )}
    </div>
  );
};

export default Thirteen;
