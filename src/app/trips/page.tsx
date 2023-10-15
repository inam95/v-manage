"use client";

import AddTripDialog from "@/components/trips/add-trip-dialog";
import { Button } from "@/components/ui/button";
import { trpc } from "../_trpc/client";
import TripTable from "@/components/trips/trip-table";
import { columns } from "@/components/trips/trip-data-table-columns";

export type Trip = {
  startLocation: string;
  endLocation: string;
  mileage: number;
  fuelConsumed: number;
  vehicleId: string;
  driverId: string;
};

interface DriverPageProps {}

export default function DriverPage({}: DriverPageProps) {
  const { data: trips } = trpc.getTrips.useQuery();
  return (
    <main className="flex-1 p-8 pt-6">
      <div className="flex items-center justify-between ">
        <h2 className="text-3xl font-bold tracking-tight">Trips</h2>
        <div className="flex items-center space-x-2">
          <AddTripDialog action="add">
            <Button>Add a trip</Button>
          </AddTripDialog>
        </div>
      </div>
      <div className="h-full flex-1 flex-col mt-8">
        {trips && <TripTable data={trips} columns={columns} />}
      </div>
    </main>
  );
}
