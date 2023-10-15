"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "../ui/input";
import VehicleDataTableFacetedFilter from "./driver-data-table-faceted-filter";
import { Button } from "../ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";

const statuses = [
  {
    label: "Available",
    value: "AVAILABLE",
  },
  {
    label: "Unavailable",
    value: "UNAVAILABLE",
  },
];

interface DriverDataTableToolbarProps<TData> {
  table: Table<TData>;
}

export default function DriverDataTableToolbar<TData>({
  table,
}: DriverDataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by Employee Id..."
          value={
            (table.getColumn("employeeId")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("employeeId")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <VehicleDataTableFacetedFilter
            column={table.getColumn("status")}
            title="Vehicle status"
            options={statuses}
          />
        )}
        {isFiltered && (
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
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
