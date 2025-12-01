import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navigation() {
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
              src="/images/favicon.png"
              className="object-contain hover:opacity-80 transition-opacity duration-300"
            />
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-base uppercase tracking-widest hover:text-burgundy transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-base uppercase tracking-widest hover:text-burgundy transition-colors duration-300"
          >
            About
          </Link>
          <Link
            href="/events"
            className="text-base uppercase tracking-widest hover:text-burgundy transition-colors duration-300"
          >
            Events
          </Link>
          <Link
            href="/contact"
            className="text-base uppercase tracking-widest hover:text-burgundy transition-colors duration-300"
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
              href="/home"
              className="text-sm uppercase tracking-widest hover:text-burgundy transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm uppercase tracking-widest hover:text-burgundy transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/events"
              className="text-sm uppercase tracking-widest hover:text-burgundy transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/contact"
              className="text-sm uppercase tracking-widest hover:text-burgundy transition-colors duration-300"
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
