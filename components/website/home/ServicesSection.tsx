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
          {/*==================== Left side - Empty whitespace ====================*/}
          <div className="hidden md:block md:col-span-2"></div>
          {/*==================== End of Left side ====================*/}

          {/*==================== Right side - Content ====================*/}
          <div className="col-span-12 md:col-span-10">
            {/*==================== Header ====================*/}
            <div className="mb-35">
              <h2 className="text-[clamp(3rem,8vw,8.5rem)] font-semibold leading-[1.1] tracking-tight text-black mb-4">
                OUR MEETING DAYS
              </h2>
            </div>
            {/*==================== End of Header ====================*/}

            {/*==================== Services list ====================*/}
            <div className="space-y-35">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="border-b border-black pb-8 lg:mr-18 flex flex-col items-end"
                >
                  <h3 className="text-[clamp(2rem,5vw,4rem)] font-heading leading-[1.1] tracking-tight text-black mb-2">
                    {service.day}
                  </h3>
                  <p className="font-body text-[clamp(1.25rem,2vw,1.75rem)] text-black/80 mb-2">
                    {service.time}
                  </p>
                  {service.description && (
                    <p className="font-body text-[clamp(1.5rem,4vw,1.9rem)] text-black/60 mt-4">
                      {service.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {/*==================== End of Services list ====================*/}
          </div>
          {/*==================== End of Right side ====================*/}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
