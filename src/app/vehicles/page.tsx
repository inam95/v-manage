"use client";

import AddVehicleDialog from "@/components/add-vehicle-dialog";
import { Button } from "@/components/ui/button";

interface VehiclePageProps {}

export default function VehiclePage({}: VehiclePageProps) {
  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Vehicles</h2>
        <div className="flex items-center space-x-2">
          <AddVehicleDialog />
        </div>
      </div>
    </main>
  );
}
