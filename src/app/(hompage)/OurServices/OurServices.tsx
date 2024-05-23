"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import Consulting_icon from "../../assets/icons/consulting.png";
import Marketing_icon from "../../assets/icons/digitalmarketing.png";
import Graphic_icon from "../../assets/icons/graphic.png";
import Web_icon from "../../assets/icons/webdev.png";


const OurServices = () => {
  const { theme } = useTheme();
  return (
    <section className={`bg-white py-16 lg:py-40  ${theme == "light" ? "" : "dotstyle"} `}>
      <div className="container mx-auto py-10">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-lg bg-[#BFD8AF] font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              Our Services
            </p>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 dark:text-primary sm:text-4xl md:mx-auto">
            Explore Our best Expertise
          </h2>
          <p className="text-base text-gray-700 dark:text-gray-200 md:text-lg">
            Discover Our Complete Range of Expert Services to Enhance Your
            Digital Presence and Achieve Business Success.
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className={`flex ${theme == "light"? "":"boxglow"}  hover:scale-110 transition-all duration-300 flex-col justify-between p-5 border-2 dark:border border-[#89c661] dark:bg-[#1B4242] rounded-xl shadow-md`}>
            <div>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 p-3">
                <Image src={Web_icon} alt="Web_icon" height={50} width={50} />
              </div>
              <h6 className="mb-2 font-semibold dark:text-primary leading-5">
                Web Devlopment
              </h6>
              <p className="mb-3 text-sm text-gray-900 dark:text-gray-200">
                We specialise in creating custom web solutions to help your
                business succeed in the digital sphere...
              </p>
            </div>
            <Link
              href="/services/web-devlopment"
              aria-label=""
              className="inline-flex items-center dark:text-[#78b64f] font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              Learn more
            </Link>
          </div>
          <div className={`flex ${theme == "light"? "":"boxglow"}  hover:scale-110 transition-all duration-300 flex-col justify-between p-5 border-2 dark:border border-[#89c661] dark:bg-[#1B4242] rounded-xl shadow-md`}>
            <div>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 p-3">
                <Image
                  src={Graphic_icon}
                  alt="Web_icon"
                  height={50}
                  width={50}
                />
              </div>
              <h6 className="mb-2 font-semibold dark:text-primary leading-5">
                Graphic Design
              </h6>
              <p className="mb-3 text-sm text-gray-900 dark:text-gray-200">
                Growoly &lsquo;s creative arena, where graphic design crosses
                borders to visually capture and transmit your brands soul...
              </p>
            </div>
            <a
              href="/services/graphic-design"
              aria-label=""
              className="inline-flex items-center dark:text-[#78b64f]  font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              Learn more
            </a>
          </div>
          <div className={`flex ${theme == "light"? "":"boxglow"}  hover:scale-110 transition-all duration-300 flex-col justify-between p-5 border-2 dark:border border-[#89c661] dark:bg-[#1B4242] rounded-xl shadow-md`}>
            <div>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 p-3">
                <Image
                  src={Marketing_icon}
                  alt="Web_icon"
                  height={50}
                  width={50}
                />
              </div>
              <h6 className="mb-2 font-semibold dark:text-primary leading-5">
                Digital Marketing
              </h6>
              <p className="mb-3 text-sm text-gray-900 dark:text-gray-200">
                A flower in my garden, a mystery in my panties. Heart attack
                never stopped old Big Bear...
              </p>
            </div>
            <a
              href="/services/digital-marketing"
              aria-label=""
              className="inline-flex items-center dark:text-[#78b64f]  font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              Learn more
            </a>
          </div>
          <div className={`flex ${theme == "light"? "":"boxglow"}  hover:scale-110 transition-all duration-300 flex-col justify-between p-5 border-2 dark:border border-[#89c661] dark:bg-[#1B4242] rounded-xl shadow-md`}>
            <div>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 p-3">
                <Image
                  src={Consulting_icon}
                  alt="Web_icon"
                  height={50}
                  width={50}
                />
              </div>
              <h6 className="mb-2 font-semibold dark:text-primary leading-5">
                Buisness Consulting
              </h6>
              <p className="mb-3 text-sm text-gray-900 dark:text-gray-200">
                A flower in my garden, a mystery in my panties. Heart attack
                never stopped old Big Bear...
              </p>
            </div>
            <a
              href="/services/buisness-consulting"
              aria-label=""
              className="inline-flex items-center dark:text-[#78b64f]  font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
