/// <reference types="cypress" />

import produtosPage from "../support/page_objects/produtos.page";

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      cy.intercept('POST', '**/?wc-ajax=get_refreshed_fragments').as('getCarrinho')
      cy.visit('minha-conta')
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.login('carolinevercosa@teste.com', 'Carol123*');
        cy.get('.page-title').should('contain', 'Minha conta');
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should(
          'contain',
          'Olá, caroline.usuario (não é caroline.usuario? Sair)');

        produtosPage.visitarUrlProdutos();
        cy.get('.page-title').should('have.text', 'Produtos');

        produtosPage.buscarProdutoLista('Abominable Hoodie');
        cy.get('.product_title').should('contain', 'Abominable Hoodie' );

        let qtd = 4
        produtosPage.addProdutoCarrinho('L', 'Blue', qtd)
        cy.get('.woocommerce-message').should('contain', qtd + ' × “Abominable Hoodie” foram adicionados no seu carrinho.')
      
        produtosPage.buscarProduto('Arcadio Gym Short');
        cy.get('.product_title').should('contain', 'Arcadio Gym Short' );

        produtosPage.addProdutoCarrinho('33', 'Black', qtd)
        cy.get('.woocommerce-message').should('contain', qtd + ' × “Arcadio Gym Short” foram adicionados no seu carrinho.')

        produtosPage.visitarUrlProdutosFemininos()

        produtosPage.buscarProduto('Augusta Pullover Jacket');
        cy.get('.product_title').should('contain', 'Augusta Pullover Jacket' );

        produtosPage.addProdutoCarrinho('XS', 'Orange', qtd)
        cy.get('.woocommerce-message').should('contain', qtd + ' × “Augusta Pullover Jacket” foram adicionados no seu carrinho.')

        produtosPage.buscarProduto('Autumn Pullie');
        cy.get('.product_title').should('contain', 'Autumn Pullie' );

        produtosPage.addProdutoCarrinho('M', 'Green', qtd)
        cy.get('.woocommerce-message').should('contain', qtd + ' × “Autumn Pullie” foram adicionados no seu carrinho.')

        cy.get('.woocommerce-message > .button').should('have.text', 'Ver carrinho').click()
        cy.get('.breadcrumb > .active').should('contain', 'Carrinho')
        cy.get('.page-title').should('contain', 'Carrinho')

        cy.get('.product-name > a').should('exist')
        cy.get('.cart_totals').should('be.visible')
        cy.get('.checkout-button').should('contain', 'Concluir compra').click()

        produtosPage.digitaDadosCarrinho()
        
        cy.get('.page-title').should('contain', 'Checkout')
        cy.get('.order-review').should('be.visible')
      
        cy.get('td.product-name').eq(0).should('contain', 'Abominable Hoodie')
        cy.get('td.product-name').eq(1).should('contain', 'Arcadio Gym Short')
        cy.get('td.product-name').eq(2).should('contain', 'Augusta Pullover Jacket')
        cy.get('td.product-name').eq(3).should('contain', 'Autumn Pullie')

        cy.get('.woocommerce-terms-and-conditions-checkbox-text').should('contain', 'Li e concordo com o(s)')
        cy.get('#terms').click()
        cy.get('#place_order').click()

        cy.wait('@getCarrinho')

        cy.get('.page-title').should('contain', 'Pedido recebido')

        });

      });