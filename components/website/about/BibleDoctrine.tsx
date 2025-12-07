import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const doctrines = [
  {
    id: 1,
    title: "The Holy Bible",
    scripture: "2 Timothy 3:16,17; Proverbs 30:5,6; Revelation 22:18,19",
    content:
      "GOD's word teaches that the Holy Bible, consisting of 39 books of the Old Testament and 27 books of the New Testament, is the inspired Word of God. We take the Bible as final authority in all matters concerning Christian conduct and work.",
  },
  {
    id: 2,
    title: "The Godhead",
    scripture: "Matthew 3:16,17; 2 Corinthians 13:14; Matthew 28:19,20",
    content:
      "GOD's word teaches that the Godhead consists of three separate, distinct, and recognisable personalities and qualities, perfectly united in one. The Father, the Son, and the Holy Ghost are different Persons in the Godhead, not merely three names for one Person.",
  },
  {
    id: 3,
    title: "The Virgin Birth of Jesus",
    scripture: "Isaiah 7:14; Matthew 1:18-25; Romans 1:4; I Corinthians 15:3,4",
    content:
      "The virgin birth of Jesus, the only begotten Son of God as well as His crucifixion, death, burial and bodily resurrection.",
  },
  {
    id: 4,
    title: "Total Depravity, Sinfulness and Guilt of All Men",
    scripture:
      "Psalm 51:5; Job 14:4; Romans 3:23; 5:12-17; Mark 7:21-23; Ephesians 2:1",
    content:
      "The total depravity, sinfulness and guilt of all men since the Fall, rendering them subject to God's wrath and condemnation.",
  },
  {
    id: 5,
    title: "Repentance",
    scripture:
      "Proverbs 28:13; Isaiah 55:7; Ezekiel 18:21-23; Mark 1:15; Luke 24:46,47",
    content:
      "GOD's word teaches that Repentance is a complete turning away from all sins and its deceitful pleasures and that it is required from every sinner before he can truly and effectively believe in Jesus with saving faith.",
  },
  {
    id: 6,
    title: "Restitution",
    scripture: "Exodus 22:1-7; Leviticus 6:1-7; Luke 19:8,9",
    content:
      "GOD's word teaches that Restitution is making amends for wrongs done against our fellow-men, restoring stolen things to their rightful owners, paying debts, giving back where one has defrauded, making confessions to the offended.",
  },
  {
    id: 7,
    title: "Justification",
    scripture: "Psalm 32:1,2; Isaiah 1:18; Micah 7:19; Acts 13:38",
    content:
      "GOD's word teaches that Justification is God's grace through which one receives forgiveness and remission of sins and is counted righteous before God, through faith in the atoning blood of Jesus.",
  },
  {
    id: 8,
    title: "Water Baptism",
    scripture: "Matthew 28:19; Acts 2:38; Romans 6:4,5",
    content:
      "GOD's word teaches that water Baptism is essential to our obedience after reconciliation with God. Water Baptism is one immersion 'In the name of the Father, and of the Son, and of the Holy Ghost', as Jesus commanded.",
  },
  {
    id: 9,
    title: "The Lord's Supper",
    scripture: "Matthew 26:29; Luke 22:17-20; I Corinthians 11:23-30",
    content:
      "GOD's word teaches that the Lord's supper was instituted by Jesus Christ so that all believers might partake thereof regularly, to 'shew the Lord's death till he come'.",
  },
  {
    id: 10,
    title: "Entire Sanctification",
    scripture: "I Thessalonians 4:3,7,8; 5:22-24; Hebrews 12:14",
    content:
      "GOD's word teaches that Entire Sanctification is a definite act of God's grace, subsequent to the New Birth, by which the believer's heart is purified and made holy.",
  },
  {
    id: 11,
    title: "Holy Ghost Baptism",
    scripture: "Acts 1:8; 2:1-18; Mark 16:17",
    content:
      "GOD's word teaches that the Baptism in the Holy Ghost is the enduement of power from on High upon the sanctified believer, accompanied by the initial evidence of speaking in tongues as the Spirit gives utterance.",
  },
  {
    id: 12,
    title: "Redemption, Healing and Health",
    scripture: "Isaiah 53:4,5; Matthew 8:16,17; James 5:14-16",
    content:
      "GOD's word teaches that Redemption from the curse of the law, Healing of sickness and disease as well as continued Health are provided for all people through the sacrificial death of Jesus Christ.",
  },
  {
    id: 13,
    title: "Personal Evangelism",
    scripture: "Matthew 28:19,20; Mark 16:15; Acts 1:8",
    content:
      "GOD's word teaches that Personal Evangelism is a God-given and God-ordained ministry for every believer. Jesus commanded and God requires every believer to be a compassionate and fruitful soulwinner.",
  },
  {
    id: 14,
    title: "Marriage",
    scripture: "Genesis 2:24; Matthew 19:3-9; Romans 7:2,3",
    content:
      "GOD's word teaches that Marriage is binding for life. Monogamy is the uniform teaching of the Bible. Under the New Testament dispensation, no one has a right to divorce and remarry while the first companion lives.",
  },
  {
    id: 15,
    title: "The Rapture",
    scripture: "John 14:1-3; I Corinthians 15:51-58; I Thessalonians 4:13-18",
    content:
      "GOD's word teaches that the Rapture is the catching away from the earth, of all living saints and all who died in the Lord. The Rapture will take place before the Great Tribulation.",
  },
  {
    id: 16,
    title: "The Resurrection of The Dead",
    scripture: "Daniel 12:2; John 5:28,29; I Corinthians 15:12-57",
    content:
      "GOD's word teaches that the Resurrection of the dead is taught in the Bible as clearly as the immortality of the soul. Every individual who has ever lived will be resurrected.",
  },
  {
    id: 17,
    title: "The Great Tribulation",
    scripture: "Matthew 24:21,22,29; Revelation 13",
    content:
      "GOD's word teaches that the Great Tribulation will occur after the Rapture and will be a time of terrible suffering on earth. During this time, the Antichrist will take possession of this world.",
  },
  {
    id: 18,
    title: "The Second Coming of Christ",
    scripture: "Zechariah 14:3,4; Matthew 25:31-46; 2 Thessalonians 1:7-10",
    content:
      "GOD's word teaches that the Second Coming of Christ will be just as literal and visible as His going away, and He is coming to execute judgement upon the ungodly.",
  },
  {
    id: 19,
    title: "Christ's Millennial Reign",
    scripture: "Isaiah 2:2-4; Revelation 20:2,3",
    content:
      "GOD's word teaches that Christ's Millennial Reign is the 1,000 years literal reign of Jesus on earth, which will be ushered in by the coming of Jesus back to earth with ten thousands of His saints.",
  },
  {
    id: 20,
    title: "The Great White Throne Judgement",
    scripture: "Daniel 12:2,3; Revelation 20:11-15",
    content:
      "GOD's word teaches that the Great White Throne Judgement is when God finally judges all who have ever lived on the face of the earth, according to their works. This is after the Millennium.",
  },
  {
    id: 21,
    title: "The New Heaven and The New Earth",
    scripture: "Isaiah 65:17; 2 Peter 3:10-13; Revelation 21:1-7",
    content:
      "GOD's word teaches that the New Heaven and the New Earth 'wherein dwelleth righteousness' will be made by God and the redeemed shall dwell therein with God forever.",
  },
  {
    id: 22,
    title: "Hell",
    scripture: "Psalm 9:17; Matthew 25:46; Revelation 20:10,12,15",
    content:
      "GOD's word teaches that Hell fire is a place of everlasting punishment where sinners will suffer torments for ever and ever. It was prepared for the devil and his angels but the wicked will also be cast there.",
  },
];

const BibleDoctrinesSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const introRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const contentCardRef = useRef(null);
  const logoCardRef = useRef(null);
  const [currentDoctrine, setCurrentDoctrine] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const entranceTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });

        entranceTl.fromTo(
          titleRef.current,
          { y: -80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
        );

        entranceTl.fromTo(
          introRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
          "-=0.6"
        );

        const scrollDuration = (doctrines.length - 1) * 800;

        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top top",
            end: `+=${scrollDuration}`,
            pin: true,
            scrub: 4.0,
            onUpdate: (self) => {
              const progress = self.progress;
              const docIndex = Math.min(
                Math.floor(progress * doctrines.length),
                doctrines.length - 1
              );
              setCurrentDoctrine(docIndex);
            },
          },
        });

        gsap.set(contentCardRef.current, { left: 0 });
        gsap.set(logoCardRef.current, { left: "50%" });

        let contentOnRight = false;

        for (let index = 0; index < doctrines.length - 2; index++) {
          const startPos = index * 100;

          if (contentOnRight) {
            mainTl.to(
              contentCardRef.current,
              {
                left: 0,
                duration: 50,
                ease: "power2.inOut",
              },
              startPos
            );

            mainTl.to(
              logoCardRef.current,
              {
                opacity: 0,
                duration: 20,
                ease: "power2.out",
              },
              startPos
            );

            mainTl.set(
              logoCardRef.current,
              {
                left: "50%",
                top: "100%",
              },
              startPos + 10
            );

            mainTl.to(
              logoCardRef.current,
              {
                top: 0,
                opacity: 1,
                duration: 50,
                ease: "power2.inOut",
              },
              startPos + 10
            );

            contentOnRight = false;
          } else {
            mainTl.to(
              logoCardRef.current,
              {
                left: 0,
                duration: 50,
                ease: "power2.inOut",
              },
              startPos
            );

            mainTl.to(
              contentCardRef.current,
              {
                opacity: 0,
                duration: 20,
                ease: "power2.out",
              },
              startPos
            );

            mainTl.set(
              contentCardRef.current,
              {
                left: "50%",
                top: "100%",
              },
              startPos + 10
            );

            mainTl.to(
              contentCardRef.current,
              {
                top: 0,
                opacity: 1,
                duration: 50,
                ease: "power2.inOut",
              },
              startPos + 10
            );

            contentOnRight = true;
          }
        }
      }, sectionRef);

      return () => ctx.revert();
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-off-white">
      <div className="py-32 px-4 flex items-center">
        <div className="max-w-7xl">
          <h2
            ref={titleRef}
            className="text-[clamp(3.5rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-navy mb-8 opacity-0"
          >
            OUR BIBLE DOCTRINES
          </h2>
          <p
            ref={introRef}
            className="text-[clamp(1.3rem,2.5vw,1.8rem)] leading-relaxed text-black/70 max-w-3xl opacity-0"
          >
            These are the 22 foundational biblical principles that unite us as
            part of the global Deeper Christian Life Ministry family.
          </p>
        </div>
      </div>

      <div ref={cardsContainerRef} className="relative h-screen">
        <div className="fixed inset-0 top-0">
          <div
            ref={contentCardRef}
            className="absolute top-0 w-1/2 h-screen flex items-center justify-center bg-cream p-16"
          >
            <div className="max-w-7xl space-y-8">
              <h3 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-navy leading-tight">
                {doctrines[currentDoctrine].title}
              </h3>
              <p className="text-lg uppercase tracking-[0.2em] text-terracotta">
                {doctrines[currentDoctrine].scripture}
              </p>
              <p className="text-[clamp(1.2rem,2vw,1.6rem)] leading-relaxed text-black/80">
                {doctrines[currentDoctrine].content}
              </p>
            </div>
          </div>

          <div
            ref={logoCardRef}
            className="absolute top-0 w-1/2 h-screen flex items-center justify-center bg-warm-gray p-16"
          >
            <div className="relative w-80 h-80">
              <Image
                fill
                src="/images/logo.png"
                alt="DCLM Logo"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
          <p className="text-navy/60 text-lg uppercase tracking-widest">
            {String(currentDoctrine + 1).padStart(2, "0")} /{" "}
            {String(doctrines.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BibleDoctrinesSection;
