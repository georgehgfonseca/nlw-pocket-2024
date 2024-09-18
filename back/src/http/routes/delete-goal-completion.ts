import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { deleteGoalCompletion } from "../../services/delete-goal-completion";

export const deleteGoalCompletionRoute: FastifyPluginAsyncZod = async (
  app,
  _opts
) => {
  app.delete(
    "/goal-completions",
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async (req) => {
      const body = req.body;

      const result = await deleteGoalCompletion({
        goalId: body.goalId,
      });

      return { result };
    }
  );
};
