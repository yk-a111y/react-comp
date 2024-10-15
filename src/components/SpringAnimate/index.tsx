import { useSpringValue, animated, useSpring } from "@react-spring/web";
import { useEffect } from "react";
import "./index.less";

const SpringAnimate = () => {
  // *1. 单个属性变化使用useSpringValue
  const width = useSpringValue(0, {
    config: {
      // duration: 2000,
      mass: 10, // 质量 -- 回弹的次数和距离
      tension: 200, // 张力 -- 松紧程度，弹簧越紧，回弹越快
      friction: 10, // 摩擦力，用于抵消tension和mass
    },
  });

  // *2. 多个属性变化用useSpring
  // const styles = useSpring({
  //   from: {
  //     width: 0,
  //     height: 0,
  //   },
  //   to: {
  //     width: 200,
  //     height: 200,
  //   },
  //   config: {
  //     // duration: 2000,
  //     mass: 10,
  //     tension: 200,
  //   },
  // });

  // *3. 多个属性变化也可以使用API的形式
  const [styles, api] = useSpring(() => {
    return {
      from: {
        width: 100,
        height: 100,
      },
      config: {
        // duration: 2000
        mass: 2,
        friction: 10,
        tension: 400,
      },
    };
  });

  useEffect(() => {
    width.start(300);
  }, []);

  const handleClick = () => {
    api.start({
      width: 200,
      height: 200,
    });
  };

  return (
    <animated.div
      className="box"
      style={{ ...styles }}
      onClick={handleClick}
    ></animated.div>
  );
};

export default SpringAnimate;
