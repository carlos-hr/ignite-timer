import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styled";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { Countdown, NewCycleForm } from "../../components";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";

const timeFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  duration: zod
    .number()
    .min(5, "A duração deve ser de no mínimo 5 minutos")
    .max(60, "A duração deve ser de no máximo 60 minutos"),
});

type NewCycleFormData = zod.infer<typeof timeFormValidationSchema>;

const Home = () => {
  const { activeCycle, createNewCycle, interruptCycle } =
    useContext(CyclesContext);
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(timeFormValidationSchema),
    defaultValues: {
      task: "",
      duration: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }

  const enableSubmit = watch("task");

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCycle}>
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
