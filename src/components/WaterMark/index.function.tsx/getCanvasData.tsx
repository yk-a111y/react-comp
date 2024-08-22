import { toNumber } from "@/utils";
import { WaterMarkOptions } from "./useWaterMark";
import measureTextSize from "./measureTextSize";

const getCanvasData = async (
  options: Required<WaterMarkOptions>
): Promise<{
  base64Url: string;
  width: number;
  height: number;
}> => {
  const { rotate, image, content, fontStyle, gap } = options;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  const ratio = window.devicePixelRatio;

  const configCanvas = (size: { width: number; height: number }) => {
    const canvasWidth = gap[0] + size.width;
    const canvasHeight = gap[1] + size.height;

    canvas.setAttribute("width", `${canvasWidth * ratio}px`);
    canvas.setAttribute("height", `${canvasHeight * ratio}px`);
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    ctx.translate((canvasWidth * ratio) / 2, (canvasHeight * ratio) / 2);
    ctx.scale(ratio, ratio);

    const RotateAngle = (rotate * Math.PI) / 180;
    ctx.rotate(RotateAngle);
  };

  const drawText = () => {
    const { fontSize, color, fontWeight, fontFamily } = fontStyle;
    const realFontSize = toNumber(fontSize, 0) || fontSize;

    ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`;
    const measureSize = measureTextSize(
      ctx,
      [...(content as Array<string>)],
      rotate
    );

    const width = options.width || measureSize.width;
    const height = options.height || measureSize.height;

    configCanvas({ width, height });

    ctx.fillStyle = color!;
    ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`;
    ctx.textBaseline = "top";

    [...(content as Array<string>)].forEach((item, index) => {
      const { height: lineHeight, width: lineWidth } =
        measureSize.lineSize[index];

      const xStartPoint = -lineWidth / 2;
      const yStartPoint =
        -(options.height || measureSize.originHeight) / 2 + lineHeight * index;

      ctx.fillText(
        item,
        xStartPoint,
        yStartPoint,
        options.width || measureSize.originWidth
      );
    });

    return Promise.resolve({ base64Url: canvas.toDataURL(), height, width });
  };

  const drawImage = () => {
    return new Promise<{
      base64Url: string;
      width: number;
      height: number;
    }>((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.referrerPolicy = "no-referrer";

      img.src = image!;
      img.onload = () => {
        let { width, height } = options;
        if (!width || !height) {
          if (width) {
            height = (img.height / img.width) * +width;
          } else {
            width = (img.width / img.height) * +height;
          }
        }
        configCanvas({ width, height });

        ctx.drawImage(img, -width / 2, -height / 2, width, height);
        return resolve({ base64Url: canvas.toDataURL(), width, height });
      };
      // 图片解析错误时，绘制文字水印
      img.onerror = () => {
        drawText();
      };
    });
  };

  return image ? drawImage() : drawText();
};

export default getCanvasData;
