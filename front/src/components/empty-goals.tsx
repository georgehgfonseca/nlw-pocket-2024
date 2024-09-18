import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";

export function EmptyGoals() {
  return (
    <div className='flex flex-col w-screen h-screen justify-center items-center gap-8'>
      <div className='flex flex-row items-center gap-3'>
        <img className='w-9 h-9' src='./inorbit.svg' alt='logo' />
        <p className='text-zinc-300'>in.orbit</p>
      </div>
      <img
        className='w-[320] h-[320]'
        src='./assets/lets-start.svg'
        alt='empty-goals'
      />
      <div className='flex flex-col items-center gap-5 max-w-80'>
        <p className='text-zinc-300 text-center leading-relaxed'>
          Você ainda não cadastrou nenhuma meta, <br />
          que tal <span className='text-zinc-300 underline'>
            cadastrar uma
          </span>{" "}
          agora mesmo?
        </p>
        <DialogTrigger asChild>
          <Button>
            <Plus className='size-4' />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>
    </div>
  );
}
