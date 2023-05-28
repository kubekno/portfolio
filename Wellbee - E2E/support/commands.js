// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import * as data from "../fixtures/example.json";
import * as loginPage from "../Pages/LoginPage.js";
import * as mainPage from "../Pages/MainPage.js";
import * as registrationPage from "../Pages/RegistrationPage.js";

Cypress.Commands.add("goToRegistrationPage", () => {
  cy.goToLoginPage();
  registrationPage.getRegisterButton().click();
  cy.url().should("contains", "panel-pacjenta/rejestracja");
});

Cypress.Commands.add("goToLoginPage", () => {
  cy.visit(data.baseUrl);
  cy.get('a[href="/panel-pacjenta/login"]').eq(0).click({ force: true });
  cy.url().should("contains", "panel-pacjenta/login");
});

Cypress.Commands.add("goToTherapistLoginPage", () => {
  cy.visit(data.baseUrl);
  cy.url().should("contains", data.baseUrl);
  mainPage.getTherapistPanelLink().click();
  cy.url().should("contains", "/login");
});

Cypress.Commands.add("loginToTherapistPanel", (email, password) => {
  loginPage.getEmailBox().type(email);
  loginPage.getPasswordBox().type(password);
  loginPage.getLoginButton().click();
  cy.url().should("include", "/panel-terapeuty");
});

Cypress.Commands.add("registerNewPatient", (email, password) => {
  registrationPage.getEmailBox().type(email).should("have.value", email);
  registrationPage
    .getPasswordBox()
    .type(password)
    .should("have.value", password);
});
