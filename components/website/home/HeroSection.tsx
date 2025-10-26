import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 px-4 bg-cream">
      <div className="mx-auto">
        <h1 className="text-[clamp(3rem,7vw,8.5rem)] [word-spacing:20px] text-black font-semibold leading-[1.2] tracking-tight mb-10">
          WELCOME TO DCLM
          <br />
          BRIKAMA REGION
        </h1>

        <div className="relative w-full h-screen mb-10">
          <Image
            fill
            priority
            src="/images/hero.jpg"
            className="object-cover"
            alt="DCLM Brikama congregation"
          />
        </div>

        <div className="max-w-6xl ml-auto">
          <p className="text-[clamp(1.5rem,4vw,1.9rem)] leading-[1.1] text-black">
            <span className="pl-30">
              A vibrant community of believers in Brikama
            </span>{" "}
            <span>
              united in faith and fellowship. With a commitment to holiness and
              spiritual growth. We prioritize righteous living amongst ourselves
              and ensure total commitment and concescration to GOD.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
