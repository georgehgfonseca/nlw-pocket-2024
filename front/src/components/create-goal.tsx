import { X } from "lucide-react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "./ui/radio-group";
import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import createGoal from "../http/create-goal";
import { useQueryClient } from "@tanstack/react-query";

const createGoalForm = z.object({
  title: z.string().min(1, "Informe a atividade que deseja realizar"),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
});

type CreateGoalForm = z.infer<typeof createGoalForm>;

const daysData = [
  { label: "1x na semana", emojy: "🥱" },
  { label: "2x na semana", emojy: "🙂" },
  { label: "3x na semana", emojy: "😎" },
  { label: "4x na semana", emojy: "😜" },
  { label: "5x na semana", emojy: "🤨" },
  { label: "6x na semana", emojy: "🤯" },
  { label: "Todos dias da semana", emojy: "🔥" },
];

export function CreateGoal() {
  const queryClient = useQueryClient();

  const { register, control, handleSubmit, formState, reset } =
    useForm<CreateGoalForm>({
      resolver: zodResolver(createGoalForm),
    });

  const handleCreateGoal = async (data: CreateGoalForm) => {
    await createGoal(data);
    queryClient.invalidateQueries({
      queryKey: ["week-summary"],
    });
    queryClient.invalidateQueries({
      queryKey: ["pending-goals"],
    });
    reset();
  };

  return (
    <DialogContent>
      <div className='flex flex-col gap-6 h-full'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center justify-between'>
            <DialogTitle>Cadastrar meta</DialogTitle>
            <DialogClose>
              <X className='size-5 text-zinc-600' />
            </DialogClose>
          </div>
          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>
        </div>
        <form
          onSubmit={handleSubmit(handleCreateGoal)}
          className='flex flex-1 flex-col justify-between'
        >
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='title'>Qual a atividade?</Label>
              <Input
                id='title'
                autoFocus
                placeholder='Praticar exercícios, meditar, etc...'
                {...register("title")}
              />
              {formState.errors.title && (
                <p className='text-red-400 text-sm'>
                  {formState.errors.title.message}
                </p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='frequency'>Quantas vezes na semana?</Label>
              <Controller
                control={control}
                name='desiredWeeklyFrequency'
                defaultValue={3}
                render={({ field }) => {
                  return (
                    <RadioGroup
                      id='frequency'
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      {daysData.map((day, idx) => {
                        return (
                          <RadioGroupItem key={idx} value={String(idx + 1)}>
                            <RadioGroupIndicator />
                            <span className='text-zinc-300 text-sm font-md leading-none'>
                              {day.label}
                            </span>
                            <span className='text-lg leading-none'>
                              {day.emojy}
                            </span>
                          </RadioGroupItem>
                        );
                      })}
                    </RadioGroup>
                  );
                }}
              />
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <DialogClose asChild>
              <Button type='button' className='flex-1' variant='secondary'>
                Fechar
              </Button>
            </DialogClose>
            <Button className='flex-1'>Salvar</Button>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
