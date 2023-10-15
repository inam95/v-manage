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
import AddDriverDialog from "./add-driver-dialog";

interface DriverDataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export default function DriverDataTableRowActions<TData>({
  row,
}: DriverDataTableRowActionsProps<TData>) {
  return (
    <AddDriverDialog action="edit" employeeId={row.getValue("employeeId")}>
      <Button variant="ghost">
        <PencilIcon className="w-5 h-5" />
      </Button>
    </AddDriverDialog>
  );
}
