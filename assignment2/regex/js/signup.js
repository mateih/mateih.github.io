const invalidMessageDesc = (validity, cb) => {
    if (validity.valueMissing) {
        return "The value is missing";
    } else if (validity.rangeOverflow) {
        return "Value >= Maximum allowed value";
    } else if (validity.rangeUnderflow) {
        return "Value <= Minimum allowed value";
    } else if (validity.tooShort) {
        return "Input is too short";
    } else if (validity.tooLong) {
        return "Input is too long";
    } else if (validity.patternMismatch) {
        return "Input must match the given pattern";
    } else if (validity.typeMismatch) {
        return "Input is not a valid email address"; // this only happens when type="email" or type="url", but we have no urls so this is fine
    } else if (validity.customError) {
        return cb();
    }
};

const displayInvalidMessage = (input, valElemId) => {
    let validity = input.validity;

    let valElem = document.getElementById(valElemId);

    valElem.innerText = invalidMessageDesc(validity, () => input.validationMessage);
};

const checkPassword = (input) => {
    let pwd = input.value;

    if (!/[a-z]/.test(pwd)) {
        input.setCustomValidity('Password must contain at least one lowercase chararcter');
        return;
    }

    if (!/[A-Z]/.test(pwd)) {
        input.setCustomValidity('Password must contain at least one uppercase chararcter');
        return;
    }

    if (!/[0-9]/.test(pwd)) {
        input.setCustomValidity('Password must contain at least one digit');
        return;
    }

    if (!/[^A-Za-z0-9]/.test(pwd)) {
        input.setCustomValidity('Password must contain at least one symbol');
        return;
    }

    input.setCustomValidity('') // '' = no errors
};

document.addEventListener("DOMContentLoaded", () => {
    let form = document.getElementById("form");
    form.addEventListener('submit', (e) => {
        for (const vm of document.querySelectorAll("#form .val-msg")) {
            vm.innerText = "Looks good!";
        }

        checkPassword(document.querySelector('#form input#pwd'));

        if (form.checkValidity()) {
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