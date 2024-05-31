"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableColumnHeader } from "../AppointmentTable/data-table-column-header";

const data: TableData[] = [
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
];

export type TableData = {};

export const columns: ColumnDef<TableData>[] = [
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
    cell: ({ row }) => <Skeleton className="w-7 h-8 rounded-md bg-gray-500" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <Skeleton className="w-40 h-8 rounded-md bg-gray-500" />,
  },
  {
    accessorKey: "appointmentDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Appointment Date" />
    ),
    cell: ({ row }) => <Skeleton className="w-40 h-8 rounded-md bg-gray-500" />,
  },
  {
    accessorKey: "appointmentTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Appointment Time" />
    ),
    cell: ({ row }) => <Skeleton className="w-40 h-8 rounded-md bg-gray-500" />,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <Skeleton className="w-40 h-8 rounded-md bg-gray-500" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      return <Skeleton className="w-24 h-8 rounded-md bg-gray-500" />;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <Skeleton className="w-7 h-8 rounded-md bg-gray-500" />;
    },
  },
];

export function AppointmentTableLoading() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full space-y-5">
      <div className="flex xl:flex-row flex-col gap-3 md:items-center items-start justify-between">
        <div className="flex items-center xl:justify-start justify-between gap-5 w-full">
          <Skeleton className="md:w-60 w-40 h-8 rounded-md bg-gray-500" />
          <Skeleton className="md:w-40 w-40 h-8 rounded-md bg-gray-500" />
        </div>
        <div className="flex items-center xl:justify-end justify-between  gap-5 w-full">
          <Skeleton className="md:w-60 w-40 h-8 rounded-md bg-gray-500" />
          <Skeleton className="md:w-40 w-40 h-8 rounded-md bg-gray-500" />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={` ${
                    index % 2 == 0 ? "bg-slate-400" : "bg-slate-700"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
