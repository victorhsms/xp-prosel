export default function validateBalance(balance: string): boolean | undefined {
  const value = parseFloat(balance)
  const regexNumber = /(\d+(?:\.\d+)?)/
  return value > 0 && regexNumber.test(balance)
}
