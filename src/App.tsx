import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactPlayer from "react-player";
import css from "./App.module.css";
import { useMachine } from "@xstate/react";
import { videoRewardMachine } from "./videoRewardMachine";
import cx from "classnames";

const getButtonText = (state: string) => {
  switch (state) {
    case "VIDEO_PAUSED":
      return "Watch video to get a reward";
    case "VIDEO_STARTED":
      return "Pause";
    case "VIDEO_ENDED":
      return "Get reward!";
    case "REWARD_RECEIVED":
      return "Reward received";
    default:
      return "Error";
  }
};

function App() {
  const handleButtonClick = () => {
    send("BUTTON_CLICK");
  };

  const handleVideoEnd = () => {
    send("END_VIDEO");
  };

  const handleVideoStarted = () => {
    send("START_VIDEO");
  };

  const [current, send] = useMachine(videoRewardMachine);

  console.log(current.value);

  const playing = current.matches("VIDEO_STARTED");

  return (
    <div className="App">
      <div className={css.container}>
        {!current.matches("VIDEO_ENDED") && !current.matches("REWARD_RECEIVED") && (
          <ReactPlayer
            volume={0.1}
            playing={playing}
            onStart={handleVideoStarted}
            onEnded={handleVideoEnd}
            url="https://www.youtube.com/watch?v=FFFMW_e0Thg&ab_channel=RYAN"
          />
        )}
        <button
          className={cx(css.button, {
            [css.getReward]: current.matches("VIDEO_ENDED"),
          })}
          onClick={handleButtonClick}
        >
          {getButtonText(String(current.value))}
        </button>
      </div>
      {current.matches("REWARD_RECEIVED") && (
        <img className={css.reward} src="gift.jpeg" />
      )}
    </div>
  );
}

export default App;
