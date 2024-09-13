import MountedStateHook from "@/components/Hooks/useMountedStateHook";
import LifeCyclesHook from "@/components/Hooks/useLifeCyclesHook";
import CookieHook from "@/components/Hooks/useCookieHook";
import HoverHook from "@/components/Hooks/useHoverHook";
import ScrollingHook from "@/components/Hooks/useScrollingHook";
import SizeHook from "@/components/Hooks/useSizeHook";
import WhyDidYouUpdate from "@/components/Hooks/useWhyDidYouUpdateHook";
import CountDown from "@/components/Hooks/useCountDownHook";

const HooksApp = () => {
  return <CountDown />;
};

export default HooksApp;
