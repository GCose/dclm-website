import Image from "next/image";
import { useState } from "react";

const locations = [
  {
    id: "santosu",
    name: "SANTOSU (HQ)",
    label: "HeadQuarters Location",
    image: "/images/location-1.jpg",
    description:
      "Our foundation rests on biblical truth—salvation through Christ alone, righteous living, fervent prayer, and the Great Commission.",
  },
  {
    id: "college",
    name: "COLLEGE",
    label: "Mbali junction",
    image: "/images/location-2.jpg",
    description:
      "A thriving community dedicated to discipleship and spiritual growth through systematic study of God's Word.",
  },
  {
    id: "medina",
    name: "MEDINA",
    label: "Medina Road",
    image: "/images/location-1.jpg",
    description:
      "Our foundation rests on biblical truth—salvation through Christ alone, righteous living, fervent prayer, and the Great Commission.",
  },
  {
    id: "kartong",
    name: "KARTONG",
    label: "Kitti 1",
    image: "/images/location-4.jpg",
    description:
      "A gathering place for fervent prayer and fellowship, where faith meets community in transformative ways.",
  },
  {
    id: "jalangba",
    name: "JALANGBA",
    label: "Medina Highway",
    image: "/images/location-3.jpg",
    description:
      "Committed to holiness and authentic worship, building believers who walk in righteousness and truth.",
  },
  {
    id: "kasakunda",
    name: "KASAKUNDA",
    label: "Mbali junction",
    image: "/images/location-2.jpg",
    description:
      "A thriving community dedicated to discipleship and spiritual growth through systematic study of God's Word.",
  },
  {
    id: "kabeke",
    name: "KABEKE",
    label: "Kitti 1",
    image: "/images/location-4.jpg",
    description:
      "A gathering place for fervent prayer and fellowship, where faith meets community in transformative ways.",
  },
  {
    id: "kti",
    name: "KITI",
    label: "Kitti 2",
    image: "/images/location-3.jpg",
    description:
      "Committed to holiness and authentic worship, building believers who walk in righteousness and truth.",
  },
];

const LocationSection = () => {
  const [activeLocation, setActiveLocation] = useState(locations[0]);

  return (
    <section className="min-h-screen py-32 px-4 bg-cream">
      <div className="mx-auto">
        <div className="grid grid-cols-12 gap-0">
          {/*==================== Left side - 40% ====================*/}
          <div className="col-span-12 md:col-span-5 space-y-10 order-2 md:order-1">
            {/*==================== Editorial image ====================*/}
            <div className="relative w-full h-screen">
              <Image
                fill
                key={activeLocation.id}
                src={activeLocation.image}
                alt={`DCLM Brikama ${activeLocation.name} location`}
                className="object-cover transition-opacity duration-500"
              />
            </div>
            {/*==================== End of Editorial image ====================*/}

            {/*==================== Text content ====================*/}
            <div className="max-w-6xl ml-auto">
              <p className="font-body text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.1] text-black">
                {activeLocation.description}
              </p>
            </div>
            {/*==================== End of Text content ====================*/}
          </div>
          {/*==================== End of Left side ====================*/}

          {/*==================== Middle column with vertical stacked text ====================*/}
          <div className="hidden md:flex md:col-span-2 order-2 items-start justify-center">
            <div className="flex flex-col items-center">
              {"LOCATIONS".split("").map((letter, index) => (
                <span
                  key={index}
                  className="text-[clamp(3rem,12vw,8.5rem)] font-bold text-black tracking-tight leading-[1.1]"
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
          {/*==================== End of Middle column ====================*/}

          {/*==================== Right side - 50% ====================*/}
          <div className="col-span-12 md:col-span-5 flex md:justify-end order-1 md:order-3">
            <div className="space-y-1 text-right">
              {/*==================== Locations stack ====================*/}
              <div className="space-y-17">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    onMouseEnter={() => setActiveLocation(location)}
                    className={`text-right w-full transition-all cursor-pointer duration-300 ${
                      activeLocation.id === location.id
                        ? "text-burgundy"
                        : "text-black/60 hover:text-black"
                    }`}
                  >
                    <h3 className="text-[clamp(2rem,5vw,4.5rem)] font-heading leading-[1.1] tracking-tight">
                      {location.name}
                    </h3>
                    <p className="text-sm uppercase tracking-[0.2em] mt-1 border-b">
                      {location.label}
                    </p>
                  </button>
                ))}
              </div>
              {/*==================== End of Locations stack ====================*/}
            </div>
          </div>
          {/*==================== End of Right side ====================*/}
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
