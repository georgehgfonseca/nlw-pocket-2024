import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createGoalCompletion } from "../../services/create-goal-completion";

export const createGoalCompletionRoute: FastifyPluginAsyncZod = async (
  app,
  _opts
) => {
  app.post(
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

      const result = await createGoalCompletion({
        goalId: body.goalId,
      });

      return { result };
    }
  );
};
