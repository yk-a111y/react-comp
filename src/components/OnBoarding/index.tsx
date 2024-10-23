import { CSSProperties, FC, useEffect, useState } from "react";
import { TooltipPlacement } from "antd/es/tooltip";
import { Button, Popover } from "antd";
import { Mask } from "./components/Mask";
import { createPortal } from "react-dom";
import "./index.less";

interface OnBoadringStepConfig {
  selector: () => HTMLElement | null;
  placement: TooltipPlacement;
  renderContent?: (currentStep: number) => React.ReactNode;
  beforeForward?: (currentStep: number) => void; // 上一步回调
  beforeBack?: (currentStep: number) => void; // 下一步回调
}

interface OnBoardingProps {
  step?: number;
  steps: OnBoadringStepConfig[];
  getContainer?: () => HTMLElement;
  onStepsEnd?: () => void; // 全部完成后的回调
}

const OnBoarding: FC<OnBoardingProps> = (props) => {
  const { step = 0, steps, onStepsEnd, getContainer } = props;
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [done, setDone] = useState<boolean>(false); // 引导是否结束

  // 当前选择的元素
  const currentSelectedElement = steps[currentStep]?.selector();
  // 当前容器元素（默认为html标签）
  const currentSelectedContainer = getContainer?.() || document.documentElement;

  const getCurrentStep = () => steps[currentStep];

  const back = async () => {
    if (currentStep === 0) return;

    const { beforeBack } = getCurrentStep();
    await beforeBack?.(currentStep);
    setCurrentStep(currentStep - 1);
  };

  const forward = async () => {
    if (currentStep === steps.length - 1) {
      await onStepsEnd?.();
      setDone(true);
      return;
    }

    const { beforeForward } = getCurrentStep();
    await beforeForward?.(currentStep);
    setCurrentStep(currentStep + 1);
  };

  useEffect(() => {
    setCurrentStep(step!);
  }, [step]);

  const renderPopover = (wrapper: React.ReactNode) => {
    const config = getCurrentStep();
    if (!config) return wrapper;

    const { renderContent } = config;
    const content = renderContent ? renderContent(currentStep) : null;

    const operation = (
      <div className="onboarding-operation">
        {currentStep !== 0 && (
          <Button className="back" onClick={back}>
            上一步
          </Button>
        )}
        <Button className="forward" onClick={forward}>
          {currentStep === steps.length - 1 ? "我知道了" : "下一步"}
        </Button>
      </div>
    );

    return (
      <Popover
        content={
          <div>
            {content}
            {operation}
          </div>
        }
        open={true}
        placement={getCurrentStep?.().placement}
      >
        {wrapper}
      </Popover>
    );
  };

  const [, setRenderTick] = useState<number>(0);

  // 给元素加上引导，需要元素渲染完才可以，故在此触发重新渲染
  useEffect(() => {
    setRenderTick(1);
  }, []);

  if (!currentSelectedElement || done) {
    return null;
  }

  const mask = (
    <Mask
      element={currentSelectedElement}
      container={currentSelectedContainer}
      renderMaskContent={(wrapper) => renderPopover(wrapper)}
    ></Mask>
  );

  return createPortal(mask, currentSelectedContainer);
};

export default OnBoarding;
