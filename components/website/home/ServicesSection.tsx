import Image from "next/image";

const ServicesSection = () => {
  const services = [
    {
      id: "sunday",
      day: "SUNDAY WORSHIP SERVICE",
      time: "8:30 AM GMT",
      description:
        "A time of spiritual nourishment and worship with the body of Christ.",
    },
    {
      id: "monday",
      day: "MONDAY BIBLE STUDY",
      time: "5:00 PM GMT",
      description:
        "A time for systematic and expository study of the word of God.",
    },
    {
      id: "thursday",
      day: "THURSDAY REVIVAL HOUR",
      time: "6:00 PM GMT",
      description: "A time of teaching, healing and deliverance.",
    },
    {
      id: "powernight",
      day: "POWER NIGHT",
      time: "6:00 PM GMT",
      description: "3rd Thursdays of every month.",
    },
  ];

  return (
    <section className="min-h-screen py-32 px-4 bg-cream">
      <div className="mx-auto">
        <div className="grid grid-cols-12 gap-0">
          <div className="col-span-12 md:col-span-6">
            <div className="mb-20 md:mb-85">
              <h2 className="text-[clamp(3rem,5vw,8.5rem)] font-semibold leading-[1.1] tracking-tight text-black mb-4">
                OUR MEETING DAYS
              </h2>
            </div>

            <div className="md:hidden relative w-full h-[60vh] mb-12">
              <Image
                fill
                className="object-cover"
                src="/images/home/services.jpg"
                alt="DCLM Brikama worship service"
              />
            </div>

            <div className="space-y-20 md:space-y-85">
              {services.map((service) => (
                <div key={service.id} className="pb-8 border-b">
                  <h3 className="text-[clamp(1.5rem,5vw,2.5rem)] font-heading leading-[1.1] tracking-tight text-black mb-2">
                    {service.day}
                  </h3>
                  <p className="font-body text-[clamp(1.25rem,2vw,1.75rem)] text-black/80 mb-2">
                    {service.time}
                  </p>
                  {service.description && (
                    <p className="font-body text-[clamp(1.2rem,4vw,1.5rem)] text-black/60 mt-4">
                      {service.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block md:col-span-2"></div>

          <div className="hidden md:block md:col-span-4">
            <div className="sticky top-0 h-screen">
              <div className="relative w-full h-screen">
                <Image
                  fill
                  className="object-cover"
                  src="/images/services.jpg"
                  alt="DCLM Brikama worship service"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
