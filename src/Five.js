import bg from "./img/bg.jpg";
import imgOne from "./img/cover-1.png";
import imgTwo from "./img/cover-2.png";
import play from "./img/Play_fill.svg";
import pause from "./img/pause.png";
import prev from "./img/Stop_and_play_fill-1.svg";
import next from "./img/Stop_and_play_fill_reverse.svg";
import { useEffect, useRef, useState } from "react";
import songOne from "./img/forest-lullaby-110624.mp3";
import songTwo from "./img/lost-in-city-lights-145038.mp3";

const Five = () => {
  const style = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const playList = [
    {
      title: "Forest Lullaby",
      url: songOne,
      img: imgTwo,
      artist: "Amin Bz",
      progeess: "0",
    },
    {
      title: "Lost in the City Lights",
      url: songTwo,
      img: imgOne,
      artist: "Cosmo SHeldrake",
      progeess: "0",
    },
  ];
  const [songs, setSongs] = useState(playList);
  const [isPlaying, setIsPLayin] = useState(false);
  const [currentSong, setCurrentSong] = useState(playList[0]);
  const audioElem = useRef();

  useEffect(() => {
    isPlaying ? audioElem.current.play() : audioElem.current.pause();
  }, [isPlaying]);

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setCurrentSong({ ...currentSong, progeess: (ct / duration) * 100, length: duration });
  };

  return (
    <div style={style}>
      <audio src={currentSong.url} ref={audioElem} onTimeUpdate={onPlaying} />
      <AudioPlayer
        songs={songs}
        isPlaying={isPlaying}
        setIsPLayin={setIsPLayin}
        audioElem={audioElem}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />
    </div>
  );
};
const AudioPlayer = ({
  songs,
  isPlaying,
  setIsPLayin,
  audioElem,
  currentSong,
  setCurrentSong,
}) => {
  const clickRef = useRef();
  const playPause = () => {
    setIsPLayin(!isPlaying);
  };
  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divprogress = (offset / width) * 100;
    audioElem.current.currentTime = (divprogress / 100) * currentSong.length;
  };
  const skipBack = () => {
    setIsPLayin(false);
    const index = songs.findIndex((s) => s.title === currentSong.title);
    index == 0
      ? setCurrentSong(songs[songs.length - 1])
      : setCurrentSong(songs[index - 1]);
    audioElem.current.currentTime = 0;
  };

  const nextSong = () => {
    setIsPLayin(false);
    const index = songs.findIndex((s) => s.title === currentSong.title);
    index == songs.length - 1
      ? setCurrentSong(songs[0])
      : setCurrentSong(songs[index + 1]);
    audioElem.current.currentTime = 0;
  };
  var minutes = Math.floor(currentSong.progeess / 60) || 0;
  var seconds = Math.floor(currentSong.progeess % 60) || 0;

  return (
    <div className="bg-[#2A2335] h-[460px] rounded-2xl w-72 flex flex-col items-center pt-4 text-white">
      <img src={currentSong.img} className="w-60 rounded-2xl" />

      <div className="flex flex-col items-center">
        <h1 className="pt-4">{currentSong.title}</h1>
        <p className="text-[10px] text-gray-600 pt-1">{currentSong.artist}</p>
      </div>

      <div className="pt-8 ">
        <div className="flex text-gray-600 text-[11px] w-60 ">
          <p className="w-[50%] ">{minutes + ":" + seconds}</p>
        </div>
        <div
          className="w-full rounded-full h-1 bg-white cursor-pointer"
          onClick={checkWidth}
          ref={clickRef}
        >
          <div
            style={{
              width: `${currentSong.progeess + "%"}`,
              height: "4px",
              backgroundColor: "#C93B77",
            }}
          ></div>
        </div>
      </div>

      <div className="pt-8">
        <div className="h-11 w-11 bg-[#C93B77] flex rounded-full items-center justify-center gap-7 ">
          <img src={prev} onClick={skipBack} className="cursor-pointer " />
          <img
            src={isPlaying ? pause : play}
            className=" cursor-pointer hover:bg-[#924364] h-11 w-11 rounded-full transition-all"
            onClick={playPause}
          />
          <img src={next} className="cursor-pointer " onClick={nextSong} />
        </div>
      </div>
    </div>
  );
};
export default Five;
