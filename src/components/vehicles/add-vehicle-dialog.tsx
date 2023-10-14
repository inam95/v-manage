"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import AddVehicleForm from "./add-vehicle-form";

interface AddVehicleDialogProps {}

export default function AddVehicleDialog({}: AddVehicleDialogProps) {
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
        <Button>Add a vehicle</Button>
      </DialogTrigger>
      <DialogContent>
        <div>
          <h3 className="text-lg font-medium">Add a vehicle</h3>
        </div>
        <AddVehicleForm />
      </DialogContent>
    </Dialog>
  );
}
