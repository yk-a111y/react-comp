import { useEffect, useRef } from "react";

export interface UseTimerProps {
  id: number;
  duration?: number;
  remove: (id: number) => void;
}

const useTimer = (props: UseTimerProps) => {
  const { remove, id, duration = 2000 } = props;

  const timer = useRef<number | null>(null);

  useEffect(() => {
    // 开始定时器
    startTimer();

    return () => removeTimer();
  }, []);

  const startTimer = () => {
    timer.current = window.setTimeout(() => {
      // 删除指定id的Message
      remove(id);
      removeTimer();
    }, duration);
  };

  const removeTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  return {
    onMouseEnter: () => removeTimer(),
    onMouseLeave: () => startTimer(),
  };
};

export default useTimer;
