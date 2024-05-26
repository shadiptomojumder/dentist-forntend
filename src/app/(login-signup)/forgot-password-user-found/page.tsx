"use client";
import GenerateOneTimePassword from "@/api/user/generateOTP";
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
import { useContext, useEffect, useState } from "react";

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

const ForgotPasswordUserFoundPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { setUser } = useContext(UserContext);
  
  const {
    register,
    setValue,
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

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const storedUserFoundData = localStorage.getItem('userFoundData');
    if (storedUserFoundData) {
      try {
        setUserData(JSON.parse(storedUserFoundData));
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem('userData');
      }
    }
  }, []);
//   console.log("userData",userData);
const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      email: userData?.email,
    };

    try {
      const response = await GenerateOneTimePassword(data);
      console.log("The OTP Response is", response);

      if (response.statusCode === 201) {
        toast({
          description: "Successfully OTP send",
        });

        router.push("/forgot-password-otp");
      }
    } catch (error:any) {
        console.log("The error in OTP is:",error);
        
    }
  };
  


  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <Card className="w-full max-w-md dark:bg-black">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Account Found
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email or username and password to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>         
            <div>
                <Label htmlFor="password">Your Username</Label>
                <p>{userData?.fullname}</p>
            </div>
            <div>
                <Label htmlFor="password">Your Email</Label>
                <p>{userData?.email}</p>
            </div>
            <p className="text-sm text-primary underline">Send OTP to this email for verify you ?</p>
            

            <Button className="w-full hover:bg-green-400 font-semibold" type="submit">
              Send OTP
            </Button>
            
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordUserFoundPage;
