import { useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";

type TDate = dayjs.ConfigType;

interface Options {
  leftTime?: number;
  targetDate?: TDate;
  interval?: number; // 倒计时变化的时间间隔
  onEnd?: () => void; // 倒计时结束的回调
}

// 格式化后的结果
interface FormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const parseMs = (milliSeconds: number): FormattedRes => {
  return {
    days: Math.floor(milliSeconds / 86400000),
    hours: Math.floor(milliSeconds / 3600000) % 24,
    minutes: Math.floor(milliSeconds / 60000) % 60,
    seconds: Math.floor(milliSeconds / 1000) % 60,
    milliseconds: Math.floor(milliSeconds) % 1000,
  };
};

const calcLeft = (target?: TDate) => {
  if (!target) return 0;

  const left = dayjs(target).valueOf() - Date.now();

  return left < 0 ? 0 : left;
};

const useCountDown = (
  options: Options = {}
): readonly [number, FormattedRes] => {
  const { leftTime, targetDate, interval = 1000, onEnd } = options || {};

  // useMemo缓存leftTime的计算结果
  const memoLeftTime = useMemo<TDate>(() => {
    // 如果leftTime存在，用当前时间加上剩余时间得到目标时间
    return leftTime && leftTime > 0 ? Date.now() + leftTime : undefined;
  }, [leftTime]);

  // 得出目标时间
  const target = "leftTime" in options ? memoLeftTime : targetDate;
  const [timeLeft, setTimeLeft] = useState(() => calcLeft(target));

  // 避免闭包陷阱
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  useEffect(() => {
    if (!target) {
      setTimeLeft(0);
      return;
    }

    setTimeLeft(calcLeft(target));
    const timer = setInterval(() => {
      const targetLeft = calcLeft(target);
      setTimeLeft(targetLeft);
      if (targetLeft === 0) {
        clearInterval(timer);
        onEndRef.current?.();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [target, interval]);

  // 格式化后的结果
  const formattedRes = useMemo(() => parseMs(timeLeft), [timeLeft]);

  return [timeLeft, formattedRes] as const;
};

export default useCountDown;
