import { useState, useEffect, useRef } from "react";
import { merge } from "lodash-es";
import { toNumber } from "@/utils";
import { WaterMarkProps } from "..";
import getCanvasData from "./getCanvasData";

const defaultOptions = {
  rotate: -20,
  zIndex: 1,
  width: 100,
  gap: [100, 100],
  fontStyle: {
    fontSize: "16px",
    color: "rgba(0, 0, 0, 0.15)",
    fontFamily: "sans-serif",
    fontWeight: "normal",
  },
  offset: [0, 0],
  getContainer: () => document.body,
};

const getMergedOptions = (o: Partial<WaterMarkOptions>) => {
  const options = o || {};

  const mergedOptions = {
    ...options,
    width: toNumber(
      options.width,
      options.image ? defaultOptions.width : undefined
    ),
    height: toNumber(options.height, undefined),
    rotate: options.rotate || defaultOptions.rotate,
    zIndex: options.zIndex || defaultOptions.zIndex,
    fontStyle: { ...defaultOptions.fontStyle, ...options.fontStyle },
    gap: [
      toNumber(options.gap?.[0], defaultOptions.gap[0]),
      toNumber(options.gap?.[1] || options.gap?.[0], defaultOptions.gap[1]),
    ],
    offset: options.offset || defaultOptions.offset,
    getContainer: options.getContainer!,
  } as Required<WaterMarkOptions>;

  const mergedOffsetX = toNumber(mergedOptions.offset?.[0], 0) as number;
  const mergedOffsetY = toNumber(
    mergedOptions.offset?.[1] || mergedOptions.offset?.[0],
    0
  ) as number;

  mergedOptions.offset = [mergedOffsetX, mergedOffsetY];

  return mergedOptions;
};

export type WaterMarkOptions = Omit<
  WaterMarkProps,
  "className" | "style" | "children"
>;

const useWaterMark = (params: WaterMarkOptions) => {
  const [options, setOptions] = useState(params || {});

  const mergedOptions = getMergedOptions(options);
  // 包裹水印的容器
  const container = mergedOptions.getContainer();
  // 水印的DIV
  const waterMarkDiv = useRef<HTMLDivElement>();
  // 防止水印被删除，创建MutationObserver
  const mutationObserver = useRef<MutationObserver>();

  const { zIndex, gap } = mergedOptions;
  // 创建水印的DOM
  const drawWatermark = () => {
    if (!container) return;

    // Canvas绘制水印
    getCanvasData(mergedOptions).then(({ base64Url, width, height }) => {
      const offsetLeft = mergedOptions.offset[0] + "px";
      const offsetTop = mergedOptions.offset[1] + "px";
      const wmStyle = `
        width:calc(100% - ${offsetLeft})
        height:calc(100% - ${offsetTop});
        position:absolute;
        top:${offsetTop};
        left:${offsetLeft};
        bottom:0;
        right:0;
        pointer-events: none;
        z-index:${zIndex};
        background-position: 0 0;
        background-size:${gap[0] + width}px ${gap[1] + height}px;
        background-repeat: repeat;
        background-image:url(${base64Url})`;

      if (!waterMarkDiv.current) {
        const div = document.createElement("div");
        waterMarkDiv.current = div;
        container.append(div);
        container.style.position = "relative";
      }
      // 为水印DIV添加样式
      waterMarkDiv.current?.setAttribute("style", wmStyle.trim());

      if (container) {
        mutationObserver.current?.disconnect(); // 断开之前的监听

        mutationObserver.current = new MutationObserver((mutations) => {
          const isChanged = mutations.some((record) => {
            let flag = false;
            // 如果水印被删除，则重新绘制
            if (record.removedNodes.length) {
              flag = Array.from(record.removedNodes).some((node) => {
                return node === waterMarkDiv.current;
              });
            }
            // 如果水印样式被更改，则重新绘制
            if (
              record.type === "attributes" &&
              record.target === waterMarkDiv.current
            ) {
              flag = true;
            }

            return flag;
          });

          if (isChanged) {
            waterMarkDiv.current = undefined;
            drawWatermark();
          }
        });

        mutationObserver.current?.observe(container, {
          attributes: true,
          subtree: true,
          childList: true,
        });
      }
    });
  };

  useEffect(() => {
    // options改变时重新绘制水印
    drawWatermark();
  }, [options]);

  return {
    generateWaterMark: (newOptions: Partial<WaterMarkOptions>) => {
      setOptions(merge({}, options, newOptions));
    },
    destory: () => {},
  };
};

export default useWaterMark;
