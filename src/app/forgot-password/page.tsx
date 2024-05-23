"use client";
import Login from "@/api/user/login";
import VerifyUser from "@/api/user/verifyUser";
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
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({
    message: "Email Invalid",
  }),
});
type FormData = z.infer<typeof formSchema>;

const ForgotPasswordPage = () => {
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
      const response = await VerifyUser(data);
      console.log("The verifyUser Response is", response);

      if (response.statusCode === 200) {
        toast({
          description: "User Found",
        });
        reset();
        localStorage.setItem('userFoundData', JSON.stringify(response.data));
        router.push("/forgot-password-user-found")
      }
    } catch (error) {
      console.log("The Error in verifyUser is:", error);

      // Type assertion for AxiosError
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (
          axiosError.response?.status === 400 ||
          axiosError.response?.status === 401
        ) {
          toast({
            description: "Username or email don't exist !!",
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
        <CardHeader className="space-y-1 mb-10">
          <CardTitle className="text-2xl font-bold text-center">
           Find your account
          </CardTitle>
          <CardDescription className="text-center">
            Enter the email, phone number or username associated with your
            account to change your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="mb-10">
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

           

            <Button className="w-full hover:bg-green-400" type="submit">
              Next
            </Button>
            
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
