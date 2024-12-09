describe("PruebaApi", () => {
  it("Crear usuario OK", () => {
    cy.intercept("POST", "/api/users").as("userCreado");
    cy.visit("https://conduit.bondaracademy.com/");
    cy.contains(/Sign up/i).click();
    cy.get("[Placeholder=Username]").type("HeyQueria");
    cy.get("[Placeholder=Email]").type("hey@queria.com");
    cy.get("[Placeholder=Password]").type("TeQueria");
    cy.get(".btn").click();
    cy.wait("@userCreado").then((interception) => {
      expect(interception.response.statusCode).to.equal(201);
    });
    cy.log("Todo bien ahi");
  });

  it("Ingreso usuario erroneo", () => {
    cy.intercept("POST", "/api/users/login").as("wrongUser");
    cy.visit("https://conduit.bondaracademy.com/login");
    cy.get("[Placeholder=Email]").type("sinarroba.com");
    cy.get("[Placeholder=Password]").type("TeQueria");
    cy.get(".btn").click();
    cy.wait("@wrongUser").then((interception) => {
      expect(interception.response.statusCode).to.equal(403);
    });
    cy.log("Por ahi no es, campeon");
  });
});
