import validateEmail from '../../helpers/validations/validateEmail'

describe('A função deve retornar "true"', () => {
  test('ao informar um email em formato válido', () => {
    const result = validateEmail('email@email.com')

    expect(result).toBeTruthy()
  })
})

describe('A função deve retornar "false"', () => {
  test('ao informar um email em formato inválido', () => {
    const result = validateEmail('email@email')

    expect(result).toBeFalsy()
  })

  test('ao não informar um email', () => {
    const result = validateEmail('')

    expect(result).toBeFalsy()
  })
})
