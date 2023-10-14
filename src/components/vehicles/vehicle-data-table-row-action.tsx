"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { PencilIcon } from "lucide-react";
import AddVehicleDialog from "./add-vehicle-dialog";

interface VehicleDataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export default function VehicleDataTableRowActions<TData>({
  row,
}: VehicleDataTableRowActionsProps<TData>) {
  return (
    <AddVehicleDialog action="edit" vin={row.getValue("vin")}>
      <Button variant="ghost">
        <PencilIcon className="w-5 h-5" />
      </Button>
    </AddVehicleDialog>
  );
}
