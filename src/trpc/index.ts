import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { InsuranceProviders, VehicleStatus } from "@prisma/client";
import { db } from "@/db/prisma";
import { TRPCError } from "@trpc/server";

InsuranceProviders;

export const appRouter = router({
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
    }),
});

export type AppRouter = typeof appRouter;
