import {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  cloneElement,
} from "react";
import useMutationObserver from "../MutationObserver";

interface MutationObserverProps {
  options?: MutationObserverInit;
  onMutate?: (mutations: MutationRecord[], observer: MutationObserver) => void;
  children: React.ReactElement;
}

const MutationObserver: React.FC<MutationObserverProps> = (props) => {
  const { options, onMutate = () => {}, children } = props;

  const elementRef = useRef<HTMLElement | null>(null);
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useMutationObserver(target!, onMutate, options);

  useLayoutEffect(() => {
    setTarget(elementRef.current);
  }, []);

  if (!children) return null;

  return cloneElement(children, { ref: elementRef });
};

function MutationObserverApp() {
  const [className, setClassName] = useState("aaa");

  useEffect(() => {
    setTimeout(() => setClassName("bbb"), 2000);
  }, []);

  const callback = function (mutationsList: MutationRecord[]) {
    console.log("🚀 ~ callback ~ mutationsList:", mutationsList);
  };

  return (
    <div>
      <MutationObserver onMutate={callback}>
        <div id="container">
          <div className={className}>
            {className === "aaa" ? (
              <div>aaa</div>
            ) : (
              <div>
                <p>bbb</p>
              </div>
            )}
          </div>
        </div>
      </MutationObserver>
    </div>
  );
}

export default MutationObserverApp;
