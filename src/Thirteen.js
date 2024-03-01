import bg from "./img/bgQ.jpg";
import congrats from "./img/congratsQ.svg";
import check from "./img/Check_round_fillQ.svg";
import close from "./img/Close_round_fillQ.svg";
import { useEffect, useState } from "react";

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
    if (countries) setLevelData(shuffledArray(countries).slice(n, n + 10));
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
  console.log(responses);
  const rightAnsw = () => {
    setLevel((prevLevel) => {
      return {
        ...prevLevel,
        done: true,
        right: true,
      };
    });
    setResponses((res) => [...res, true]);
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
  };
  return (
    <div
      className="bg-cover bg-center h-screen w-screen"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="grid grid-cols-3 gap-8">
        {levelData.map((e, key) => {
          return (
            <button
              key={key}
              onClick={() => {
                generateLevel(e, key);
              }}
              disabled={level ? level.key === key : false}
              // add array of keys are kliked and done if key is cliked and done it will be disabled
            >
              <p className="text-xl w-8 h-8 bg-gray-500">{key + 1}</p>
            </button>
          );
        })}
        <div className="bg-red-300">
          {level ? (
            level.question.capital ? (
              <p>Which country is {level.question.capital} the capital ?</p>
            ) : (
              <div className="flex items-center gap-4">
                Which country dose this flag
                <img className="w-14 h-7 rounded-md" src={level.question.flag} />
                belong to ?
              </div>
            )
          ) : null}
        </div>
        {level
          ? level.choices.map((e, key) => {
              return (
                <button
                  disabled={level.done || level.key === key}
                  onClick={() => {
                    e.name.common === level.res.name.common ? rightAnsw() : wrongAnsw();
                  }}
                  key={key}
                >
                  {e.name.common}
                </button>
              );
            })
          : null}
        <button
          className="w-14 h-8 bg-gray-600"
          onClick={() => {
            newGame();
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Thirteen;
