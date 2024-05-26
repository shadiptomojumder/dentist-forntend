"use client";
import Login from "@/api/user/login";
import ResetPassword from "@/api/user/resetPassword";
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
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});
type FormData = z.infer<typeof formSchema>;

const ForgotPasswordResetPage = () => {
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
  
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const storedUserFoundData = localStorage.getItem("userFoundData");
    if (storedUserFoundData) {
      try {
        setUserData(JSON.parse(storedUserFoundData));
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("userData");
      }
    }
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("The Reset data is", data);
    const updateData = {
      email: userData?.email,
      password:  data.password,
    }
    try {
      const response = await ResetPassword(updateData);
      console.log("The Reset Response is", response);

      if (response.statusCode === 200) {
        toast({
          description: "Password Successsfully Reset",
        });

        reset();
        localStorage.removeItem("userFoundData");
        router.push("/login");
      }
    } catch (error:any) {
      console.log("The Error in Reset password is:", error);

    }
  };


  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <Card className="w-full max-w-md dark:bg-black">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Reset Your Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your new password and confirm your password to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="space-y-2">
                <div className="flex items-center justify-start gap-1">
                  <Label htmlFor="password">Enter New Password</Label>
                  <span className="text-red-500">*</span>
                </div>
                <Input
                  id="password"
                  placeholder="Enter your new password"
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
              Reset Password
            </Button>
            
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordResetPage;
