import Config from "../util/config";

export default async function createGoalCompletion(goalId: string) {
  await fetch(`${Config.API_URL}goal-completions`, {
    method: "POST",
    body: JSON.stringify({ goalId: goalId }),
    headers: {
      "Content-type": "application/json",
    },
  });
}
