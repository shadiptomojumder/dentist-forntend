import UpdateAppointment from "@/api/appointment/updateAppointment";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

const StatusChangeOption = ({
  appointmentData,
  status,
  setStatus
}: {
  appointmentData: AppointmentData,
  status:string,
  setStatus: (status:string) => void
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  // const [status, setStatus] = useState<string>();
  console.log("status is", status);

  // const { mutate, isPending } = useMutation({
  //   mutationKey: [],
  //   mutationFn: UpdateAppointment,
  //   onSuccess: (response) => {
  //     console.log("the res is ", response);

  //     if (response.statusCode === 200) {
  //       toast.success("Status successfully Update");
  //       router.refresh();
  //       queryClient.invalidateQueries({ queryKey: ["appointments"] });
  //     }
  //   },
  //   onError: (error: any) => {
  //     console.log("The Error Appointment is:", error);
  //     if (error?.response?.status == 409) {
  //       toast.warning(
  //         "There is already an appointment with this name and date."
  //       );
  //     } else if (error?.response?.status == 500) {
  //       toast.error("Something went wrong during an appointment");
  //     } else if (error.request) {
  //       toast.error("No response received from the server!!");
  //     } else {
  //       console.error("Error while sending the request:", error.message);
  //     }
  //   },
  // });

  const handleStatusChange = async (value: string) => {
    setStatus(value);
    console.log("The value is:", value);
    const appointmentId = appointmentData._id;

    // await mutate({ data: { status: value }, appointmentId });
  };

  useEffect(() => {
    setStatus(appointmentData?.status);
  }, []);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full">
          <div>
          {status === "pending" && (
            <Badge variant="default" className="bg-[#FFE569] hover:bg-[#FFE569] cursor-pointer">
              pending
            </Badge>
          )}
          {status === "booked" && (
            <Badge variant="default" className="hover:bg-primary cursor-pointer">booked</Badge>
          )}
          {status === "done" && (
            <Badge variant="default" className="bg-[#297c0b] hover:bg-[#297c0b] text-gray-200 cursor-pointer">
              done
            </Badge>
          )}
          {status === "failed" && (
            <Badge variant="destructive" className="cursor-pointer">failed</Badge>
          )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>Change status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={status}
            onValueChange={handleStatusChange}
          >
            <DropdownMenuRadioItem
              value="pending"
              className={status === "pending" ? "bg-accent font-semibold" : ""}
            >
              Pending
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="booked"
              className={status === "booked" ? "bg-accent font-semibold" : ""}
            >
              Booked
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="done"
              className={status === "done" ? "bg-accent font-semibold" : ""}
            >
              Done
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="failed"
              className={status === "failed" ? "bg-accent font-semibold" : ""}
            >
              Failed
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default StatusChangeOption;
