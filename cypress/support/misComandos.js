Cypress.Commands.add("completeForm", (type, api) => {
  cy.fixture("datos").then((data) => {
    const formData = data[type];

    cy.log(formData);
    cy.intercept("POST", "https://automationintesting.online/message").as(
      "testAPI"
    );
    cy.get('input[placeholder="Name"]').clear().type(formData.name);
    cy.get('input[placeholder="Email"]').clear().type(formData.email);
    cy.get('input[placeholder="Phone"]').clear().type(formData.phoneNumber);
    cy.get('input[placeholder="Subject"]').clear().type(formData.subject);
    cy.get('[data-testid="ContactDescription"]').clear().type(formData.message);
    cy.get("#submitContact").click();
    cy.wait("@testAPI").its("response.statusCode").should("eq", api);
  });
});

Cypress.Commands.add("checkErrorMessages", () => {
  cy.fixture("datos").then((data) => {
    const formData = data["errorMessages"];
    cy.get("p").contains(formData.nameBlank).should("be.visible");
    cy.get("p").contains(formData.emailBlank).should("be.visible");
  });
});

Cypress.Commands.add("fillLogin", (type) => {
  cy.fixture("datosSwag").then((loginData) => {
    const formData = loginData[type];
    cy.get('[placeholder="Username"]').clear().type(formData.username);
    cy.get('[placeholder="Password"]').clear().type(formData.password);
    cy.get("#login-button").click();
  });
});

Cypress.Commands.add("fillCheckout", () => {
  cy.fixture("datosSwag").then((checkoutData) => {
    const formData = checkoutData["checkout"];
    cy.get('[placeholder = "First Name"]').clear().type(formData.firstName);
    cy.get('[placeholder = "Last Name"]').clear().type(formData.lastName);
    cy.get('[placeholder = "Zip/Postal Code"]').clear().type(formData.zipCode);
    cy.get("#continue").click();
  });
});
