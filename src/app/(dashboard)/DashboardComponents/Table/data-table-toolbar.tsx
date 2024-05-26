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

const todayOption = {
  label: "Today",
  value: format(new Date(), "dd MMMM yyyy"),
  icon: CheckIcon,
};
const tomorrowOption = {
  label: "Tomorrow",
  value: format(
    new Date(new Date().setDate(new Date().getDate() + 1)),
    "dd MMMM yyyy"
  ),
  icon: CheckIcon,
};
const data = [
  {
    label: "Today",
    value: format(new Date(), "dd MMMM yyyy"),
    icon: CheckIcon,
  },
  {
    label: "Tomorrow",
    value: format(
      new Date(new Date().setDate(new Date().getDate() + 1)),
      "dd MMMM yyyy"
    ),
    icon: CheckIcon,
  },
];

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
    <div className="flex items-center justify-between">
      <section className="flex flex-1 items-center space-x-2">
        <div>
          <Input
            placeholder="Filter by anything..."
            value={filtering}
            onChange={(event) => setFiltering(event.target.value)}
            className="max-w-[250px] focus:border-primary"
          />
        </div>

        <div>
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statuses}
            />
          )}

          {isFacetFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </section>

      <section className="flex items-center gap-4">
        {table.getColumn("appointmentDate") && (
          <DataTableFilterByDate
            column={table.getColumn("appointmentDate")}
            title="Date"
          />
        )}

        <DataTableViewOptions table={table} />
      </section>
    </div>
  );
}
