import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  Separator,
  StartCountdownButton,
  TaskInput,
  TImeInput,
  StopCountdownButton,
} from "./styled";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

const timeFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  duration: zod
    .number()
    .min(5, "A duração deve ser de no mínimo 5 minutos")
    .max(60, "A duração deve ser de no máximo 60 minutos"),
});

type NewCycleFormData = zod.infer<typeof timeFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  duration: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<null | string>(null);
  const [secondsActive, setSecondsActive] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(timeFormValidationSchema),
    defaultValues: {
      task: "",
      duration: 0,
    },
  });

  const totalSeconds = activeCycle ? activeCycle.duration * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - secondsActive : 0;

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return cycle;
              }
            })
          );
          setSecondsActive(totalSeconds);
          clearInterval(interval);
        } else {
          setSecondsActive(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycleId]);

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      duration: data.duration,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setSecondsActive(0);

    reset();
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );

    setActiveCycleId(null);
  }

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `Iginite timer - ${minutes}:${seconds}`;
    }
  }, [activeCycle, minutes, seconds]);

  const enableSubmit = watch("task");

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            disabled={!!activeCycle}
            {...register("task")}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <TImeInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            disabled={!!activeCycle}
            {...register("duration", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={!enableSubmit}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
};

export default Home;
