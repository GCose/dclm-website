import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-off-white/95 px-4 pt-30 md:pt-52 pb-15">
      <div className="w-full">
        <div className="flex flex-col gap-10 md:gap-5 md:flex-row items-center mb-12">
          <div className="relative w-62 h-62 md:w-70 md:h-70 lg:w-100 lg:h-100">
            <Image
              fill
              alt="DCLM Logo"
              src="/images/logo.png"
              className="object-contain"
            />
          </div>

          <h2 className="text-[clamp(2rem,9vw,10rem)] font-semibold leading-none tracking-tight text-right">
            DCLM BRIKAMA REGION
          </h2>
        </div>

        <div className="w-full h-px bg-burgundy/30 mt-18 mb-8"></div>

        <div className="flex items-center justify-between text-sm md:text-base">
          <p className="text-black/60">
            © {currentYear} Deeper Christian Life Ministry - Brikama. All rights
            reserved.
          </p>

          <Link
            href="https://dclm.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/60 hover:text-black uppercase tracking-widest transition-colors duration-300"
          >
            DCLM Global →
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
