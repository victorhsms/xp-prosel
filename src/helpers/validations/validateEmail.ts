export default function validateEmail(email: string): boolean {
  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim
  return emailRegExp.test(email)
}
