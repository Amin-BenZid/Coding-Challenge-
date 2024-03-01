import bg from "./img/bgQ.jpg";
import congrats from "./img/congratsQ.svg";
import check from "./img/Check_round_fillQ.svg";
import close from "./img/Close_round_fillQ.svg";
import { useEffect, useState } from "react";

const Thirteen = () => {
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [levelData, setLevelData] = useState([]);
  const [q, setQ] = useState();
  const [pick, setPick] = useState();
  const [keyy, setKey] = useState();

  const shuffledArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  useEffect(() => {
    setCountries(data.map((country) => ({ ...country, res: false })));
  }, [data]);
  const newGame = () => {
    let n = Math.floor(Math.random() * 241);
    if (countries) setLevelData(shuffledArray(countries).slice(n, n + 10));
  };
  //   useEffect(() => {
  //     newGame();
  //   }, [countries]);
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
  const getQ = () => {
    setQ(question);
  };
  const getP = () => {
    setPick(choices);
  };
  const findRight = (data) => {
    let right = pick.filter((e) => e.res === true)[0].name.common;
    if (data === right) alert("winnn");
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
              onClick={() => {
                generateQuestion(e.capital, e.flags.png, e.res);
                generateChoices(e);
                getQ();
                getP();
                setKey(key);
              }}
              key={key}
              disabled={key === keyy}
              className="h-20 w-20 bg-green-400 rounded-full cursor-pointer flex items-center justify-center text-2xl"
            >
              {key + 1}
            </button>
          );
        })}
      </div>
      <div>
        {q ? (
          q.capital ? (
            <p className="text-white">which country is {q.capital} the capital</p>
          ) : (
            <div className="flex text-white items-center gap-4">
              Which country does this flag
              <img className="w-8 h-6 rounded-l" src={q.flag} />
              belong to ?
            </div>
          )
        ) : null}
      </div>
      <div className="flex w-full">
        {pick
          ? pick.map((e, key) => {
              return (
                <button
                  onClick={(e) => findRight(e.target.value)}
                  className="h-20 w-40 bg-yellow-300"
                  key={key}
                  value={e.name.common}
                >
                  {e.name.common}
                </button>
              );
            })
          : null}
      </div>
      <button className="w-14 h-20 bg-red-500" onClick={() => newGame()}>
        aaa
      </button>
    </div>
  );
};

export default Thirteen;
