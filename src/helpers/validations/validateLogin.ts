import validateEmail from './validateEmail'
import validadePassword from './validatePassword'

export default function validateLogin(
  email: string,
  password: string
): boolean {
  return validateEmail(email) && validadePassword(password)
}
