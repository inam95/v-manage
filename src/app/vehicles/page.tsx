"use client";

import AddVehicleDialog from "@/components/vehicles/add-vehicle-dialog";
import { Button } from "@/components/ui/button";
import VehicleDataTable from "@/components/vehicles/vehicle-table";
import { trpc } from "../_trpc/client";
import { $Enums } from "@prisma/client";
import { columns } from "@/components/vehicles/vehicle-data-table-columns";

interface VehiclePageProps {}

export type Vehicle = {
  id: string;
  vin: string;
  plate: string;
  vehicleType: $Enums.VehicleType;
  vehicleStatus: $Enums.VehicleStatus;
  insProvider: $Enums.InsuranceProviders;
  insExpire: string;
  registrationExpire: string;
};

export default function VehiclePage({}: VehiclePageProps) {
  const { data: vehicles } = trpc.getVehicles.useQuery();

  return (
    <main className="flex-1 p-8 pt-6">
      <div className="flex items-center justify-between ">
        <h2 className="text-3xl font-bold tracking-tight">Vehicles</h2>
        <div className="flex items-center space-x-2">
          <AddVehicleDialog action="add">
            <Button>Add a vehicle</Button>
          </AddVehicleDialog>
        </div>
      </div>
      <div className="h-full flex-1 flex-col mt-8">
        {vehicles && <VehicleDataTable data={vehicles} columns={columns} />}
      </div>
    </main>
  );
}
