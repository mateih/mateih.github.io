const isLetter = (char) => char.length === 1 && char.toLowerCase() !== char.toUpperCase();
const isDigit = (char) => char.length === 1 && char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 48 + 9;

const checkUsername = (input) => {
    let username = input.value;

    let firstChar = username.charAt(0);
    if (!isLetter(firstChar) || firstChar.toUpperCase() !== firstChar) {
        return 'Username must start with an uppercase letter';
    }

    let lastChar = username.charAt(username.length - 1);
    if (!isDigit(lastChar)) {
        return 'Username must end with a digit';
    }

    return null;
};

const checkPassword = (input) => {
    let pwd = input.value;

    let hasLower = false;
    let hasUpper = false;
    let hasDigit = false;
    let hasSymbol = false;

    for (const ch of pwd) {
        if (isLetter(ch)) {
            if (ch.toLowerCase() === ch) {
                hasLower = true;
            } else {
                hasUpper = true;
            }
        } else if (isDigit(ch)) {
            hasDigit = true;
        } else {
            hasSymbol = true;
        }
    }

    if (!hasLower) {
        return 'Password must contain at least one lowercase chararcter';
    }

    if (!hasUpper) {
        return 'Password must contain at least one uppercase chararcter';
    }

    if (!hasDigit) {
        return 'Password must contain at least one digit';
    }

    if (!hasSymbol) {
        return 'Password must contain at least one symbol';
    }

    return null;
};

const checkName = (input) => {
    let name = input.value;

    for (const char of name) {
        if (!isLetter(char) && char !== ' ') {
            return 'Only letters and spaces are allowed, found "' + char + '"';
        }
    }

    return null;
};

const checkZip = (input) => {
    let zip = input.value;

    if (zip === '') return null; // is optional

    if (zip.length !== 6) return 'ZIP code must be 6 characters';


    for (const ch of zip.substring(0, 4)) {
        if (!isDigit(ch)) {
            return 'The first 4 characters should be digits';
        }
    }

    for (const ch of zip.substring(4, 6)) {
        if (!isLetter(ch) || ch.toUpperCase() !== ch) {
            return 'The last 2 characters should be uppercase letters';
        }
    }

    return null;
};

const checkEmail = (input) => {
    let email = input.value;

    // emailregex.com, hard to check email without a regex
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        return 'Not a valid email';
    }

    return null;
};

const EMPTY_CHECK = (_input) => null;

const fieldsToCheck = {
    'input#username': {check: checkUsername, valMsg: '#username-val-msg', required: true},
    'input#pwd': {check: checkPassword, valMsg: '#pwd-val-msg', required: true},
    'input#name': {check: checkName, valMsg: '#name-val-msg', required: true},
    'input#addr': {check: EMPTY_CHECK, valMsg: '#addr-val-msg', required: false},
    'input#country': {check: EMPTY_CHECK, valMsg: '#country-val-msg', required: true},
    'input#zip': {check: checkZip, valMsg: '#zip-val-msg', required: false},
    'input#email': {check: checkEmail, valMsg: '#email-val-msg', required: true},
};

document.addEventListener("DOMContentLoaded", () => {
    let form = document.getElementById("form");
    form.addEventListener('submit', (e) => {
        for (const vm of document.querySelectorAll("#form .val-msg")) {
            vm.innerText = "Looks good!";
        }

        let fail = false;
        for (const el of Object.entries(fieldsToCheck)) {
            console.log(el);
            let [name, {check, required, valMsg}] = el;
            let input = document.querySelector(name);

            let result = null;

            if (required && input.value === '') {
                result = "Required field is empty";
            } else {
                result = check(input);
            }

            if (result !== null) {
                document.querySelector(valMsg).innerText = result;
                fail = true;
            }
        }

        if (!fail) {
            const FD = new FormData(form);
            let data = {};
            for (let [name, value] of FD) {
                data[name] = value;
            }
            alert("Successful data: " + JSON.stringify(data))
        } else {
            e.preventDefault();
        }
    });
});