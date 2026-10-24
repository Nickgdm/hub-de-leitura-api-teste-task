# 📚 Hub de Leitura — Testes de API com Cypress

Projeto de testes automatizados com Cypress para uma API REST de gerenciamento de livros. A atividade propõe implementar e validar operações de consulta, criação, atualização e remoção de livros, incluindo cenários positivos, dados inválidos e autenticação.

## Objetivos

- Validar endpoints REST usando os métodos GET, POST, PUT e DELETE.
- Conferir códigos HTTP, estrutura e conteúdo das respostas.
- Praticar autenticação com token JWT para operações administrativas.
- Cobrir cenários positivos e negativos, incluindo validação de dados.
- Organizar testes de API com Cypress.

## Tecnologias

- JavaScript
- Node.js e npm
- Cypress
- API REST e JSON
- Autenticação JWT

## Pré-requisitos

- Node.js (v14 ou superior, conforme compatibilidade do projeto)
- npm
- Servidor da API disponível e acessível no ambiente de execução

## Instalação

Clone este repositório e acesse a pasta:

```bash
git clone https://github.com/Nickgdm/hub-de-leitura-api-teste-task.git
cd hub-de-leitura-api-teste-task
npm install
```

> Se o repositório original da atividade for utilizado como fonte, ajuste a URL do clone para o endereço correspondente.

## Como executar

Executar os testes em modo headless:

```bash
npm test
```

Abrir a interface do Cypress:

```bash
npx cypress open
```

O `package.json` define apenas o script `test`; por isso, use `npx cypress open` para abrir a interface gráfica. Para executar um arquivo específico, confira primeiro os caminhos existentes em `cypress/e2e/` e então use, por exemplo:

```bash
npx cypress run --spec "cypress/e2e/exercicio.cy.js"
```

O comando com `--spec` só funcionará se esse arquivo existir. Verifique também se a API está em execução antes de iniciar os testes.

## Estrutura do projeto

```text
.
├── cypress/
│   ├── e2e/
│   │   ├── exercicio.cy.js
│   │   └── usuarios.cy.js
│   ├── fixtures/
│   │   └── example.json
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js
├── package.json
└── readme.md
```

## Cenários de teste propostos

- Listagem de livros com filtros e paginação.
- Consulta dos detalhes de um livro por identificador.
- Cadastro de livro com dados válidos.
- Rejeição de dados inválidos.
- Atualização de um livro existente.
- Remoção de um livro existente.
- Verificação de permissões para operações administrativas.

## Autenticação

O projeto inclui o comando customizado `cy.geraToken()` para obter um token JWT. Utilize credenciais de teste somente em ambientes controlados e evite armazenar senhas ou tokens reais no repositório.

## Boas práticas adotadas

- Validar status HTTP e conteúdo do corpo da resposta.
- Cobrir cenários positivos e negativos.
- Reutilizar preparação comum com hooks como `beforeEach()`.
- Separar dados de teste em fixtures quando fizer sentido.
- Não presumir que um teste passou sem executá-lo contra a API.

## Aprendizados

Esta atividade permite praticar automação de testes de API com Cypress, incluindo requisições HTTP, validação de respostas JSON, autenticação JWT e cobertura de operações CRUD. Também reforça a importância de testar entradas inválidas, permissões e condições de erro para aumentar a confiança na API.

## Considerações finais

Os testes devem ser executados com a API disponível e com configurações compatíveis com o ambiente local. Confirme os scripts definidos no `package.json` e os dados de autenticação antes da execução.

---

## 🎓 Formação

Atividade desenvolvida durante a formação profissionalizante em **Quality Assurance (QA) pela EBAC — Escola Britânica de Artes Criativas e Tecnologia**.
