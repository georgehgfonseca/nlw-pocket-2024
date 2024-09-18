import Config from "../util/config";

export interface IWeekPendingGoal {
  id: string;
  title: string;
  desiredWeeklyFrequency: number;
  completionCount: number;
}

export default async function getWeekPendingGoals(): Promise<
  IWeekPendingGoal[]
> {
  const response = await fetch(`${Config.API_URL}pending-goals`);
  const data = await response.json();
  return data.pendingGoals;
}
