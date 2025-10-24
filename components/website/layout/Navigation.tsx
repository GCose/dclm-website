import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-off-white/95 backdrop-blur-xl py-8 shadow-sm"
          : "bg-transparent py-10"
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 flex justify-between items-center">
        <Link href="/" className="group">
          <h2 className="text-xl md:text-2xl font-light tracking-tight hover:text-terracotta transition-colors duration-300">
            DCLM
          </h2>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link
            href="/about"
            className="text-sm uppercase tracking-widest hover:text-terracotta transition-colors duration-300"
          >
            About
          </Link>
          <Link
            href="/events"
            className="text-sm uppercase tracking-widest hover:text-terracotta transition-colors duration-300"
          >
            Events
          </Link>
          <Link
            href="/ministries"
            className="text-sm uppercase tracking-widest hover:text-terracotta transition-colors duration-300"
          >
            Ministries
          </Link>
          <Link
            href="/sermons"
            className="text-sm uppercase tracking-widest hover:text-terracotta transition-colors duration-300"
          >
            Sermons
          </Link>
          <Link
            href="/contact"
            className="text-sm uppercase tracking-widest hover:text-terracotta transition-colors duration-300"
          >
            Contact
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-sm uppercase tracking-widest hover:text-terracotta transition-colors duration-300"
          aria-label="Toggle menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-off-white border-t border-warm-gray">
          <div className="flex flex-col p-8 space-y-6">
            <Link
              href="/about"
              className="text-sm uppercase tracking-widest hover:text-terracotta transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/events"
              className="text-sm uppercase tracking-widest hover:text-terracotta transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/ministries"
              className="text-sm uppercase tracking-widest hover:text-terracotta transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Ministries
            </Link>
            <Link
              href="/sermons"
              className="text-sm uppercase tracking-widest hover:text-terracotta transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Sermons
            </Link>
            <Link
              href="/contact"
              className="text-sm uppercase tracking-widest hover:text-terracotta transition-colors duration-300"
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
