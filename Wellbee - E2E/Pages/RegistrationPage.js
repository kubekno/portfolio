
export function getEmailBox() {
    return cy.get('#email-input')
}
export function getPasswordBox() {
    return cy.get('#password-input')
}
export function getSubmitButton() {
    return cy.get('button[type="submit"]')
}
export function getPasswordLengthInfoBad() {
    return cy.get('[data-test="invalid-password-strenght-msg"]')
}

export function getLoginPasswordLengthInfoGood() {
    return cy.get('[data-test="valid-password-strenght-msg"]')
}

export function getAllCheckBoxes() {
    return cy.get('[type="checkbox"]')
}

export function getErrorMessege() {
    return cy.get('[data-test="error-message"]')
}

export function getSuccessMessege() {
    return cy.get('[data-test="register_success_msg"]')
}
export function getRegisterButton() {
    return cy.get('[data-test="Register-button"]')
}

