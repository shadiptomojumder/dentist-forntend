"use client"
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { log } from "console";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const HeroSection = () => {
  const { theme } = useTheme();
  const { user, setUser, userLoading } = useAuth();
  const router = useRouter();

  // console.log("user is",user);
  
  const bookAppoinrment = () => {
    if (!user) {
      router.push("/login")
    }else{
      router.push("/appointment")
    }
  }
 
  
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
            <h2 className="mb-5 font-sans sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-primary text-3xl sm:text-start text-center sm:leading-[1.2]">
            Healthy Teeth, Happy Life - Comprehensive Dental Care 
            </h2>
            <p className="pr-5 mb-5 text-base text-gray-700 dark:text-gray-200 md:text-lg sm:text-start text-center">
              At Dental care we have highly qualified doctor for our services. we
              have Complete dental care - From Cleanings to Implants. Painless Dentistry - Relaxing Experience, Exceptional Results. Affordable Dental Care for Every Smile  
            </p>
            <div className="flex items-center md:justify-start justify-center">
              <Link href="/appointment">
                <Button className="bg-primary hover:bg-primary text-black font-semibold hover:shadow-md">
                  Book Appointment
                </Button>
              </Link>
              
                {/* <Button onClick={bookAppoinrment} className="bg-primary hover:bg-primary text-black font-semibold hover:shadow-md">
                  Book Appointment
                </Button> */}
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
