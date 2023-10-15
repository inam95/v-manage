"use client";

import AddDriverDialog from "@/components/drivers/add-driver-dialog";
import { Button } from "@/components/ui/button";

interface DriverPageProps {}

export default function DriverPage({}: DriverPageProps) {
  return (
    <main className="flex-1 p-8 pt-6">
      <div className="flex items-center justify-between ">
        <h2 className="text-3xl font-bold tracking-tight">Drivers</h2>
        <div className="flex items-center space-x-2">
          <AddDriverDialog action="add">
            <Button>Add a driver</Button>
          </AddDriverDialog>
        </div>
      </div>
      <div className="h-full flex-1 flex-col mt-8">
        {/* {vehicles && <VehicleDataTable data={vehicles} columns={columns} />} */}
      </div>
    </main>
  );
}
