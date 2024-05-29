"use client";
import GetAppointment from "@/api/appointment/getAppointmentList";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../DashboardComponents/Table/DataTable ";
import { columns } from "../../DashboardComponents/Table/columns";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

const DashboardAppointmentsPage = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["appointments"],
    queryFn: GetAppointment,
  });
  //   console.log("The data is:",data);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2 className="text-2xl text-center font-semibold mb-5">Appointment List</h2>
      <DropdownMenuSeparator className="my-5 bg-primary"/>
      <DataTable columns={columns} data={data?.data || []} />
    </div>
  );
};

export default DashboardAppointmentsPage;
