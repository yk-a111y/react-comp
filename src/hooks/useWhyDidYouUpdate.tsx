export type IProps = Record<string, any>;
import { useEffect, useRef } from "react";

const useWhyDidYouUpdate = (componentName: string, props: IProps) => {
  const prevProps = useRef<IProps>({});

  useEffect(() => {
    if (prevProps.current) {
      const allKeys = Object.keys({ ...prevProps.current, ...props });
      const changedProps: IProps = {};

      allKeys.forEach((key) => {
        // 对比key，不相同的话存储在changedProps中
        if (!Object.is(prevProps.current[key], props[key])) {
          changedProps[key] = {
            from: prevProps.current[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changedProps).length) {
        console.log("[why-did-you-update]", componentName, changedProps);
      }

      prevProps.current = props;
    }
  });
};

export default useWhyDidYouUpdate;
