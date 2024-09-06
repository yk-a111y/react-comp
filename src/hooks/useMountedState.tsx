import { useRef, useEffect, useCallback } from "react";

// 判断组件是否挂载
const useMountedState = () => {
  const mountedRef = useRef<boolean>(false);
  // get需要用useCallback 包裹，这样用它作为其它 memo 组件参数的时候，就不会导致额外的渲染
  const get = useCallback(() => mountedRef.current, []);

  // 因为 useEffect 是在 dom 操作之后异步执行的，所以这时候就已经 mount 了
  useEffect(() => {
    // 组件挂载时
    mountedRef.current = true;

    return () => {
      // 组件卸载时
      mountedRef.current = false;
    };
  });

  return get;
};

export default useMountedState;
