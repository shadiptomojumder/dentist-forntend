"use client";
import GetAppointment from "@/api/appointment/getAppointmentList";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../DashboardComponents/AppointmentTable/DataTable ";
import { columns } from "../../DashboardComponents/AppointmentTable/columns";
import { AppointmentTableLoading } from "../../DashboardComponents/AppointmentTableLoading/AppointmentTableLoading";


const DashboardAppointmentsPage = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["appointments"],
    queryFn: GetAppointment,
  });

  return (
    <main>
      <h2 className="text-2xl text-center font-semibold mb-5">
        Appointment List
      </h2>
      <DropdownMenuSeparator className="my-5 bg-primary" />
      {isLoading ? (
        <AppointmentTableLoading/>
      ) : (
        <DataTable columns={columns} data={data?.data} />
      )}
    </main>
  );
};

export default DashboardAppointmentsPage;
