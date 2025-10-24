import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="min-h-screen pt-25 pb-20 px-6 md:px-8 bg-cream">
      <div className="mx-auto">
        <h1 className="text-[clamp(3rem,12vw,8rem)] font-semibold leading-[1.2] tracking-tight mb-10">
          WELCOME TO DCLM
          <br />
          BRIKAMA REGION
        </h1>

        <div className="relative w-full h-screen mb-16">
          <Image
            fill
            priority
            src="/images/hero.jpg"
            className="object-cover"
            alt="DCLM Brikama congregation"
          />
        </div>

        <div className="max-w-4xl ml-auto">
          <p className="text-[clamp(1.2rem,2vw,1.9rem)] leading-[1.7] tracking-wider text-black">
            A vibrant community of believers in Brikama, The Gambia, united in
            faith and fellowship. With a commitment to holiness and spiritual
            growth, we create a space where faith meets life.
          </p>
        </div>
      </div>
    </section>
  );
}
