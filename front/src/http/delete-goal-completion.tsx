import Config from "../util/config";

export default async function deleteGoalCompletion(goalId: string) {
  await fetch(`${Config.API_URL}goal-completions`, {
    method: "DELETE",
    body: JSON.stringify({ goalId: goalId }),
    headers: {
      "Content-type": "application/json",
    },
  });
}
