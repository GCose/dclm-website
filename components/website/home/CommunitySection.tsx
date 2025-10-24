import Image from "next/image";

export default function CommunitySection() {
  return (
    <section className="min-h-screen py-32 px-4 bg-cream">
      <div className="mx-auto">
        <div className="grid grid-cols-12 gap-8">
          {/*==================== Left side ====================*/}
          <div className="col-span-12 md:col-span-7 space-y-10">
            {/*==================== Editorial image ====================*/}
            <div className="relative w-full h-screen">
              <Image
                fill
                className="object-cover"
                src="/images/community-2.jpg"
                alt="DCLM Brikama community in worship"
              />
            </div>
            {/*==================== End of Editorial image ====================*/}

            {/*==================== Text content ====================*/}
            <div className="max-w-6xl ml-auto">
              <p className="font-body text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.1] text-black">
                Our foundation rests on biblical truth—salvation through Christ
                alone, righteous living, fervent prayer, and the Great
                Commission.
              </p>
            </div>
            {/*==================== End of Text content ====================*/}
          </div>
          {/*==================== End of Left side ====================*/}

          {/*==================== Right side ====================*/}
          <div className="col-span-12 md:col-span-5 flex justify-end">
            <p className="text-sm uppercase tracking-[0.3em] text-black/80">
              | Community |
            </p>
          </div>
          {/*==================== End of Right side ====================*/}
        </div>
      </div>
    </section>
  );
}
