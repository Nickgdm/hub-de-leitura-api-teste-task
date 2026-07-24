/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';

describe('Testes da Funcionalidade Catálogo de Livros', () => {
     let tokenAdm, tokenComum, idLivro
     beforeEach(() => {
       cy.geraTokenAdm("admin@biblioteca.com", "admin123")
         .then((tknAdm) => {
           tokenAdm = tknAdm
           return cy.cadastrarLivro(tokenAdm)
         })
         .then((id) => {
           idLivro = id
         })
       cy.geraTokenComum("usuario@teste.com", "user123").then((tknComum) => {
         tokenComum = tknComum
       })
     })

     // Objetivo: Verificar que a API retorna lista de livros com paginação e filtros funcionando
     // Validar que filtros por categoria e autores funcionam corretamente
     it('GET - Deve listar livros com filtros e paginação', () => {
          //TODO:
          let category = 'Ficção', author = 'George Orwell'
          cy.api({
               method: 'GET',
               url: 'books',
               qs: {
                    category,   //Filtrar por categoria
                    author,     //Filtrar por autor
                    limit: 20,  //Itens por página (máximo 100)
                    offset: 0   //Itens para pular (paginação)
               }
          }).then((response) => {
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('books')
               expect(response.body.books).to.be.an('array')
               expect(response.body).to.have.property('pagination')
               expect(response.body).to.have.property('filters')

               response.body.books.forEach((livro) => {
                    expect(livro.category).to.equal(category)
                    expect(livro.author).to.equal(author)
               })
          })
     })

     // Objetivo: Validar que é possível obter detalhes de um livro específico pelo ID
     // Verificar que todos os campos do livro são retornados corretamente
     it('GET - Deve obter detalhes de um livro específico', () => {
          //TODO:
          cy.api({
               method: 'GET',
               url: `books/${idLivro}`
          }).then((response) => {
               expect(response.status).to.equal(200)
               expect(response.body.book.id).to.equal(Number(idLivro))
               expect(response.body.book).to.have.property('title')
               expect(response.body.book).to.have.property('author')
               expect(response.body.book).to.have.property('category')
          });
     })

     // Objetivo: Validar que um novo livro é adicionado com sucesso ao catálogo
     // Verificar que apenas admin pode adicionar novos livros (validação de permissão)
     it('POST - Deve cadastrar um novo livro com sucesso', () => {
          //TODO:
          cy.api({
               method: 'POST',
               url: 'books',
               headers: {'Authorization' : tokenAdm},
               body: {
                    "title": faker.person.fullName(),
                    "author": "José de Alencar",
                    "category": "Literatura Brasileira",
                    "total_copies": 2
               }
          }).then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Livro criado com sucesso.')
          })
          cy.api({
               method: 'POST',
               url: 'books',
               headers: {'Authorization' : tokenComum},
               body: {
                    "title": faker.person.fullName(),
                    "author": "José de Alencar",
                    "category": "Literatura Brasileira",
                    "total_copies": 2
               },
               failOnStatusCode: false
          }).then((response) => {
               expect(response.status).to.equal(403)
               expect(response.body.message).to.equal('Acesso negado. Apenas administradores podem realizar esta ação.')
          })
     })

     // Objetivo: Garantir que dados inválidos são rejeitados ao adicionar um livro
     // Validar mensagens de erro apropriadas para dados faltantes ou incorretos
     it('POST -  Deve rejeitar livro com dados inválidos', () => {
          //TODO:
          cy.api({
               method: 'POST',
               url: 'books',
               headers: {'Authorization' : tokenAdm},
               body: {
                    "title": "",
                    "author": "",
                    "category": "",
                    "total_copies": 2
               },
               failOnStatusCode: false
          }).then((response) => {
               expect(response.status).to.equal(400)
               expect(response.body.field).to.equal('title')
               expect(response.body.message).to.equal('"title" is not allowed to be empty')
          })    
          cy.api({
               method: 'POST',
               url: 'books',
               headers: {'Authorization' : tokenAdm},
               body: {
                    "title": faker.person.fullName(),
                    "author": "",
                    "category": "",
                    "total_copies": 2
               },
               failOnStatusCode: false
          }).then((response) => {
               expect(response.status).to.equal(400)
               expect(response.body.field).to.equal('author')
               expect(response.body.message).to.equal('"author" is not allowed to be empty')
          }) 
          cy.api({
               method: 'POST',
               url: 'books',
               headers: {'Authorization' : tokenAdm},
               body: {
                    "title": faker.person.fullName(),
                    "author": faker.person.fullName(),
                    "category": "",
                    "total_copies": 2
               },
               failOnStatusCode: false
          }).then((response) => {
               expect(response.status).to.equal(400)
               expect(response.body.field).to.equal('category')
               expect(response.body.message).to.equal('"category" is not allowed to be empty')
          })
     })

     // Objetivo: Validar que um livro pode ser atualizado com sucesso
     // Verificar que apenas admin pode atualizar livros (validação de permissão)
     it('PUT - Deve atualizar um livro previamente cadastrado', () => {
          //TODO:
          let livroAtualizado = {   //Atualização do livro
               title: "Nome livro atualizado",
               author: "Autor Atualizado",
               description: "Descrição atualizada do livro",
               category: "Categoria atualizada",
               editor: "Editora Atualizada",
               language: "Português",
               publication_year: 2000,
               pages: 300,
               format: "Físico",
               total_copies: 10,
               available_copies: 5
          }
          cy.api({
               method: 'PUT',
               url: `books/${idLivro}`,
               headers: {'Authorization' : tokenAdm},
               body: livroAtualizado
          }).then((response) => {
               expect(response.status).to.equal(200)
               expect(response.body.message).to.equal('Livro atualizado com sucesso.')
          })
          cy.api({
               method: 'PUT',
               url: `books/${idLivro}`,
               headers: {'Authorization' : tokenComum},
               body: livroAtualizado,
               failOnStatusCode: false
          }).then((response) => {
               expect(response.status).to.equal(403)
               expect(response.body.message).to.equal('Acesso negado. Apenas administradores podem realizar esta ação.')
          })
     })

     // Objetivo: Validar que um livro pode ser removido do catálogo
     // Verificar que apenas admin pode deletar livros (validação de permissão)
     it('DELETE - Deve deletar um livro previamente cadastrado', () => {
          //TODO:
          cy.api({
               method: 'DELETE',
               url: `books/${idLivro}`,
               headers: {'Authorization' : tokenComum},
               failOnStatusCode: false
          }).then((response) => {
               expect(response.status).to.equal(403)
               expect(response.body.message).to.equal('Acesso negado. Apenas administradores podem realizar esta ação.')
          })
          cy.api({
               method: 'DELETE',
               url: `books/${idLivro}`,
               headers: {'Authorization' : tokenAdm}
          }).then((response) => {
               expect(response.status).to.equal(200)
               expect(response.body.message).to.equal('Livro deletado com sucesso.')
          })
     })
})