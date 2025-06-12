


import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter,  protectedProcedure } from "@/trpc/init";
import { agentInsertSchema } from "../schema";
import { z } from "zod";
import { eq, getTableColumns, sql } from "drizzle-orm";




export const agentRouter = createTRPCRouter({
    getMany: protectedProcedure.query(async () => {
        return  await db.select({ ...getTableColumns(agents), 
            //TODO change actual count
            meetingCounts: sql<number>`5`}).from(agents)
        

    }),
    getOne: protectedProcedure.input(z.object({id:z.string()})).query(async ({input}) => {
        const [existingAgent] = await db.select({ ...getTableColumns(agents), 
            //TODO change actual count
            meetingCounts: sql<number>`5`}).from(agents).where(eq(agents.id, input.id))
        return existingAgent;

    }),
    create: protectedProcedure.input(agentInsertSchema).mutation(async ({ input, ctx }) => {
        const [createdAgent] = await db.insert(agents).values({ ...input, userId: ctx.auth.user.id }).returning();
        return createdAgent;
    })

})
