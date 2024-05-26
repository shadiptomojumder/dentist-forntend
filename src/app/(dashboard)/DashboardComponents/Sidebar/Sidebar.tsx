"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";

const QuickLinks = [
  {
    id: 1,
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Profile",
    link: "/dashboard/dashboard-profile",
  },
  {
    id: 3,
    title: "Appointments",
    link: "/dashboard/dashboard-appointments",
  },
  {
    id: 4,
    title: "Tests",
    link: "/dashboard/dashboard-tests",
  },
  {
    id: 5,
    title: "Transition",
    link: "/dashboard/dash_services_doctor",
  },
  {
    id: 6,
    title: "Goods",
    link: "/dashboard/goods",
  },
  {
    id: 7,
    title: "Reviews",
    link: "/dashboard/dash_reviews_doctor",
  },
  {
    id: 8,
    title: "OPPO",
    link: "/dashboard/dash_password_change",
  },
];

const Sidebar = () => {
  const inputref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();


  const handleImageClick = () => {
    if (inputref.current) {
      inputref.current.click();
    }
  };
  return (
    <main className="p-6 pb-40 bg-[#040D12] min-w-[288px] h-full border-2 border-gray-200 rounded-lg">
      {/* Profile picture */}
      <section className="mb-11">
        <div className="text-center bg-white rounded-full relative w-max mx-auto">
          <div
            onClick={handleImageClick}
            className="w-[30px] h-[30px] bg-[#F6F8FA] flex justify-center items-center rounded-full cursor-pointer absolute top-[10px] right-0"
          >
            <input
              id="imageupload"
              ref={inputref}
              type="file"
              className="hidden"
            />
          </div>
        </div>
        <h2>Profile Picture</h2>
      </section>

      {/* All the Links */}
      <section className="space-y-5">
        {QuickLinks.map((item) => {
          const isActive = pathname === item.link;
          
          return (
            <Link
              href={`${item.link}`}
              key={item.id}
              className="block"
            >
              <div
                className={
                  isActive
                    ? "py-2 px-4 cursor-pointer bg-[#092635] border border-primary boxglow rounded-md transition-all ease-in-out duration-300"
                    : "py-2 px-4 cursor-pointer bg-transparent hover:bg-[#092635] border border-gray-200 rounded-md hover:border-primary hover:text-primary transition-all ease-in-out duration-300"
                }
              >
                <h2
                  className={
                    isActive
                      ? "text-primary font-semibold transition-all ease-in-out duration-300"
                      : "text-gray-200 font-semibold transition-all ease-in-out duration-300"
                  }
                >
                  {item.title}
                </h2>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
};

export default Sidebar;
