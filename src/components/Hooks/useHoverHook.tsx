import useHover from "@/hooks/useHover";
// import { useHover } from "react-use";

const HoverHook = () => {
  const element = (hovered: boolean) => (
    <div onMouseEnter={() => console.log(11)}>
      Hover me! hovered: {hovered ? "Yes" : "No"}
    </div>
  );

  const [hoverableElement, hovered] = useHover(element);

  return (
    <div>
      {hoverableElement}
      <div>{hovered ? "HOVERED" : ""}</div>
    </div>
  );
};

export default HoverHook;
