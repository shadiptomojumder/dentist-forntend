"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import ActionButton from "./ActionButton";
import { DataTableColumnHeader } from "./data-table-column-header";

// You can use a Zod schema here if you want.
export type UsersData = {
  // Define the structure of your UsersData prop here
  _id: string,
  fullname: string,
  email: string,
  phone: string,
  role: string,
  createdAt: string,
  updatedAt: string,
  __v: number
};

export const columns: ColumnDef<UsersData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "fullname",
    accessorKey: "fullname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => (
      <div className="capitalize text-nowrap">{row.getValue("fullname")}</div>
    ),
  },
  {
    id: "email",
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    enableSorting: true,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("email")}</div>
    ),
  },
  {
    id: "phone",
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const phoneNumber = row.getValue("phone");
      return (
        <>
        {
          phoneNumber ? <p>+88{row.getValue("phone")}</p>:<p>Empty</p>
        }
        
        </>
      )
    },
  },
  {
    id: "role",
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("role");
      return (
        <>
          {status === "user" && (
            <Badge
              variant="default"
              className="bg-[#FFE569] hover:bg-[#FFE569]"
            >
              {row.getValue("role")}
            </Badge>
          )}
          {status === "admin" && (
            <Badge variant="default" className="hover:bg-primary">
              {row.getValue("role")}
            </Badge>
          )}
          {status === "super-admin" && (
            <Badge variant="default" className="bg-[#297c0b] hover:bg-[#297c0b] text-white">
              {row.getValue("role")}
            </Badge>
          )}
          
        </>
      );
    },
    filterFn: (row, status, value) => {
      return value.includes(row.getValue(status));
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const usersData = row.original;
      console.log("usersData", usersData);

      return <ActionButton usersData={usersData} />;
    },
  },
];
