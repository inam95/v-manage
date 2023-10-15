"use client";

import { PropsWithChildren, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import AddTripForm from "./add-trip-form";

type AddTripDialogProps = (
  | {
      action: "add";
    }
  | {
      action: "edit";
      vin: string;
    }
) &
  PropsWithChildren;

export default function AddTripDialog(props: AddTripDialogProps) {
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
          <h3 className="text-lg font-medium">
            {props.action === "add" ? "Add Trip" : "Update Trip"}
          </h3>
        </div>
        {props.action === "add" ? (
          <AddTripForm
            hideDialog={() => setIsOpen(false)}
            formType={props.action}
          />
        ) : props.action === "edit" ? (
          <AddTripForm
            hideDialog={() => setIsOpen(false)}
            formType={props.action}
            vin={props.vin}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
