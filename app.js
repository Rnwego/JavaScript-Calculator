class Calculator {
  constructor(previousValueArea, currentValueArea) {
    this.previousValueArea = previousValueArea;
    this.currentValueArea = currentValueArea;
    this.allClear();
  }

  allClear() {
    this.currentValue = "";
    this.previousValue = "";
    this.operation = undefined;
  }

  deleteNumber() {
    this.currentValue = this.currentValue.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentValue.includes(".")) {
      return;
    }
    this.currentValue = this.currentValue.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentValue === "") {
      return;
    }
    if (this.previousValue !== "") {
      this.evaluate();
    }
    this.operation = operation;
    this.previousValue = this.currentValue;
    this.currentValue = "";
  }

  evaluate() {
    let evaluation;
    const previous = parseFloat(this.previousValue);
    const current = parseFloat(this.currentValue);
    if (isNaN(previous) || isNaN(current)) {
      return;
    }
    switch (this.operation) {
      case "+":
        evaluation = previous + current;
        break;
      case "-":
        evaluation = previous - current;
        break;
      case "x":
        evaluation = previous * current;
        break;
      case "÷":
        evaluation = previous / current;
        break;
      default:
        return;
    }
    this.currentValue = evaluation;
    this.operation = undefined;
    this.previousValue = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigit = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigit != null) {
      return `${integerDisplay}.${decimalDigit}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentValueArea.innerText = this.getDisplayNumber(this.currentValue);
    if (this.operation) {
      this.previousValueArea.innerText = `${this.getDisplayNumber(
        this.previousValue
      )} ${this.operation}`;
    } else {
      this.previousValueArea.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousValueArea = document.querySelector("[data-previous-value]");
const currentValueArea = document.querySelector("[data-current-value]");

const calculator = new Calculator(previousValueArea, currentValueArea);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.evaluate();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.allClear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.deleteNumber();
  calculator.updateDisplay();
});
