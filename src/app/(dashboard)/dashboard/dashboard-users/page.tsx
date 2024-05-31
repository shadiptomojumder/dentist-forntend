"use client";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import GetAllUser from "@/api/users/getAllUser";
import { columns } from "../../DashboardComponents/UsersTable/columns";
import { DataTable } from "../../DashboardComponents/UsersTable/DataTable ";
import { UsersTableLoading } from "../../DashboardComponents/UsersTableLoading/UsersTableLoading";


const DashboardUsersPage = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: GetAllUser,
  });

  console.log("data",data);
  

  return (
    <div>
      <h2 className="text-2xl text-center font-semibold mb-5">
        User List
      </h2>
      <DropdownMenuSeparator className="my-5 bg-primary" />
      {isLoading ? (
        <UsersTableLoading/>
      ) : (
        <DataTable columns={columns} data={data?.data} />
      )}
    </div>
  );
};

export default DashboardUsersPage;
