import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { DialogTrigger } from "./ui/dialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import getWeeklySummary from "../http/get-weekly-summary";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import getWeekPendingGoals from "../http/get-week-pending-goals";
import PendingGoals from "./pending-goals";
import deleteGoalCompletion from "../http/delete-goal-completion";

export default function WeeklySummary() {
  const queryClient = useQueryClient();

  const {
    isPending: isPendingWeeklySummary,
    error: errorWeeklySummary,
    data: weeklySummary,
  } = useQuery({
    queryKey: ["week-summary"],
    queryFn: getWeeklySummary,
    staleTime: 60 * 1000,
  });

  const {
    isPending: isPendingPendingGoals,
    error: errorPendingGoals,
    data: pendingGoals,
  } = useQuery({
    queryKey: ["pending-goals"],
    queryFn: getWeekPendingGoals,
    staleTime: 60 * 1000,
  });

  dayjs.locale("pt-br");
  const startOfWeek = dayjs().startOf("week"); // Sunday
  const endOfWeek = dayjs().endOf("week"); // Saturday

  const handleDeleteGoalCompletion = async (goalId: string) => {
    await deleteGoalCompletion(goalId);
    queryClient.invalidateQueries({
      queryKey: ["week-summary"],
    });
    queryClient.invalidateQueries({
      queryKey: ["pending-goals"],
    });
  };

  return (
    <div className='flex flex-col py-10 justify-center items-center gap-6'>
      {isPendingWeeklySummary ||
        (isPendingPendingGoals && <p>Carregando...</p>)}
      {errorWeeklySummary && (
        <p>
          {errorWeeklySummary.message} {errorWeeklySummary.message}
        </p>
      )}
      {errorPendingGoals && (
        <p>
          {errorPendingGoals.message} {errorPendingGoals.message}
        </p>
      )}
      <div className='flex justify-between w-[480px]'>
        <div className='flex gap-3 items-center'>
          <img src='inorbit.svg' alt='logo' />
          <span className='flex text-lg font-semibold'>
            {dayjs(startOfWeek).format("D")} a {dayjs(endOfWeek).format("D")} de{" "}
            {dayjs(endOfWeek).format("MMMM")}
          </span>
        </div>
        <DialogTrigger asChild>
          <Button>
            <Plus className='size-4' />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>
      <div className='flex flex-col gap-3  w-[480px]'>
        <Progress value={weeklySummary?.completed} max={weeklySummary?.total}>
          <ProgressIndicator />
        </Progress>
        <div className='flex justify-between w-[480px] text-zinc-400'>
          <p>
            Você completou{" "}
            <span className='text-zinc-100 font-medium'>
              {weeklySummary?.completed}
            </span>{" "}
            de{" "}
            <span className='text-zinc-100 font-medium'>
              {weeklySummary?.total}
            </span>{" "}
            metas nessa semana.
          </p>
          <p>
            {Math.round(
              (weeklySummary!.completed / weeklySummary!.total) * 100
            )}
            %
          </p>
        </div>
      </div>
      <Separator />
      <PendingGoals pendingGoals={pendingGoals} />
      <div className='flex flex-col w-[480px] gap-6 justify-start items-start'>
        <h2 className='text-xl font-medium'>Sua semana</h2>
        <div className='flex flex-col gap-4'>
          {Object.keys(weeklySummary!.goalsPerDay).map((day) => {
            return (
              <div key={day} className='flex flex-col gap-4'>
                <h3 className='font-medium'>
                  <span className='capitalize'>
                    {dayjs(day).isSame(dayjs(), "day")
                      ? "Hoje"
                      : dayjs(day).isSame(dayjs().subtract(1, "day"), "day")
                      ? "Ontem"
                      : dayjs(day).format("dddd")}{" "}
                  </span>
                  <span className='text-zinc-400 text-sxs'>
                    ({dayjs(day).format("DD[ de ]MMMM")})
                  </span>
                </h3>
                <ul className='flex flex-col gap-3'>
                  {weeklySummary?.goalsPerDay[day].map((goalInDay) => {
                    return (
                      <li
                        key={goalInDay.id}
                        className='flex flex-row items-center gap-2'
                      >
                        <CheckCircle2 className='size-4 text-pink-500' />
                        <span className='text-zinc-400 text-sm'>
                          Você completou "
                          <span className='text-zinc-100'>
                            {goalInDay.title}
                          </span>
                          " às{" "}
                          <span className='text-zinc-100'>
                            {dayjs(goalInDay.completedAt).format("HH:mm[h]")}
                          </span>
                        </span>
                        <span
                          className='underline text-xs p-1 text-zinc-500 hover:cursor-pointer hover:text-zinc-300'
                          onClick={() =>
                            handleDeleteGoalCompletion(goalInDay.id)
                          }
                        >
                          Desfazer
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
