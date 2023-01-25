
```js
// .\builtin\js\signup.js

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

            let hiddenFields = form.querySelector("#hiddenFields");
            if (hiddenFields) {
                hiddenFields.innerText = compileStats(form);
                hiddenFields.style.display = 'block';
                e.preventDefault();
            }

            alert("Successful data: " + JSON.stringify(data))
        } else {
            e.preventDefault();
        }
    });
});
```

```html
<!-- .\builtin\cart.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body background="p1.png">
    <div class="cart">
        <h1>Your items:</h1>
        <div class="item">
            <p>Item #1</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div><br>
        <div class="item2">
            <p>Item #2</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div class="item3">
            <p>Item #3</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <button type="button" value="button">Order</button>
    </div>
    
</body>
</html>
```

```html
<!-- .\builtin\index.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body background="p1.png">
    <div class="welcome">
        <br><br>
        <h2>Welcome!</h2>
            <a href="signup1.html">Sign-up as seller.</a><br>
            <a href="signup2.html">Sign-up as buyer.</a><br>
            <a href="site2.html">Login.</a><br>
        </form>
    </div>
    
</body>
</html>
```

```html
<!-- .\builtin\seller.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body background="background.PNG">
    <div class="seller">
        <h1>Add item for sale:</h1>    
        <label>Item Name: </label><br>
        <input type="text" name="" placeholder="Enter Name"><br>
        <label>Item description:</label><br>
        <textarea name="" placeholder="" rows="7" cols="50"></textarea><br>
        <label>Quantity:</label>
        <input type="number" min="1" max="100"><br>
        <label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbspPrice:</label>
        <input type="number" min="1" max="100"><br>

        <label>Category:</label>
        <select name="category">
            <option>Books</option>
            <option>Films</option>
            <option>Computers</option>
            <option>Music</option>
            <option>Fashion</option>
        </select><br>
        <input type="submit" value="Sell item">
    </div>
</body>
</html>
```

```html
<!-- .\builtin\signup1.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="js/signup.js"></script>
    <script src="../behaviour-tracking.js"></script>
    <script>
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("form");
        initBehaviourTracking(form);
    });
    </script>
</head>
<body background="p1.png">
<div class="signupboxcontainer">
    <div class="signupbox">
        <h2>Sign-up as seller</h2>
        <form id="form" novalidate>
            <p id="hiddenFields" style="display: none"></p>
            <p>Username</p>
            <input type="text" name="username" placeholder="Enter Username" minlength="5" maxlength="12"
                   pattern="[A-Z][A-Za-z0-9]*[^A-Za-z]" required oninvalid="displayInvalidMessage(this, 'username-val-msg')">
            <p id="username-val-msg" class="val-msg"></p>
            <p>Password</p>
            <input id="pwd" type="password" name="password" placeholder="Enter Password" minlength="12"
                oninvalid="displayInvalidMessage(this, 'pwd-val-msg')"><br>
            <p id="pwd-val-msg" class="val-msg"></p>
            <p>Name</p>
            <input type="text" name="name" placeholder="Enter Name" pattern="[A-Za-z ]+" required
                    oninvalid="displayInvalidMessage(this, 'name-val-msg')"><br>
            <p id="name-val-msg" class="val-msg"></p>
            <p>Address</p>
            <input type="text" name="address" placeholder="Enter Address" oninvalid="displayInvalidMessage(this, 'addr-val-msg')"><br>
            <p id="address-val-msg" class="val-msg"></p>
            <p>Country</p>
            <input type="text" name="country" placeholder="Enter Country" required oninvalid="displayInvalidMessage(this, 'country-val-msg')"><br>
            <p id="country-val-msg" class="val-msg"></p>
            <p>ZIP Code</p>
            <input type="text" name="zip" placeholder="Enter ZIP Code" pattern="[\d]{4}[A-Z]{2}" oninvalid="displayInvalidMessage(this, 'zip-val-msg')"><br>
            <p id="zip-val-msg" class="val-msg"></p>
            <p>Email</p>
            <input type="email" name="email" placeholder="Enter Email" required oninvalid="displayInvalidMessage(this, 'email-val-msg')"><br>
            <p id="email-val-msg" class="val-msg"></p>
            <p>Sex</p>
            <select name="sex" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select><br><br>
            <p>About</p>
            <textarea name="about" placeholder="" rows="4" cols="30"></textarea><br>
            <p>Language</p>
            <select name="language" required>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="ro">Romanian</option>
            </select><br><br>
            <input type="submit" name="submit" value="Sign-up"><br><br>

            <a href="site2.html">Already have an account?</a><br>
        </form>
    </div>
</div>
</body>
</html>
```

```html
<!-- .\builtin\signup2.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="js/signup.js"></script>
</head>
<body background="p1.png">
<div class="signupboxcontainer">
    <div class="signupbox">
        <h2>Sign-up as Buyer</h2>
        <form action="site3.html" id="form" novalidate>
            <p>Username</p>
            <input type="text" name="username" placeholder="Enter Username" minlength="5" maxlength="12"
                   pattern="[A-Z][A-Za-z0-9]*[^A-Za-z]" required oninvalid="displayInvalidMessage(this, 'username-val-msg')">
            <p id="username-val-msg" class="val-msg"></p>
            <p>Password</p>
            <input id="pwd" type="password" name="password" placeholder="Enter Password" minlength="12"
                oninvalid="displayInvalidMessage(this, 'pwd-val-msg')"><br>
            <p id="pwd-val-msg" class="val-msg"></p>
            <p>Name</p>
            <input type="text" name="name" placeholder="Enter Name" pattern="[A-Za-z ]+" required
                    oninvalid="displayInvalidMessage(this, 'name-val-msg')"><br>
            <p id="name-val-msg" class="val-msg"></p>
            <p>Address</p>
            <input type="text" name="address" placeholder="Enter Address" oninvalid="displayInvalidMessage(this, 'addr-val-msg')"><br>
            <p id="address-val-msg" class="val-msg"></p>
            <p>Country</p>
            <input type="text" name="country" placeholder="Enter Country" required oninvalid="displayInvalidMessage(this, 'country-val-msg')"><br>
            <p id="country-val-msg" class="val-msg"></p>
            <p>ZIP Code</p>
            <input type="text" name="zip" placeholder="Enter ZIP Code" pattern="[\d]{4}[A-Z]{2}" oninvalid="displayInvalidMessage(this, 'zip-val-msg')"><br>
            <p id="zip-val-msg" class="val-msg"></p>
            <p>Email</p>
            <input type="email" name="email" placeholder="Enter Email" required oninvalid="displayInvalidMessage(this, 'email-val-msg')"><br>
            <p id="email-val-msg" class="val-msg"></p>
            <p>Sex</p>
            <select name="sex" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select><br><br>
            <p>About</p>
            <textarea name="about" placeholder="" rows="4" cols="30"></textarea><br>
            <p>Language</p>
            <select name="language" required>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="ro">Romanian</option>
            </select><br><br>
            <input type="submit" name="submit" value="Sign-up"><br><br>

            <a href="site2.html">Already have an account?</a><br>
        </form>
    </div>
</div>
</body>
</html>
```

```html
<!-- .\builtin\site2.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="style.css">
    <title>Document</title>
</head>
<body background="p1.png">
<div class="loginboxcontainer">
    <div class="loginbox">
        <h1>Login Here</h1>
        <form action="site3.html">
            <p>Username</p>
            <input type="text" name="username" placeholder="Enter Username" required>
            <p>Password</p>
            <input type="password" name="password" placeholder="Enter Password" required> <br/>
            <input type="submit" name="" value="Login"> <br/>
            <a href="index.html">Don't have an account?</a>
        </form>
    </div>
</div>
</body>
</html>
```

```html
<!-- .\builtin\site3.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="style.css">
    <title>Document</title>
</head>
<body background="background.PNG">
    
    <div class="this">
        <form>
            <a href="cart.html">My cart</a>
        </form>
    </div>


    <div class="buy">
        <h1>Available for purchase:</h1>
        <p class="para">Filter by:</p>
        <select class="sortby">
            <option>Rating</option>
            <option>Supplier</option>
            <option>Price</option>
        </select><br><br>
        <div class="itema">
            <p>Item #1</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button type="button" value="button">Add to cart.</button>
        </div><br>
        <div class="item2a">
            <p>Item #2</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button type="button" value="button">Add to cart.</button>
        </div>
        <div class="item3a">
            <p>Item #3</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button type="button" value="button">Add to cart.</button>
        </div>
    </div>
   

</body>
</html>
```

```css
/* .\builtin\style.css */

.welcome{
    position: absolute;
    width: 300px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 20%;
    background: #000;
    color: #fff;
    text-align: center;
    font-size: 20px;
}

body {
    width: 100%;
    min-height: 100%;
    margin: 0;
}

.signupboxcontainer {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    border: 0;
    margin: 0;
}

.signupbox{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 0;
    background: #000;
    color: #fff;
    padding: 30px 35px;
    line-height: 0.5;
    border-radius: 7%;
}

.signupbox input {
    width: 100%;
    border-radius: 0;
}

.signupbox select {
    width: 100%;
    border-radius: 0;
}

.signupbox textarea {
    width: 100%;
    border-radius: 0;
}

.loginboxcontainer {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
}

.loginbox{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    background: #000;
    color: #fff;
    padding: 70px 35px;
    border-radius: 7%;
}

.loginbox input {
    width: 100%;
    border-radius: 0;

    margin: 15px 0;
}

.this{
    position: absolute;
    width: 70px;
    height: 30px;
    background: rgb(1, 8, 69);
    left: 90%;
    text-align: center;
    border-radius: 20%;
    padding: 5px 0;
}

.seller{
    line-height: 1.5;
    position: absolute;
    width: 700px;
    height: 600px;
    background: #244a4a;
    text-align: left;
    border-radius: 20%;
    text-indent: 20%;
    font-size: 25px;
    top: 20%;
    left: 30%;
    transform: translateX(-50%);
    display: inline-block;
    padding: 35px 65px;

}
.seller input[type="text"]{
    height: 23px;
}
.seller input[type="number"]{
    height: 23px;
}
.seller input[type="submit"]{
    height: 50px;
    width:80px;
    float: right;
    font-size: 17px;
}

.buy{
    position: absolute;
    width: 700px;
    height: 700px;
    background: #0c0035;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    border-radius: 10%;
    color: #fff;
}

.item{
    position: absolute;
    width: 600px;
    height: 150px;
    background: #000;
    left: 50px;
    color: #fff;
    text-align: left;
    text-indent: 50px;
    box-sizing: border-box;
}

.item2{
    position: absolute;
    width: 600px;
    height: 150px;
    background: #000;
    left: 50px;
    top: 275px;
    color: #fff;
    text-align: left;
    text-indent: 50px;
    box-sizing: border-box;
}

.item3{
    position: absolute;
    width: 600px;
    height: 150px;
    background: #000;
    left: 50px;
    top: 465px;
    color: #fff;
    text-align: left;
    text-indent: 50px;
    box-sizing: border-box;
}

.buy button[type="button"]{
    position: absolute;
    left: 80%;
    font-size: 15px;

}

.cart{
    position: absolute;
    width: 700px;
    height: 700px;
    background: #0a0078;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    border-radius: 10%;
    color: antiquewhite;
}

.cart button[type="button"]{
    position: absolute;
    left: 80%;
    top: 89%;
    font-size: 21px;
    height: 50px;
    width: 75px;

}

.itema{
    position: absolute;
    width: 600px;
    height: 150px;
    background: #000;
    left: 50px;
    color: #fff;
    text-align: left;
    text-indent: 50px;
    box-sizing: border-box;
}

.item2a{
    position: absolute;
    width: 600px;
    height: 150px;
    background: #000;
    left: 50px;
    top: 325px;
    color: #fff;
    text-align: left;
    text-indent: 50px;
    box-sizing: border-box;
}

.item3a{
    position: absolute;
    width: 600px;
    height: 150px;
    background: #000;
    left: 50px;
    top: 500px;
    color: #fff;
    text-align: left;
    text-indent: 50px;
    box-sizing: border-box;
}

#hiddenFields {
    line-height: 15px;
}
```

```js
// .\custom_js\js\signup.js

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
```

```html
<!-- .\custom_js\cart.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body background="p1.png">
    <div class="cart">
        <h1>Your items:</h1>
        <div class="item">
            <p>Item #1</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div><br>
        <div class="item2">
            <p>Item #2</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div class="item3">
            <p>Item #3</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <button type="button" value="button">Order</button>
    </div>
    
</body>
</html>
```

```html
<!-- .\custom_js\index.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body background="p1.png">
    <div class="welcome">
        <br><br>
        <h2>Welcome!</h2>
            <a href="signup1.html">Sign-up as seller.</a><br>
            <a href="signup2.html">Sign-up as buyer.</a><br>
            <a href="site2.html">Login.</a><br>
        </form>
    </div>
    
</body>
</html>
```

```html
<!-- .\custom_js\seller.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body background="background.PNG">
    <div class="seller">
        <h1>Add item for sale:</h1>    
        <label>Item Name: </label><br>
        <input type="text" name="" placeholder="Enter Name"><br>
        <label>Item description:</label><br>
        <textarea name="" placeholder="" rows="7" cols="50"></textarea><br>
        <label>Quantity:</label>
        <input type="number" min="1" max="100"><br>
        <label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbspPrice:</label>
        <input type="number" min="1" max="100"><br>

        <label>Category:</label>
        <select name="category">
            <option>Books</option>
            <option>Films</option>
            <option>Computers</option>
            <option>Music</option>
            <option>Fashion</option>
        </select><br>
        <input type="submit" value="Sell item">
    </div>
</body>
</html>
```

```html
<!-- .\custom_js\signup1.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="js/signup.js"></script>
</head>
<body background="p1.png">
<div class="signupboxcontainer">
    <div class="signupbox">
        <h2>Sign-up as seller</h2>
        <form action="seller.html" id="form" novalidate>
            <p>Username</p>
            <input id="username" type="text" name="username" placeholder="Enter Username">
            <p id="username-val-msg" class="val-msg"></p>
            <p>Password</p>
            <input id="pwd" type="password" name="password" placeholder="Enter Password"><br>
            <p id="pwd-val-msg" class="val-msg"></p>
            <p>Name</p>
            <input id="name" type="text" name="name" placeholder="Enter Name"><br>
            <p id="name-val-msg" class="val-msg"></p>
            <p>Address</p>
            <input id="addr" type="text" name="address" placeholder="Enter Address"><br>
            <p id="address-val-msg" class="val-msg"></p>
            <p>Country</p>
            <input id="country" type="text" name="country" placeholder="Enter Country"><br>
            <p id="country-val-msg" class="val-msg"></p>
            <p>ZIP Code</p>
            <input id="zip" type="text" name="zip" placeholder="Enter ZIP Code"><br>
            <p id="zip-val-msg" class="val-msg"></p>
            <p>Email</p>
            <input id="email" type="text" name="email" placeholder="Enter Email"><br>
            <p id="email-val-msg" class="val-msg"></p>
            <p>Sex</p>
            <select name="sex" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select><br><br>
            <p>About</p>
            <textarea name="about" placeholder="" rows="4" cols="30"></textarea><br>
            <p>Language</p>
            <select name="language" required>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="ro">Romanian</option>
            </select><br><br>
            <input type="submit" name="submit" value="Sign-up"><br><br>

            <a href="site2.html">Already have an account?</a><br>
        </form>
    </div>
</div>
</body>
</html>
```

```html
<!-- .\custom_js\signup2.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="js/signup.js"></script>
</head>
<body background="p1.png">
<div class="signupboxcontainer">
    <div class="signupbox">
        <h2>Sign-up as Buyer</h2>
        <form action="site3.html" id="form" novalidate>
            <p>Username</p>
            <input id="username" type="text" name="username" placeholder="Enter Username">
            <p id="username-val-msg" class="val-msg"></p>
            <p>Password</p>
            <input id="pwd" type="password" name="password" placeholder="Enter Password"><br>
            <p id="pwd-val-msg" class="val-msg"></p>
            <p>Name</p>
            <input id="name" type="text" name="name" placeholder="Enter Name"><br>
            <p id="name-val-msg" class="val-msg"></p>
            <p>Address</p>
            <input id="addr" type="text" name="address" placeholder="Enter Address"><br>
            <p id="address-val-msg" class="val-msg"></p>
            <p>Country</p>
            <input id="country" type="text" name="country" placeholder="Enter Country"><br>
            <p id="country-val-msg" class="val-msg"></p>
            <p>ZIP Code</p>
            <input id="zip" type="text" name="zip" placeholder="Enter ZIP Code"><br>
            <p id="zip-val-msg" class="val-msg"></p>
            <p>Email</p>
            <input id="email" type="text" name="email" placeholder="Enter Email"><br>
            <p id="email-val-msg" class="val-msg"></p>
            <p>Sex</p>
            <select name="sex" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select><br><br>
            <p>About</p>
            <textarea name="about" placeholder="" rows="4" cols="30"></textarea><br>
            <p>Language</p>
            <select name="language" required>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="ro">Romanian</option>
            </select><br><br>
            <input type="submit" name="submit" value="Sign-up"><br><br>

            <a href="site2.html">Already have an account?</a><br>
        </form>
    </div>
</div>
</body>
</html>
```

```html
<!-- .\custom_js\site2.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="style.css">
    <title>Document</title>
</head>
<body background="p1.png">
<div class="loginboxcontainer">
    <div class="loginbox">
        <h1>Login Here</h1>
        <form action="site3.html">
            <p>Username</p>
            <input type="text" name="username" placeholder="Enter Username" required>
            <p>Password</p>
            <input type="password" name="password" placeholder="Enter Password" required> <br/>
            <input type="submit" name="" value="Login"> <br/>
            <a href="index.html">Don't have an account?</a>
        </form>
    </div>
</div>
</body>
</html>
```

```html
<!-- .\custom_js\site3.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="style.css">
    <title>Document</title>
</head>
<body background="background.PNG">
    
    <div class="this">
        <form>
            <a href="cart.html">My cart</a>
        </form>
    </div>


    <div class="buy">
        <h1>Available for purchase:</h1>
        <p class="para">Filter by:</p>
        <select class="sortby">
            <option>Rating</option>
            <option>Supplier</option>
            <option>Price</option>
        </select><br><br>
        <div class="itema">
            <p>Item #1</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button type="button" value="button">Add to cart.</button>
        </div><br>
        <div class="item2a">
            <p>Item #2</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button type="button" value="button">Add to cart.</button>
        </div>
        <div class="item3a">
            <p>Item #3</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button type="button" value="button">Add to cart.</button>
        </div>
    </div>
   

</body>
</html>
```

```css
/* .\custom_js\style.css */

.welcome{
    position: absolute;
    width: 300px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 20%;
    background: #000;
    color: #fff;
    text-align: center;
    font-size: 20px;
}

body {
    width: 100%;
    min-height: 100%;
    margin: 0;
}

.signupboxcontainer {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    border: 0;
    margin: 0;
}

.signupbox{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 0;
    background: #000;
    color: #fff;
    padding: 30px 35px;
    line-height: 0.5;
    border-radius: 7%;
}

.signupbox input {
    width: 100%;
    border-radius: 0;
}

.signupbox select {
    width: 100%;
    border-radius: 0;
}

.signupbox textarea {
    width: 100%;
    border-radius: 0;
}

.loginboxcontainer {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
}

.loginbox{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    background: #000;
    color: #fff;
    padding: 70px 35px;
    border-radius: 7%;
}

.loginbox input {
    width: 100%;
    border-radius: 0;

    margin: 15px 0;
}

.this{
    position: absolute;
    width: 70px;
    height: 30px;
    background: rgb(1, 8, 69);
    left: 90%;
    text-align: center;
    border-radius: 20%;
    padding: 5px 0;
}

.seller{
    line-height: 1.5;
    position: absolute;
    width: 700px;
    height: 600px;
    background: #244a4a;
    text-align: left;
    border-radius: 20%;
    text-indent: 20%;
    font-size: 25px;
    top: 20%;
    left: 30%;
    transform: translateX(-50%);
    display: inline-block;
    padding: 35px 65px;
    
}
.seller input[type="text"]{
    height: 23px;
}
.seller input[type="number"]{
    height: 23px;
}
.seller input[type="submit"]{
    height: 50px;
    width:80px;
    float: right;
    font-size: 17px;
}

.buy{
    position: absolute;
    width: 700px;
    height: 700px;
    background: #0c0035;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    border-radius: 10%;
    color: #fff;
}

.item{
    position: absolute;
    width: 600px;
    height: 150px;
    background: #000;
    left: 50px;
    color: #fff;
    text-align: left;
    text-indent: 50px;
    box-sizing: border-box;
}

.item2{
    position: absolute;
    width: 600px;
    height: 150px;
    background: #000;
    left: 50px;
    top: 275px;
    color: #fff;
    text-align: left;
    text-indent: 50px;
    box-sizing: border-box;
}

.item3{
    position: absolute;
    width: 600px;
    height: 150px;
    background: #000;
    left: 50px;
    top: 465px;
    color: #fff;
    text-align: left;
    text-indent: 50px;
    box-sizing: border-box;
}

.buy button[type="button"]{
    position: absolute;
    left: 80%;
    font-size: 15px;

}

.cart{
    position: absolute;
    width: 700px;
    height: 700px;
    background: #0a0078;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    border-radius: 10%;
    color: antiquewhite;
}

.cart button[type="button"]{
    position: absolute;
    left: 80%;
    top: 89%;
    font-size: 21px;
    height: 50px;
    width: 75px;

}

.itema{
    position: absolute;
    width: 600px;
    height: 150px;
    background: #000;
    left: 50px;
    color: #fff;
    text-align: left;
    text-indent: 50px;
    box-sizing: border-box;
}

.item2a{
    position: absolute;
    width: 600px;
    height: 150px;
    background: #000;
    left: 50px;
    top: 325px;
    color: #fff;
    text-align: left;
    text-indent: 50px;
    box-sizing: border-box;
}

.item3a{
    position: absolute;
    width: 600px;
    height: 150px;
    background: #000;
    left: 50px;
    top: 500px;
    color: #fff;
    text-align: left;
    text-indent: 50px;
    box-sizing: border-box;
}
```

```js
// .\regex\js\signup.js

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
```

```html
<!-- .\regex\cart.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body background="p1.png">
    <div class="cart">
        <h1>Your items:</h1>
        <div class="item">
            <p>Item #1</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div><br>
        <div class="item2">
            <p>Item #2</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div class="item3">
            <p>Item #3</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <button type="button" value="button">Order</button>
    </div>
    
</body>
</html>
```

```html
<!-- .\regex\index.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body background="p1.png">
    <div class="welcome">
        <br><br>
        <h2>Welcome!</h2>
            <a href="signup1.html">Sign-up as seller.</a><br>
            <a href="signup2.html">Sign-up as buyer.</a><br>
            <a href="site2.html">Login.</a><br>
        </form>
    </div>
    
</body>
</html>
```

```html
<!-- .\regex\seller.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body background="background.PNG">
    <div class="seller">
        <h1>Add item for sale:</h1>    
        <label>Item Name: </label><br>
        <input type="text" name="" placeholder="Enter Name"><br>
        <label>Item description:</label><br>
        <textarea name="" placeholder="" rows="7" cols="50"></textarea><br>
        <label>Quantity:</label>
        <input type="number" min="1" max="100"><br>
        <label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbspPrice:</label>
        <input type="number" min="1" max="100"><br>

        <label>Category:</label>
        <select name="category">
            <option>Books</option>
            <option>Films</option>
            <option>Computers</option>
            <option>Music</option>
            <option>Fashion</option>
        </select><br>
        <input type="submit" value="Sell item">
    </div>
</body>
</html>
```

```html
<!-- .\regex\signup1.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="js/signup.js"></script>
</head>
<body background="p1.png">
<div class="signupboxcontainer">
    <div class="signupbox">
        <h2>Sign-up as seller</h2>
        <form action="seller.html" id="form" novalidate>
            <p>Username</p>
            <input type="text" name="username" placeholder="Enter Username"
                   pattern="[A-Z][A-Za-z0-9]{3,10}[^A-Za-z]" required oninvalid="displayInvalidMessage(this, 'username-val-msg')">
            <p id="username-val-msg" class="val-msg"></p>
            <p>Password</p>
            <input id="pwd" type="password" name="password" placeholder="Enter Password" minlength="12"
                oninvalid="displayInvalidMessage(this, 'pwd-val-msg')"><br>
            <p id="pwd-val-msg" class="val-msg"></p>
            <p>Name</p>
            <input type="text" name="name" placeholder="Enter Name" pattern="[A-Za-z ]+" required
                    oninvalid="displayInvalidMessage(this, 'name-val-msg')"><br>
            <p id="name-val-msg" class="val-msg"></p>
            <p>Address</p>
            <input type="text" name="address" placeholder="Enter Address" oninvalid="displayInvalidMessage(this, 'addr-val-msg')"><br>
            <p id="address-val-msg" class="val-msg"></p>
            <p>Country</p>
            <input type="text" name="country" placeholder="Enter Country" required oninvalid="displayInvalidMessage(this, 'country-val-msg')"><br>
            <p id="country-val-msg" class="val-msg"></p>
            <p>ZIP Code</p>
            <input type="text" name="zip" placeholder="Enter ZIP Code" pattern="[\d]{4}[A-Z]{2}" oninvalid="displayInvalidMessage(this, 'zip-val-msg')"><br>
            <p id="zip-val-msg" class="val-msg"></p>
            <p>Email</p>
            <input type="email" name="email" placeholder="Enter Email" required oninvalid="displayInvalidMessage(this, 'email-val-msg')"><br>
            <p id="email-val-msg" class="val-msg"></p>
            <p>Sex</p>
            <select name="sex" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select><br><br>
            <p>About</p>
            <textarea name="about" placeholder="" rows="4" cols="30"></textarea><br>
            <p>Language</p>
            <select name="language" required>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="ro">Romanian</option>
            </select><br><br>
            <input type="submit" name="submit" value="Sign-up"><br><br>

            <a href="site2.html">Already have an account?</a><br>
        </form>
    </div>
</div>
</body>
</html>
```

```html
<!-- .\regex\signup2.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="js/signup.js"></script>
</head>
<body background="p1.png">
<div class="signupboxcontainer">
    <div class="signupbox">
        <h2>Sign-up as Buyer</h2>
        <form action="site3.html" id="form" novalidate>
            <p>Username</p>
            <input type="text" name="username" placeholder="Enter Username" minlength="5" maxlength="12"
                   pattern="[A-Z][A-Za-z0-9]*[^A-Za-z]" required oninvalid="displayInvalidMessage(this, 'username-val-msg')">
            <p id="username-val-msg" class="val-msg"></p>
            <p>Password</p>
            <input id="pwd" type="password" name="password" placeholder="Enter Password" minlength="12"
                oninvalid="displayInvalidMessage(this, 'pwd-val-msg')"><br>
            <p id="pwd-val-msg" class="val-msg"></p>
            <p>Name</p>
            <input type="text" name="name" placeholder="Enter Name" pattern="[A-Za-z ]+" required
                    oninvalid="displayInvalidMessage(this, 'name-val-msg')"><br>
            <p id="name-val-msg" class="val-msg"></p>
            <p>Address</p>
            <input type="text" name="address" placeholder="Enter Address" oninvalid="displayInvalidMessage(this, 'addr-val-msg')"><br>
            <p id="address-val-msg" class="val-msg"></p>
            <p>Country</p>
            <input type="text" name="country" placeholder="Enter Country" required oninvalid="displayInvalidMessage(this, 'country-val-msg')"><br>
            <p id="country-val-msg" class="val-msg"></p>
            <p>ZIP Code</p>
            <input type="text" name="zip" placeholder="Enter ZIP Code" pattern="[\d]{4}[A-Z]{2}" oninvalid="displayInvalidMessage(this, 'zip-val-msg')"><br>
            <p id="zip-val-msg" class="val-msg"></p>
            <p>Email</p>
            <input type="email" name="email" placeholder="Enter Email" required oninvalid="displayInvalidMessage(this, 'email-val-msg')"><br>
            <p id="email-val-msg" class="val-msg"></p>
            <p>Sex</p>
            <select name="sex" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select><br><br>
            <p>About</p>
            <textarea name="about" placeholder="" rows="4" cols="30"></textarea><br>
            <p>Language</p>
            <select name="language" required>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="ro">Romanian</option>
            </select><br><br>
            <input type="submit" name="submit" value="Sign-up"><br><br>

            <a href="site2.html">Already have an account?</a><br>
        </form>
    </div>
</div>
</body>
</html>
```

```html
<!-- .\regex\site2.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="style.css">
    <title>Document</title>
</head>
<body background="p1.png">
<div class="loginboxcontainer">
    <div class="loginbox">
        <h1>Login Here</h1>
        <form action="site3.html">
            <p>Username</p>
            <input type="text" name="username" placeholder="Enter Username" required>
            <p>Password</p>
            <input type="password" name="password" placeholder="Enter Password" required> <br/>
            <input type="submit" name="" value="Login"> <br/>
            <a href="index.html">Don't have an account?</a>
        </form>
    </div>
</div>
</body>
</html>
```

```html
<!-- .\regex\site3.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="style.css">
    <title>Document</title>
</head>
<body background="background.PNG">
    
    <div class="this">
        <form>
            <a href="cart.html">My cart</a>
        </form>
    </div>


    <div class="buy">
        <h1>Available for purchase:</h1>
        <p class="para">Filter by:</p>
        <select class="sortby">
            <option>Rating</option>
            <option>Supplier</option>
            <option>Price</option>
        </select><br><br>
        <div class="itema">
            <p>Item #1</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button type="button" value="button">Add to cart.</button>
        </div><br>
        <div class="item2a">
            <p>Item #2</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button type="button" value="button">Add to cart.</button>
        </div>
        <div class="item3a">
            <p>Item #3</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button type="button" value="button">Add to cart.</button>
        </div>
    </div>
   

</body>
</html>
```

```css
/* .\regex\style.css */

.welcome{
    position: absolute;
    width: 300px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 20%;
    background: #000;
    color: #fff;
    text-align: center;
    font-size: 20px;
}

body {
    width: 100%;
    min-height: 100%;
    margin: 0;
}

.signupboxcontainer {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    border: 0;
    margin: 0;
}

.signupbox{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 0;
    background: #000;
    color: #fff;
    padding: 30px 35px;
    line-height: 0.5;
    border-radius: 7%;
}

.signupbox input {
    width: 100%;
    border-radius: 0;
}

.signupbox select {
    width: 100%;
    border-radius: 0;
}

.signupbox textarea {
    width: 100%;
    border-radius: 0;
}

.loginboxcontainer {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
}

.loginbox{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    background: #000;
    color: #fff;
    padding: 70px 35px;
    border-radius: 7%;
}

.loginbox input {
    width: 100%;
    border-radius: 0;

    margin: 15px 0;
}

.this{
    position: absolute;
    width: 70px;
    height: 30px;
    background: rgb(1, 8, 69);
    left: 90%;
    text-align: center;
    border-radius: 20%;
    padding: 5px 0;
}

.seller{
    line-height: 1.5;
    position: absolute;
    width: 700px;
    height: 600px;
    background: #244a4a;
    text-align: left;
    border-radius: 20%;
    text-indent: 20%;
    font-size: 25px;
    top: 20%;
    left: 30%;
    transform: translateX(-50%);
    display: inline-block;
    padding: 35px 65px;
    
}
.seller input[type="text"]{
    height: 23px;
}
.seller input[type="number"]{
    height: 23px;
}
.seller input[type="submit"]{
    height: 50px;
    width:80px;
    float: right;
    font-size: 17px;
}

.buy{
    position: absolute;
    width: 700px;
    height: 700px;
    background: #0c0035;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    border-radius: 10%;
    color: #fff;
}

.item{
    position: absolute;
    width: 600px;
    height: 150px;
    background: #000;
    left: 50px;
    color: #fff;
    text-align: left;
    text-indent: 50px;
    box-sizing: border-box;
}

.item2{
    position: absolute;
    width: 600px;
    height: 150px;
    background: #000;
    left: 50px;
    top: 275px;
    color: #fff;
    text-align: left;
    text-indent: 50px;
    box-sizing: border-box;
}

.item3{
    position: absolute;
    width: 600px;
    height: 150px;
    background: #000;
    left: 50px;
    top: 465px;
    color: #fff;
    text-align: left;
    text-indent: 50px;
    box-sizing: border-box;
}

.buy button[type="button"]{
    position: absolute;
    left: 80%;
    font-size: 15px;

}

.cart{
    position: absolute;
    width: 700px;
    height: 700px;
    background: #0a0078;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    border-radius: 10%;
    color: antiquewhite;
}

.cart button[type="button"]{
    position: absolute;
    left: 80%;
    top: 89%;
    font-size: 21px;
    height: 50px;
    width: 75px;

}

.itema{
    position: absolute;
    width: 600px;
    height: 150px;
    background: #000;
    left: 50px;
    color: #fff;
    text-align: left;
    text-indent: 50px;
    box-sizing: border-box;
}

.item2a{
    position: absolute;
    width: 600px;
    height: 150px;
    background: #000;
    left: 50px;
    top: 325px;
    color: #fff;
    text-align: left;
    text-indent: 50px;
    box-sizing: border-box;
}

.item3a{
    position: absolute;
    width: 600px;
    height: 150px;
    background: #000;
    left: 50px;
    top: 500px;
    color: #fff;
    text-align: left;
    text-indent: 50px;
    box-sizing: border-box;
}
```

```js
// .\behaviour-tracking.js

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
```
