"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { REGEXP_ONLY_DIGITS } from "input-otp";

import GenerateOneTimePassword from "@/api/user/generateOTP";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { log } from "console";
import VerifyOneTimePassword from "@/api/user/verifyOTP";

const ForgotPasswordOtpPage = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [value, setValue] = useState("");

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
  console.log("userData", userData);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log("The Otp is:", value);
    const data = {
      email: userData?.email,
      otp: value
    };

    try {
      const response = await VerifyOneTimePassword(data);
      console.log("The OTP verify Response is", response);

      if (response.statusCode === 201) {
        toast({
          description: "Successfully OTP Verified",
        });

        router.push("/forgot-password-reset");
      }
    } catch (error:any) {
        console.log("The error in OTP verify is:",error);

        if (error?.response?.status == 400) {
          toast({
            description:"Invalid OTP",
          }); 
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received from the server");
        } else {
          // Something else happened while setting up the request
          console.error("Error while sending the request:", error.message);
        }
        
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <Card className="w-full max-w-md dark:bg-black">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Enter Your OTP
          </CardTitle>
          <CardDescription className="text-center"></CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-2 justify-center my-10">
              <InputOTP
                maxLength={4}
                pattern={REGEXP_ONLY_DIGITS}
                value={value}
                onChange={(value) => setValue(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
              <div className="text-center text-sm">
                {value === "" ? (
                  <>Enter your one-time password.</>
                ) : (
                  <>You entered: {value}</>
                )}
              </div>
            </div>

            <Button
              className="w-full hover:bg-green-400 font-semibold"
              type="submit"
            >
              Enter
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordOtpPage;
