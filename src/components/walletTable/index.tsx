export default function WalletTable() {
  return (
    <div>
      <h3>Minhas Ações</h3>
      <table data-testid="wallet-table">
        <thead>
          <tr>
            <th>Ações</th>
            <th>Quantidade</th>
            <th>{'Valor (R$)'}</th>
            <th>Negociar</th>
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
