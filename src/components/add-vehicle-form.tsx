"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Link from "next/link";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const addVehicleSchema = z.object({
  vin: z.string().min(1, {
    message: "Vehicle identification number is required.",
  }),
  plate: z.string().min(1, {
    message: "Vehicle plate number is required.",
  }),
  vehicleType: z.string({
    required_error: "Please select an vehicle type.",
  }),
  vehicleStatus: z.string({
    required_error: "Please select an vehicle status.",
  }),
  insProvider: z.string().min(1, {
    message: "Vehicle insurance provider is required.",
  }),
  insExpire: z.date({
    required_error: "Please provide a the insurance expire date.",
  }),
  registrationExpire: z.date({
    required_error: "Please provide a the registration expire date.",
  }),
});

type addVehicleFormValues = z.infer<typeof addVehicleSchema>;

interface AddVehicleFormProps {}

export default function AddVehicleForm({}: AddVehicleFormProps) {
  const form = useForm<addVehicleFormValues>({
    resolver: zodResolver(addVehicleSchema),
    mode: "onChange",
  });

  const onSubmit = (data: addVehicleFormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="vin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>VIN</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is the vehicle identification number or Chassis number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="plate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Number Plate</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Eg: CP BAK 2222</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="registrationExpire"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registration Expire</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start w-full text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="h-4 w-4" />
                      {field.value && format(field.value, "PPPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      initialFocus
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vehicleType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a vehicle type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="LIGHT_TRUCK">Light truck</SelectItem>
                  <SelectItem value="HEAVY_TRUCK">Heavy truck</SelectItem>
                  <SelectItem value="MINI_VAN">Mini van</SelectItem>
                  <SelectItem value="VAN">Van</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="insProvider"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Insurance Provider</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the vehicle insurance provider" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CEYLINCO">Ceylinco Insurance</SelectItem>
                  <SelectItem value="ALLIANZ">
                    Allianz Insurance Lanka Ltd
                  </SelectItem>
                  <SelectItem value="SLI">
                    Sri Lanka Insurance Corporation
                  </SelectItem>
                  <SelectItem value="UNION">Union Assurance</SelectItem>
                  <SelectItem value="JANASHAKTHI">
                    Janashakthi Insurance
                  </SelectItem>
                  <SelectItem value="AIA">AIA Insurance Lanka</SelectItem>
                  <SelectItem value="LOLC">LOLC Insurance</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="insExpire"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Insurance Expire</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start w-full text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="h-4 w-4" />
                      {field.value && format(field.value, "PPPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      initialFocus
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
