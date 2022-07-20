import { useRecoilValue } from 'recoil'
import { actionsStore } from '../../state/atom'

export default function ActionsTable() {
  const actions = useRecoilValue(actionsStore)
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
          {actions.map(action => (
            <tr key={action.name}>
              <th data-testid={`${action.name}-name-table`}>{action.name}</th>
              <th>{action.quantity}</th>
              <th>{action.value}</th>
              <th>Comprar</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
