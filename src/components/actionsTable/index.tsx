export default function ActionsTable() {
  return (
    <div>
      <h3>Disponível para investir</h3>
      <table data-testid="actions-table">
        <thead>
          <tr>
            <th data-testid="actions-actions-table">Ações</th>
            <th data-testid="quantity-actions-table">Quantidade</th>
            <th data-testid="value-actions-table">{'Valor (R$)'}</th>
            <th data-testid="negotiate-actions-table">Negociar</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  )
}
