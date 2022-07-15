import React from 'react'
import validatePassword from '../../helpers/validations/validatePassword'

describe('A função deve retornar "true"', () => {
  test('ao informar uma senha com 6 caracteres ou maior', () => {
    const result = validatePassword('123456')

    expect(result).toBeTruthy()
  })
})

describe('a função deve retornar "false"', () => {
  test('ao informar uma senha com menos de 6 caracteres', () => {
    const result = validatePassword('123')
    expect(result).toBeFalsy()
  })

  test('ao não informar uma senha', () => {
    const result = validatePassword('')
    expect(result).toBeFalsy()
  })
})
