// this script is only used in builtin/signup1.html

const initBehaviourTracking = (form) => {
    // we are going to isolate the behavior tracking to the form alone, not the whole page.
    // this function is responsible for initializing it.
    form.dataset['mouseclicks'] = '0'; // use the `data-*` attributes to store the number of mouse clicks
    form.dataset['timestart'] = `${new Date().toISOString()}`; // and the date we initialized the system at

    form.addEventListener('mousedown', () => { // can also use click
        form.dataset['mouseclicks']++; // increment the number of mouse clicks
    });

    for (const input of form.querySelectorAll('input, textarea')) {
        input.dataset['keypresses'] = '0'; // initialize the number of keypresses to 0
        input.dataset['charstyped'] = '0'; // initialize the number of characters to 0

        input.addEventListener('keydown', () => {
            input.dataset['keypresses']++; // increment the number of keypresses on keydown in the given input field
        });

        let oldValueLength = input.value.length; // initialize a variable to keep track of the old length of the
        // field, so we know how many characters were typed

        input.addEventListener('input', () => { // oninput gets called at every change of the input field
            let newValue = input.value; // get the new value

            let charsTyped = newValue.length - oldValueLength; // compute the difference in length to know how many characters were typed

            if (charsTyped > 0) // if charsTyped <= 0, then there was no change (for example overwrite), or there were deleted characters
                input.dataset['charstyped'] = `${(+input.dataset['charstyped']) + charsTyped}`; // cast to number first before adding

            oldValueLength = newValue.length; // update the variable holding the number of characters that are
            // now in the field, so when this callback gets called again, we know how many characters were
            // typed
        });
    }
};

const formatDuration = (ms) => {
    // function that formats a ms duration into a human readable duration string
    let s = Math.floor(ms / 1000);

    if (s > 0) {
        let min = Math.floor(s / 60);
        if (min > 0) {
            s = s % 60;
            let h = Math.floor(min / 60);
            if (h > 0) {
                min = min % 60;
                let d = Math.floor(h / 24);
                if (d > 0) {
                    h = h % 24;
                    return `${d}d ${h}h ${min}min ${s}s`;
                } else return `${h}h ${min}min ${s}s`;
            } else return `${min}min ${s}s`
        } else return `${s}s`;
    } else return `${ms}ms`;
};

const compileStats = (form) => {
    let mouseClicks = form.dataset['mouseclicks']; // get the number of mouseclicks
    let time = formatDuration(new Date() - new Date(form.dataset['timestart'])); // format the elapsed time as a duraiton

    // build the result string
    let resultString = `
Mouse clicks: ${mouseClicks}
Time spent: ${time}
`;

    for (const input of form.querySelectorAll('input, textarea')) {
        if (input.name === 'submit') continue; // ignore the submit button
        // for each input field
        resultString += `${input.name}: {keypresses: ${input.dataset['keypresses']}, charstyped: ${input.dataset['charstyped']}}
`;
    }

    return resultString;
};