import Config from "../util/config";

interface IWeeklySummary {
  completed: number;
  total: number;
  goalsPerDay: Record<
    string,
    [
      {
        id: string;
        title: string;
        completedAt: string;
      }
    ]
  >;
}

export default async function getWeeklySummary(): Promise<IWeeklySummary> {
  const response = await fetch(`${Config.API_URL}week-summary`);
  const data = await response.json();
  return data.summary;
}
