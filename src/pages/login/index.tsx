export default function Login() {
  return (
    <form action="">
      <h1>Login</h1>
      <label htmlFor="email-input">Email</label>
      <input type="text" placeholder="email@email.com" id="email-input" />
      <label htmlFor="password-input">Senha</label>
      <input
        type="password"
        name="passowd"
        id="password-input"
        placeholder="Informe sua senha"
      />
      <button disabled={true}>Entrar</button>
    </form>
  )
}
