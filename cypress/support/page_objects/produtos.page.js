class ProdutosPage {
  visitarUrlProdutos() {
    cy.visit("produtos");
  }

  visitarUrlProdutosFemininos() {
    cy.visit("?product_cat=women&s=&post_type=product");
  }

  buscarProdutoLista(nomeProduto) {
    cy.get(".products > .row").contains(nomeProduto).click();
  }

  buscarProduto(nomeProduto) {
    cy.get('[name="s"]').eq(1).type(nomeProduto);
    cy.get(".button-search").eq(1).click();
  }

  addProdutoCarrinho(tamanho, cor, quantidade) {
    cy.get('.button-variable-item-' + tamanho).click()
    cy.get('.button-variable-item-' + cor).click()
    cy.get('.input-text').clear().type(quantidade)
    cy.get('.single_add_to_cart_button').click()
  }

  digitaDadosCarrinho(){  
  cy.get('#billing_address_1').clear().type('Rua Ubá')
  cy.get('#billing_city').clear().type('Gotham')
  cy.get('#billing_postcode').clear().type('25035310')
  cy.get('#billing_phone').clear().type(552100000000)
}

}

export default new ProdutosPage();
