import bg from "./img/bg-illustration.svg";
import logo from "./img/logo-qr-generator.svg";
import { MdDownload } from "react-icons/md";
import { MdOutlineLink } from "react-icons/md";
import { useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Seven = () => {
  const [val, setVal] = useState("");

  const [generated, setGenerated] = useState(false);
  return (
    <div className="bg-[#111629] h-screen w-screen relative ">
      <img
        src={bg}
        className="absolute right-0 top-40 sm:right-0 sm:top-40 lg:right-0 lg:top-20 md:right-0 md:top-80 transition-all"
      />
      {generated ? (
        <SecondPage val={val} />
      ) : (
        <FirstPage setGenerated={setGenerated} setVal={setVal} val={val} />
      )}
    </div>
  );
};

const FirstPage = ({ setGenerated, setVal, val }) => {
  const generate = () => {
    val === "" ? toast("Give URL Please") : setGenerated(true);
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      <img src={logo} className="w-48" />
      <div className="relative w-[90%] md:w-[40%] transition-all">
        <ToastContainer />
        <input
          className="bg-[#030617] border-[3px] border-[#355FDA] w-full h-16  rounded-2xl pl-9 placeholder-gray-700 text-white"
          placeholder="Enter an url"
          onChange={(e) => setVal(e.target.value)}
        />

        <button
          onClick={generate}
          type="button"
          className="absolute inset-y-0 right-0 px-2 text-white bg-[#355FDA] m-2 rounded-2xl lg:w-[20%] sm:w-[35%]"
        >
          QR code
        </button>
      </div>
    </div>
  );
};

const SecondPage = ({ val }) => {
  const downloadCode = () => {
    const canvas = document.getElementById("here");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `qr.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };
  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(val);
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <div className="py-12 px-24 flex flex-col">
      <ToastContainer />
      <img src={logo} className="w-36" />
      <div className=" flex items-center justify-center h-[81vh] flex-col">
        <div className="w-64 h-64 bg-[#1E2C51] rounded-full flex justify-center items-center ">
          <div className="w-52 h-52 rounded-2xl bg-white flex justify-center items-center">
            <div className="">
              <QRCode id="here" value={val} size={160} qrStyle="dots" eyeRadius={10} />
            </div>
          </div>
        </div>
        <div className="flex gap-8 pt-14 text-white text-[13px] ">
          <button
            onClick={() => downloadCode()}
            className="absolute  h-12 bg-[#3762E4] rounded-xl flex justify-center items-center gap-2 cursor-pointer hover:bg-[#26304f] md:left-0 transition-all left-10 w-32 lg:left-[40%] lg:w-40 sm:left-[37%]"
          >
            Download
            <MdDownload size={20} />
          </button>

          <button
            onClick={() => {
              copyContent();
              toast("Link Copied");
            }}
            className="absolute cursor-pointer  h-12 bg-[#3762E4] rounded-xl flex justify-center items-center gap-2 hover:bg-[#26304f] transition-all w-28 right-14 lg:right-[40%] lg:w-32 sm:right-[36%] "
          >
            Share
            <MdOutlineLink size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Seven;
