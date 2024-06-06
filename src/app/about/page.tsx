import Image from "next/image";
import Dentist1 from "../assets/images/dentist1.jpg";
import Dentist2 from "../assets/images/dentist2.jpg";
import Teeth2 from "../assets/images/teeth2.jpg";

const AboutPage = () => {
  return (
    <main className=" dotstyle">
      <section className="mx-auto container">
        <div className="py-16  lg:py-20">
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-10">
            <div className="flex flex-col justify-center">
              <div className="max-w-xl mb-6">
                <p className="inline-block px-3 py-px mb-4 text-lg bg-[#BFD8AF] font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                  Who we are?
                </p>
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:leading-none">
                  We are Dental Care your smile partner.
                </h2>
                <p className="text-base text-gray-200 md:text-lg whitespace-normal">
                  At Dental care we have highly qualified doctor for our
                  services. we have Complete dental care - From Cleanings to
                  Implants. Painless Dentistry - Relaxing Experience,
                  Exceptional Results. Affordable Dental Care for Every Smile
                  <br />
                  <br /> We're committed to using the latest technology and techniques to deliver exceptional care, from routine checkups to complex procedures. As a valued member of the community, we believe in fostering healthy smiles for a lifetime.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-end px-3">
                <Image
                  className="object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"
                  src={Dentist1}
                  alt=""
                  width={200}
                  height={200}
                  placeholder="blur"
                />
                <Image
                  className="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40"
                  src={Dentist2}
                  alt=""
                  width={200}
                  height={200}
                  placeholder="blur"
                />
              </div>
              <div className="px-3">
                <Image
                  className="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80"
                  src={Teeth2}
                  alt=""
                  width={200}
                  height={200}
                  placeholder="blur"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
