import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { InsuranceProviders, VehicleStatus } from "@prisma/client";
import { db } from "@/db/prisma";
import { TRPCError } from "@trpc/server";

InsuranceProviders;

export const appRouter = router({
  // Vehicle APIs
  getVehicles: publicProcedure.query(async () => {
    const vehicles = await db.vehicle.findMany();
    return vehicles;
  }),

  getVehicle: publicProcedure
    .input(
      z.object({
        vin: z.string(),
      })
    )
    .query(async ({ input }) => {
      const vehicle = await db.vehicle.findFirst({
        where: {
          vin: input.vin,
        },
      });
      if (!vehicle) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return vehicle;
    }),

  addVehicle: publicProcedure
    .input(
      z.object({
        vin: z.string(),
        plate: z.string(),
        vehicleType: z.enum(["LIGHT_TRUCK", "HEAVY_TRUCK", "MINI_VAN", "VAN"]),
        vehicleStatus: z.enum(["AVAILABLE", "UNAVAILABLE", "MAINTENANCE"]),
        insProvider: z.enum([
          "CEYLINCO",
          "ALLIANZ",
          "SLI",
          "UNION",
          "JANASHAKTHI",
          "AIA",
          "LOLC",
        ]),
        insExpire: z.coerce.date(),
        registrationExpire: z.coerce.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const vehicle = await db.vehicle.create({
        data: input,
      });
      return vehicle;
    }),

  updateVehicle: publicProcedure
    .input(
      z.object({
        vin: z.string(),
        updateValues: z.object({
          vin: z.string(),
          plate: z.string(),
          vehicleType: z.enum([
            "LIGHT_TRUCK",
            "HEAVY_TRUCK",
            "MINI_VAN",
            "VAN",
          ]),
          vehicleStatus: z.enum(["AVAILABLE", "UNAVAILABLE", "MAINTENANCE"]),
          insProvider: z.enum([
            "CEYLINCO",
            "ALLIANZ",
            "SLI",
            "UNION",
            "JANASHAKTHI",
            "AIA",
            "LOLC",
          ]),
          insExpire: z.coerce.date(),
          registrationExpire: z.coerce.date(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const updatedVehicle = await db.vehicle.update({
        where: {
          vin: input.vin,
        },
        data: input.updateValues,
      });
      return updatedVehicle;
    }),

  // Driver APIs
  getDrivers: publicProcedure.query(async () => {
    const drivers = await db.driver.findMany({});
    return drivers;
  }),

  getDriver: publicProcedure
    .input(
      z.object({
        license: z.string(),
      })
    )
    .query(async ({ input }) => {
      const driver = await db.driver.findFirst({
        where: {
          license: input.license,
        },
      });
      if (!driver) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return driver;
    }),

  addDriver: publicProcedure
    .input(
      z.object({
        license: z.string(),
        employeeId: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        age: z.coerce.number(),
        status: z.enum(["AVAILABLE", "UNAVAILABLE"]),
      })
    )
    .mutation(async ({ input }) => {
      const driver = await db.driver.create({
        data: input,
      });

      return driver;
    }),

  updateDriver: publicProcedure
    .input(
      z.object({
        license: z.string(),
        updateValues: z.object({
          license: z.string(),
          employeeId: z.string(),
          firstName: z.string(),
          lastName: z.string(),
          age: z.coerce.number(),
          status: z.enum(["AVAILABLE", "UNAVAILABLE"]),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const updatedDriver = await db.driver.update({
        where: {
          license: input.license,
        },
        data: input.updateValues,
      });
      return updatedDriver;
    }),
});

export type AppRouter = typeof appRouter;
