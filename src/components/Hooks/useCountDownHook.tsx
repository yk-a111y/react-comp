// import { useCountDown } from "ahooks";
import useCountDown from "@/hooks/useCountDown";

const CountDown = () => {
  const [countdown, formattedRes] = useCountDown({
    // targetDate: `${new Date().getFullYear()}-12-31 23:59:59`,
    leftTime: 5000,
    onEnd: () => {
      console.log("end");
    },
  });

  const { days, hours, minutes, seconds, milliseconds } = formattedRes;

  return (
    <p>
      还剩 {days} 天 {hours} 小时 {minutes} 分钟 {seconds} 秒 {milliseconds}{" "}
      毫秒
    </p>
  );
};

export default CountDown;
