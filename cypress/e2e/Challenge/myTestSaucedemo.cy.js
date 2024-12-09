describe("Compra en Swag Labs", { testIsolation: false }, () => {
  beforeEach("Visitar pagina", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.clearLocalStorage();
  });

  it("Verificar intento de login con credenciales invalidas", () => {
    cy.fillLogin("invalid");
    cy.wait(2000);
    cy.contains(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("Login con User 1, agregar articulos a cart, checkout y logout ", () => {
    cy.fillLogin("user1");
    // Error 401: Unauthorized. Check Backtrace API token and permissions.
    cy.get("#add-to-cart-sauce-labs-bike-light").click();
    cy.contains("Sauce Labs Fleece Jacket").click();
    cy.get("#add-to-cart").click();
    cy.get('[data-test="shopping-cart-badge"]').click();
    cy.contains("Sauce Labs Bike Light").should("be.visible");
    cy.contains("Sauce Labs Fleece Jacket").should("be.visible");
    cy.get("#checkout").click();
    cy.fillCheckout();
    cy.contains("Free Pony Express Delivery!").should("be.visible");
    cy.get("#finish").click();
    cy.title("eq", "Checkout: Complete!");
    cy.get("#back-to-products").click();
    cy.get(".bm-menu").click({ force: true });
    cy.get("#logout_sidebar_link").click({ force: true });
    cy.get("#login-button").should("be.visible");
  });

  it("Login con User 2, agregar articulo a cart, checkout y logout con User 2", () => {
    cy.fillLogin("user2");
    // Error 401: Unauthorized. Check Backtrace API token and permissions.
    cy.get("#add-to-cart-sauce-labs-onesie").click();
    cy.get('[data-test="shopping-cart-badge"]').click();
    cy.contains("Sauce Labs Onesie").should("be.visible");
    cy.get("#checkout").click();
    cy.fillCheckout();
    cy.contains("Checkout: Overview").should("be.visible");
    cy.get("#finish").click();
    cy.title("eq", "Checkout: Complete!");
    cy.get("#back-to-products").click();
    cy.get(".bm-menu").click({ force: true });
    cy.get("#logout_sidebar_link").click({ force: true });
    cy.get("#login-button").should("be.visible");
  });

  it("Agregar un articulo al cart desde el Product detail page con User 2", () => {
    cy.fillLogin("user2");
    // Error 401: Unauthorized. Check Backtrace API token and permissions.
    cy.contains("Sauce Labs Fleece Jacket").click();
    cy.contains("Sauce Labs Fleece Jacket").should("be.visible");
    cy.get("#add-to-cart").click();
  });
});
