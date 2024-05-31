"use client";
import Logout from "@/api/user/logout";
import { ThemeToggle } from "@/components/themeProvider/theme-toggle";
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
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { toast } from "sonner";

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
  console.log("The  userLoading header is:", user);

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

  // Toggle menu open/close state
  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

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

  // if(userLoading){
  //   return <p>Loading....</p>
  // }

  return (
    <nav className="sticky top-0 z-50 bg-[#BFD8AF] dark:bg-[#040D12] dark:bg-opacity-[0.9] dark:backdrop-blur-md shadow-md">
      <div className="container mx-auto flex md:flex-row flex-col justify-between items-center md:gap-0 py-3">
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
          <Button onClick={toggleMenu} className="md:hidden">
            <FaBars className="text-xl" />
          </Button>
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

          {userLoading ? (
            <Skeleton className="w-9 h-9 rounded-md bg-gray-500" />
          ) : (
            <>
              <ThemeToggle></ThemeToggle>
            </>
          )}

          {user && userLoading === false ? (
            <>
              {userLoading ? (
                <Skeleton className="w-[60px] h-[60px] rounded-full bg-gray-500" />
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      className="rounded-full h-full w-full bg-transparent hover:bg-transparent p-2"
                    >
                      {user && user?.avatar ? (
                        <div className="border-2 boxglow border-primary rounded-full">
                          <Image
                            src={user?.avatar as string}
                            alt="Uploades Image"
                            height={50}
                            width={50}
                            className="min-w-[50px] h-[50px] rounded-full object-cover object-center"
                          />
                        </div>
                      ) : (
                        <div className="border-2 w-[50px] h-[50px] flex items-center justify-center boxglow border-primary rounded-full"><FaUser className="text-2xl text-gray-200" /></div>
                      )}
                    </Button>
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
                    {(user &&
                      user?.fullname &&
                      user?.role &&
                      user?.role === "admin") ||
                      (user?.role === "super-admin" && (
                        <Link href={`/dashboard`}>
                          <DropdownMenuItem>Admin Dashboard</DropdownMenuItem>
                        </Link>
                      ))}

                    <DropdownMenuItem>Appointment</DropdownMenuItem>
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

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col md:hidden gap-5 items-center md:pt-0 pt-5 h-screen">
                <Link href={"/"}>
                  <Button
                    variant={"ghost"}
                    className="font-bold text-base text-primary"
                  >
                    Home
                  </Button>
                </Link>
                <Link href={"/"}>
                  <Button
                    variant={"ghost"}
                    className="font-bold text-base text-primary"
                  >
                    About
                  </Button>
                </Link>
                <Link href={"/"}>
                  <Button
                    variant={"ghost"}
                    className="font-bold text-base text-primary"
                  >
                    Team
                  </Button>
                </Link>
                <Link href={"/"}>
                  <Button
                    variant={"ghost"}
                    className="font-bold text-base text-primary"
                  >
                    Contact
                  </Button>
                </Link>
                <Link href={"/"}>
                  <Button
                    variant={"ghost"}
                    className="font-bold text-base text-primary"
                  >
                    Contact us
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* <div>
          <ThemeToggle></ThemeToggle>
        </div> */}
        {/* <Link href={"/"} className="hidden md:block">
          <Button>Get in touch</Button>
        </Link> */}
      </div>
      {/* <div className={`h-screen w-full bg-black bg-opacity-[0.1] backdrop-blur-sm fixed inset-0`}>
      </div> */}
    </nav>
  );
};

export default Header;
