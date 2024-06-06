"use client";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../UserDashboardComponents/UserAppointmentTable/DataTable ";
import { columns } from "../../UserDashboardComponents/UserAppointmentTable/columns";
import { UserAppointmentTableLoading } from "../../UserDashboardComponents/UserAppointmentTableLoading/UserAppointmentTableLoading";
import GetUserAppointments from "@/api/appointment/getUserAppointment";


const UserDashboardAppointments = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["UserAppointments"],
    queryFn: GetUserAppointments,
  });

  // console.log("data is",data);
  

  return (
    <main>
      <h2 className="text-2xl text-center font-semibold mb-5">
        User Appointment List
      </h2>
      <DropdownMenuSeparator className="my-5 bg-primary" />
      {isLoading ? (
        <UserAppointmentTableLoading/>
      ) : (
        <DataTable columns={columns} data={data?.data || []} />
      )}
    </main>
  );
};

export default UserDashboardAppointments;
