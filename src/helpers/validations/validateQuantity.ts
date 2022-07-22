export default function validateQuantity(
  valueInput: string,
  actionValue: number,
  balance: number,
  sell?: boolean
) {
  const integerRegex = /^[0-9]*[1-9][0-9]*$/
  if (!integerRegex.test(valueInput)) return

  const quantity = parseInt(valueInput)
  const amount = actionValue * quantity
  const total = sell ? amount + balance : balance - amount
  return total > 0 ? total : null
}
