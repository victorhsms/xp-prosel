# Boas vindas ao repositório do projeto XP-Prosel

XP Prosel é um simulador de compra e venda de ações, com login e conta bancária. Na aplicação, é possível depositar um valor a sua escolha, comprar as ações disponíveis, vendê-las e retirar o saldo. Caso o navegador seja fechado ou o usuário faça logoff, as informações como saldo e ações compradas serão restauradas ao logar novamente.

XP Prosel foi uma aplicação feita para o desafio técnico da XP Inc para a Turma XP, da Trybe, para o cargo de desenvolvedor de nível júnior.

Para essa aplicação, foi usado Nextjs, Recoil, Styled-Component, Typescript e o Jest com React Testing Library (para desenvolvimento dos testes). Quase todas as features da aplicação foram feitas em TDD (Test-driven development).

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
  <summary><strong>Decisões tomadas</strong></summary>
<details>

<details>
  <summary><strong>Problemas conhecidos</strong></summary>
<details>

<details>
  <summary><strong>Dificuldades</strong></summary>
<details>

<details>
  <summary><strong>Próximas melhorias</strong></summary>
<details>



