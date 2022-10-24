export function validationName(value) {
    let isValidation = true;
    if (value.length < 2 || value.length > 60) {
        isValidation = false
        return isValidation;
    }
    return isValidation;
}

export function validationEmail(value) {
    let isValidation = true;
    const filter = /^([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$/;
    if (!filter.test(value) || value.length > 60 || value.length < 2) {
        isValidation = false;
        return isValidation;
    }
    return isValidation;
}

export function validationPhoneNumber(value) {
    let isValidation = true;
    const filter = /^[+]{0,1}380([0-9]{9})$/;
    if (!filter.test(value)) {
        isValidation = false;
        return isValidation;
    }
    return isValidation;
}