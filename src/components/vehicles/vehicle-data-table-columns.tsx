import { Vehicle } from "@/app/vehicles/page";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import VehicleTableDataColumnHeader from "./vehicle-data-table-column-header";
import VehicleDataTableRowActions from "./vehicle-data-table-row-action";
import { format } from "date-fns";

const vehicleStatusMap: Record<string, string> = {
  AVAILABLE: "Available",
  UNAVAILABLE: "Unavailable",
  MAINTENANCE: "Maintenance",
};

const vehicleTypeMap: Record<string, string> = {
  LIGHT_TRUCK: "Light truck",
  HEAVY_TRUCK: "Heavy truck",
  MINI_VAN: "Mini van",
  VAN: "Van",
};

const insProviderMap: Record<string, string> = {
  CEYLINCO: "Ceylinco Insurance",
  ALLIANZ: "Allianz Insurance Lanka Ltd",
  SLI: "Sri Lanka Insurance Corporation",
  UNION: "Union Assurance",
  JANASHAKTHI: "Janashakthi Insurance",
  AIA: "AIA Insurance Lanka",
  LOLC: "LOLC Insurance",
};

export const columns: ColumnDef<Vehicle>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    accessorKey: "vin",
    header: ({ column }) => (
      <VehicleTableDataColumnHeader column={column} title="VIN" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("vin")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "plate",
    header: ({ column }) => (
      <VehicleTableDataColumnHeader column={column} title="Plate" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("plate")}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "vehicleStatus",
    header: ({ column }) => (
      <VehicleTableDataColumnHeader column={column} title="Vehicle Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span className="max-w-[500px] truncate font-medium">
            {vehicleStatusMap[`${row.getValue("vehicleStatus")}`]}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "vehicleType",
    header: ({ column }) => (
      <VehicleTableDataColumnHeader column={column} title="Vehicle Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="max-w-[500px] truncate font-medium">
            {vehicleTypeMap[`${row.getValue("vehicleType")}`]}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "insProvider",
    header: ({ column }) => (
      <VehicleTableDataColumnHeader
        column={column}
        title="Insurance Provider"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="max-w-[500px] truncate font-medium">
            {insProviderMap[`${row.getValue("insProvider")}`]}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "insExpire",
    header: ({ column }) => (
      <VehicleTableDataColumnHeader
        column={column}
        title="Insurance Expiry Date"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="max-w-[500px] truncate font-medium">
            {format(new Date(row.getValue("insExpire")), "LLL dd, y")}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "registrationExpire",
    header: ({ column }) => (
      <VehicleTableDataColumnHeader
        column={column}
        title="Registration Expiry Date"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="max-w-[500px] truncate font-medium">
            {format(new Date(row.getValue("registrationExpire")), "LLL dd, y")}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <VehicleDataTableRowActions row={row} />,
  },
];
