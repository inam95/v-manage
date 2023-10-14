"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "../ui/input";
import VehicleDataTableFacetedFilter from "./vehicle-data-table-faceted-filter";
import { Button } from "../ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";

interface VehicleDataTableToolbarProps<TData> {
  table: Table<TData>;
}

const vehicleStatuses = [
  {
    label: "Available",
    value: "AVAILABLE"
  },
  {
    label: "Unavailable",
    value: "UNAVAILABLE"
  },
  {
    label: "Maintenance",
    value: "MAINTENANCE"
  }
];

const vehicleTypes = [
  {
    label: "Light truck",
    value: "LIGHT_TRUCK"
  },
  {
    label: "Heavy truck",
    value: "HEAVY_TRUCK"
  },
  {
    label: "Mini van",
    value: "MINI_VAN"
  },
  {
    label: "Van",
    value: "VAN"
  }
];

const insProviders = [
  {
    label: "Ceylinco Insurance",
    value: "CEYLINCO"
  },
  {
    label: "Allianz Insurance Lanka Ltd",
    value: "ALLIANZ"
  },
  {
    label: "Sri Lanka Insurance Corporation",
    value: "SLI"
  },
  {
    label: "Union Assurance",
    value: "UNION"
  },
  {
    label: "Janashakthi Insurance",
    value: "JANASHAKTHI"
  },
  {
    label: "AIA Insurance Lanka",
    value: "AIA"
  },
  {
    label: "LOLC Insurance",
    value: "LOLC"
  }
];

export default function VehicleDataTableToolbar<TData>({
  table
}: VehicleDataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("vin")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("vin")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("vehicleStatus") && (
          <VehicleDataTableFacetedFilter
            column={table.getColumn("vehicleStatus")}
            title="Vehicle status"
            options={vehicleStatuses}
          />
        )}
        {table.getColumn("vehicleType") && (
          <VehicleDataTableFacetedFilter
            column={table.getColumn("vehicleType")}
            title="Vehicle type"
            options={vehicleTypes}
          />
        )}
        {table.getColumn("insProvider") && (
          <VehicleDataTableFacetedFilter
            column={table.getColumn("insProvider")}
            title="Insurance provider"
            options={insProviders}
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
