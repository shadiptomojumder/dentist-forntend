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

interface UsersData {
  // Define the structure of your appointmentData prop here
  _id: string,
  fullname: string,
  email: string,
  phone: string,
  role: string,
  createdAt: string,
  updatedAt: string,
  __v: number
}

const StatusChangeOption = ({
  usersData,
  status,
  setStatus
}: {
  usersData: UsersData,
  status:string,
  setStatus: (status:string) => void
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  // const [status, setStatus] = useState<string>();
  console.log("status is", status);

  const handleStatusChange = async (value: string) => {
    setStatus(value);
    console.log("The value is:", value);
    const appointmentId = usersData._id;

    // await mutate({ data: { status: value }, appointmentId });
  };

  useEffect(() => {
    setStatus(usersData?.role);
  }, []);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full">
          <div>
          {status === "user" && (
            <Badge variant="default" className="bg-[#FFE569] hover:bg-[#FFE569] cursor-pointer">
              user
            </Badge>
          )}
          {status === "admin" && (
            <Badge variant="default" className="hover:bg-primary cursor-pointer">admin</Badge>
          )}
          {status === "super-admin" && (
            <Badge variant="default" className="bg-[#297c0b] hover:bg-[#297c0b] text-gray-200 cursor-pointer">
              super-admin
            </Badge>
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
              value="user"
              className={status === "pending" ? "bg-accent font-semibold" : ""}
            >
              User
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="admin"
              className={status === "booked" ? "bg-accent font-semibold" : ""}
            >
              Admin
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="super-admin"
              className={status === "done" ? "bg-accent font-semibold" : ""}
            >
              Super Admin
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default StatusChangeOption;
