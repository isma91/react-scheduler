import { useEffect, useState } from "react";
import { differenceInMinutes, set } from "date-fns";
import { BORDER_HEIGHT } from "../../helpers/constants";
import { getTimeZonedDate } from "../../helpers/generals";
import { TimeIndicatorBar } from "../../styles/styles";

interface CurrentTimeBarProps {
  startHour: number;
  step: number;
  minuteHeight: number;
  timeZone?: string;
  zIndex?: number;
  currentTime?: Date;
  color?: string;
}

function calculateTop({
  startHour,
  step,
  minuteHeight,
  timeZone,
  currentTime,
}: CurrentTimeBarProps): number {
  const now = currentTime
    ? getTimeZonedDate(currentTime, timeZone)
    : getTimeZonedDate(new Date(), timeZone);

  const minutesFromTop = differenceInMinutes(now, set(now, { hours: startHour, minutes: 0 }));
  const topSpace = minutesFromTop * minuteHeight;
  const slotsFromTop = minutesFromTop / step;
  const borderFactor = slotsFromTop + BORDER_HEIGHT;
  const top = topSpace + borderFactor;

  return top;
}

const CurrentTimeBar = (props: CurrentTimeBarProps) => {
  const [top, setTop] = useState(calculateTop(props));
  const { startHour, step, minuteHeight, timeZone, currentTime, color } = props;

  useEffect(() => {
    const calcProps = { startHour, step, minuteHeight, timeZone, currentTime };
    setTop(calculateTop(calcProps));
    const interval = setInterval(() => setTop(calculateTop(calcProps)), 60 * 1000);
    return () => clearInterval(interval);
  }, [startHour, step, minuteHeight, timeZone, currentTime]);

  // Prevent showing bar on top of days/header
  if (top < 0) return null;

  return (
    <TimeIndicatorBar style={{ top, zIndex: props.zIndex }} color={color}>
      <div />
      <div />
    </TimeIndicatorBar>
  );
};

export default CurrentTimeBar;
