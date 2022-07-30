import { HistoryContainer, HistoryList, Status } from "./styled";

const History = () => {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <Status status="canceled">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <Status status="complete">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <Status status="doing">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <Status status="canceled">Concluído</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
};

export default History;
