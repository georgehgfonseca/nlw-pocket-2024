import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeekPendingGoals } from "../../services/get-week-pending-goals";

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async (
  app,
  _opts
) => {
  app.get("/pending-goals", {}, async (req) => {
    const { pendingGoals } = await getWeekPendingGoals();
    return { pendingGoals };
  });
};
