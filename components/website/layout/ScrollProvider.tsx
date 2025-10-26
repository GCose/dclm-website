import { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

const ScrollProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 3.5,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default ScrollProvider;
