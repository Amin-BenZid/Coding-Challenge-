import google from "./img/google-testimonial.png";
import starsG from "./img/starsG.PNG";
import meta from "./img/meta-testimonial.png";
import starsM from "./img/starsM.PNG";
import star from "./img/Star_fill.svg";
import check from "./img/Done_ring_round_fill.svg";

const Three = () => {
  return (
    <div className="bg-[#FAFAF9] w-screen h-screen lg:flex">
      <div className=" p-12 h-auto w-auto max-w-[50vw] max-h-[70vh] ">
        <div className="h-10 w-10 bg-gray-200 items-center justify-center content-center flex rounded-full ">
          <img src={star} />
        </div>
        <h1 className="font-bold text-2xl pt-4">Reviewers</h1>
        <p className="text-gray-500 pt-4 w-52">
          Reviewers is where people can access guidelines, checklists, and other tools to
          assist them in reviewing papers or manuscripts. It provides a structured
          approach to ensure that the review process is thorough, efficient, and
          consistent.
        </p>
        <div className="pt-8 w-52">
          <Check text={"Checklist to Review an Academic Paper"} />
          <Check text={"Peer Review Cheklist"} />
          <Check text={"Checklist for Editors,Reviewers,and Authors of SPIE Journals"} />
        </div>
      </div>
      <div className="pt-12">
        <div className="lg:pl-80 lg:pb-10 md:pl-80 md:pb-10 sm:pl-40 sm:mt-4 sm:mb-10 ">
          <CardOne />
        </div>
        <div className="lg:pl-[80px] sm:pl-0 md:pl-0 ">
          <CardTwo />
        </div>
      </div>
    </div>
  );
};
const Check = ({ text }) => {
  return (
    <div className="flex w-full items-center pb-4 gap-2">
      <img src={check} className="" />
      <p1 className="text-gray-500 text-[13px]">{text}</p1>
    </div>
  );
};
const CardOne = () => {
  return (
    <div className=" bg-white w-[300px] shadow-lg rounded-lg h-32 p-5">
      <div className="flex gap-4 w-[400px] pb-2">
        <img src={google} className="w-20" />
        <img src={starsG} className="w-24 h-5 mt-1" />
      </div>
      <h1 className="text-[14px] pb-1">Samantha Lee</h1>
      <p className="text-[10px] text-gray-500">
        The checkllist ensures that the review process is thorough
      </p>
    </div>
  );
};
const CardTwo = () => {
  return (
    <div className=" bg-white w-[300px] shadow-lg rounded-lg h-32 p-5">
      <div className="flex gap-4 w-[400px] pb-2">
        <img src={meta} className="w-20" />
        <img src={starsM} className="w-24 h-4 mt-2" />
      </div>
      <h1 className="text-[14px] pb-1">Rachel Patel</h1>
      <p className="text-[10px] text-gray-500">
        I highly recommend the <br /> writecream Business Description
      </p>
    </div>
  );
};

export default Three;
