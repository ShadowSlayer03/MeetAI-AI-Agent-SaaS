import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentsInsertSchema, agentsUpdateSchema } from "../schemas";
import { z } from "zod";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/constants";
import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({
  update: protectedProcedure
    .input(agentsUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const [updatedAgent] = await db
        .update(agents)
        .set(input)
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id))
        )
        .returning();

      if (!updatedAgent)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Agent Not Found!",
        });

      return updatedAgent;
    }),
  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const [removedAgent] = await db
        .delete(agents)
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id))
        )
        .returning();

      if (!removedAgent)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Agent Not Found!",
        });

      return removedAgent;
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [existingAgent] = await db
        .select({
          ...getTableColumns(agents),
          meetingCount: sql<number>`COUNT(meetings.id)`.as("meetingCount"),
        })
        .from(agents)
        .leftJoin(meetings, eq(meetings.agentId, agents.id))
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id))
        )
        .groupBy(agents.id); // 👈 Required when using aggregation

      if (!existingAgent)
        throw new TRPCError({ code: "NOT_FOUND", message: "Agent Not Found!" });

      return existingAgent;
    }),
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(MIN_PAGE_SIZE)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { search, page, pageSize } = input;

      const whereClause = [
        eq(agents.userId, ctx.auth.user.id),
        search ? ilike(agents.name, `%${search}%`) : undefined,
      ].filter(Boolean);

      const data = await db
        .select({
          ...getTableColumns(agents),
          meetingCount: sql<number>`COUNT(meetings.id)`.as("meetingCount"),
        })
        .from(agents)
        .leftJoin(meetings, eq(meetings.agentId, agents.id))
        .where(and(...whereClause))
        .groupBy(agents.id)
        .orderBy(desc(agents.createdAt), desc(agents.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      console.log("Dataaaa:", data);

      const [total] = await db
        .select({ count: count() })
        .from(agents)
        .where(and(...whereClause));

      return {
        items: data,
        total: total.count,
        totalPages: Math.ceil(total.count / pageSize),
      };
    }),

  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const { name, instructions } = input;
      const { auth } = ctx;
      const now = new Date();

      const [createdAgent] = await db
        .insert(agents)
        .values({
          name,
          instructions,
          userId: auth.user.id,
          createdAt: now,
          updatedAt: now,
        })
        .returning();

      return createdAgent;
    }),
});
