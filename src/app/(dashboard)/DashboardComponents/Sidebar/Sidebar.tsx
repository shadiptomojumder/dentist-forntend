"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserContext } from "@/context/UserContext/UserContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { BiArrowToRight } from "react-icons/bi";

const QuickLinks = [
  {
    id: 1,
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    id: 9,
    title: "Create an appointment",
    link: "/dashboard/dashboard-create-appointment",
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
];

const Sidebar = () => {
  const pathname = usePathname();
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  // console.log("showSideBar",showSideBar);
  const { user, setUser, userLoading } = useContext(UserContext);

  const sideBarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
      // Do something when clicking outside of authDropdownRef
      console.log("Clicked outside!");
      setShowSideBar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Here logic of when menu is open the scrollbar willbe disable
  useEffect(() => {
    if (showSideBar) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [showSideBar]);

  return (
    <>
      {/* This is for big screens */}
      <main className="px-6 py-10 min-w-[288px] h-[80dvh] rounded-lg hidden lg:block">
        {/* All the Links */}
        {userLoading ? (
          <section className="space-y-5">
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton
                key={index}
                className="w-full h-[32px] rounded-md bg-gray-500"
              />
            ))}
          </section>
        ) : (
          <>
            <section className="space-y-5">
              {QuickLinks.map((item) => {
                const isActive = pathname === item.link;
                return (
                  <Link href={`${item.link}`} key={item.id} className="block">
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

              {user && user?.role && user?.role === "super-admin" && (
                <Link href={`/dashboard/dashboard-users`} className="block">
                  <div
                    className={
                      pathname === "/dashboard/dashboard-users"
                        ? "py-2 px-4 cursor-pointer bg-[#092635] border border-primary boxglow rounded-md transition-all ease-in-out duration-300"
                        : "py-2 px-4 cursor-pointer bg-transparent hover:bg-[#092635] border border-gray-200 rounded-md hover:border-primary hover:text-primary transition-all ease-in-out duration-300"
                    }
                  >
                    <h2
                      className={
                        pathname === "/dashboard/dashboard-users"
                          ? "text-primary font-semibold transition-all ease-in-out duration-300"
                          : "text-gray-200 font-semibold transition-all ease-in-out duration-300"
                      }
                    >
                      Users
                    </h2>
                  </div>
                </Link>
              )}
            </section>
          </>
        )}
      </main>

      {/* This is for small screens */}
      <main
        ref={sideBarRef}
        className={`px-6 py-10 transition-all duration-300 lg:hidden md:min-w-[288px] min-w-[150px] flex flex-col justify-between h-dvh z-[500] fixed bg-[#040D12] border-r-2 border-t-2 rounded-tr-2xl border-primary ${
          showSideBar ? "top-0 left-0" : "top-0 -left-[95%]"
        }`}
      >
        {/* All the Links */}

        {userLoading ? (
          <section className="space-y-5">
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton
                key={index}
                className="w-full h-[32px] rounded-md bg-gray-500"
              />
            ))}
          </section>
        ) : (
          <>
            <section className="space-y-5">
              {QuickLinks.map((item) => {
                const isActive = pathname === item.link;
                return (
                  <Link
                    onClick={() => setShowSideBar(false)}
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
              {user && user?.role && user?.role === "super-admin" && (
                <Link href={`/dashboard/dashboard-users`} className="block">
                  <div
                    className={
                      pathname === "/dashboard/dashboard-users"
                        ? "py-2 px-4 cursor-pointer bg-[#092635] border border-primary boxglow rounded-md transition-all ease-in-out duration-300"
                        : "py-2 px-4 cursor-pointer bg-transparent hover:bg-[#092635] border border-gray-200 rounded-md hover:border-primary hover:text-primary transition-all ease-in-out duration-300"
                    }
                  >
                    <h2
                      className={
                        pathname === "/dashboard/dashboard-users"
                          ? "text-primary font-semibold transition-all ease-in-out duration-300"
                          : "text-gray-200 font-semibold transition-all ease-in-out duration-300"
                      }
                    >
                      Users
                    </h2>
                  </div>
                </Link>
              )}
            </section>
          </>
        )}

        {/* sidebar close button */}
        <div onClick={() => setShowSideBar(false)} className="">
          <Button className="hover:bg-primary w-full">Close</Button>
        </div>
      </main>

      <div
        className={`w-dvw h-dvh lg:hidden transition-all duration-200 z-[400] backdrop-blur-sm bg-black bg-opacity-5 fixed left-0 top-0 ${
          showSideBar ? "scale-100" : "scale-0"
        }`}
      ></div>

      <div
        onClick={() => setShowSideBar(!showSideBar)}
        className={`w-7 h-14 bg-primary transition-all duration-300 flex items-center z-[480] justify-center rounded-r-lg lg:hidden fixed left-0 top-1/2 -translate-y-1/2 ${
          showSideBar ? "scale-0" : "scale-100"
        }`}
      >
        <BiArrowToRight className="text-2xl text-black font-bold" />
      </div>
    </>
  );
};

export default Sidebar;
