"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef, FilterFn, Row, SortingFn } from "@tanstack/react-table";
import SortByDate from "./date-sorting";
import { parseISO, format, compareAsc } from 'date-fns';
import { DataTableColumnHeader } from "./data-table-column-header";
// This type is used to define the shape of our data.

// You can use a Zod schema here if you want.
export type Payment = {
  _id: string;
  name?: string;
  phone?: string;
  service?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  amount?: number;
  status: "pending" | "booked" | "done" | "failed";
  email?: string;
};










export const columns: ColumnDef<Payment>[] = [
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
    id: "name",
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    id: "appointmentDate",
    accessorKey: "appointmentDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Appointment Date" />
    ),
    enableSorting: true,
    cell: ({ row }) => <div className="capitalize">{row.getValue("appointmentDate")}</div>,
  },
  {
    id: "appointmentTime",
    accessorKey: "appointmentTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Appointment Time" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("appointmentTime")}</div>
    ),
  },
  {
    id: "phone",
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="capitalize">+88{row.getValue("phone")}</div>
    ),
  },
  {
    id: "status",
    accessorKey: "status",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <>
          {status === "pending" && (
            <Badge variant="outline" className="">
              {row.getValue("status")}
            </Badge>
          )}
          {status === "booked" && (
            <Badge variant="default">{row.getValue("status")}</Badge>
          )}
          {status === "done" && (
            <Badge variant="default" className="bg-[#297c0b] text-gray-200">
              {row.getValue("status")}
            </Badge>
          )}
          {status === "failed" && (
            <Badge variant="destructive">{row.getValue("status")}</Badge>
          )}
        </>
      );
    },
    filterFn: (row, status, value) => {
        return value.includes(row.getValue(status))
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment._id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
