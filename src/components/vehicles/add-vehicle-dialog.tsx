"use client";

import { PropsWithChildren, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import AddVehicleForm from "./add-vehicle-form";

type AddVehicleDialogProps = (
  | {
      action: "add";
    }
  | {
      action: "edit";
      vin: string;
    }
) &
  PropsWithChildren;

export default function AddVehicleDialog(props: AddVehicleDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(visible) => {
        if (!visible) {
          setIsOpen(visible);
        }
      }}
    >
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {props.children}
      </DialogTrigger>
      <DialogContent>
        <div>
          <h3 className="text-lg font-medium">Add a vehicle</h3>
        </div>
        {props.action === "add" ? (
          <AddVehicleForm
            hideDialog={() => setIsOpen(false)}
            formType={props.action}
          />
        ) : props.action === "edit" ? (
          <AddVehicleForm
            hideDialog={() => setIsOpen(false)}
            formType={props.action}
            vin={props.vin}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
