import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navigation() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 50);

      if (currentScrollY < lastScrollY) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isActive = (path: string) => router.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? "bg-off-white/95 backdrop-blur-xl py-2"
          : "bg-transparent py-2"
      } ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="group">
          <div className="relative h-15 w-15">
            <Image
              fill
              alt="DCLM Brikama Logo"
              src="/images/logo.png"
              className="object-contain hover:opacity-80 transition-opacity duration-300"
            />
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`text-base font-bold uppercase tracking-widest transition-colors duration-300 ${
              isActive("/")
                ? "text-burgundy font-semibold"
                : "hover:text-burgundy"
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`text-base font-bold uppercase tracking-widest transition-colors duration-300 ${
              isActive("/about")
                ? "text-burgundy font-semibold"
                : "hover:text-burgundy"
            }`}
          >
            About
          </Link>
          <Link
            href="/programs"
            className={`text-base font-bold uppercase tracking-widest transition-colors duration-300 ${
              isActive("/programs")
                ? "text-burgundy font-semibold"
                : "hover:text-burgundy"
            }`}
          >
            Programs
          </Link>
          <Link
            href="/contact"
            className={`text-base font-bold uppercase tracking-widest transition-colors duration-300 ${
              isActive("/contact")
                ? "text-burgundy font-semibold"
                : "hover:text-burgundy"
            }`}
          >
            Contact
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-sm uppercase tracking-widest hover:text-burgundy transition-colors duration-300"
          aria-label="Toggle menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-off-white border-t border-warm-gray">
          <div className="flex flex-col p-8 space-y-6">
            <Link
              href="/"
              className={`text-sm uppercase tracking-widest transition-colors duration-300 ${
                isActive("/")
                  ? "text-burgundy font-semibold"
                  : "hover:text-burgundy"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-sm uppercase tracking-widest transition-colors duration-300 ${
                isActive("/about")
                  ? "text-burgundy font-semibold"
                  : "hover:text-burgundy"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/programs"
              className={`text-sm uppercase tracking-widest transition-colors duration-300 ${
                isActive("/events")
                  ? "text-burgundy font-semibold"
                  : "hover:text-burgundy"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Programs
            </Link>
            <Link
              href="/contact"
              className={`text-sm uppercase tracking-widest transition-colors duration-300 ${
                isActive("/contact")
                  ? "text-burgundy font-semibold"
                  : "hover:text-burgundy"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
