import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  Separator,
  StartCountdownButton,
  TaskInput,
  TImeInput,
} from "./styled";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

const timeFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  duration: zod
    .number()
    .min(5, "A duração deve ser de no mínimo 5 minutos")
    .max(60, "A duração deve ser de no máximo 60 minutos"),
});

type TimerFormData = zod.infer<typeof timeFormValidationSchema>;

const Home = () => {
  const { register, handleSubmit, watch, reset } = useForm<TimerFormData>({
    resolver: zodResolver(timeFormValidationSchema),
    defaultValues: {
      task: "",
      duration: 0,
    },
  });

  function handleStartTimer(data: TimerFormData) {
    reset();
  }

  const enableSubmit = watch("task");

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleStartTimer)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
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
            {...register("duration", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={!enableSubmit}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
};

export default Home;
