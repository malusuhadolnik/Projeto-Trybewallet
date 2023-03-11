# Projeto Trybewallet

# Sobre
Este projeto foi desenvolvido durante o Módulo 2 - Front-End do curso de Desenvolvimento Web da Trybe. 

Nele, foi desenvolvido uma carteira de controle de gastos com conversor de moedas, em que usuário pode:
- Fazer login;
- Adicionar, remover e editar um gasto, incluindo as seguintes informações:
    Valor, descrição, câmbio, método de pagamento e tag (Alimentação, Lazer, Trabalho, Transporte ou Saúde);
- Visualizar uma tabela com seus registros,
- Visualizar o total de gastos convertidos para uma moeda de escolha;

Esta aplicação consome os dados da API do awesomeapi API de Cotações para realizar a busca de câmbio de moedas (endpoint:
https://economia.awesomeapi.com.br/json/all).

Também foram desenvolvidos testes unitários/integração usando a biblioteca React Testing Library.

Os arquivos desenvolvidos por mim estão na pasta src, com exceção de serviceWorker.js e setupTests.js. Os demais foram desenvolvidos pelo time da Trybe.

## Tecnologias usadas

React.js, Redux, React Testing Library

## Instalando Dependências

```bash
cd src/
npm install
``` 

## Executando aplicação

  ```
    cd src/ && npm start
  ```
