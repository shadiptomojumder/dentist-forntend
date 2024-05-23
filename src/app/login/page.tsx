"use client";
import Login from "@/api/user/login";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { UserContext } from "@/context/UserContext/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({
    message: "Email Invalid",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});
type FormData = z.infer<typeof formSchema>;

const LoginPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { setUser } = useContext(UserContext);
  
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("The Data is", data);
    try {
      const response = await Login(data);
      console.log("The Login Response is", response);

      if (response.statusCode === 200) {
        toast({
          description: "User successfully Login",
        });

        reset();
        router.push("/");
        router.refresh();

        setUser(response.data.loggedInUser);

        window.localStorage.setItem(
          "userData",
          JSON.stringify(response.data.loggedInUser)
        );

      }
    } catch (error) {
      console.log("The Error in Login is:", error);

      // Type assertion for AxiosError
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 400 || axiosError.response?.status === 401) {
          toast({
            description: "Username or Password don't match !!",
          });
        }
      } else {
        // Handle other error types
        toast({
          description: "An unexpected error occurred.",
        });
      }
    }
  };


  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <Card className="w-full max-w-md dark:bg-black">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email or username and password to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="space-y-2">
                <Label htmlFor="email-username">Email or Username</Label>
                <Input
                  id="email-username"
                  placeholder="Enter your email or username"
                  {...register("email")}
                  type="text"
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link className="text-sm underline" href="/forgot-password">
                    Forgot Password?
                  </Link>
                </div>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  {...register("password")}
                  type="password"
                />
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>

            <Button className="w-full hover:bg-green-400" type="submit">
              Login
            </Button>
            <Button
              className="flex items-center gap-2 w-full"
              variant="outline"
            >
              Login with Google
            </Button>
            <div className="flex items-center justify-center">
              <div className="text-sm text-gray-500 dark:text-white">
                Don&apos;t have an account?
                <Link className="font-medium underline" href="#">
                  {""} Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
