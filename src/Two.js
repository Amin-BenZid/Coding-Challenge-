import img from "./img/Capture.PNG";
import avatar from "./img/avatar-image-business-card.png";
const Two = () => {
  return (
    <div className=" p-10">
      <div className=" w-auto h-auto max-w-[435px] max-h-[540px] rounded-2xl shadow-2xl ">
        <img src={img} className="rounded-t-2xl" />
        <div className="p-[40px] pb-[30px] pt-[30px]">
          <div>
            <h1 className=" text-2xl">
              Perfect solution for small <br />
              business
            </h1>
          </div>
          <div className="pt-[20px]">
            <p className=" text-sm text-gray-500">
              Small businesses need to generate leads to grow. <br />
              You can use tolls like Ringy.
            </p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-slate-300 "></div>
        <div className="p-[40px] pt-6 flex">
          <div className="h-12 w-12 bg-slate-100 flex items-center justify-center rounded-full ">
            <img src={avatar} className="h-10 rounded-full" />
          </div>
          <div className="pl-4 pt-2">
            <h1 className=" font-bold text-sm">Amy Bugess</h1>
            <p className=" text-[10px] font-bold text-gray-500">
              Customer Manger, Solution Oy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Two;
