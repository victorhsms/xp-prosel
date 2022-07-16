export default function ActionsTable() {
  return (
    <div>
      <h3>Disponível para investir</h3>
      <table data-testid="actions-table">
        <thead>
          <tr>
            <th>Ações</th>
            <th>Quantidade</th>
            <th>{'Valor (R$)'}</th>
            <th>Negociar</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  )
}
