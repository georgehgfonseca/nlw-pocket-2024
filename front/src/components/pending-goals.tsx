import { IWeekPendingGoal } from "../http/get-week-pending-goals";
import { OutlineButton } from "./ui/outline-button";
import { Plus } from "lucide-react";
import createGoalCompletion from "../http/create-goal-completion";
import { useQueryClient } from "@tanstack/react-query";

interface IPendingGoals {
  pendingGoals?: IWeekPendingGoal[];
}

export default function PendingGoals({ pendingGoals }: IPendingGoals) {
  const queryClient = useQueryClient();

  const handleCompleteGoal = async (goalId: string) => {
    await createGoalCompletion(goalId);
    queryClient.invalidateQueries({
      queryKey: ["week-summary"],
    });
    queryClient.invalidateQueries({
      queryKey: ["pending-goals"],
    });
  };

  return (
    <div className='flex flex-wrap gap-3 overflow-x-auto whitespace-nowrap w-[480px]'>
      {pendingGoals &&
        pendingGoals.map((goal, idx) => {
          return (
            <OutlineButton
              key={idx}
              disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
              onClick={() => handleCompleteGoal(goal.id)}
            >
              <Plus className='size-4 text-zinc-600' />
              {goal.title}
            </OutlineButton>
          );
        })}
    </div>
  );
}
