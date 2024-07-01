"use client";
import Logout from "@/api/user/logout";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { UserContext } from "@/context/UserContext/UserContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "sonner";
import MenuBar from "../MenuBar/MenuBar";

const NavLinks = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "About",
    link: "/about",
  },
  {
    id: 3,
    name: "Services",
    link: "/services",
    servicesList: [
      {
        id: 1,
        name: "Web dev",
      },
    ],
  },
  {
    id: 4,
    name: "Contact Us",
    link: "/contact",
  },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser, userLoading } = useContext(UserContext);
  // console.log("The  userData in header is:", user);
  // console.log("The  userData in header is:", userLoading);
  // console.log("The  menuOpen in header file:", menuOpen);

  // sidebar menu for mobile devices
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const sideBarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
      // Do something when clicking outside of authDropdownRef
      // console.log("Clicked outside!");
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
    if (menuOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [menuOpen]);

  // Logout Function
  const handleLogout = async () => {
    try {
      const response = await Logout();
      console.log("The Logout Response is", response);

      if (response.statusCode === 200) {
        toast.success("User successfully Logout");
        localStorage.removeItem("userData");
        setUser(null);
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.log("The Error in Logout is:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-[50] bg-[#BFD8AF] dark:bg-[#040D12] dark:bg-opacity-[0.9] dark:backdrop-blur-md shadow-md">
      <div className="container bg-[#040D12] relative mx-auto px-3 flex md:flex-row flex-col justify-between items-center md:gap-0 py-3">
        <div className="flex items-center justify-between md:w-auto w-full">
          <Link href="/">
            {userLoading ? (
              <Skeleton className="w-[100px] h-10 rounded-full bg-gray-600" />
            ) : (
              <h1 className="text-2xl font-extrabold dark:text-primary text-nowrap">
                Dental Care.
              </h1>
            )}
          </Link>
          <section className="flex items-center gap-4">
            <div className="md:hidden">
              <MenuBar key={1} setopen={setMenuOpen} open={menuOpen}></MenuBar>
            </div>
            <div className="md:hidden">
              {user && userLoading === false ? (
                <>
                  {userLoading ? (
                    <Skeleton className="w-[60px] h-[60px] rounded-full bg-gray-500" />
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        {user && user?.avatar ? (
                          <div className="border-2 boxglow border-primary rounded-full cursor-pointer">
                            <Image
                              src={user?.avatar as string}
                              alt="Uploades Image"
                              height={50}
                              width={50}
                              className="min-w-[50px] h-[50px] rounded-full object-cover object-center"
                            />
                          </div>
                        ) : (
                          <div className="border-2 w-[50px] h-[50px] cursor-pointer flex items-center justify-center boxglow border-primary rounded-full">
                            <FaUser className="text-2xl text-gray-200" />
                          </div>
                        )}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="z-[100]">
                        <DropdownMenuItem className="py-1">
                          {user?.fullname}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-xs text-muted-foreground px-2 py-0 pb-1">
                          {user?.role}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <Link href={`/user-dashboard/user-dashboard-profile`}>
                          <DropdownMenuItem>Profile</DropdownMenuItem>
                        </Link>
                        {user &&
                          user?.role &&
                          (user?.role === "admin" ||
                            user?.role === "super-admin") && (
                            <Link href={`/dashboard`}>
                              <DropdownMenuItem>
                                Admin Dashboard
                              </DropdownMenuItem>
                            </Link>
                          )}
                        <Link href="/user-dashboard/user-dashboard-appointments">
                          <DropdownMenuItem>Appointment</DropdownMenuItem>
                        </Link>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleLogout()}>
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </>
              ) : (
                <>
                  {userLoading ? (
                    <Skeleton className="md:w-[87px] w-[50px] h-[50px] rounded-full bg-gray-500 z-50" />
                  ) : (
                    <Link href="/login">
                      <Button
                        variant="default"
                        className="text-lg bg-[#040D12] boxglow border-2 border-primary text-white px-2 md:px-5 py-5 md:py-6 font-semibold rounded-full"
                      >
                        Login
                      </Button>
                    </Link>
                  )}
                </>
              )}
            </div>
          </section>
        </div>

        <div className="md:flex hidden gap-5 items-center">
          {NavLinks.map((navlink, index) => {
            const isActive = pathname === navlink.link;
            return (
              <>
                {userLoading ? (
                  <Skeleton
                    key={index}
                    className="w-[80px] h-8 rounded-full bg-gray-500"
                  />
                ) : (
                  <Link key={index} href={`${navlink?.link}`}>
                    <Button
                      variant={"ghost"}
                      className={
                        isActive
                          ? "bg-[#092635] font-extrabold text-base text-primary hover:text-primary hover:bg-[#FEFAE0] dark:hover:bg-[#092635]"
                          : "font-bold text-base text-primary hover:text-primary hover:bg-[#FEFAE0] dark:hover:bg-[#092635]"
                      }
                    >
                      {navlink?.name}
                    </Button>
                  </Link>
                )}
              </>
            );
          })}

          {/* {userLoading ? (
            <Skeleton className="w-9 h-9 rounded-md bg-gray-500" />
          ) : (
            <>
              <ThemeToggle></ThemeToggle>
            </>
          )} */}

          {user && userLoading === false ? (
            <>
              {userLoading ? (
                <Skeleton className="w-[60px] h-[60px] rounded-full bg-gray-500" />
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    {user && user?.avatar ? (
                      <div className="border-2 boxglow border-primary rounded-full cursor-pointer">
                        <Image
                          src={user?.avatar as string}
                          alt="Uploades Image"
                          height={50}
                          width={50}
                          className="min-w-[50px] h-[50px] rounded-full object-cover object-center"
                        />
                      </div>
                    ) : (
                      <div className="border-2 w-[50px] h-[50px] cursor-pointer flex items-center justify-center boxglow border-primary rounded-full">
                        <FaUser className="text-2xl text-gray-200" />
                      </div>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="py-1">
                      {user?.fullname}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs text-muted-foreground px-2 py-0 pb-1">
                      {user?.role}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <Link href={`/user-dashboard/user-dashboard-profile`}>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    {user &&
                      user?.role &&
                      (user?.role === "admin" ||
                        user?.role === "super-admin") && (
                        <Link href={`/dashboard`}>
                          <DropdownMenuItem>Admin Dashboard</DropdownMenuItem>
                        </Link>
                      )}
                    <Link href="/user-dashboard/user-dashboard-appointments">
                      <DropdownMenuItem>Appointment</DropdownMenuItem>
                    </Link>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleLogout()}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </>
          ) : (
            <>
              {userLoading ? (
                <Skeleton className="w-[87px] h-[50px] rounded-full bg-gray-500 z-50" />
              ) : (
                <Link href="/login">
                  <Button
                    variant="default"
                    className="text-lg bg-[#040D12] boxglow border-2 border-primary text-white px-5 py-6 font-semibold rounded-full"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>

        {/* This is for mobile devices */}

        <div
          className={`w-dvw h-dvh lg:hidden transition-all duration-300 -z-[100] backdrop-blur-md bg-black bg-opacity-90 absolute top-[100%] left-0 ${
            menuOpen
              ? "translate-y-0 opacity-100 skew-y-12"
              : "-translate-y-full opacity-0"
          }`}
        ></div>

        <div
          className={`-z-[40] bg-gray-900 w-full py-20 absolute top-[100%] left-0 duration-300 ${
            menuOpen ? "translate-y-0 scale-100" : "-translate-y-full scale-50 "
          }`}
        >
          <section className="space-y-3">
            {NavLinks.map((item) => {
              const isActive = pathname === item.link;
              return (
                <Link
                  onClick={() => setMenuOpen(false)}
                  href={`${item.link}`}
                  key={item.id}
                  className="block"
                >
                  <div
                    className={
                      isActive
                        ? "py-2 px-4 cursor-pointer text-center rounded-md transition-all ease-in-out duration-300"
                        : "py-2 px-4 cursor-pointer text-center transition-all ease-in-out duration-300"
                    }
                  >
                    <h2
                      className={
                        isActive
                          ? "text-primary font-semibold text-xl transition-all ease-in-out duration-300"
                          : "text-gray-200 font-semibold text-lg transition-all ease-in-out duration-300"
                      }
                    >
                      {item.name}
                    </h2>
                  </div>
                </Link>
              );
            })}
          </section>
        </div>
      </div>
    </nav>
  );
};

export default Header;
