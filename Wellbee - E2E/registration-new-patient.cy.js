import * as registrationPage from "./Pages/RegistrationPage.js";
import { aliasQuery } from "./utils/graphql-utils.js";
import "../E2E/support/commands";

describe.only("Therapy Guide: Creation of new patient", function () {
  before(function () {
    cy.fixture("../E2E/fixtures/example.json").then(function (data) {
      this.data = data;
    });
  })

  beforeEach(function () {
    cy.clearLocalStorage();

  });

  it("Patient cannot create account with incorrect password strenght", function () {
    
    cy.registerNewPatient(this.data.email, this.data.incorrectPass);
    registrationPage.getPasswordLengthInfoBad().should("be.visible");
    registrationPage.getAllCheckBoxes().check().should("be.checked");
    registrationPage.getSubmitButton().should("be.disabled");
  });

  it("Patient cannot create account without obligatory boxes are being checked ", function () {
    cy.registerNewPatient(this.data.email, this.data.correctPass);
    registrationPage.getLoginPasswordLengthInfoGood().should("be.visible");
    registrationPage.getSubmitButton().should("be.disabled");
  });

  it("Patient cannot create account with email already exists ", function () {
    cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
      aliasQuery(req, "registerPatientUsingEmail");
    });
    cy.registerNewPatient(this.data.email, this.data.correctPass);
    registrationPage.getLoginPasswordLengthInfoGood().should("be.visible");
    registrationPage.getAllCheckBoxes().check().should("be.checked");
    registrationPage.getSubmitButton().click();
    cy.wait("@gqlregisterPatientUsingEmailQuery").then((res) => {
      expect(res.response.body.data.registerPatientUsingEmail).to.be.true;
    });
  });

  it("Patient cannot create account with wrong email", function () {
    cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
      aliasQuery(req, "registerPatientUsingEmail");
    });
    cy.registerNewPatient(this.data.invalidEmail, this.data.correctPass);
    registrationPage.getLoginPasswordLengthInfoGood().should("be.visible");
    registrationPage.getAllCheckBoxes().check().should("be.checked");
    registrationPage.getSubmitButton().click();
    cy.wait("@gqlregisterPatientUsingEmailQuery").then((res) => {
      expect(res.response.body.data.registerPatientUsingEmail).to.be.true;
    });
  });

  it("Patient can create account with obligatory information", function () {
    cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
      aliasQuery(req, "registerPatientUsingEmail");
    });
    cy.registerNewPatient(this.data.email, this.data.correctPass);
    registrationPage.getLoginPasswordLengthInfoGood().should("be.visible");
    registrationPage.getAllCheckBoxes().eq(0).check().should("be.checked");
    registrationPage.getAllCheckBoxes().eq(1).check().should("be.checked");
    registrationPage.getSubmitButton().click();
    cy.wait("@gqlregisterPatientUsingEmailQuery").then((res) => {
      expect(res.response.body.data.registerPatientUsingEmail).to.be.true;
    });
  });
});
