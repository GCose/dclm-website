"use client";
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
    id: "kitti",
    name: "KITTI",
    label: "Kitti 2",
    image: "/images/location-3.jpg",
    description:
      "Committed to holiness and authentic worship, building believers who walk in righteousness and truth.",
  },
  {
    id: "katon",
    name: "KATON",
    label: "Kitti 1",
    image: "/images/location-4.jpg",
    description:
      "A gathering place for fervent prayer and fellowship, where faith meets community in transformative ways.",
  },
];

const LocationSection = () => {
  const [activeLocation, setActiveLocation] = useState(locations[0]);

  return (
    <section className="min-h-screen py-32 px-4 bg-cream">
      <div className="mx-auto">
        <div className="grid grid-cols-12 gap-2">
          {/*==================== Left side ====================*/}
          <div className="col-span-12 md:col-span-7 space-y-10 order-2 md:order-1">
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

          {/*==================== Right side ====================*/}
          <div className="col-span-12 md:col-span-5 flex justify-end order-1 md:order-2">
            <div className="space-y-1 text-right">
              <p className="text-sm uppercase tracking-[0.3em] text-black/80 mb-16">
                | ALL LOCATIONS |
              </p>

              {/*==================== Locations stack ====================*/}
              <div className="space-y-20">
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
