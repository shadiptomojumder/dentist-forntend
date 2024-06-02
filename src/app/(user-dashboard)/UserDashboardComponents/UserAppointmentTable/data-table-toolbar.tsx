"use client";

import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui//button";
import { Input } from "@/components/ui//input";
import { DataTableViewOptions } from "./data-table-view-options";

import { format } from "date-fns";
import { statuses } from "./data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import DataTableFilterByDate from "./data-table-sortby-date";


interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  setFiltering: (filtering: string) => void;
  filtering: string;
}

export function DataTableToolbar<TData>({
  table,
  filtering,
  setFiltering,
}: DataTableToolbarProps<TData>) {
  // Check if specific facet filters are active
  const isFacetFiltered = table
    .getState()
    .columnFilters.some(
      (filter) => filter.id === "status" || filter.id === "priority"
    );

  return (
    <div className="flex md:flex-row flex-col gap-3 items-center justify-between overflow-x-auto">
      <section className="flex gap-4 items-center md:justify-start justify-between md:w-fit w-full">
        <div className="w-1/2 md:w-fit">
          <Input
            placeholder="Filter by anything..."
            value={filtering}
            onChange={(event) => setFiltering(event.target.value)}
            className="md:min-w-[250px] w-full focus:border-primary"
          />
        </div>

        <div className="w-1/2 md:w-fit">
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statuses}
            />
          )}

          {/* {isFacetFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )} */}
        </div>
      </section>

      <section className="flex items-center gap-4 md:w-fit w-full">
        <div className="w-1/2 md:w-fit">
          {/* {table.getColumn("appointmentDate") && (
            <DataTableFilterByDate
              column={table.getColumn("appointmentDate")}
              title="Date"
            />
          )} */}
        </div>

        <div className="w-1/2 md:w-fit">
          <DataTableViewOptions table={table} />
        </div>
      </section>
    </div>
  );
}
