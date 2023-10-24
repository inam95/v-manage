import { Driver } from "@/app/drivers/page";
import { ColumnDef } from "@tanstack/react-table";
import DriverDataTableColumnHeader from "./driver-data-table-column-header";
import DriverDataTableRowActions from "./driver-data-table-row-action";

export const driverStatusMap: Record<string, string> = {
  AVAILABLE: "Available",
  UNAVAILABLE: "Unavailable",
};

export const columns: ColumnDef<Driver>[] = [
  {
    accessorKey: "employeeId",
    header: ({ column }) => (
      <DriverDataTableColumnHeader column={column} title="Employee Id" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("employeeId")}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "license",
    header: ({ column }) => (
      <DriverDataTableColumnHeader column={column} title="License" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("license")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DriverDataTableColumnHeader column={column} title="First Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("firstName")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DriverDataTableColumnHeader column={column} title="Last Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("lastName")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "age",
    header: ({ column }) => (
      <DriverDataTableColumnHeader column={column} title="Age" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("age")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DriverDataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span className="max-w-[500px] truncate font-medium">
            {driverStatusMap[`${row.getValue("status")}`]}
          </span>
        </div>
      );
    },

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DriverDataTableRowActions row={row} />,
  },
];
