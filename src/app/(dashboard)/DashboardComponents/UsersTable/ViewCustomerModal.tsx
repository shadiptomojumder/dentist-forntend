import UpdateUser from "@/api/users/updateUser";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import StatusChangeOption from "./StatusChangeOption";

interface UsersData {
  // Define the structure of your appointmentData prop here
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ViewCustomerModal = ({
  usersData,
  onModalClose,
}: {
  usersData: UsersData;
  onModalClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const handleClose = () => {
    onModalClose();
  };

  const [role, setRole] = useState<string>("");
  // console.log("changeedStatus", role);

  const { mutate, isPending } = useMutation({
    mutationKey: [],
    mutationFn: UpdateUser,
    onSuccess: (response) => {
      if (response.statusCode === 200) {
        toast.success("Status successfully Update");
        queryClient.invalidateQueries({ queryKey: ["users"] });
        onModalClose();
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

  const handleChanges = async () => {
    const userId = usersData?._id;

    await mutate({ data: { role: role }, userId });
  };

  // useEffect(()=>{
  //   setStatus(appointmentData?.status);
  // },[])

  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <h2>View User details</h2>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[600px] md:max-w-[550px] max-w-[90dvw] rounded-lg">
        <DialogHeader>
          <DialogTitle className="">User Details</DialogTitle>
          <Separator className="bg-primary" />
          <DialogDescription>
            <section className="grid grid-cols-10 gap-3 sm:items-center items-start my-2">
              <Label className="text-base font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">
                Name<span>:</span>
              </Label>
              <h2 className="sm:col-span-6 col-span-4 text-gray-300 font-medium text-base text-start">
                {usersData?.fullname}
              </h2>

              <Label className="text-base font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">
                Email<span>:</span>
              </Label>
              <h2 className="sm:col-span-6 col-span-4 text-gray-300 font-medium text-base text-start">
                {usersData?.email}
              </h2>

              <Label className="text-base font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">
                Phone<span>:</span>
              </Label>
              <h2 className="sm:col-span-6 col-span-4 text-gray-300 font-medium text-base text-start">
                {usersData?.phone ? usersData?.phone : <p>Empty</p>}
              </h2>

              <Label className="text-base font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">
                Status<span>:</span>
              </Label>
              <div className="sm:col-span-6 col-span-4 text-gray-300 font-medium text-base text-start">
                <StatusChangeOption
                  usersData={usersData}
                  status={role}
                  setStatus={setRole}
                />
              </div>
            </section>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={handleChanges}
            disabled={usersData?.role === role}
            className="hover:bg-primary"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCustomerModal;
