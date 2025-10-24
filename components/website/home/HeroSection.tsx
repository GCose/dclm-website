import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="min-h-screen pb-20 px-6 md:px-12 lg:px-16 bg-cream">
      <div className="mx-auto">
        <h1 className="text-[clamp(4rem,12vw,8rem)] font-semibold leading-[1.2] tracking-tight mb-16 md:mb-24">
          DEEPER CHRISTIAN <br /> LIFE MINISTRY
        </h1>

        <div className="relative w-full p-4 h-[70vh] md:h-[80vh] mb-16">
          <Image
            fill
            priority
            className="object-cover"
            src="/images/worship.jpg"
            alt="DCLM Brikama congregation"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="space-y-2">
            <p className="text-gold uppercase tracking-[0.2em] text-sm font-medium">
              Brikama, The Gambia
            </p>
            <p className="text-text-gray text-lg">Sundays at 9:00 AM</p>
          </div>

          <button className="group bg-terracotta text-white px-8 py-4 rounded-full font-medium tracking-wide hover:scale-[1.02] transition-all duration-300">
            <span className="flex items-center gap-2">
              Join Us This Sunday
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
