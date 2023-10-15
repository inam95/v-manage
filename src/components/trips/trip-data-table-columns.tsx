import { Trip } from "@/app/trips/page";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
// import TripTableDataColumnHeader from "./trip-data-table-column-header";
// import TripDataTableRowActions from "./trip-data-table-row-action";
import { format } from "date-fns";
import TripTableDataColumnHeader from "./trip-data-table-column-header";

export const columns: ColumnDef<Trip>[] = [
  {
    accessorKey: "startLocation",
    header: ({ column }) => (
      <TripTableDataColumnHeader column={column} title="Start Location" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("startLocation")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "endLocation",
    header: ({ column }) => (
      <TripTableDataColumnHeader column={column} title="End Location" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("endLocation")}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "mileage",
    header: ({ column }) => (
      <TripTableDataColumnHeader column={column} title="Mileage (Kilometer)" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {`${row.getValue("mileage")} km`}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fuelConsumed",
    header: ({ column }) => (
      <TripTableDataColumnHeader
        column={column}
        title="Fuel Consumed (Liter)"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {`${row.getValue("fuelConsumed")} l`}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "driverId",
    header: ({ column }) => (
      <TripTableDataColumnHeader column={column} title="Driver" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("driverId")}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "vehicleId",
    header: ({ column }) => (
      <TripTableDataColumnHeader column={column} title="Driver" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("vehicleId")}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
