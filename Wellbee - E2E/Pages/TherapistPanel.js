///// PATIENT SITE /////

export function getPatientInfo() {
  return cy.get('[data-test="patient-info"]');
}

export function getPhoneInfo() {
  return cy.get('[data-test="patient-phone-number"]');
}
export function getPatientName() {
  return cy.get('[data-test="patient-name"]');
}
export function getPatientStatus() {
  return cy.get('[data-test="patient-status"]').eq(0).parent();
}

export function getSaveButton() {
  return cy.get('[data-test="save-button"]');
}

export function getPatientStatusItem() {
  return cy.get('[data-test="patient-status-menu-item"]');
}

export function getSelectedProductVariant() {
  return cy.get('[data-test="selected-product-variant"]').children();
}
export function getProductVariant() {
  return cy.get('[data-test="product-variant"]');
}

export function getEmailInfo() {
  return cy.get('[data-test="patient-email"]');
}
export function getPatient() {
  return cy.get('[data-test="patient"]');
}
export function getDateSelector() {
  return cy.get('[data-test="date-selector"]');
}

export function getHourSelector() {
  return cy.get('[data-test="time-selector"]').children().eq(0);
}
export function getMinuteSelector() {
  return cy.get('[data-test="time-selector"]').children().eq(1);
}
export function getSortBy() {
  return cy.get('[data-test="sort-by"]').children().eq(0);
}

export function getOrderByStatus() {
  return cy.get('[data-test="order-patient-by-status"]');
}

export function getPatientStatusFilter() {
  return cy.get('[data-test="patient-status"]');
}

export function getPatientStatusChip() {
  return cy.get('[data-test="patient-status-chip"]');
}

export function getNoPatientMessage() {
  return cy.get('[data-test="no-patient-message"]');
}
///// LEFT PANEL /////
export function getAddSessionButton() {
  return cy.get('[data-test="add-session-button"]');
}

export function getSessionMenu() {
  return cy.get('[data-test="left-panel-option"]').eq(0);
}

export function getPatientMenu() {
  return cy.get('[data-test="left-panel-option"]').eq(1);
}

export function getHarmonogramMenu() {
  return cy.get('[data-test="left-panel-option"]').eq(2);
}
export function getWalletMenu() {
  return cy.get('[data-test="left-panel-option"]').eq(3);
}

///// SESSION SITE /////
export function getBookedSessionFromFronted() {
  return cy.get('[data-test="booked-session"]');
}

export function getPatientSelector() {
  return cy.get('[data-test="patient-selector"]');
}
export function getHourMarker() {
  return cy.get('[data-test="hour-marker"]');
}
export function getSaveSessionButton() {
  return cy.get('[data-test="save-session-button"]');
}

///// HARMONOGRAM SITE /////
export function getHoursCell() {
  return cy.get('[data-test="hours-cell"]');
}

export function getStartHours() {
  return cy.get('[data-test="change-start-hour"]');
}

export function getEndHours() {
  return cy.get('[data-test="change-end-hour"]');
}
export function getAddRangeButton() {
  return cy.get('[data-test="add-range-button"]');
}

export function getDeleteIcon() {
  return cy.get('[data-test="delete-icon"]');
}

export function getErrorMessage() {
  return cy.get('[data-test="error-message"]');
}

///// WALLET SITE ////

export function getExpandButtonList() {
  return cy.get('[data-test="expand-button-list"]');
}

export function getSingleDayRow() {
  return cy.get('[data-test="single-day-row"]')
}

export function getListOfTransaction() { 
  return cy.get('[data-test="list-of-transaction"]')
}

export function getPriceFotPatient() { 
  return cy.get('[data-test="price-for-patient"]')
}
export function getPayout() {
 return cy.get('[data-test="payout"]')
}


export function getStatsByMonth() {
  return cy.get('[data-test="stats-by-month"]')
}

  





//// OTHER ////
export function getNotistack() {
  return cy.get("#notistack-snackbar");
}
