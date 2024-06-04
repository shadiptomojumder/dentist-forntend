import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Groth_icon from "../../assets/icons/growth.png";
import Partner_icon from "../../assets/icons/handshake.png";
import Support_icon from "../../assets/icons/support.png";
import Service_icon from "../../assets/icons/services0.png";
import Teeth_icon from "../../assets/icons/teeth3.png";
import Chair_icon from "../../assets/icons/chair.png";

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
                We are Dental Care your smile partner.
              </h2>
              <p className="text-base text-gray-700 dark:text-gray-200 md:text-lg">
              we offer a comprehensive range of dental services to meet all your oral health needs. From routine cleanings and fillings to advanced procedures like implants and orthodontics, our experienced team is dedicated to providing you with exceptional care and a healthy smile.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex items-center justify-center gap-3 p-3 bg-[#E1F0DA] dark:bg-[#183D3D] dark:border-primary rounded-lg border border-[#BFD8AF] shadow-md hover:shadow-lg">
                <Image
                  src={Teeth_icon}
                  alt="Groth_icon"
                  width={40}
                  height={40}
                />
                <p className="font-semibold"> White Teeth</p>
              </div>
              <div className="flex items-center justify-center gap-3 p-3 bg-[#E1F0DA] dark:bg-[#183D3D] dark:border-primary rounded-lg border border-[#BFD8AF] shadow-md hover:shadow-lg">
                <Image
                  src={Partner_icon}
                  alt="Groth_icon"
                  width={40}
                  height={40}
                />
                <p className="font-semibold">Trusted Doctor</p>
              </div>
              <div className="flex items-center justify-center gap-3 p-3 bg-[#E1F0DA] dark:bg-[#183D3D] dark:border-primary rounded-lg border border-[#BFD8AF] shadow-md hover:shadow-lg">
                <Image
                  src={Service_icon}
                  alt="Groth_icon"
                  width={40}
                  height={40}
                />
                <p className="font-semibold">Excellent Service</p>
              </div>
              <div className="flex items-center justify-center gap-3 p-3 bg-[#E1F0DA] dark:bg-[#183D3D] dark:border-primary rounded-lg border border-[#BFD8AF] shadow-md hover:shadow-lg">
                <Image
                  src={Chair_icon}
                  alt="Groth_icon"
                  width={40}
                  height={40}
                />
                <p className="font-semibold">Modern Equpment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
