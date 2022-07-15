import React from 'react'
import validateEmail from '../../utils/validations/validateEmail'

describe('Ao passar um email correto', () => {
  test('a função deve retornar "true"', () => {
    const result = validateEmail('email@email.com')

    expect(result).toBeTruthy()
  })
})

describe('Ao passar um email incorreto', () => {
  test('a função deve retornar "false"', () => {
    const result = validateEmail('email@email')

    expect(result).toBeFalsy()
  })
})
