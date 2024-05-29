import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import StatusChangeOption from "./StatusChangeOption";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UpdateAppointment from "@/api/appointment/updateAppointment";
import { toast } from "sonner";

interface AppointmentData {
  // Define the structure of your appointmentData prop here
  _id: string;
  name: string;
  phone: string;
  address: string;
  service: string;
  appointmentDate: string;
  appointmentTime: string;
  message: string;
  status: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ViewCustomerModal = ({
  appointmentData,
}: {
  appointmentData: AppointmentData;
}) => {

  const queryClient = useQueryClient();


  const [status, setStatus] = useState<string>("");
  console.log("changeedStatus", status);

    const { mutate, isPending } = useMutation({
      mutationKey: [],
      mutationFn: UpdateAppointment,
      onSuccess: (response) => {
        console.log("the res is ", response);

        if (response.statusCode === 200) {
          toast.success("Status successfully Update");
          queryClient.invalidateQueries({ queryKey: ["appointments"] });
        }
      },
      onError: (error: any) => {
        console.log("The Error Appointment is:", error);
        if (error?.response?.status == 409) {
          toast.warning(
            "There is already an appointment with this name and date."
          );
        } else if (error?.response?.status == 500) {
          toast.error("Something went wrong during an appointment");
        } else if (error.request) {
          toast.error("No response received from the server!!");
        } else {
          console.error("Error while sending the request:", error.message);
        }
      },
    });

  const handleChanges = async () =>{
    const appointmentId = appointmentData?._id;

    await mutate({ data: { status: status }, appointmentId });
  }
  

  // useEffect(()=>{
  //   setStatus(appointmentData?.status);
  // },[])


  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <h2>View patient details</h2>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[600px] md:max-w-[550px] max-w-[90dvw] rounded-lg">
        <DialogHeader>
          <DialogTitle className="">Patient Details</DialogTitle>
          <Separator className="bg-primary" />
          <DialogDescription>
            <section className="grid grid-cols-10 gap-3 sm:items-center items-start my-2">      
                <Label className="text-base font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">Name<span>:</span></Label>
                <h2 className="sm:col-span-6 col-span-4 text-gray-300 font-medium text-base text-start">{appointmentData?.name}</h2>

                <Label className="text-base font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">Phone number<span>:</span></Label>
                <h2 className="sm:col-span-6 col-span-4 text-gray-300 font-medium text-base text-start">{appointmentData?.phone}</h2>

                <Label className="text-base font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">Service<span>:</span></Label>
                <h2 className="sm:col-span-6 col-span-4 text-gray-300 font-medium text-base text-start">{appointmentData?.service}</h2>

                <Label className="text-base font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">Appointment Time<span>:</span></Label>
                <h2 className="sm:col-span-6 col-span-4 text-gray-300 font-medium text-base text-start">{appointmentData?.appointmentTime}</h2>

                <Label className="text-base font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">Appointment Date<span>:</span></Label>
                <h2 className="sm:col-span-6 col-span-4 text-gray-300 font-medium text-base text-start">{appointmentData?.appointmentDate}</h2>

                <Label className="text-base font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">Status<span>:</span></Label>
                <div className="sm:col-span-6 col-span-4 text-gray-300 font-medium text-base text-start">
                  <StatusChangeOption appointmentData={appointmentData} status={status} setStatus={setStatus}/>
                </div>

                <Label className="text-base font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">Address<span>:</span></Label>
                <h2 className="sm:col-span-6 col-span-4 text-gray-300 font-medium text-base text-start">{appointmentData?.address}</h2>

                <Label className="text-base font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">Message<span>:</span></Label>
                <h2 className="sm:col-span-6 col-span-4 text-gray-300 font-medium text-base text-start">{appointmentData?.message}</h2>
              
            </section>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleChanges} disabled={appointmentData?.status === status} className="hover:bg-primary">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCustomerModal;
