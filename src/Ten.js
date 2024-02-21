import axios from "axios";
import star from "./img/Star.svg";
import nesting from "./img/Nesting.svg";
import search from "./img/Search.svg";
import bg from "./img/hero-image-github-profile.png";
import { useEffect, useState } from "react";

const Ten = () => {
  const [test, setTest] = useState(true);
  const [now, setNow] = useState(false);
  const [data, setData] = useState({
    avatar: "https://avatars.githubusercontent.com/u/54577480?v=4",
    followers: 0,
    following: 0,
    private: false,
    visibility: "public",
  });
  const [repos, setRepos] = useState([]);
  const [showenRepos, setShowenRepos] = useState([]);
  const [userName, setuserName] = useState("amin_benzid");
  useEffect(() => {
    Search(userName);
    setTest(true);
  }, [now]);
  const Search = (userName) => {
    axios
      .get(`https://api.github.com/search/repositories?q=${userName}`, {
        headers: {
          Authorization:
            "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",
        },
      })
      .then((response) => {
        let obj = {
          avatar: response.data.items[0].owner.avatar_url,
          private: response.data.items[0].owner.site_admin,
          followers: Math.floor(Math.random() * 100),
          following: Math.floor(Math.random() * 100),
          visibility: response.data.items[0].owner.type,
        };
        setData(obj);
        axios
          .get(response.data.items[0].owner.repos_url)
          .then((res) => {
            setRepos(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };
  useEffect(() => {
    test ? setShowenRepos(repos.slice(repos.length - 4)) : setShowenRepos(repos);
  }, [test]);
  return (
    <div className="bg-[#20293A] min-h-screen h-auto transition-all">
      {/* top sec */}
      <div
        className="bg-cover bg-center h-full min-h-[200px] w-full flex justify-center py-8 px-8 relative md:min-h-[300px]"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* input */}
        <div className="relative w-full flex gap-4 transition-all md:w-[60%]">
          <div
            type="button"
            className="absolute inset-y-0 left-0 h-14 w-14 flex items-center justify-center "
          >
            <img
              onClick={() => {
                setNow(true);
                Search(userName);
              }}
              className="opacity-20 cursor-pointer hover:opacity-75 transition-all"
              src={search}
            />
          </div>
          <input
            onChange={(e) => {
              setuserName(e.target.value);
            }}
            className="h-14 w-full rounded-xl bg-[#20293A] px-4 pl-12 placeholder:opacity-20 text-white"
            placeholder={"username"}
          />
        </div>
        {/* end input */}

        {/* pofile pic */}
        <div className="bg-[#20293A] h-36 w-36 absolute left-7 top-36 rounded-3xl p-2 md:top-60 lg:w-48 lg:h-48 lg:top-56 lg:left-40">
          <img src={data.avatar} className="w-full h-full rounded-2xl" />
        </div>
        {/* end pofile pic */}
      </div>
      {/* end top sec */}
      {/* status */}
      <div className="w-full transition-all">
        <div className="flex flex-col text-white pt-3 gap-3 ml-[45%] md:ml-[20%] md:w-[70%] md:flex-row md:justify-center lg:ml-[30%]">
          <Status data={"Followers"} val={data.followers} />
          <Status data={"Following"} val={data.following} />
          <Status data={" Account "} val={data.visibility} />
        </div>
      </div>
      {/* end status */}
      <div className=" h-auto text-[#CDD5E0] px-8 py-8 lg:px-40 lg:py-16">
        <h1 className="text-3xl">GitHub</h1>
        <p className="text-lg pt-3">How People build software.</p>
        <div className="w-full flex justify-center items-center pt-8 flex-col gap-8 pb-8 md:grid md:grid-cols-2 ">
          {showenRepos.map((e, key) => {
            return (
              <Card
                key={key}
                description={e.description}
                forks_count={e.forks_count}
                stargazers_count={e.stargazers_count}
                name={e.name}
                updated_at={e.updated_at}
              />
            );
          })}
        </div>
        <p
          className="text-gray-500 text-center text-lg cursor-pointer hover:text-gray-700 transition-all"
          onClick={() => {
            setTest(!test);
          }}
        >
          {test ? "View all repositories" : "Show less"}
        </p>
      </div>
    </div>
  );
};
const Status = ({ data, val }) => {
  return (
    <div className="flex">
      <div
        className={`min-h-10 md:h-14  h-auto w-${
          data.length * 4 + val.length
        } bg-[#111629] m-2 p-2 flex items-center justify-center gap-2 rounded-lg `}
      >
        <p className="px-2 text-gray-600 ">{data}</p>
        <div className="h-[90%] p-[1px] bg-slate-500 "></div>
        <p className="px-2 text-[11px] md:text-md">{val}</p>
      </div>
    </div>
  );
};

const Card = ({ description, forks_count, stargazers_count, name, updated_at }) => {
  return (
    <div className="w-full h-40 bg-gradient-to-r from-[#11182A] via-[#161938] to-[#1C1B45] rounded-xl flex flex-col p-4 gap-2 lg:gap-5 lg:p-5">
      <h1 className="text-gray-300 text-lg">{name}</h1>
      <p className="text-gray-500 text-sm">{description}</p>
      <div className="flex w-full text-gray-500 pt-2 items-center gap-4">
        <div className="flex items-center">
          <img src={nesting} />
          <p className="text-[12px]">{forks_count}</p>
        </div>
        <div className="flex items-center">
          <img src={star} />
          <p className="text-[12px]">{stargazers_count}</p>
        </div>
        <p className="text-[12px]">{updated_at}</p>
      </div>
    </div>
  );
};
export default Ten;
