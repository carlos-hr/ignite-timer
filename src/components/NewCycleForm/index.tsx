import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../contexts/CyclesContext";
import { FormContainer, TaskInput, TImeInput } from "./styled";

const NewCycleForm = () => {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
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
  );
};

export default NewCycleForm;
