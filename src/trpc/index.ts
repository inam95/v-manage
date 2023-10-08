import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  test: publicProcedure.query(() => {
    return "Hello";
  }),
});

export type AppRouter = typeof appRouter;
