import DeleteAppointment from "@/api/appointment/deleteAppointment";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ViewCustomerModal from "./ViewCustomerModal";
import { useState } from "react";

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

const ActionButton = ({ apoointment }: { apoointment: AppointmentData }) => {
  // console.log("apoointment", apoointment);
  const queryClient = useQueryClient();
  const [menuOpen,setMenuOpen] = useState<boolean>(false);

  const handleModalClose = () => {
    setMenuOpen(false);
  };

  const { mutate, isPending } = useMutation({
    mutationKey: [],
    mutationFn: DeleteAppointment,
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

  const handleDelete = async () => {
    console.log("Delete Appointments", apoointment);
    console.log("Delete button clicked");
    const appointmentId = apoointment._id;
    await mutate({ appointmentId });
  };

  return (
    <>
      <DropdownMenu  onOpenChange={setMenuOpen} open={menuOpen}>
        <DropdownMenuTrigger asChild onClick={()=>setMenuOpen(!menuOpen)}>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 border-none focus-visible:ring-0"
          >
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(apoointment._id)}
          >
            Copy payment ID
          </DropdownMenuItem>
          {/* <DropdownMenuItem onSelect={(e) => e.preventDefault()}><StatusChangeOption appointmentData={apoointment}/></DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <ViewCustomerModal  onModalClose={handleModalClose} appointmentData={apoointment} />
          </DropdownMenuItem>
          <DropdownMenuItem>View payment details</DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            onSelect={(e) => e.preventDefault()}
            className="text-gray-200 bg-[#6a1c1d] focus:bg-[#782c2c] mt-1"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ActionButton;
