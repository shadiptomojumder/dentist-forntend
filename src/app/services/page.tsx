"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import Services1_icon from "../assets/icons/services1.png";
import {
  default as Services2_icon,
  default as Services3_icon,
} from "../assets/icons/services3.png";
import Services4_icon from "../assets/icons/services4.png";

const ServicePage = () => {
  const { theme } = useTheme();
  return (
    <section
      className={`bg-white py-16 lg:py-40  ${
        theme == "light" ? "" : "dotstyle"
      } `}
    >
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
            smile.
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className={`flex ${
              theme == "light" ? "" : "boxglow"
            }  hover:scale-110 transition-all duration-300 flex-col justify-between p-5 border-2 dark:border border-[#89c661] dark:bg-[#1B4242] rounded-xl shadow-md`}
          >
            <div>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 p-3">
                <Image
                  src={Services1_icon}
                  alt="Web_icon"
                  height={50}
                  width={50}
                />
              </div>
              <h6 className="mb-2 font-semibold dark:text-primary leading-5">
                General Dentistry
              </h6>
              <p className="mb-3 text-sm text-gray-900 dark:text-gray-200">
                This encompasses routine cleanings, exams, fillings, and X-rays,
                forming the foundation of good oral health.
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
          <div
            className={`flex ${
              theme == "light" ? "" : "boxglow"
            }  hover:scale-110 transition-all duration-300 flex-col justify-between p-5 border-2 dark:border border-[#89c661] dark:bg-[#1B4242] rounded-xl shadow-md`}
          >
            <div>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 p-3">
                <Image
                  src={Services2_icon}
                  alt="Web_icon"
                  height={50}
                  width={50}
                />
              </div>
              <h6 className="mb-2 font-semibold dark:text-primary leading-5">
                Cosmetic Dentistry
              </h6>
              <p className="mb-3 text-sm text-gray-900 dark:text-gray-200">
                Focuses on improving the appearance of your smile, including
                procedures like teeth whitening, veneers, and dental implants.
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
          <div
            className={`flex ${
              theme == "light" ? "" : "boxglow"
            }  hover:scale-110 transition-all duration-300 flex-col justify-between p-5 border-2 dark:border border-[#89c661] dark:bg-[#1B4242] rounded-xl shadow-md`}
          >
            <div>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 p-3">
                <Image
                  src={Services3_icon}
                  alt="Web_icon"
                  height={50}
                  width={50}
                />
              </div>
              <h6 className="mb-2 font-semibold dark:text-primary leading-5">
                Orthodontics
              </h6>
              <p className="mb-3 text-sm text-gray-900 dark:text-gray-200">
                Deals with straightening teeth and correcting misaligned bites
                using braces or aligners.
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
          <div
            className={`flex ${
              theme == "light" ? "" : "boxglow"
            }  hover:scale-110 transition-all duration-300 flex-col justify-between p-5 border-2 dark:border border-[#89c661] dark:bg-[#1B4242] rounded-xl shadow-md`}
          >
            <div>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 p-3">
                <Image
                  src={Services4_icon}
                  alt="Web_icon"
                  height={50}
                  width={50}
                />
              </div>
              <h6 className="mb-2 font-semibold dark:text-primary leading-5">
                Periodontics
              </h6>
              <p className="mb-3 text-sm text-gray-900 dark:text-gray-200">
                Specializes in treating gum disease and other conditions
                affecting the supporting tissues of your teeth.
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

export default ServicePage;
