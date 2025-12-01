import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const logoRef = useRef(null);
  const screenRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pulsate logo - scale only: 1 → 1.1 → 1
      gsap.to(logoRef.current, {
        scale: 1.1,
        duration: 0.5,
        repeat: 1,
        yoyo: true,
        ease: "power2.inOut",
      });

      // Fade out screen after 1s
      gsap.to(screenRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 1,
        onComplete: () => {
          setTimeout(onComplete, 50);
        },
      });
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-100 bg-cream flex items-center justify-center"
    >
      <div ref={logoRef} className="relative w-52 h-52">
        <Image
          fill
          alt="DCLM Logo"
          src="/images/favicon.png"
          className="object-contain"
        />
      </div>
    </div>
  );
}
