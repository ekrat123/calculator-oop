class Calcualtor {
  constructor(prev, curr) {
    this.prev = prev;
    this.curr = curr;
    this.clear();
  }

  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operator = null;
    this.updateScreen();
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
    this.updateScreen();
  }

  appendNum(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand += number;
    this.updateScreen();
  }

  getOperator(operator) {
    if (this.currentOperand === "") return;
    if (this.operator) {
      this.compute();
    }
    this.operator = operator;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    this.updateScreen();
  }

  compute() {
    let result;
    const prevNum = +this.previousOperand;
    const currNum = +this.currentOperand;

    switch (this.operator) {
      case "+":
        result = prevNum + currNum;
        break;
      case "-":
        result = prevNum - currNum;
        break;
      case "*":
        result = prevNum * currNum;
        break;
      case "/":
        result = prevNum / currNum;
        break;
      default:
        return;
    }
    this.currentOperand = result;
    this.previousOperand = "";
    this.operator = null;
    this.updateScreen();
  }

  editNumber(number) {
    const [intPart, decPart] = String(number).split(".");
    const FormattedIntPart = isNaN(intPart)
      ? ""
      : intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return decPart ? `${FormattedIntPart}.${decPart}` : FormattedIntPart;
  }

  updateScreen() {
    currTextEl.innerText = this.editNumber(this.currentOperand);
    this.operator
      ? (prevTextEl.innerText =
          this.editNumber(this.previousOperand) + this.operator)
      : (prevTextEl.innerText = this.editNumber(this.previousOperand));
  }
}

const numBtns = document.querySelectorAll("[data-number]");
const opBtns = document.querySelectorAll("[data-operator]");
const delBtn = document.querySelector("[data-delete]");
const equalBtn = document.querySelector("[data-equals]");
const allClearBtn = document.querySelector("[data-all-clear]");
const prevTextEl = document.querySelector("[data-previous-operand]");
const currTextEl = document.querySelector("[data-current-operand]");

const calculator = new Calcualtor(prevTextEl, currTextEl);

numBtns.forEach((numBtn) => {
  numBtn.addEventListener("click", () =>
    calculator.appendNum(numBtn.textContent)
  );
});

allClearBtn.addEventListener("click", () => calculator.clear());

opBtns.forEach((op) => {
  op.addEventListener("click", () => calculator.getOperator(op.innerText));
});

equalBtn.addEventListener("click", () => calculator.compute());

delBtn.addEventListener("click", () => calculator.delete());

window.addEventListener("keydown", (e) => {
  key = e.key;
  if (key === "Enter") {
    e.preventDefault();
    calculator.compute();
  } else if (key.match(/\d/)) {
    calculator.appendNum(key);
  } else if (key === "Backspace") {
    calculator.delete();
  } else if (["*", "/ ", "+", "-"].includes(key)) {
    calculator.getOperator(key);
  }
});
