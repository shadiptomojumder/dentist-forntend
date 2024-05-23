import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Groth_icon from "../../assets/icons/growth.png";
import Partner_icon from "../../assets/icons/handshake.png";
import Support_icon from "../../assets/icons/support.png";
import Service_icon from "../../assets/icons/services0.png";

const AboutUs = () => {
  return (
    <section className="py-16 lg:py-40 bg-[#F3F8FF] dark:bg-[#040D12]">
      <div className="container mx-auto py-10">
        <div className="flex flex-col-reverse items-center justify-between lg:flex-row">
          <div className="relative lg:w-1/2 border-2 border-dashed border-[#BFD8AF] dark:border-primary rounded-md p-2 shadow-lg ">
            <Image
              className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
              src="https://cdn.pixabay.com/photo/2023/11/10/01/39/all-on-4-dental-implants-belfast-8378579_960_720.jpg"
              alt="op"
              width={500}
              height={500}
            />
          </div>
          <div className="mb-10 lg:max-w-lg lg:pr-5 lg:mb-0 space-y-8">
            <div className="max-w-xl mb-6">
              <div>
                <p className="inline-block px-3 py-px mb-4 text-lg bg-[#BFD8AF] font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                  About us
                </p>
              </div>
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 dark:text-primary sm:text-4xl sm:leading-none">
                We are Growoly your growth partner.
              </h2>
              <p className="text-base text-gray-700 dark:text-gray-200 md:text-lg">
                Welcome to our digital hub! We are more than just a web services
                agency, we are your go-to partner for comprehensive digital
                solutions designed to grow your business. We offer experienced
                company consultation, appealing graphic design, lead generation,
                effective digital marketing techniques, and SEO services.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex items-center justify-center gap-3 p-3 bg-[#E1F0DA] dark:bg-[#183D3D] dark:border-primary rounded-lg border border-[#BFD8AF] shadow-md hover:shadow-lg">
                <Image
                  src={Groth_icon}
                  alt="Groth_icon"
                  width={30}
                  height={30}
                />
                <p className="font-semibold"> Grow Business</p>
              </div>
              <div className="flex items-center justify-center gap-3 p-3 bg-[#E1F0DA] dark:bg-[#183D3D] dark:border-primary rounded-lg border border-[#BFD8AF] shadow-md hover:shadow-lg">
                <Image
                  src={Partner_icon}
                  alt="Groth_icon"
                  width={30}
                  height={30}
                />
                <p className="font-semibold">Trusted Partner</p>
              </div>
              <div className="flex items-center justify-center gap-3 p-3 bg-[#E1F0DA] dark:bg-[#183D3D] dark:border-primary rounded-lg border border-[#BFD8AF] shadow-md hover:shadow-lg">
                <Image
                  src={Service_icon}
                  alt="Groth_icon"
                  width={30}
                  height={30}
                />
                <p className="font-semibold">Excellent Service</p>
              </div>
              <div className="flex items-center justify-center gap-3 p-3 bg-[#E1F0DA] dark:bg-[#183D3D] dark:border-primary rounded-lg border border-[#BFD8AF] shadow-md hover:shadow-lg">
                <Image
                  src={Support_icon}
                  alt="Groth_icon"
                  width={30}
                  height={30}
                />
                <p className="font-semibold">24/7 Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
