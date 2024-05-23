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
import { useToast } from "@/components/ui/use-toast";
import { UserContext } from "@/context/UserContext/UserContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { user, setUser ,userLoading } = useContext(UserContext);
  console.log("The  User is:", user);

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

  const handleLogout = async () => {
    try {
      const response = await Logout();
      console.log("The Logout Response is", response);

      if (response.statusCode === 200) {
        toast({
          description: "User successfully Logout",
        });
        window.localStorage.removeItem("userData");
        setUser(null);
        router.push("/")
        router.refresh()
      }
    } catch (error) {
      console.log("The Error in Logout is:", error);
    }
  };



  return (
    <>
      <section className="py-4 bg-black sm:py-6" x-data="{expanded: false}">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="shrink-0">
              <Link href="/" className="flex">
                oppo
              </Link>
            </div>
            <div className="flex md:hidden">
              <button onClick={toggleMenu} type="button" className="text-white">
                <FaBars className="text-2xl" />
              </button>
            </div>

            {/* Desktop or Big Devices Navbar */}
            <nav className="hidden ml-10 mr-auto space-x-10 lg:ml-20 lg:space-x-12 md:flex md:items-center md:justify-start">
              <Link
                href="/products"
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                {" "}
                Products{" "}
              </Link>
              <Link
                href="/features"
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                {" "}
                Features{" "}
              </Link>
              <Link
                href="#"
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                {" "}
                Pricing{" "}
              </Link>
              <Link
                href="/signup"
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                Signup
              </Link>
              <Link
                href="/login"
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                Login
              </Link>
              <div>
                <ThemeToggle></ThemeToggle>
              </div>
            </nav>
            <div className="relative hidden md:items-center md:justify-center md:inline-flex group">
              <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50" />
              {user && userLoading == false ? (
                <>
                  <div
                    className="relative inline-flex items-center justify-center text-base font-normal text-white bg-black border border-transparent rounded-full"
                    role="button"
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="secondary"
                          className="rounded-full h-full w-full bg-transparent hover:bg-transparent p-3"
                        >
                          <FaUser className="text-2xl text-gray-200" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/profile`}>
                          <DropdownMenuItem>Profile</DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={()=>handleLogout()}>
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="relative inline-flex items-center justify-center text-base font-normal text-white bg-black border border-transparent rounded-full"
                    role="button"
                  >
                    <Button
                      variant="ghost"
                      className="text-lg hover:bg-transparent px-5 py-6 font-semibold rounded-full"
                    >
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Devices Navbar */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <nav className="h-screen">
                  <div className="flex md:hidden flex-col items-center pt-8 pb-4 space-y-6">
                    <Link
                      href="#"
                      className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
                    >
                      {" "}
                      Products
                    </Link>
                    <Link
                      href="#"
                      className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
                    >
                      {" "}
                      Features
                    </Link>
                    <Link
                      href="#"
                      className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
                    >
                      {" "}
                      Pricing
                    </Link>
                    <Link
                      href="#"
                      className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
                    >
                      {" "}
                      Support
                    </Link>
                    <div className="relative inline-flex items-center justify-center group">
                      <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50" />
                      <Link
                        href="#"
                        className="relative inline-flex items-center justify-center w-full px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full"
                        role="button"
                      >
                        {" "}
                        Start free trial{" "}
                      </Link>
                    </div>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default Header;
