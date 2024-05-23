"use client"
import { Button } from "@/components/ui/button";
import { log } from "console";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  const { theme } = useTheme();
  console.log("The theme is",theme);
  
  return (
    <section className={`bg-white dark:bg-[#183D3D] ${theme == "light"? "":"dotstyle"} `}>
      <div className="relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0 container mx-auto">
        <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
          <svg
            className="absolute left-0 hidden h-full text-white dark:text-[#183D3D] transform -translate-x-1/2 lg:block"
            viewBox="0 0 100 100"
            fill="currentColor"
            preserveAspectRatio="none slice"
          >
            <path d="M50 0H100L50 100H0L50 0Z" />
          </svg>
          <Image
            className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
            src="https://cdn.pixabay.com/photo/2023/08/30/15/42/ai-generated-8223597_960_720.jpg"
            alt="op"
            width={500}
            height={500}
          />
        </div>
        <div className="relative flex flex-col items-start w-full md:px-0">
          <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
            <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 dark:text-primary sm:text-5xl sm:leading-[1.2]">
              Grow your buissness with our excellence.
            </h2>
            <p className="pr-5 mb-5 text-base text-gray-700 dark:text-gray-200 md:text-lg">
              At grwoly we have highly qualified expert team for our services. we
              are ready to make your dream project lives and make significant
              growth in your business.
            </p>
            <div className="flex items-center">
              <Link href="/contact">
                <Button className="bg-[#BFD8AF] text-black dark:hover:text-primary font-semibold hover:bg-transparent hover:border-[#BFD8AF] hover:border hover:shadow-md">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
