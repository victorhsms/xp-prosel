export default function WalletTable() {
  return (
    <div>
      <h3>Minhas Ações</h3>
      <table data-testid="wallet-table">
        <thead>
          <tr>
            <th data-testid="actions-wallet-table">Ações</th>
            <th data-testid="quantity-wallet-table">Quantidade</th>
            <th data-testid="value-wallet-table">{'Valor (R$)'}</th>
            <th data-testid="negotiate-wallet-table">Negociar</th>
          </tr>
        </thead>
        <tbody>
          <tr data-testid="wallet-table-empty">
            <td colSpan={4}>Você não tem nenhuma ação comprada no momento!</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
