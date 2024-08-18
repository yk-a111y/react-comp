import { useRef, useEffect } from "react";
import Portal from "../Portal";

function PortalApp() {
  const containerRef = useRef(null);

  useEffect(() => {
    console.log(containerRef);
  }, []);
  return (
    <div>
      <Portal attach="#root" ref={containerRef}>
        <button>1</button>
      </Portal>
    </div>
  );
}

export default PortalApp;
