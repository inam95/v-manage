"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type DefaultValues } from "react-hook-form";
import * as z from "zod";

import { trpc } from "@/app/_trpc/client";
import { Button } from "../ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const addDriverSchema = z.object({
  license: z.string().min(1, {
    message: "Driver's License number is required.",
  }),
  employeeId: z.string().min(1, {
    message: "Employee Id is required.",
  }),
  firstName: z.string().min(1, {
    message: "First name is required.",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required.",
  }),
  age: z
    .string()
    .min(1, {
      message: "Age is required.",
    })
    .refine((num) => !isNaN(Number(num)) && Number(num) > 0, {
      message: "Age is not valid",
    }),

  status: z.enum(["AVAILABLE", "UNAVAILABLE"], {
    required_error: "Please select a driver status.",
  }),
});

type TAddDriverSchema = z.infer<typeof addDriverSchema>;

const addDriverDefaultValues: DefaultValues<TAddDriverSchema> = {
  firstName: "",
  lastName: "",
  employeeId: "",
  license: "",
  age: "",
};

type AddDriverFormProps = (
  | {
      formType: "add";
    }
  | {
      formType: "edit";
      employeeId: string;
    }
) & {
  hideDialog: () => void;
};

export default function AddDriverForm(props: AddDriverFormProps) {
  const form = useForm<TAddDriverSchema>({
    resolver: zodResolver(addDriverSchema),
    mode: "onChange",
    defaultValues: addDriverDefaultValues,
  });
  const utils = trpc.useContext();
  const { mutate: addDriver } = trpc.addDriver.useMutation();
  const { mutate: updateDriver } = trpc.updateDriver.useMutation();
  const { data: selectedDriver } = trpc.getDriver.useQuery(
    { employeeId: props.formType === "edit" ? props.employeeId : "" },
    {
      select: (data) => {
        return {
          ...data,
          age: data.age.toString(),
        };
      },
      onSuccess: (data) => {
        form.reset(data);
      },
      enabled: props.formType === "edit",
    }
  );

  const onSubmit = (data: TAddDriverSchema) => {
    if (props.formType === "add") {
      addDriver(
        {
          license: data.license,
          employeeId: data.employeeId,
          firstName: data.firstName,
          lastName: data.lastName,
          age: Number(data.age),
          status: data.status,
        },
        {
          onSettled: () => {
            utils.getDrivers.invalidate();
          },
        }
      );
    } else if (props.formType === "edit") {
      updateDriver(
        {
          employeeId: data.employeeId,
          updateValues: {
            employeeId: data.employeeId,
            license: data.license,
            firstName: data.firstName,
            lastName: data.lastName,
            age: Number(data.age),
            status: data.status,
          },
        },
        {
          onSettled: () => {
            utils.getDrivers.invalidate();
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
          name="license"
          render={({ field }) => (
            <FormItem>
              <FormLabel>License No</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is the driver&apos;s license number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employeeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee Id</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Driver Status</FormLabel>
              <Select onValueChange={field.onChange} {...field}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select driver status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="AVAILABLE">Available</SelectItem>
                  <SelectItem value="UNAVAILABLE">Unavailable</SelectItem>
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
