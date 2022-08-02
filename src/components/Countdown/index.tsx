import { differenceInSeconds } from "date-fns";
import { useEffect, useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import { CountdownContainer, Separator } from "./styled";

const Countdown = () => {
  const { activeCycle, activeCycleId, finishCycle, secondsActive, setSeconds } =
    useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.duration * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - secondsActive : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference >= totalSeconds) {
          finishCycle();
          setSeconds(totalSeconds);
          clearInterval(interval);
        } else {
          setSeconds(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycleId, finishCycle, setSeconds]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `Iginite timer - ${minutes}:${seconds}`;
    } else {
      document.title = `Ignite timer`;
    }
  }, [activeCycle, minutes, seconds]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
};

export default Countdown;
