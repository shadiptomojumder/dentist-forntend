import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa6";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";

const Contact = () => {
  return (
    <main className=" py-20 bg-[#183D3D]">
      <section className="flex flex-col lg:flex-row justify-between gap-10 container mx-auto">
        <div className="lg:max-w-1/2 lg:text-left text-center">
          <p className="inline-block px-3 py-px mb-4 text-lg bg-[#BFD8AF] font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
            Contact with us
          </p>
          <h2 className="mb-6 font-sans text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:leading-none">
            Let's Talk Smiles!
          </h2>
          <p className="text-base text-gray-200 md:text-lg whitespace-normal lg:max-w-lg">
            We are happy to answer any questions you may have regarding us. Please let us know so that we can deliver the finest
            services for you.
          </p>
          <ol className="p-2 list-inside list-disc">
            <li>
              Have a question or want to schedule an appointment? We're here to
              help!
            </li>
            <li>
              Give us a call or send us a message. Our friendly staff is ready
              to assist you.
            </li>
            <li>
              Looking for directions? We've included a map for your convenience.
            </li>
            <li>
              Prefer to connect in person? Come visit us at our dental practice!
            </li>
            <li>We look forward to hearing from you!</li>
          </ol>
          <section className="flex items-center gap-5 mb-5 mt-10">
            <div className="h-[40px] w-[40px] bg-transparent rounded-full flex items-center justify-center outline outline-primary cursor-pointer">
              <FiPhoneCall className="text-2xl" />
            </div>
            <p className="font-semibold text-gray-200">+880 17966 92501</p>
          </section>
          <section className="flex items-center gap-5 mb-5">
            <div className="h-[40px] w-[40px] bg-transparent rounded-full flex items-center justify-center outline outline-primary cursor-pointer">
              <HiOutlineMail className="text-2xl" />
            </div>
            <p className="font-semibold text-gray-200">info@growoly.com</p>
          </section>
          <section className="flex items-center gap-5 mb-5">
            <div className="h-[40px] w-[40px] bg-transparent rounded-full flex items-center justify-center outline outline-primary cursor-pointer">
              <SlLocationPin className="text-2xl" />
            </div>
            <p className="font-semibold text-gray-200">
              Dhaka-1206, Bangladesh
            </p>
          </section>

          {/* Follow Us */}
          <section>
            <h2 className="text-xl text-primary font-semibold">Follow Us</h2>
            <div className="flex items-center gap-5 mt-5">
              <Link href="#">
                <div className="h-[50px] w-[50px] bg-transparent boxglow text-primary hover:text-white transition-all duration-300 rounded-full flex items-center justify-center outline outline-primary cursor-pointer">
                  <FaLinkedinIn className="text-2xl" />
                </div>
              </Link>
              <Link href="#">
                <div className="h-[50px] w-[50px] bg-transparent boxglow text-primary hover:text-white transition-all duration-300 rounded-full flex items-center justify-center outline outline-primary cursor-pointer">
                  <FaFacebookF className="text-2xl" />
                </div>
              </Link>
              <Link href="#">
                <div className="h-[50px] w-[50px] bg-transparent boxglow text-primary hover:text-white transition-all duration-300 rounded-full flex items-center justify-center outline outline-primary cursor-pointer">
                  <FaTwitter className="text-2xl" />
                </div>
              </Link>
              <Link href="#">
                <div className="h-[50px] w-[50px] bg-transparent boxglow text-primary hover:text-white transition-all duration-300 rounded-full flex items-center justify-center outline outline-primary cursor-pointer">
                  <FaInstagram className="text-2xl" />
                </div>
              </Link>
            </div>
          </section>
        </div>

        {/* Form for Contact */}
        <div className="lg:w-1/2 bg-[#040D12] boxglow shadow-lg p-10 rounded-lg">
          <h2 className="text-3xl text-primary font-semibold text-center border-b border-primary pb-2 mb-5">
            Make a Free Consulting
          </h2>
          <form>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="firstName"
                className="inline-block mb-1 font-medium"
              >
                First name
              </label>
              <input
                placeholder="John"
                required
                type="text"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                id="firstName"
                name="firstName"
              />
            </div>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="lastName"
                className="inline-block mb-1 font-medium"
              >
                Last name
              </label>
              <input
                placeholder="Doe"
                required
                type="text"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                id="lastName"
                name="lastName"
              />
            </div>
            <div className="mb-1 sm:mb-2">
              <label htmlFor="email" className="inline-block mb-1 font-medium">
                E-mail
              </label>
              <input
                placeholder="john.doe@example.org"
                required
                type="text"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
              />
            </div>
            <div className="mb-1 sm:mb-2">
              <label htmlFor="phone" className="inline-block mb-1 font-medium">
                Phone
              </label>
              <input
                placeholder="+16469803258"
                required
                type="text"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                id="phone"
                name="email"
              />
            </div>
            <div className="mt-4 mb-2 sm:mb-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full h-12 px-6 font-bold tracking-wide text-black transition duration-200 rounded shadow-md bg-primary hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
              >
                Submit
              </button>
            </div>
            <p className="text-xs text-gray-400 sm:text-sm">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
