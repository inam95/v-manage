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
import { da } from "date-fns/locale";

const addVehicleSchema = z.object({
  vin: z.string().min(1, {
    message: "Vehicle identification number is required.",
  }),
  plate: z.string().min(1, {
    message: "Vehicle plate number is required.",
  }),
  registrationExpire: z.date({
    required_error: "Please provide a the registration expire date.",
  }),
  vehicleType: z.enum(["LIGHT_TRUCK", "HEAVY_TRUCK", "MINI_VAN", "VAN"], {
    required_error: "Please select an vehicle type.",
  }),
  vehicleStatus: z.enum(["AVAILABLE", "UNAVAILABLE", "MAINTENANCE"], {
    required_error: "Please select an vehicle status.",
  }),
  insProvider: z.enum(
    ["CEYLINCO", "ALLIANZ", "SLI", "UNION", "JANASHAKTHI", "AIA", "LOLC"],
    {
      required_error: "Vehicle insurance provider is required.",
    }
  ),
  insExpire: z.date({
    required_error: "Please provide a the insurance expire date.",
  }),
});

type TAddVehicleSchema = z.infer<typeof addVehicleSchema>;

const addVehicleDefaultValues: DefaultValues<TAddVehicleSchema> = {
  vin: "",
  plate: "",
};

type AddVehicleFormProps = (
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

export default function AddVehicleForm(props: AddVehicleFormProps) {
  const form = useForm<TAddVehicleSchema>({
    resolver: zodResolver(addVehicleSchema),
    mode: "onChange",
    defaultValues: addVehicleDefaultValues,
  });
  const utils = trpc.useContext();
  const { mutate: addVehicle } = trpc.addVehicle.useMutation();
  const { mutate: updateVehicle } = trpc.updateVehicle.useMutation();
  const { data: selectedVehicle } = trpc.getVehicle.useQuery(
    { vin: props.formType === "edit" ? props.vin : "" },
    {
      select: (data) => {
        return {
          ...data,
          registrationExpire: new Date(data.registrationExpire),
          insExpire: new Date(data.insExpire),
        };
      },
      onSuccess: (data) => {
        form.reset(data);
      },
      enabled: props.formType === "edit",
    }
  );

  const onSubmit = (data: TAddVehicleSchema) => {
    if (props.formType === "add") {
      addVehicle(
        {
          vin: data.vin,
          plate: data.plate,
          insProvider: data.insProvider,
          vehicleStatus: data.vehicleStatus,
          vehicleType: data.vehicleType,
          registrationExpire: data.registrationExpire,
          insExpire: data.insExpire,
        },
        {
          onSettled: () => {
            utils.getVehicles.invalidate();
          },
        }
      );
    } else if (props.formType === "edit") {
      updateVehicle(
        {
          vin: data.vin,
          updateValues: {
            vin: data.vin,
            plate: data.plate,
            insProvider: data.insProvider,
            vehicleStatus: data.vehicleStatus,
            vehicleType: data.vehicleType,
            registrationExpire: data.registrationExpire,
            insExpire: data.insExpire,
          },
        },
        {
          onSettled: () => {
            utils.getVehicles.invalidate();
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
              <Select onValueChange={field.onChange} {...field}>
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
          name="vehicleStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Status</FormLabel>
              <Select onValueChange={field.onChange} {...field}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="AVAILABLE">Available</SelectItem>
                  <SelectItem value="UNAVAILABLE">Unavailable</SelectItem>
                  <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
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
              <Select onValueChange={field.onChange} {...field}>
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
        <div className="flex justify-end gap-x-2">
          <Button variant="outline" type="button" onClick={props.hideDialog}>
            Cancel
          </Button>
          <Button type="submit">Add</Button>
        </div>
      </form>
    </Form>
  );
}
