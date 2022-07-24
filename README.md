# Boas vindas ao repositório do projeto XP-Prosel

XP Prosel é um simulador de compra e venda de ações, com login e conta bancária. Na aplicação, é possível depositar um valor a sua escolha, comprar as ações disponíveis, vendê-las e retirar o saldo. Caso o navegador seja fechado ou o usuário faça logoff, as informações como saldo e ações compradas serão restauradas ao logar novamente.

XP Prosel foi uma aplicação feita para o desafio técnico da XP Inc para a Turma XP, da Trybe, para o cargo de desenvolvedor de nível júnior.

Para essa aplicação, foi usado Nextjs, Recoil, Styled-Component, Typescript e o Jest com React Testing Library (para desenvolvimento dos testes). XP Prosel não possui back-end e alguns dados de uso são armazenados no localStorage do seu navegador. Quase todas as features da aplicação foram feitas em TDD (Test-driven development).

O deploy de XP Prosel foi realizado na vercel e você pode encontrar a aplicação online em https://xp-prosel.vercel.app/

## Como rodar a aplicação

Você pode simplesmente acessar o deploy da aplicação [neste link](https://xp-prosel.vercel.app/) ou seguir às instruções abaixo:

<details>
  <summary><strong>Baixando repositório e entrando na pasta</strong></summary><br />

  Caso não possua o git instalado, você pode clicar em "Code" (em verde) no topo do repositório e depois em "Download Zip".
  
  Caso possua o git instalado, execute os comandos abaixo no bash (linux e mac) ou cmd/powershell (windows):

  - Clone o Repositório
    - em SSH: `git clone git@github.com:victorhsms/xp-prosel.git`.
    - ou em HTTPS: `https://github.com/victorhsms/xp-prosel.git`.
  
  - Entre na pasta do repositório que você acabou de clonar:
    - `cd xp-prosel`
</details>

<details>
  <summary><strong>Instalando dependencias e executando aplicação</strong></summary> </br>

  Após projeto baixado e que você entrou na pasta, certifiquese que você tem a versão mais atualizada do [NodeJS LTS](https://nodejs.org/en/) (você pode verificar a versão instalada digitando `node --version` no bash ou powershell). 

Tendo certeza que está com a mais atualizada versão LTS do NodeJS instalado, execute as instruções abaixo no bash (linux e mac) ou cmd/powershell (windows):

 - Instale as dependencias:
   - `npm install` ou `npm i`
 - Inicie a aplicação:
   - `npm run dev`

Em seu terminal, deve aparecer a seguinte informação:

<img src="./public/images/dev-bash.png">

Caso a porta 3000 ja esteja ocupada e a url seja diferente de "http:localhost:3000", abra o código em algum editor de código de sua escolha e procure o seguinte arquivo: `./src/pages/index.tsx` e altere a linha 57 com a porta que o projeto foi executado e salve o arquivo. Exemplo:

 - Ele foi executado na porta 3001. Mude a linha para:
 - `const urlSearch = 'http://localhost:3001/api/actions'`

</details>

<details>
  <summary><strong>🛠 Rodando os testes</strong></summary><br />

  O projeto possui 100% de cobertura de testes. Você pode executar os testes localmente, digitando no terminal o comando `npm test`.

  Deverá aparecer o log seguinte em seu terminal:

  <img src="./public/images/test-log.png">

  Para ver a cobertura total do testes, digite no terminal o comando `npm run coverage`.

  Deverar aparecer um relatório em seu terminal assim como esse:

  <img src="./public/images/coverage-log.png" width="400">

</details>

## Informações importantes


<details>
<summary><strong>Por que essa stack?</strong></summary>

Na [Trybe](https://www.betrybe.com/), aprendemos React (class component e function component), React-Router, Redux e bem pouco de Jest/RTL ao longo de todo o módulo de Front end.

Porém eu acredito que adotar essa stack para o desenvolvimento do desafio técnico era um caminho confortável e previsível. Eu queria ir mais distante e aproveitar a jornada de desenvolvimento dessa aplicação para aprender coisas novas também.

#### NextJS
Dito isso, eu resolvi usar o <strong>Nextjs</strong> por ser um framewkork popular com ferramentas de desenvolvimento poderosas e inovadoras (como o SSR e API), simples de ser usado e fazer deploy e que substitui completamente o uso do React-Router. Com o NextJs até foi possível  simular, minimamente, uma requisição de API. Ja desenvolvi um projeto em Nextjs antes na [InfoJr](Ehttps://infojr.com.br/) empresa jr que participo.

#### Recoil

Eu sempre considerei o Redux uma ferramente muito útil e robusta, mas acredito que não é uma tecnologia pra ser usada em aplicações tão pequenas. Além disso, usar o useContext do React seria simples demais, previsivel e um pouco problemático, devido mudanças no estado renderizarem toda a página. O <strong>Recoil</strong> era um tecnologia que aprendi muito recentemente e o gerenciamento de estado atômico permite a re-renderização apenas dos componentes que usam aquele estado. Resolvi arriscar e esse foi meu primeiro projeto usando Recoil.

#### Desenvolvimento por TDD (Jest / RTL)

Eu quase nunca usei testes além do que foi necessário e o pouco que usei foi pra um projeto na Trybe, o qual não tive um rendimento muito bom. Fiz em TDD porque acredito que é uma metodologia objetiva, segura e de boas práticas. Desenvolver em TDD me garantiu que eu fizesse refatorações constantes sem medo da minha aplicação quebrar.

</details>

<details>

<summary><strong>Fluxo da aplicação</strong></summary>

Caso o cliente entre na página home e não esteja logado, ele é redirecionado à página '/login'. Um redirecionamento acontece ao tentar acessar a página de login quando já existe um usuário logado, o cliente é enviado para a página home. Dito isso, é válido informar que o usuário logado fica guardado no localStorage e só é deletado manualmente ou após dar Logoff na página home. 

Para logar, siga as instruções na página de login sobre informar um email válido e uma senha com mais de 6 caracteres (letras, números ou símbolos). Quando tudo for digitado corretamente, o botão de Entrar ficará habilitado para clicar.

Ao acessar a aplicação pela primeira vez, não será possivel comprar uma ação até que seja inserido um saldo na carteira. O usuário pode clicar em Depósito/Retirada para Depositar ou Sacar um valor. 

Após clicar, abrirá um modal que vai permitir depósitos e retiradas. As retiradas só ficarão disponíveis quando houver algum saldo na conta. O Usuário poderá informar qualquer valor positivo e inteiro ou com ponto flutuante e clicar em confirmar. Só é possível Retirar valores que estão disponíveis no saldo da conta, nada além.

Quando tiver um valor na conta, o usuário pode clicar em alguma ação e comprá-la. A ação irá para a lista de ações na carteira e, ao clicar nelas, o usuário poderá comprar mais (caso possua saldo para isso) ou vendê-las (somente a quantidade que ele possui) ao digitar um valor inteiro e positivo no input e confirmar.

</details>



