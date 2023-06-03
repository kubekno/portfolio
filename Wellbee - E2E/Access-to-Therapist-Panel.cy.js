import * as therapistPanel from "../E2E/Pages/TherapistPanel.js";
import { aliasQuery, aliasMutation } from "../E2E/utils/graphql-utils.js";
import "../E2E/support/commands";

describe("Access to Therapist Panel", function () {
  before(function () {
    cy.fixture("../E2E/fixtures/example.json").then(function (data) {
      this.data = data;
    });
  });

  beforeEach(function () {
    cy.clearLocalStorage();
    cy.task("resetDb").then((resolve) => {
      console.log(resolve);
    });
  });

  it.only("Therapist can display list of upcoming sessions", function () {
    cy.goToTherapistLoginPage();
    cy.url().should("contains", this.data.baseUrl);
    cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
      aliasMutation(req, "login");
      aliasQuery(req, "listCurrentTherapistEvents");
    });
    cy.loginToTherapistPanel(this.data.therapistEmail, this.data.therapistPass);
    cy.wait("@gqlloginMutation");
    therapistPanel.getSessionMenu().click();
    cy.wait("@gqllistCurrentTherapistEventsQuery");
    cy.get('[data-test="day-marker"]').should("have.length", 2);
  });

  it.only("Therapist can display list of past sessions", function () {
    cy.goToTherapistLoginPage();
    cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
      aliasMutation(req, "login");
      aliasQuery(req, "listCurrentTherapistEvents");
    });
    cy.loginToTherapistPanel(this.data.therapistEmail, this.data.therapistPass);
    cy.wait("@gqlloginMutation");
    therapistPanel.getSessionMenu().click();
    cy.get('[data-test="past-session-button"]').eq(1).click();
    cy.wait("@gqllistCurrentTherapistEventsQuery");
    cy.get('[data-test="day-marker"]').should("have.length", 10);
  });

  it("Therapist is able to delete working hours", function () {
    cy.goToTherapistLoginPage();
    cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
      aliasMutation(req, "login");
      aliasQuery(req, "listPatientsPaginated");
      aliasQuery(req, "getTherapist");
    });
    cy.goToTherapistLoginPage();
    cy.loginToTherapistPanel(this.data.therapistEmail, this.data.therapistPass);
    cy.wait("@gqlloginMutation");
    therapistPanel.getHarmonogramMenu().click();
    cy.url().should("include", "panel-terapeuty/harmonogram");
    therapistPanel.getDeleteIcon().eq(0).click();
    cy.on("window;confirm", (str) => {});
    therapistPanel.getSaveButton().click();
  });

  it("Setting up working hours and replication to therapist listing", function () {
    cy.goToTherapistLoginPage();
    cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
      aliasMutation(req, "login");
      aliasQuery(req, "listPatientsPaginated");
      aliasQuery(req, "getTherapist");
    });
    cy.goToTherapistLoginPage();
    cy.loginToTherapistPanel(this.data.therapistEmail, this.data.therapistPass);
    cy.wait("@gqlloginMutation");
    therapistPanel.getHarmonogramMenu().click();
    cy.url().should("include", "panel-terapeuty/harmonogram");
    therapistPanel.getHoursCell().eq(1).click();
    therapistPanel.getAddRangeButton().click();
    therapistPanel
      .getStartHours()
      .eq(0)
      .children()
      .eq(0)
      .select("18:00")
      .should("have.value", "18:00");
    therapistPanel.getErrorMessage().should("be.visible");
    therapistPanel
      .getEndHours()
      .eq(0)
      .children()
      .eq(0)
      .select("21:00")
      .should("have.value", "21:00");
    therapistPanel.getSaveButton().click();
    therapistPanel.getNotistack().should("be.visible");
    cy.visit("http://localhost:3000/psychoterapia_online");
    cy.wait("@gqlgetTherapistQuery");
    psychoOnlinePage.getTherapistListSearch().type(this.data.therapistName);
    psychoOnlinePage.getTherapist().click();
    cy.wait("@gqlgetTherapistBySlugQuery");

    psychoOnlinePage
      .getReactCalendar()
      .children()
      .not("[disabled]")
      .should("have.length", 4);
    psychoOnlinePage.getAvailableHourButtons().should("have.length", 3);
  });

  it("Therapist can displaying patient profile assigned to them", function () {
    cy.goToTherapistLoginPage();
    cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
      aliasMutation(req, "login");
      aliasQuery(req, "listPatientsPaginated");
      aliasQuery(req, "getPatientBasicData");
    });
    cy.loginToTherapistPanel(this.data.therapistEmail, this.data.therapistPass);
    cy.wait("@gqlloginMutation");
    therapistPanel.getPatientMenu().click();
    cy.url().should("include", "panel-terapeuty/pacjenci");
    cy.wait("@gqllistPatientsPaginatedQuery").then((res) => {
      therapistPanel
        .getPatientInfo()
        .should(
          "have.length",
          res.response.body.data.listPatientsPaginated.length
        );
    });
    therapistPanel.getPatientInfo().eq(0).click();
    cy.wait("@gqlgetPatientBasicDataQuery");
    therapistPanel.getEmailInfo().should("be.visible");
    therapistPanel.getPhoneInfo().should("be.visible");
    therapistPanel.getPatientName().should("be.visible");
    therapistPanel.getSelectedProductVariant().should("be.visible");
    therapistPanel.getPatientStatus().should("be.visible");
  });
});

describe("Creating and editing a visit using Therapist Panel", function () {
  beforeEach(function () {
    cy.fixture("../E2E/fixtures/example.json").then(function (data) {
      this.data = data;
    });
    cy.clearLocalStorage();
    cy.task("resetDb");
  });

  it("Mettings display only once", function () {
    cy.goToTherapistLoginPage();
    cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
      aliasMutation(req, "login");
      aliasQuery(req, "listCurrentTherapistEvents");
    });
    cy.loginToTherapistPanel(this.data.therapistEmail, this.data.therapistPass);
    cy.wait("@gqlloginMutation");
    therapistPanel.getSessionMenu().click();
    cy.url().should("include", "panel-terapeuty/sesje");
    cy.wait("@gqllistCurrentTherapistEventsQuery").then((resp) => {
      let startHours = new Set();
      for (
        let i = 0;
        i < resp.response.body.data.listCurrentTherapistEvents.length;
        i++
      ) {
        startHours.add(
          resp.response.body.data.listCurrentTherapistEvents[i].start
        );
      }

      expect(resp.response.body.data.listCurrentTherapistEvents.length).equal(
        startHours.size
      );
    });
  });
});
