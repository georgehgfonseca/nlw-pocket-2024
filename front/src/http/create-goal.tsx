import Config from "../util/config";

interface CreateGoalRequest {
  title: string;
  desiredWeeklyFrequency: number;
}

export default async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  await fetch(`${Config.API_URL}goals`, {
    method: "POST",
    body: JSON.stringify({
      title,
      desiredWeeklyFrequency: desiredWeeklyFrequency,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
}
