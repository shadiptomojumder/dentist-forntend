import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ViewCustomerModal from "./ViewCustomerModal";
import DeleteUser from "@/api/users/deleteUser";
import { useState } from "react";

interface UsersData {
  // Define the structure of your UsersData prop here
  _id: string,
  fullname: string,
  email: string,
  phone: string,
  role: string,
  createdAt: string,
  updatedAt: string,
  __v: number
}

const ActionButton = ({ usersData }: { usersData: UsersData }) => {
  // console.log("apoointment", usersData);
  const queryClient = useQueryClient();
  const [menuOpen,setMenuOpen] = useState<boolean>(false)
  console.log("menuOpen is",menuOpen);
  
  const handleModalClose = () => {
    setMenuOpen(false);
  };

  const { mutate, isPending } = useMutation({
    mutationKey: [],
    mutationFn: DeleteUser,
    onSuccess: (response) => {
      if (response.statusCode === 200) {
        toast.success("Status successfully Update");
        queryClient.invalidateQueries({ queryKey: ["users"] });
        setMenuOpen(false)
      }
    },
    onError: (error: any) => {
      // console.log("The Error Appointment is:", error);
      if (error?.response?.status == 404) {
        toast.warning(
          "Something went wrong during an delete"
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
    const userId = usersData._id;
    await mutate({ userId });
  };

  return (
    <>
      <DropdownMenu onOpenChange={setMenuOpen} open={menuOpen}>
        <DropdownMenuTrigger asChild onClick={()=>setMenuOpen(!menuOpen)}>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 border-none cursor-pointer focus-visible:ring-0"
          >
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(usersData._id)}
          >
            Copy user ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <ViewCustomerModal onModalClose={handleModalClose} usersData={usersData}/>
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
