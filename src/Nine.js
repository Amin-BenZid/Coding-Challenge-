import bg from "./img/bg-cafe.jpg";
import star from "./img/Star_fill.svg";
import vector from "./img/vector.svg";
import latte from "./img/Latte.jpg";
import americano from "./img/Americano.jpg";
import mocha from "./img/Mocha.png";
import macchiato from "./img/Macchiato.png";
import caramelFrappuccino from "./img/CaramelFrappuccino.jpg";
import icedCoffee from "./img/IcedCoffee.jpg";
import { useState } from "react";

const Nine = () => {
  const style = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "20%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transition: "all ",
    position: "absolute",
    top: "0",
  };
  const fakeData = [
    {
      title: "Latte",
      price: 4.75,
      rating: 3.5,
      votes: 120.5,
      popular: true,
      url: `${latte}`,
      soldOut: false,
    },
    {
      title: "Americano",
      price: 3.25,
      rating: 4.2,
      votes: 80.2,
      popular: false,
      url: `${americano}`,
      soldOut: false,
    },
    {
      title: "Mocha",
      price: 5.5,
      rating: 4.6,
      votes: 150.8,
      popular: true,
      url: `${mocha}`,
      soldOut: false,
    },
    {
      title: "Macchiato",
      price: 3.4,
      rating: 5,
      votes: 110.3,
      popular: false,
      url: `${macchiato}`,
      soldOut: true,
    },
    {
      title: "Caramel Frappuccino",
      price: 6.2,
      rating: 3,
      votes: 180.1,
      popular: true,
      url: `${caramelFrappuccino}`,
      soldOut: false,
    },
    {
      title: "Iced Coffee",
      price: 4.5,
      rating: 4,
      votes: 95.7,
      popular: false,
      url: `${icedCoffee}`,
      soldOut: false,
    },
  ];
  const [all, setAll] = useState(true);
  const [available, setAvailable] = useState(false);
  const [data, setData] = useState(fakeData);
  const handleFilterClick = (category) => {
    const filtered = data.filter((item) => item.soldOut === false);
    setData(filtered);
  };
  return (
    <div className="relative h-auto min-h-screen ">
      <div style={style}></div>
      <div className="bg-[#121315] h-auto min-h-screen text-white flex items-center justify-center pt-5 ">
        <div className="bg-[#1C1D1F] min-h-[80%] w-[70%] h-auto flex flex-col gap-4 items-center justify-center py-12 px-4 rounded-xl z-0 mt-28 mb-12 relative">
          <img
            className="absolute top-5 right-0 w-40 lg:w-[20%] md:w-[30%] md:right-[20%] lg:right-[30%] z-50"
            src={vector}
          />
          <h1 className="text-2xl font-bold ">Our Collection</h1>
          <p className="text-center text-sm text-gray-400 opacity-45 md:w-[80%] lg:w-[40%]">
            Introducing our Coffee Collection, a selection of unique coffees from
            different roast types and origins, expertly roasted in small batches and
            shipped fresh weekly.
          </p>
          <div className="flex gap-4 items-center pb-1 pt-1">
            <div
              className={
                all
                  ? "text-[10px] bg-[#6E757D] p-2 rounded-md cursor-pointer hover:bg-slate-600 transition-all"
                  : "text-[11px] p-2 rounded-md cursor-pointer hover:bg-slate-200 hover:bg-opacity-15 transition-all"
              }
              onClick={() => {
                setAvailable(false);
                setAll(true);
                setData(fakeData);
              }}
            >
              All Products
            </div>
            <div
              className={
                available
                  ? "text-[10px] bg-[#6E757D] p-2 rounded-md cursor-pointer hover:bg-slate-600 transition-all"
                  : "text-[11px] p-2 rounded-md cursor-pointer hover:bg-slate-200 hover:bg-opacity-15 transition-all"
              }
              onClick={() => {
                setAvailable(true);
                setAll(false);
                handleFilterClick();
              }}
            >
              Available Now
            </div>
          </div>
          <div className="transition-all w-full h-full flex flex-col justify-center items-center md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:justify-between md:p-12">
            {data.map((e, key) => {
              return (
                <Card
                  key={key}
                  title={e.title}
                  price={e.price}
                  rating={e.rating}
                  votes={e.votes}
                  popular={e.popular}
                  url={e.url}
                  soldOut={e.soldOut}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
const Card = ({ title, price, rating, votes, popular, url, soldOut }) => {
  return (
    <div className="h-full w-full flex justify-center items-center flex-col gap-2 pb-14 md:w-auto ">
      <div
        className="bg-cover bg-center h-auto flex  min-h-[130px] w-[90%] rounded-2xl p-2 md:h-[180px]  "
        style={{ backgroundImage: `url(${url})` }}
      >
        {popular ? (
          <div className="bg-[#E8C173] h-6 text-black text-[10px] flex justify-center items-center px-2 rounded-2xl font-bold">
            Popular
          </div>
        ) : null}
      </div>
      <div className="w-full h-10 pl-4 flex md:pl-6 pt-2">
        <div className="flex w-full h-10">
          <p className="w-full h-10 ">{title}</p>
          <div className=" text-right pr-3 h-10 md:pr-5">
            <div className="bg-[#BDE3CC] w-full  text-black font-bold text-[13px] p-1 rounded-md">
              ${price}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pl-3 gap-1 flex md:pl-6 items-center pt-2">
        <img src={star} />
        <p className="w-full ">
          {rating}
          <span className="text-gray-400 text-sm pl-1 ">{`(${votes} votes)`}</span>
        </p>
        {soldOut ? (
          <p className="text-[11px] text-red-300 text-right w-full pr-4 ">Sold out</p>
        ) : null}
      </div>
    </div>
  );
};

export default Nine;
