import { and, count, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import dayjs from "dayjs";
import { number } from "zod";

interface CreateGoalCompletionRequest {
  goalId: string;
}

export async function deleteGoalCompletion({
  goalId,
}: CreateGoalCompletionRequest) {
  await db.delete(goalCompletions).where(eq(goalCompletions.id, goalId));

  return { goalId };
}
