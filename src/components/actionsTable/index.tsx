import { useActionStore } from '../../state/hooks/useActionStore'

export default function ActionsTable() {
  const actions = useActionStore()
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
        <tbody>
          {actions
            ? actions.map(action => (
                <tr key={action.name}>
                  <th data-testid={`${action.name}-name-table`}>
                    {action.name}
                  </th>
                  <th>{action.quantity}</th>
                  <th>{action.value}</th>
                  <th>Comprar</th>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  )
}
