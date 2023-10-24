import { Trip } from "@/app/trips/page";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
// import TripTableDataColumnHeader from "./trip-data-table-column-header";
// import TripDataTableRowActions from "./trip-data-table-row-action";
import { format } from "date-fns";
import TripTableDataColumnHeader from "./trip-data-table-column-header";
import { vehicleTypeMap } from "../vehicles/vehicle-data-table-columns";

export const columns: ColumnDef<Trip>[] = [
  {
    accessorKey: "startLocation",
    header: ({ column }) => (
      <TripTableDataColumnHeader column={column} title="Start Location" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("startLocation")}
        </span>
      </div>
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
    accessorKey: "employeeId",
    header: ({ column }) => (
      <TripTableDataColumnHeader column={column} title="Driver" />
    ),
    cell: ({ row }) => {
      const driverName = `${row.original.driver.firstName} ${row.original.driver.lastName}`;

      return (
        <div className="flex flex-col">
          <span className="max-w-[500px] truncate font-medium">
            {driverName}
          </span>
          <span className="max-w-[500px] truncate font-medium">
            ({row.original.driver.license})
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "vin",
    header: ({ column }) => (
      <TripTableDataColumnHeader column={column} title="Vehicle" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.vehicle.plate}
          </span>
          <span className="max-w-[500px] truncate font-medium">
            ({vehicleTypeMap[row.original.vehicle.vehicleType]})
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
