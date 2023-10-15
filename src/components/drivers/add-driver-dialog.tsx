"use client";

import { PropsWithChildren, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import AddDriverForm from "./add-driver-form";

type AddDriverDialogProps = (
  | {
      action: "add";
    }
  | {
      action: "edit";
      vin: string;
    }
) &
  PropsWithChildren;

export default function AddDriverDialog(props: AddDriverDialogProps) {
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
            {props.action === "add" ? "Add driver" : "Update driver"}
          </h3>
        </div>
        {props.action === "add" ? (
          <AddDriverForm
            hideDialog={() => setIsOpen(false)}
            formType={props.action}
          />
        ) : props.action === "edit" ? (
          <AddDriverForm
            hideDialog={() => setIsOpen(false)}
            formType={props.action}
            vin={props.vin}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
