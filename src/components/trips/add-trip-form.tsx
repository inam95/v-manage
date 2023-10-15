"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type DefaultValues } from "react-hook-form";
import * as z from "zod";

import { trpc } from "@/app/_trpc/client";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

const addTripSchema = z.object({
  startLocation: z.string().min(1, {
    message: "Start Location is required.",
  }),
  endLocation: z.string().min(1, {
    message: "End Location is required.",
  }),
  milage: z
    .string()
    .min(1, {
      message: "Milage is required.",
    })
    .refine((num) => !isNaN(Number(num)) && Number(num) > 0, {
      message: "Milage is not valid",
    }),
  fuelConsumed: z
    .string()
    .min(1, {
      message: "Fuel consumed is required.",
    })
    .refine((num) => !isNaN(Number(num)) && Number(num) > 0, {
      message: "Fuel consumed is not valid",
    }),
  employeeId: z.string().min(1, {
    message: "Driver is required.",
  }),
  vin: z.string().min(1, {
    message: "Vehicle is required.",
  }),
});

type TAddTripSchema = z.infer<typeof addTripSchema>;

const addTripDefaultValues: DefaultValues<TAddTripSchema> = {
  startLocation: "",
  endLocation: "",
  employeeId: "",
  vin: "",
};

type AddTripFormProps = (
  | {
      formType: "add";
    }
  | {
      formType: "edit";
      vin: string;
    }
) & {
  hideDialog: () => void;
};

type Options = {
  value: string;
  label: string;
};

export default function AddTripForm(props: AddTripFormProps) {
  const [driverOptions, setDriverOptions] = useState<Options[]>([]);
  const [vehiclesOptions, setVehiclesOptions] = useState<Options[]>([]);
  const form = useForm<TAddTripSchema>({
    resolver: zodResolver(addTripSchema),
    mode: "onChange",
    defaultValues: addTripDefaultValues,
  });
  const utils = trpc.useContext();

  const { data: drivers } = trpc.getDrivers.useQuery(undefined, {
    select: (data) => {
      return data.map((driver) => ({
        value: driver.employeeId,
        label: `${driver.firstName} ${driver.lastName}`,
      }));
    },
    onSuccess: (data) => {
      setDriverOptions(data);
    },
  });

  const { data: vehicles } = trpc.getVehicles.useQuery(undefined, {
    select: (data) => {
      return data.map((vehicle) => ({
        value: vehicle.vin,
        label: `${vehicle.plate} (${vehicle.vehicleType})`,
      }));
    },
    onSuccess: (data) => {
      setVehiclesOptions(data);
    },
  });

  const { mutate: addTrip } = trpc.addTrip.useMutation();

  const onSubmit = (data: TAddTripSchema) => {
    if (props.formType === "add") {
      addTrip(
        {
          startLocation: data.startLocation,
          endLocation: data.endLocation,
          mileage: Number(data.milage),
          fuelConsumed: Number(data.fuelConsumed),
          driverId: data.employeeId,
          vehicleId: data.vin,
        },
        {
          onSettled: () => {
            utils.getTrips.invalidate();
          },
        }
      );
    }
    props.hideDialog();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="startLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="milage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Milage</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Add the millage in km(Kilometer).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fuelConsumed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fuel Consumed</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Add consumed fuel in l(Liter).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employeeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Driver</FormLabel>
              <Select onValueChange={field.onChange} {...field}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select driver" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {driverOptions.map((driverOption) => (
                    <SelectItem
                      key={driverOption.value}
                      value={driverOption.value}
                    >
                      {driverOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle</FormLabel>
              <Select onValueChange={field.onChange} {...field}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vehiclesOptions.map((vehicleOption) => (
                    <SelectItem
                      key={vehicleOption.value}
                      value={vehicleOption.value}
                    >
                      {vehicleOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-x-2">
          <Button variant="outline" type="button" onClick={props.hideDialog}>
            Cancel
          </Button>
          <Button type="submit">
            {props.formType === "add" ? "Add" : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
