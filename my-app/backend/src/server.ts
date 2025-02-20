import { router, publicProcedure } from './trpc'
import { db } from './db/turso'
import { siloTable } from './db/schema'
import { z } from 'zod'
import { eq } from 'drizzle-orm'

export const appRouter = router({
  silos: publicProcedure.query(async () => {
    const silos = await db.select().from(siloTable)
    return silos
  }),
  addSilo: publicProcedure
    .input(
      z.object({
        name: z.string(),
        crop: z.string(),
        volume: z.number(),
        stored: z.number(),
        customer: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { name, crop, volume, stored, customer } = input
      const silo = await db
        .insert(siloTable)
        .values({ name, crop, volume, stored, customer })
      return silo
    }),
  updateSilo: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        crop: z.string(),
        volume: z.number(),
        stored: z.number(),
        customer: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, name, crop, volume, stored, customer } = input
      const silo = await db
        .update(siloTable)
        .set({ name, crop, volume, stored, customer })
        .where(eq(siloTable.id, id))
      return silo
    }),
  deleteSilo: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input
      const silo = await db.delete(siloTable).where(eq(siloTable.id, id))
      return silo
    }),
})

export type AppRouter = typeof appRouter
