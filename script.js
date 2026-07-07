// ==============================
// Calculator Elements
// ==============================

const display = document.querySelector(".display input");
const history = document.querySelector(".history");

const buttons = document.querySelectorAll(".btn");

let expression = "";

// ==============================
// Button Events
// ==============================

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.textContent;

        switch (value) {

            case "AC":
                clearDisplay();
                break;

            case "DEL":
                deleteLast();
                break;

            case "=":
                calculate();
                break;

            default:
                appendValue(value);

        }

    });

});

// ==============================
// Append Value
// ==============================

function appendValue(value) {

    if (display.value === "Error") return;

    expression += value;

    display.value = expression;

}

// ==============================
// Clear Display
// ==============================

function clearDisplay() {

    expression = "";

    display.value = "";

    history.textContent = "";

}

// ==============================
// Delete Last Character
// ==============================

function deleteLast() {

    expression = expression.slice(0, -1);

    display.value = expression;

}

// ==============================
// Calculate
// ==============================

function calculate() {

    if (expression.trim() === "") return;

    try {

        let exp = expression
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/−/g, "-")
            .replace(/%/g, "/100");

        const result = eval(exp);

        if (!isFinite(result)) {

            showError();

            return;

        }

        history.textContent = expression + " =";

        display.value = result;

        expression = result.toString();

    }

    catch {

        showError();

    }

}

// ==============================
// Error
// ==============================

function showError() {

    display.value = "Error";

    expression = "";

    setTimeout(() => {

        display.value = "";

    }, 1000);

}

// ==============================
// Keyboard Support
// ==============================

document.addEventListener("keydown", (e) => {

    const key = e.key;

    if ("0123456789".includes(key)) {

        appendValue(key);

    }

    else if (key === ".") {

        appendValue(".");

    }

    else if (key === "+") {

        appendValue("+");

    }

    else if (key === "-") {

        appendValue("−");

    }

    else if (key === "*") {

        appendValue("×");

    }

    else if (key === "/") {

        e.preventDefault();

        appendValue("÷");

    }

    else if (key === "%") {

        appendValue("%");

    }

    else if (key === "Enter") {

        e.preventDefault();

        calculate();

    }

    else if (key === "Backspace") {

        deleteLast();

    }

    else if (key === "Escape" || key === "Delete") {

        clearDisplay();

    }

});

// ==============================
// Button Click Animation
// ==============================

buttons.forEach(btn => {

    btn.addEventListener("click", () => {

        btn.style.transform = "scale(.92)";

        setTimeout(() => {

            btn.style.transform = "";

        }, 120);

    });

});