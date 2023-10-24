"use client";

import { trpc } from "@/app/_trpc/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { cn } from "@/lib/utils";
import { driverStatusMap } from "./drivers/driver-data-table-columns";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import {
  vehicleStatusMap,
  vehicleTypeMap,
} from "./vehicles/vehicle-data-table-columns";
import { Checkbox } from "./ui/checkbox";

interface DashboardTabsProps {}

export default function DashboardTabs({}: DashboardTabsProps) {
  const utils = trpc.useContext();
  const { data: drivers } = trpc.getDrivers.useQuery();
  const { data: vehicles } = trpc.getVehicles.useQuery();
  const { data: trips } = trpc.getTrips.useQuery();
  const { mutateAsync: updateTrip } = trpc.updateTrip.useMutation({
    onSuccess: () => {
      utils.invalidate();
    },
  });

  const handleUpdateTrip = async (
    id: string,
    vin: string,
    employeeId: string
  ) => {
    await updateTrip({ id });
  };

  const availableDriverCount = drivers?.filter(
    (driver) => driver.status !== "UNAVAILABLE"
  ).length;

  const availableVehicleCount = vehicles?.filter(
    (vehicle) => vehicle.vehicleStatus === "AVAILABLE"
  ).length;

  const onGoingTrips = trips?.filter((trip) => !trip.isEnded).length;

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        {/* <TabsTrigger value="reports" disabled>
          Reports
        </TabsTrigger> */}
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 grid-cols-2">
          <Card className="col-span-1">
            <CardHeader className="flex flex-row justify-between">
              <div>
                <CardTitle>Drivers</CardTitle>
                <CardDescription>
                  {availableDriverCount === 0
                    ? "No drivers are"
                    : availableDriverCount === 1
                    ? "1 driver is"
                    : `${availableDriverCount} drivers are`}{" "}
                  available at the moment.
                </CardDescription>
              </div>
              <div>
                <Link
                  href="/drivers"
                  className={buttonVariants({ variant: "link" })}
                >
                  Edit
                </Link>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-2">
              {drivers?.map((driver) => (
                <div key={driver.license} className="flex justify-between">
                  <div className="text-base">
                    {driver.firstName} {driver.lastName} ({driver.license})
                  </div>
                  <div
                    className={cn("px-3 text-base py-1 rounded text-black", {
                      "bg-green-400": driver.status === "AVAILABLE",
                      "bg-red-400": driver.status === "UNAVAILABLE",
                    })}
                  >
                    {driverStatusMap[driver.status]}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader className="flex flex-row justify-between">
              <div>
                <CardTitle>Vehicles</CardTitle>
                <CardDescription>
                  {availableVehicleCount === 0
                    ? "No vehicles are"
                    : availableVehicleCount === 1
                    ? "1 vehicle is"
                    : `${availableVehicleCount} vehicles are`}{" "}
                  available at the moment.
                </CardDescription>
              </div>
              <div>
                <Link
                  href="/vehicles"
                  className={buttonVariants({ variant: "link" })}
                >
                  Edit
                </Link>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-2">
              {vehicles?.map((vehicle) => (
                <div key={vehicle.vin} className="flex justify-between">
                  <div className="text-base">
                    {vehicle.plate} ({vehicleTypeMap[vehicle.vehicleType]})
                  </div>
                  <div
                    className={cn("px-3 text-base py-1 rounded text-black", {
                      "bg-green-400": vehicle.vehicleStatus === "AVAILABLE",
                      "bg-red-400": vehicle.vehicleStatus === "UNAVAILABLE",
                      "bg-yellow-700": vehicle.vehicleStatus === "MAINTENANCE",
                    })}
                  >
                    {vehicleStatusMap[vehicle.vehicleStatus]}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Trips</CardTitle>
              <CardDescription>
                {onGoingTrips === 0
                  ? "No trips are"
                  : onGoingTrips === 1
                  ? "1 trip is"
                  : `${onGoingTrips} trips are`}{" "}
                currently on going.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-2">
              {trips
                ?.filter((trip) => !trip.isEnded)
                .map((trip) => (
                  <div
                    key={trip.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex flex-col">
                      <div className="text-base">
                        {trip.startLocation}
                        {" -> "}
                        {trip.endLocation}
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">Driver:</span>{" "}
                        {trip.driver.firstName} {trip.driver.lastName} |{" "}
                        {trip.vehicle.plate}
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">Vehicle:</span>{" "}
                        {trip.vehicle.plate}
                      </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <Checkbox
                        id={`tripEnd-${trip.id}`}
                        onCheckedChange={() => {
                          handleUpdateTrip(trip.id, trip.vin, trip.employeeId);
                        }}
                        aria-label="Select all"
                        className="w-6 h-6"
                      />
                      <label
                        htmlFor={`tripEnd-${trip.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        End trip
                      </label>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
